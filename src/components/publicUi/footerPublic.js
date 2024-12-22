'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import useGlobal from "@/hooks/useGlobal";
import translate from "@/translate/homePage.json";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function FooterPublic() {

    const { theme, toggleTheme } = useGlobal();
    const { language, toggleLanguage } = useGlobal();
    const pathCurrent = usePathname();

    const handleToggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        toggleTheme(newTheme);
        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
    }

    const handleToggleLanguage = () => {
        const newLanguage = language === 'es' ? 'en' : 'es';
        toggleLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    }

    return (
        <footer className="w-full border-t">
            <section className="flex flex-col gap-2 sm:flex-row py-6 w-full max-w-7xl mx-auto shrink-0 items-center px-4 xl:px-0">
                <p className="text-xs text-gray-500 dark:text-gray-400">{translate.footer[language].copyright}</p>
                <nav className="sm:ml-auto flex items-center gap-4 sm:gap-6">
                    <Link className={cn("text-xs hover:underline underline-offset-4", pathCurrent === '/terms' && 'opacity-50 pointer-events-none')} href="#">
                        {translate.footer[language].terms}
                    </Link>
                    <Link className={cn("text-xs hover:underline underline-offset-4", pathCurrent === '/privacy' && 'opacity-50 pointer-events-none')} href="#">
                        {translate.footer[language].privacy}
                    </Link>
                    <Button className="flex justify-center items-center" onClick={handleToggleTheme} variant="outline" size="sm" aria-label="Toggle color mode">
                        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    </Button>
                    <Button className="text-sm font-semibold text-slate-400" onClick={handleToggleLanguage} variant="outline" size="sm">
                        {language === 'es' ? 'EN' : 'ES'}
                    </Button>
                </nav>
            </section>
        </footer>
    );
}