// app/api/auth/callback/[provider]/route.ts
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

async function getProviderUser(provider, accessToken) {

    // Obtenemos los parametros del proveedor y configuramos el headers.
    const config = PROVIDERS[provider]
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }

    // Si el proveedor es GitHub, configuramos el headers para obtener el email.
    if (provider === 'github') {
        headers.Accept = 'application/json'
    }

    // Obtenemos los datos del usuario.
    const response = await fetch(config.userInfoUrl, { headers })
    if (!response.ok) throw new Error('[-] Error obteniendo datos del usuario')

    const userData = await response.json()

    // Si el proveedor es GitHub y el usuario no tiene email, obtenemos el email en GitHub,
    // y lo asignamos al email del usuario.
    if (provider === 'github' && !userData.email) {
        const emailsResponse = await fetch('https://api.github.com/user/emails', { headers })
        if (emailsResponse.ok) {
            const emails = await emailsResponse.json()
            const primaryEmail = emails.find((email) => email.primary)
            userData.email = primaryEmail?.email
        }
    }

    return userData
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
        // Si lo es, obtenemos el tokenData y extraemos el access_token.
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
        const accessToken = tokenData.access_token

        // Obtenemos los datos del usuario con el nombre del proveedor y el access_token.
        const userData = await getProviderUser(provider, accessToken)

        // Aquí deberías:
        // 1. Crear o actualizar el usuario en tu base de datos

        // Creamos la respuesta de redirección con la cookie de sesión.
        const response = new Response(null, {
            status: 302,
            headers: {
                Location: '/home',
                'Set-Cookie': `session_token=${accessToken}; HttpOnly; Path=/; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`
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