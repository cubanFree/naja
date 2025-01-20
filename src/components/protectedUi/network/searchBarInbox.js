'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { SearchIcon } from "lucide-react";

export default function SearchBarInbox({ isMobile, isExpanded, onToggle = () => { }, onSearch = () => { } }) {
    const barRef = useRef(null);
    const inputRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isExpanded]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (barRef.current && !barRef.current.contains(event.target)) {
                onToggle(false);
            }
        };

        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isExpanded, onToggle]);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleReset = () => {
        setSearchTerm('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div ref={barRef} className="w-full max-w-7xl mx-auto py-4 px-4 xl:px-0">
            <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 w-full"
            >
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                    <Input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="buscar contacto o grupo..."
                        className="px-4 py-2 pl-10 text-sm dark:bg-zinc-800 dark:text-gray-100 focus-visible:ring-0"
                        aria-label="Search input"
                    />
                    {searchTerm && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                            onClick={handleReset}
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}