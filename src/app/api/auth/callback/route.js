import { handleAuthentication } from "@/lib/authUtils"
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req) {

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const requestUrl = new URL(req.url)
    const code = requestUrl.searchParams.get('code')

    try {
        if (code) {
            const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)

            if (error) throw error
            if (!session) throw new Error('Session not created')

            await handleAuthentication(session)
        }

        return NextResponse.redirect(new URL('/auth', req.url))

    } catch (error) {
        console.error('*** Error en el servidor (Callback) ***\nMessage:', error.message);
        return NextResponse.redirect(new URL('/auth', req.url))
    }
}