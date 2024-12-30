import { changeEmailById } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        // Si no hay id, ni cookieUserId, ni cookieUserId.value, 
        // obtenemos el email de la cookie y lo usamos para obtener el id.
        const cookieUserId = req.cookies.get('session_id');
        const userId = null

        if (!id && !cookieUserId && !cookieUserId.value) {
            const cookieUserEmail = req.cookies.get('session_email');
            userId = await changeEmailById(cookieUserEmail.value);
        }

        // Obtenemos los datos a traves de el id.
        // const response = await supabase.from('users').select('*').eq('id', id).single();

        // En caso de haber id, obtenemos los datos del usuario requerido por ese ID.
        return NextResponse.json({ data: id || cookieUserId.value || userId }, { status: 200 });

    } catch (error) {
        console.error('[-] Error al obtener los datos del usuario:', error);
        return NextResponse.json({ error: '[-] Error al obtener los datos del usuario' }, { status: 500 });
    }

}