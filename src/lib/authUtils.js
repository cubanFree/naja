'use server'

import { createClient } from "@supabase/supabase-js"

// Funcion para en caso de no halla usuario creado, lo cree.
// Y si no puedo crearlo, lo elimine de auth.users.
export const handleAuthentication = async (session, user) => {
    if ((!session || !session?.user) && (!user || Object.keys(user).length === 0)) {
        throw new Error('[-] No se encontro la session/user.');
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PRIVATE_SERVICE_KEY)

    let userData = {}

    if (session?.user) {
        userData = {
            email: session.user.email,
            provider_id: session.user.id,
            name: session.user.user_metadata?.name || null,
            avatar_url: session.user.user_metadata?.avatar_url || null,
        }
    } else if (user) {
        userData = {
            provider_id: user.id,
            email: user.email,
            name: user.user_metadata?.company_name || null,
            avatar_url: user.user_metadata?.company_avatar || null,
        }
    }

    try {
        // 1- Verificar si el usuario ya existe en public.users.
        console.log('[+] Verificando si el usuario ya existe...')
        const { data: existingUser, error: searchError } = await supabase
            .from('users')
            .select('*')
            .eq('id', userData.provider_id)
            .single()

        // 2- Si la fila de ese usuario no existee, intentar crearlo.
        if (!existingUser && searchError.code === 'PGRST116') {

            console.log('[+] Intentando crear el usuario en la tabla...')
            const { error: createError } = await supabase
                .from('users')
                .insert({
                    id: userData.provider_id,
                    email: userData.email,
                    company_name: userData.name,
                    company_avatar: userData.avatar_url,
                })

            // 3- Si ocurre un error al crear el usuario, eliminarlo de auth.users.
            if (createError) {
                console.error(`[-] Error al crear usuario en public.users: ${createError.message}`)
                console.log('[+] Intentando eliminar el usuario de auth.users...')
                const { error: deleteError } = await supabase
                    .auth
                    .admin
                    .deleteUser(session.user.id)

                if (deleteError) throw new Error(`[-] Error al eliminar usuario de auth.users: ${deleteError.message}`)

                console.log('[+] Usuario eliminado de auth.users.')
                await supabase.auth.signOut()
            }
        }

        console.log('[+] Usuario verificado.')

    } catch (error) {
        throw error.message
    }
}