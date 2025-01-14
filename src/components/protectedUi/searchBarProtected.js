'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function SearchBar({ isMobile, isExpanded, onToggle = () => { }, onSearch = () => { } }) {
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
        <div ref={barRef} className="w-full flex items-center justify-start">
            <div className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${isExpanded || !isMobile ? 'w-full lg:max-w-80' : 'w-10'
                }`}>
                {isMobile && !isExpanded ? (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden ml-auto"
                        onClick={() => onToggle(true)}
                        aria-label="Open search"
                    >
                        <Search className="h-6 w-6" />
                    </Button>
                ) : (
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center gap-2 w-full"
                    >
                        <div className="relative flex-1">
                            <Input
                                ref={inputRef}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="type to search..."
                                className="px-4 py-0 dark:bg-zinc-800 dark:text-gray-100 focus-visible:ring-0"
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
                        {isMobile && (
                            <button
                                type="button"
                                onClick={() => onToggle(false)}
                                className="text-blue-300 hover:text-blue-400 text-sm whitespace-nowrap"
                                aria-label="Close search"
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}