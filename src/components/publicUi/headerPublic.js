'use client'

import useGlobal from "@/hooks/useGlobal";
import Link from "next/link";
import translate from "@/translate/homePage.json";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function HeaderPublic() {

    const { language, toggleLanguage } = useGlobal();
    const pathCurrent = usePathname();

    // Aplicar o inicializar el idioma desde localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('language') || 'es';
            toggleLanguage(savedLanguage);
        }
    }, [toggleLanguage]);

    return (
        <header className="border-b w-full">
            <section className="px-4 xl:px-0 flex items-center w-full max-w-7xl mx-auto py-6">
                <Link className={cn("flex items-center justify-center cursor-pointer", pathCurrent === '/' && 'pointer-events-none')} href="/">
                    <span className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl/none">Naja</span>
                </Link>
                <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                    <Link className={cn("text-sm md:text-md font-medium hover:underline underline-offset-4", pathCurrent === '/about' && 'opacity-50 pointer-events-none')} href="/about">
                        {translate.header[language].about}
                    </Link>
                    <Link className={cn("text-sm md:text-md font-medium hover:underline underline-offset-4", pathCurrent === '/auth' && 'opacity-50 pointer-events-none')} href="/auth">
                        {translate.header[language].login}
                    </Link>
                </nav>
            </section>
        </header>
    )
}
