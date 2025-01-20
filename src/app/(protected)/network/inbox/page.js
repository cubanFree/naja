'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from 'lucide-react'
import SearchBarInbox from "@/components/protectedUi/network/searchBarInbox"
import { User2Icon } from "lucide-react"
import { UsersIcon } from "lucide-react"
import { LockIcon } from "lucide-react"
import { ArrowDown } from "lucide-react"

const individualChats = [
    { id: '1', name: 'Alice Johnson', lastMessage: 'See you tomorrow!', avatar: 'https://i.pravatar.cc/150?img=1', unread: 0 },
    { id: '2', name: 'Bob Smith', lastMessage: 'How about lunch?', avatar: 'https://i.pravatar.cc/150?img=2', unread: 2 },
    { id: '3', name: 'Carol White', lastMessage: 'The project is done', avatar: 'https://i.pravatar.cc/150?img=3', unread: 1 },
]

const groupChats = [
    { id: '4', name: 'Project Team', lastMessage: 'Meeting at 3 PM', avatar: 'https://i.pravatar.cc/150?img=4', unread: 5 },
    { id: '5', name: 'Family Group', lastMessage: 'Happy birthday!', avatar: 'https://i.pravatar.cc/150?img=5', unread: 0 },
]

const messages = [
    { id: '1', sender: 'Alice Johnson', content: 'Hi there! How are you doing?', timestamp: '10:00 AM' },
    { id: '2', sender: 'You', content: 'Hey Alice! I\'m doing great, thanks for asking. How about you?', timestamp: '10:05 AM' },
    { id: '3', sender: 'Alice Johnson', content: 'I\'m good too! Just wanted to confirm our meeting for tomorrow.', timestamp: '10:10 AM' },
    { id: '4', sender: 'You', content: 'I have it in my calendar. See you tomorrow at 2 PM.', timestamp: '10:15 AM' },
    { id: '5', sender: 'Alice Johnson', content: 'Perfect! See you tomorrow!', timestamp: '10:20 AM' },
    { id: '6', sender: 'You', content: 'Great! See you then.', timestamp: '10:25 AM' },
    { id: '7', sender: 'Alice Johnson', content: 'See you later!', timestamp: '10:30 AM' },
    { id: '8', sender: 'You', content: 'Goodbye!', timestamp: '10:35 AM' },
    { id: '9', sender: 'Alice Johnson', content: 'See you soon!', timestamp: '10:40 AM' },
    { id: '10', sender: 'You', content: 'Bye!', timestamp: '10:45 AM' },
    { id: '11', sender: 'Alice Johnson', content: 'See you later!', timestamp: '10:50 AM' },
    { id: '12', sender: 'You', content: 'Goodbye!', timestamp: '10:55 AM' },
]

export default function Inbox() {
    const [activeChat, setActiveChat] = useState(individualChats[0])
    const [searchTerm, setSearchTerm] = useState('')
    const [newMessage, setNewMessage] = useState('')

    const scrollAreaRef = useRef(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const filteredIndividualChats = individualChats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const filteredGroupChats = groupChats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
        setShowScrollButton(!isNearBottom);
    };

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    // Efecto para hacer scroll automático cuando llegan nuevos mensajes
    useEffect(() => {
        if (!showScrollButton) {
            scrollToBottom();
        }
    }, [messages]); // Se ejecuta cuando cambian los mensajes

    return (
        <div className="w-full flex flex-col h-full">
            <SearchBarInbox onToggle={() => { }} onSearch={() => { }} />
            <div className="flex-1 flex overflow-hidden">
                <div className="w-1/3 border-r flex flex-col h-full">
                    <Tabs defaultValue="individual" className="w-full px-0">
                        <TabsList className="w-full rounded-none overflow-x-hidden">
                            <TabsTrigger value="individual" className="w-1/2">
                                <span className='hidden md:block'>Individuales</span>
                                <User2Icon className='block md:hidden w-5 h-5' />
                            </TabsTrigger>
                            <TabsTrigger value="group" className="w-1/2">
                                <span className='hidden md:block'>Grupo</span>
                                <UsersIcon className='block md:hidden w-5 h-5' />
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="individual">
                            <ScrollArea className="h-full">
                                {filteredIndividualChats.map(chat => (
                                    <Button
                                        key={chat.id}
                                        variant="ghost"
                                        className="w-full justify-center px-4 py-2 h-auto"
                                        onClick={() => setActiveChat(chat)}
                                    >
                                        <Avatar className="h-10 w-10 mr-4">
                                            <AvatarImage src={chat.avatar} alt={chat.name} />
                                            <AvatarFallback>{chat.name.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 text-left hidden sm:block">
                                            <div className="font-semibold">{chat.name}</div>
                                            <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                                        </div>
                                        {chat.unread > 0 && (
                                            <div className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-2 hidden sm:block">
                                                {chat.unread}
                                            </div>
                                        )}
                                    </Button>
                                ))}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="group">
                            <ScrollArea className="h-full">
                                {filteredGroupChats.map(chat => (
                                    <Button
                                        key={chat.id}
                                        variant="ghost"
                                        className="w-full justify-center px-4 py-2 h-auto"
                                        onClick={() => setActiveChat(chat)}
                                    >
                                        <Avatar className="h-10 w-10 mr-4">
                                            <AvatarImage src={chat.avatar} alt={chat.name} />
                                            <AvatarFallback>{chat.name.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 text-left hidden sm:block">
                                            <div className="font-semibold">{chat.name}</div>
                                            <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                                        </div>
                                        {chat.unread > 0 && (
                                            <div className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-2 hidden sm:block">
                                                {chat.unread}
                                            </div>
                                        )}
                                    </Button>
                                ))}
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="flex-1 flex flex-col">
                    {activeChat ? (
                        <>
                            <div className="p-4 border-b flex items-center">
                                <Avatar className="h-10 w-10 mr-4">
                                    <AvatarImage src={activeChat.avatar} alt={activeChat.name} />
                                    <AvatarFallback>{activeChat.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="font-semibold">{activeChat.name}</div>
                            </div>
                            <ScrollArea
                                ref={scrollAreaRef}
                                onScroll={handleScroll}
                                className="flex-1 px-4 relative"
                            >
                                {/* Banner */}
                                <span className="flex justify-center text-center text-sm text-gray-500 py-10 max-w-lg mx-auto">
                                    <LockIcon className="w-4 h-4" />
                                    Messages are end-to-end encrypted. No one outside of this chat,
                                    including ChatGPT, can read or listen to them.
                                </span>

                                {messages.map(message => (
                                    <div key={message.id} className={`mb-4 ${message.sender === 'You' ? 'text-right' : ''}`}>
                                        <div className={`inline-block p-2 rounded-lg ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-800'
                                            }`}>
                                            {message.content}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
                                    </div>
                                ))}

                                {/* Botón de scroll to bottom */}
                                {showScrollButton && (
                                    <button
                                        onClick={scrollToBottom}
                                        className="absolute top-0 left-0 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 flex items-center gap-1"
                                        aria-label="Ir a mensajes recientes"
                                    >
                                        <ArrowDown className="h-4 w-4" />
                                        <span className="text-xs">Nuevos mensajes</span>
                                    </button>
                                )}
                            </ScrollArea>
                            <div className="p-4 flex">
                                <Input
                                    type="text"
                                    placeholder="Escribe un mensaje..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="flex-1 mr-2"
                                />
                                <Button>
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Enviar mensaje</span>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            Selecciona un chat para comenzar
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

