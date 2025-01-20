'use client'

import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { Repeat2 } from "lucide-react";
import { Heart } from "lucide-react";
import { useState, useRef } from "react";
import avatar_default from "@/assets/avatar_default.webp";
import { ArrowUp } from "lucide-react";

export default function Home() {
    const [tab, setTab] = useState("para-ti");
    const [showScrollButton, setShowScrollButton] = useState(false);
    const textareaRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollTop = scrollContainerRef.current.scrollTop;
            setShowScrollButton(scrollTop > 200);
        }
    };

    const scrollToTop = () => {
        scrollContainerRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto overflow-hidden border-x relative">

            {/* Botón de scroll to top */}
            {showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="absolute bottom-5 right-5 p-1 bg-gray-700 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 z-50"
                >
                    <ArrowUp size={20} />
                </button>
            )}

            {/* TabBar */}
            <div className="flex justify-between items-center p-2 border-b text-gray-600">
                <button
                    className={cn(
                        'text-md px-6 py-2 w-full text-center',
                        (tab === "para-ti") && "font-bold border-b-2 border-blue-500 text-white"
                    )}
                    onClick={() => setTab("para-ti")}
                >
                    Para ti
                </button>
                <button
                    className={cn(
                        'text-md px-6 py-2 w-full text-center',
                        (tab === "following") && "font-bold border-b-2 border-blue-500 text-white"
                    )}
                    onClick={() => setTab("following")}
                >
                    Following
                </button>
            </div>

            {/* Sección de Posts */}
            <div
                className="flex-1 overflow-y-auto bg-transparent [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                ref={scrollContainerRef}
                onScroll={handleScroll}
            >

                {/* ¿Qué estás pensando? */}
                <div className="flex flex-col gap-2 p-4 border-b">
                    <textarea
                        ref={textareaRef}
                        className="w-full bg-transparent resize-none overflow-hidden min-h-[40px] focus:outline-none"
                        placeholder="¿Qué estás pensando?"
                        autoFocus={false}
                        onChange={adjustTextareaHeight}
                        rows={1}
                    ></textarea>
                    <div className="flex justify-end w-full">
                        <button className="px-4 py-2 dark:bg-gray-100 dark:text-black rounded-lg">Publicar</button>
                    </div>
                </div>

                {[...Array(10)].map((_, index) => {
                    return (
                        <>
                            {/* Estructura del Post */}
                            < div className="flex gap-3 p-4 border-b" >
                                {/* Avatar */}
                                < div className="flex-shrink-0" >
                                    <img
                                        src={avatar_default}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </div>

                                {/* Contenido Principal */}
                                <div className="flex-1">
                                    {/* Cabecera: Nombre, Usuario y Fecha */}
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold">Nombre</span>
                                        <span className="text-gray-500">@usuario</span>
                                        <span className="text-gray-500">·</span>
                                        <span className="text-gray-500">2h</span>
                                    </div>

                                    {/* Contenido del Mensaje */}
                                    <div className="mb-3">
                                        Este es el contenido del mensaje. Puede ser tan largo como se necesite y se ajustará automáticamente.
                                    </div>

                                    {/* Botones de Interacción */}
                                    <div className="flex gap-6">
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-red-500">
                                            <Heart size={18} /> <span>24</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-green-500">
                                            <Repeat2 size={18} /> <span>5</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
                                            <MessageCircle size={18} /> <span>Enviar mensaje</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}

            </div>
        </div>
    );
}