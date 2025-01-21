'use client'

import { cn } from "@/lib/utils"
import { LineChart, BookText, Wallet, Building2, LandmarkIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
    {
        href: "/traders/assets",
        icon: BookText,
        label: "Assets"
    },
    {
        href: "/traders/agreement",
        icon: Wallet,
        label: "Agreement"
    },
    {
        href: "/traders/bonds",
        icon: Building2,
        label: "Bonds"
    },
    {
        href: "/traders/graphics",
        icon: LineChart,
        label: "Graphics"
    },
    {
        href: "/traders/government",
        icon: LandmarkIcon,
        label: "Government"
    }
]

export default function FooterTraders() {
    const pathname = usePathname()

    return (
        <footer className="w-full max-w-7xl mx-auto border-t border-x flex items-center justify-center gap-12 py-4">
            {navigationItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    aria-label={item.label}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={cn(
                        "hover:opacity-50",
                        (pathname === item.href) && 'opacity-50 pointer-events-none'
                    )}
                >
                    <item.icon className="h-6 w-6" />
                </Link>
            ))}
        </footer>
    )
}