'use client'

import { cn } from "@/lib/utils"
import {
    ClipboardList, // Para Summaries
    Calculator,    // Para Accounting
    Users,        // Para Directors
    Wallet,       // Para Finance
    Package,      // Para Goods
    ArrowDownCircle, // Para Incoming
    ArrowUpCircle,   // Para Outgoing
    BarChart2,    // Para Statistics
    FlaskConical  // Para Research
} from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
    {
        icon: ClipboardList,
        href: "/warehouse/summaries",
        label: "Summaries"
    },
    {
        icon: Calculator,
        href: "/warehouse/accounting",
        label: "Accounting"
    },
    {
        icon: Users,
        href: "/warehouse/directors",
        label: "Directors"
    },
    {
        icon: Wallet,
        href: "/warehouse/finance",
        label: "Finance"
    },
    {
        icon: Package,
        href: "/warehouse/goods",
        label: "Goods"
    },
    {
        icon: ArrowDownCircle,
        href: "/warehouse/incoming",
        label: "Incoming"
    },
    {
        icon: ArrowUpCircle,
        href: "/warehouse/outgoing",
        label: "Outgoing"
    },
    {
        icon: BarChart2,
        href: "/warehouse/statistics",
        label: "Statistics"
    },
    {
        icon: FlaskConical,
        href: "/warehouse/research",
        label: "Research"
    }
]


export default function FooterWarehouse() {
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