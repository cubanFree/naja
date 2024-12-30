// app/api/auth/callback/[provider]/route.ts
import { supabase } from "@/lib/supabase"
import { decodeJwt } from "jose"
import { cookies } from 'next/headers'

const PROVIDERS = {
    google: {
        tokenUrl: 'https://oauth2.googleapis.com/token',
        userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?provider=google`
    },
    // github: {
    //     tokenUrl: 'https://github.com/login/oauth/access_token',
    //     userInfoUrl: 'https://api.github.com/user',
    //     clientId: process.env.GITHUB_CLIENT_ID,
    //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //     redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?provider=github`
    // }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)

        // Obtener el nombre del proveedor.
        const provider = searchParams.get('provider')
        if (!Object.keys(PROVIDERS).includes(provider)) {
            return new Response('[-] Proveedor no soportado', { status: 400 })
        }

        // Obtener el codigo y el state.
        const code = searchParams.get('code')
        const state = searchParams.get('state')

        // Verificar el state para prevenir CSRF
        // y vericar que haya codigo, state, oauth_state en cookies y que sean iguales.
        const cookieStore = cookies()
        const storedState = cookieStore.get('oauth_state')

        if (!code || !state || !storedState || state !== storedState.value) {
            return new Response('[-] Estado inválido o código faltante', { status: 400 })
        }

        // Extrarer todos los parametros del proveedor.
        const config = PROVIDERS[provider]

        // Obtener el token de acceso.
        // Verificamos que el tokenResponse sea exitoso.
        // Si lo es, obtenemos el tokenData.
        const tokenResponse = await fetch(config.tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // ...(provider === 'github' && { Accept: 'application/json' })
            },
            body: new URLSearchParams({
                client_id: config.clientId,
                client_secret: config.clientSecret,
                code,
                redirect_uri: config.redirectUri,
                grant_type: 'authorization_code'
            })
        })

        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.text()
            throw new Error('[-] Error obteniendo el token de acceso:', errorData)
        }

        const tokenData = await tokenResponse.json()

        // Creamos un objeto con los datos del usuario.
        const userData = {
            email: decodeJwt(tokenData.id_token).email,
            name: decodeJwt(tokenData.id_token).name,
            picture: decodeJwt(tokenData.id_token).picture,
            email_verified: decodeJwt(tokenData.id_token).email_verified
        }

        // Obtener el id del usuario en la base de datos...
        // Si existe, guardamos ese id en una cookie.
        // Si no existe, creamos un nuevo usuario, y obtenemos su id para guardarlo en una cookie.
        const { data: existingAuthUser, error: authError } = await supabase
            .from('auth.users')
            .select('id')
            .eq('email', userData.email)
            .single()

        if (authError && authError.code !== 'PGRST116') {
            throw new Error('[-] Error al verificar el usuario authenticado:', authError)
        }

        let userId = null;
        if (!existingAuthUser) {
            const { data: newUser, error: userError } = supabase.auth.admin
                .createUser({
                    email: userData.email,
                    email_confirm: true,
                    user_metadata: {
                        name: userData.name,
                        avatar_url: userData.picture
                    }
                })

            if (userError) {
                throw new Error('[-] Error al crear el usuario:', userError)
            }

            userId = newUser.id

        } else {
            userId = existingAuthUser.id
        }

        // Creamos la respuesta de redirección con la cookie de sesión_email y session_id.
        const response = new Response(null, {
            status: 302,
            headers: {
                Location: '/home',
                'Set-Cookie': [
                    `session_email=${userData.email}; HttpOnly; Path=/; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`,
                    `session_id=${12345678}; HttpOnly; Path=/; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`
                ]
            }
        })

        return response

    } catch (error) {
        console.error(error)

        // Redirigir a una página de error.
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/auth/error'
            }
        })
    }
}