const PROVIDERS = {
    google: {
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        responseType: 'code',
        redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
    },
    // github: {
    //     authUrl: 'https://github.com/login/oauth/authorize',
    //     clientId: process.env.GITHUB_CLIENT_ID,
    //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //     scope: 'user:email',
    //     responseType: 'code',
    //     redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
    // }
}

export async function GET(req, { params }) {
    try {
        // Obtenemos el parámetro del provider para obtener la URL de autenticación.
        const provider = params.provider.toLowerCase();

        if (!Object.keys(PROVIDERS).includes(provider)) {
            return new Response('[-] Proveedor de autenticación no válido.', { status: 400 });
        }

        // Obtenemos todos los parámetros del proveedor elegido.
        const config = PROVIDERS[provider];

        // Generar un estado aleatorio para prevenir ataques CSRF.
        const state = crypto.randomUUID();

        // Construimos la URL de autorización.
        const authUrl = new URL(config.authUrl);
        const searchParams = new URLSearchParams({
            client_id: config.clientId,
            redirect_uri: `${config.redirectUri}?provider=${provider}`,
            scope: config.scope,
            response_type: config.responseType,
            state: state,
            // Parámetros específicos de Google.
            ...(provider === 'google' && {
                access_type: 'offline',
                prompt: 'consent',
            }),
        });

        // Actualizamos la URL con los parámetros.
        authUrl.search = searchParams.toString();

        // Creamos la cabecera Set-Cookie para guardar el estado.
        const cookieHeader = `oauth_state=${state}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`;

        // Redireccionamos al proveedor de autenticación.
        return new Response(null, {
            status: 302,
            headers: {
                Location: authUrl.toString(),
                'Set-Cookie': cookieHeader,
            },
        });

    } catch (error) {
        console.error('[-] Error de autenticación: ', error);
        return new Response('[-] Error de autenticación.', { status: 500 });
    }
}
