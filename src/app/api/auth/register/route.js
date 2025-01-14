import { NextResponse } from "next/server";
import { handleAuthentication } from "@/lib/authUtils";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PRIVATE_SERVICE_KEY);

    const formData = await req.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    const companyName = formData.get('companyName')
    const companyAvatar = formData.get('companyAvatar')

    try {

        if (!email || !password || !companyName) {
            return NextResponse.json({ error: 'Email, contraseña y nombre de la Empresa son requeridos' }, { status: 400 });
        }

        // Si hay company_avatar, guardar la imagen en el Storage y obtener la url
        let url_avatar = null
        if (companyAvatar) {
            const { data, error } = await supabase.storage
                .from('company_avatars')
                .upload(email, companyAvatar, {
                    cacheControl: '3600',
                    upsert: true,
                    contentType: companyAvatar.type
                })

            if (!error && data) {
                // Aqui va la creacion de firma para la url de la imagen
                const { data: url } = await supabase
                    .storage
                    .from('company_avatars')
                    .createSignedUrls([data.path], 60 * 60 * 24 * 7)

                if (!url[0].error && url[0].signedUrl) {
                    url_avatar = url[0].signedUrl
                } else {
                    console.error('[-] No se pudo crear la firma de la url de la imagen.\n', signError);
                }

            } else {
                console.error('[-] No se pudo subir la imagen.\n', error);
            }
        }

        // Registrar y obtener la session
        const { data: { user }, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    company_name: companyName,
                    company_avatar: url_avatar,
                }
            }
        });

        if (error) {
            return NextResponse.json({ error: error.code }, { status: error.status });
        }

        // Crear el nuevo usuario en la tabla de la base de datos
        await handleAuthentication(null, user);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: '*** Error en el servidor (Register) ***' }, { status: 500 });
    }

}