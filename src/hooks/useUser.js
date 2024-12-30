'use client'

import useSWR from 'swr'

const fetcher = async (url) => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            const error = new Error('[-] Failed to fetch user data')
            error.status = response.status
            throw error
        }

        const json = await response.json()
        return json.data

    } catch (error) {
        error.message = `[-] Error fetching user data: ${error.message}`
        throw error
    }
}

export function useUser(id = null) {
    const url = id ? `/api/user?id=${id}` : '/api/user'

    const { data, error, mutate, isValidating } = useSWR(url, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 5000,
        errorRetryCount: 0,
        shouldRetryOnError: (error) => {
            return error.status >= 500 || error.status === 408
        }
    })

    return {
        user: data, // Aquí data ya es el contenido de json.data
        isLoading: !error && !data && isValidating,
        isError: error,
        mutate,
        isHost: !id
    }
}