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
import { useUser } from "@/hooks/useUser"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Skeleton } from "../ui/skeleton"
import Link from "next/link"
import { cn } from "@/lib/utils"

const STATS = [
    { icon: Coins, text: '$10,000' },
    { icon: TrendingUp, text: '5' },
    { icon: Award, text: '100' }
]

export default function HeaderProtected() {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [isSearchExpanded, setIsSearchExpanded] = useState(false)

    const supabase = createClientComponentClient()
    const router = useRouter()
    const pathname = usePathname()

    const { data, error, isLoading } = useUser(null, 'id, company_avatar, company_name')

    const MENU_ITEMS = [
        { icon: <Bell className="h-4 w-4 mr-2" />, text: 'Notificaciones', func: () => { }, href: '/notifications' },
        { icon: <Settings className="h-4 w-4 mr-2" />, text: 'Configuración', func: () => { }, href: '/settings' },
        { icon: <LogOut className="h-4 w-4 mr-2" />, text: 'Cerrar Sesión', func: async () => { await handleLogout(); router.push('/'); } },
    ]

    // Funcion para el Logout
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut()

            if (error) {
                throw error
            }

            router.push('/auth')
            router.refresh()

        } catch (error) {
            console.error('Error al cerrar sesión:', error)
        }
    }

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
                                {isLoading
                                    ? <Skeleton className="h-8 w-20 rounded-md object-cover" />
                                    : (error
                                        ? <Skeleton className="h-8 w-20 rounded-full object-cover" />
                                        : (
                                            <Button variant="ghost" className="flex items-center border-2 border-zinc-700 px-6">
                                                {data?.company_avatar
                                                    ? <img src={data.company_avatar} alt="avatar_profile" className="h-6 w-6 rounded-full object-cover" />
                                                    : <User className="h-8 w-8 border-gray-600" />
                                                }
                                                <ChevronDown className="h-4 w-4 ml-1" />
                                            </Button>
                                        )
                                    )
                                }
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    {data?.company_name || 'Perfil de Usuario'}
                                </DropdownMenuLabel>
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
                                {MENU_ITEMS.map(({ icon, text, func, href }) => (
                                    <DropdownMenuItem key={text} onClick={func} className="cursor-pointer">
                                        <Link
                                            href={href || '#'}
                                            className={cn(
                                                "flex items-center space-x-2",
                                                (pathname === href) && 'opacity-50 pointer-events-none'
                                            )}
                                        >
                                            {icon}
                                            <span>{text}</span>
                                        </Link>
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