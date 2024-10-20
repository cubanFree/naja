'use client'

import { create } from 'zustand';

const useGlobal = create((set) => ({
    language: 'es',
    theme: 'light',
    toggleLanguage: () => set((state) => ({
        language: state.language === 'es' ? 'en' : 'es',
    })),
    toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}));

export default useGlobal;
