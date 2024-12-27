import { NextResponse } from "next/server"
import { verifyToken } from "./lib/auth"
import { cookies } from "next/headers"

export default async function middleware(req) {

    const token = cookies().get('token')?.value
    const sessionToken = cookies().get('session_token')?.value
    const pathname = req.nextUrl.pathname

    try {
        // Si no tiene token y session_token
        if (!token && !sessionToken) {
            throw new Error('[-] Token no encontrado.');
        }

        // Si existe un token
        if (token) {
            const { error } = await verifyToken(token)
            if (error) throw new Error(error)
        }

        // En caso de que tenga un token o session_token,
        // si el usuario esta en unas de la skipRoutes, lo redirige a /home.
        const skipRoutes = ['/auth', '/']
        return (
            skipRoutes.includes(pathname)
                ? NextResponse.redirect(new URL('/home', req.url))
                : NextResponse.next()
        )

    } catch (error) {
        console.error(error)

        // Si no tiene token o session_token, lo redirige a /auth,
        // en caso de que este en unas de las skipRoutes.
        const skipRoutes = ['/auth', '/about', '/']
        return (
            skipRoutes.includes(pathname)
                ? NextResponse.next()
                : NextResponse.redirect(new URL('/auth', req.url))
        )
    }
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|api).*)"]
};
