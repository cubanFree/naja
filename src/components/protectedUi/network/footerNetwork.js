'use client'

import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import { InboxIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooterNetwork() {

    const pathname = usePathname()

    return (
        <footer className="w-full max-w-7xl mx-auto border-t border-x flex items-center justify-center gap-12 py-4">
            <Link
                href="/network/inbox"
                className={cn(
                    "hover:opacity-50",
                    (pathname === '/network/inbox') && 'opacity-50 pointer-events-none'
                )}
            >
                <InboxIcon className="h-6 w-6" />
            </Link>
            <Link
                href="/network/social-posts"
                className={cn(
                    "hover:opacity-50",
                    (pathname === '/network/social-posts') && 'opacity-50 pointer-events-none'
                )}
            >
                <MessageSquare className="h-6 w-6" />
            </Link>
        </footer>
    )
}