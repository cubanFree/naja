import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"

const codesError = {
    // Errores de Base de Datos (400)
    '42703': NextResponse.json({ error: 'Columna no encontrada' }, { status: 400 }),
    '42P01': NextResponse.json({ error: 'Tabla no encontrada' }, { status: 400 }),

    // Errores de Autenticación/Autorización
    '42501': NextResponse.json({ error: 'No tienes permisos para esta operación' }, { status: 401 }),
    '28000': NextResponse.json({ error: 'Acceso denegado por políticas de seguridad' }, { status: 403 }),

    // Errores de Datos
    'PGRST116': NextResponse.json({ error: 'No se encontraron registros' }, { status: 404 }),
    '23505': NextResponse.json({ error: 'Registro duplicado' }, { status: 409 }),

    // Errores de Rate Limiting
    'PGRST129': NextResponse.json({ error: 'Demasiadas peticiones' }, { status: 429 })
}

export async function GET(req) {

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const searchParams = new URL(req.url).searchParams
    const id = searchParams.get('id')
    const columns = searchParams.get('columns') || '*'

    try {
        // Verificacion de columnas
        if (columns && !columns.match(/^[a-zA-Z_,\s]*$/)) {
            return NextResponse.json({ error: 'Columnas no validas' }, { status: 400 })
        }

        // Si no hay ID, obtener el usuario autenticado
        if (!id || id === 'null') {
            const { data: { user }, error: authError } = await supabase.auth.getUser()
            if (authError || !user) {
                return NextResponse.json({ error: `[-] Usuario no autorizado\nMessage: ${authError}` }, { status: 400 })
            }

            // Usar el ID del usuario autenticado
            const { data, error } = await supabase
                .from('users')
                .select(columns)
                .eq('id', user.id)
                .single()

            if (error) {
                if (error.code in codesError) return codesError[error.code]
                return NextResponse.json({ error: `[-] Error al obtener la informacion del usuario anfitrion\nMessage: ${error.message}` }, { status: 400 })
            }

            return NextResponse.json(data)
        }

        // Si hay ID, buscar por ese ID específico
        const { data, error } = await supabase
            .from('users')
            .select(columns)
            .eq('id', id)
            .single()

        if (error) {
            if (error.code in codesError) return codesError[error.code]
            return NextResponse.json({ error: `[-] Error al obtener la informacion del usuario anfitrion\nMessage: ${error.message}` }, { status: 400 })
        }

        if (!data) return NextResponse.json({ error: 'No se encontraron registros' }, { status: 404 })

        return NextResponse.json(data)

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: `*** Error en el servidor ***\nMessage: ${error.message}` }, { status: 500 })
    }
}