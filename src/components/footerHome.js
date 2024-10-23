'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import useGlobal from "@/hooks/useGlobal";
import translate from "@/translate/homePage.json";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function FooterHome() {

    const { theme, toggleTheme } = useGlobal();
    const { language } = useGlobal();
    const pathCurrent = usePathname();

    const handleToggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        toggleTheme(newTheme);
        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
    }

    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full max-w-7xl mx-auto shrink-0 items-center px-4 lg:px-0 border-t">
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
            </nav>
        </footer>
    );
}