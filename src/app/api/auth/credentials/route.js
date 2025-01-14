import { handleAuthentication } from "@/lib/authUtils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
        // Verificar si hay email y password
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: 'Email y contraseña son requeridos' }, { status: 400 });
        }

        // Iniciar sesión
        const { data: { session }, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        // Verificar si se pudo iniciar sesión
        if (error) {
            switch (error.status) {
                case 429:
                    return NextResponse.json({
                        error: 'Demasiados intentos. Intenta de nuevo más tarde'
                    }, { status: 429 });

                default:
                    return NextResponse.json({
                        error: 'Email o contraseña incorrectos'
                    }, { status: 400 });
            }
        };

        // Creacion del usuario en la tabla de la base de datos
        await handleAuthentication(session);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: '*** Error en el servidor (Credentials) ***' }, { status: 500 });
    }
}