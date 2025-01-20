'use client'

import { cn } from "@/lib/utils"
import { Globe } from "lucide-react"
import { Map, Warehouse, MessageSquare, TrendingUp } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function FooterProtected() {

    const pathname = usePathname()

    const RUTES = [
        { icon: <Map className="h-6 w-6" />, text: 'Mapa', href: '/home' },
        { icon: <Warehouse className="h-6 w-6" />, text: 'Almacenes', href: '/warehouse' },
        { icon: <Globe className="h-6 w-6" />, text: 'Network', href: '/network' },
        { icon: <TrendingUp className="h-6 w-6" />, text: 'Tendencias', href: '/traders' },
    ]

    return (
        <footer className="w-full border-t">
            <div className="flex gap-2 py-4 w-full max-w-7xl mx-auto shrink-0 items-center justify-center px-4 xl:px-0">
                <div className="flex justify-around gap-12">
                    {RUTES.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "hover:opacity-50",
                                    (pathname.startsWith(item.href)) && 'opacity-50 pointer-events-none'
                                )}
                            >
                                {item.icon}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </footer>
    )
}