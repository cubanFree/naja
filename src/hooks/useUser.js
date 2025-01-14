'use client'

import useSWR from 'swr'

// Fetcher que maneja tanto ID específico como usuario autenticado
const fetcher = async (url) => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '[-] Error en el servidor (Get User)');
        }

        return response.json()

    } catch (error) {
        console.error(error)
        throw error
    }
}

export function useUser(id = null, columns = '*') {

    const {
        data,
        error,
        isLoading,
        isValidating,
        mutate
    } = useSWR(
        `/api/get/user?id=${id}&columns=${columns}`,
        fetcher,
        {
            revalidateOnFocus: true,      // Revalida cuando el usuario enfoca la ventana.
            refreshInterval: 60000,       // Revalida automáticamente cada 5 segundos.
            fallbackData: null,          // Datos predeterminados mientras carga.
            shouldRetryOnError: true,    // Reintenta si hay errores.
        }
    )

    console.log(data, error, isLoading, isValidating)

    return {
        data,
        error,
        isLoading,
        isValidating,
        mutate,
        isEmpty: !data,
    }
}