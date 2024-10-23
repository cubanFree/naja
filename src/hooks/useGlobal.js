'use client'

import { create } from 'zustand';

const useGlobal = create((set) => ({
    loading: true,
    language: 'es',
    theme: 'light',
    toggleLanguage: (arg) => set(() => ({
        language: arg,
    })),
    toggleTheme: (arg) => set(() => ({
        theme: arg,
    })),
    toggleLoading: (arg) => set(() => ({
        loading: arg,
    })),
}));

export default useGlobal;
