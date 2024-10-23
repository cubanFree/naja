'use client';

import useGlobal from "@/hooks/useGlobal";
import { useEffect } from "react";

export default function AppContent({ children }) {

    const { toggleTheme } = useGlobal();
    const { toggleLanguage } = useGlobal();

    // Aplicar el tema al body y inicializar desde localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') || 'light';
            toggleTheme(savedTheme);
            document.body.className = savedTheme;
        }
    }, [toggleTheme]);

    // Aplicar o inicializar el idioma desde localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('language') || 'es';
            toggleLanguage(savedLanguage);
        }
    }, [toggleLanguage]);

    return <>{children}</>;
}