import { NextResponse } from "next/server"
import { verifyToken } from "./lib/auth"
import { cookies } from "next/headers"

export default async function middleware(req) {

    const token = cookies().get('token')?.value
    const pathname = req.nextUrl.pathname

    try {
        // Si no existe un token, redirigir al auth
        if (!token) {
            throw new Error('[-] Token no encontrado.');
        }

        // Si el token no es valido, redirigir al auth
        const { error } = await verifyToken(token)
        if (error) throw new Error(error)

        const skipRoutes = ['/auth', '/']
        return (
            skipRoutes.includes(pathname)
                ? NextResponse.redirect(new URL('/home', req.url))
                : NextResponse.next()
        )

    } catch (error) {
        console.error(error)
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
