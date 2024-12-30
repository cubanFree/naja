'use client'

import { useState, useEffect } from 'react'
import { User, Bell, Settings, Menu, Coins, TrendingUp, Award, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SearchBar from './searchBarProtected'
import { LogOut } from "lucide-react"
import { logOut } from "@/lib/auth"
import { useUser } from "@/hooks/useUser"

const STATS = [
    { icon: Coins, text: '$10,000' },
    { icon: TrendingUp, text: '5' },
    { icon: Award, text: '100' }
]

export default function HeaderProtected() {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [isSearchExpanded, setIsSearchExpanded] = useState(false)

    const { user, isError, isLoading } = useUser()

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <header className="w-full border-b">
            <div className="px-4 xl:px-0 flex items-center w-full max-w-7xl mx-auto py-4 gap-12">

                {/* Menu y SearchBar */}
                <div className="w-full flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                    <SearchBar
                        isMobile={isMobile}
                        isExpanded={isSearchExpanded}
                        onToggle={() => setIsSearchExpanded(!isSearchExpanded)}
                    />
                </div>


                {/* Propiedades y Perfil */}
                {(!isMobile || !isSearchExpanded) && (
                    <div className="flex items-center space-x-8">
                        {!isMobile && (
                            <div className="flex items-center space-x-8">
                                {STATS.map(({ icon: Icon, text }) => (
                                    <div key={text} className="flex items-center space-x-2">
                                        <Icon className="h-4 w-4" />
                                        <span>{text}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center border-2 border-zinc-700">
                                    <User className="h-6 w-6 rounded-full border border-gray-600" />
                                    <ChevronDown className="h-4 w-4 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Perfil de Usuario</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {isMobile && (
                                    <>
                                        <DropdownMenuItem>
                                            <div className="flex flex-col space-y-2">
                                                {STATS.map(({ icon: Icon, text }) => (
                                                    <div key={text} className="flex items-center space-x-2">
                                                        <Icon className="h-4 w-4" />
                                                        <span>{text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                    </>
                                )}
                                {[
                                    { icon: Bell, text: 'Notificaciones', func: () => { } },
                                    { icon: Settings, text: 'Configuración', func: () => { } },
                                    { icon: LogOut, text: 'Cerrar Sesión', func: async () => { await logOut(); window.location.href = '/'; } },
                                ].map(({ icon: Icon, text, func }) => (
                                    <DropdownMenuItem key={text} onClick={func}>
                                        <Icon className="h-4 w-4 mr-2" />
                                        <span>{text}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

            </div>
        </header>
    )
}