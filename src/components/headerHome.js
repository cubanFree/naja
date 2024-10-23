'use client'

import useGlobal from "@/hooks/useGlobal";
import Link from "next/link";
import { Button } from "./ui/button";
import translate from "@/translate/homePage.json";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function HeaderHome() {

    const { language, toggleLanguage } = useGlobal();
    const pathCurrent = usePathname();

    const handleToggleLanguage = () => {
        const newLanguage = language === 'es' ? 'en' : 'es';
        toggleLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    }

    // Aplicar o inicializar el idioma desde localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('language') || 'es';
            toggleLanguage(savedLanguage);
        }
    }, [toggleLanguage]);

    return (
        <header className="px-4 lg:px-0 h-14 flex items-center w-full max-w-7xl mx-auto">
            <Link className={cn("flex items-center justify-center cursor-pointer", pathCurrent === '/' && 'pointer-events-none')} href="/">
                <span className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl/none">Naja</span>
            </Link>
            <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                <Link className={cn("text-sm font-medium hover:underline underline-offset-4", pathCurrent === '/about' && 'opacity-50 pointer-events-none')} href="/about">
                    {translate.header[language].about}
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                    {translate.header[language].login}
                </Link>
                <Button className="flex items-center font-bold text-slate-500 p-3" onClick={handleToggleLanguage} variant="outline" size="sm">
                    {language === 'es' ? 'EN' : 'ES'}
                </Button>
            </nav>
        </header>
    )
}
