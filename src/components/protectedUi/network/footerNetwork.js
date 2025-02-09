'use client'

import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import { InboxIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
    {
        href: "/network/inbox",
        icon: InboxIcon,
        label: "Inbox"
    },
    {
        href: "/network/social-posts",
        icon: MessageSquare,
        label: "Social Posts"
    }
]

export default function FooterNetwork() {

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