'use client'

import { Map, Warehouse, MessageSquare, TrendingUp } from 'lucide-react'

export default function FooterProtected() {
    return (
        <footer className="w-full border-t">
            <div className="flex gap-2 py-4 w-full max-w-7xl mx-auto shrink-0 items-center justify-center px-4 xl:px-0">
                <div className="flex justify-around gap-12">
                    <Map className="h-6 w-6" />
                    <Warehouse className="h-6 w-6" />
                    <MessageSquare className="h-6 w-6" />
                    <TrendingUp className="h-6 w-6" />
                </div>
            </div>
        </footer>
    )
}