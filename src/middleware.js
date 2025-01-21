import { NextResponse } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export default async function middleware(req) {

    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    const pathname = req.nextUrl.pathname

    try {
        const { data: { session } } = await supabase.auth.getSession()

        // Verificamos si no tiene una session.
        if (!session) {
            throw new Error('[-] No session found')
        }

        // Redirecciones
        const REDIRECT_ROUTES = {
            '/network': '/network/inbox',
            '/warehouse': '/warehouse/summaries',
            '/traders': '/traders/assets'
        }
        if (pathname in REDIRECT_ROUTES) {
            const url = req.nextUrl.clone()
            url.pathname = REDIRECT_ROUTES[pathname]

            return NextResponse.redirect(url)
        }

        // Si el usuario esta en unas de la skipRoutes, lo redirige a /home.
        const skipRoutes = ['/auth', '/']
        return (
            skipRoutes.includes(pathname)
                ? NextResponse.redirect(new URL('/home', req.url))
                : NextResponse.next()
        )

    } catch (error) {
        console.error(error)

        // Si no tiene una session, lo redirige a /auth,
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
