'use client';

import useGlobal from "@/hooks/useGlobal";
import { Loader } from "lucide-react";
import { useEffect } from "react";

export default function LoadingContent({ children }) {

    const { loading, toggleLoading } = useGlobal();

    // Desactivar el loading al cargar la página
    useEffect(() => {
        toggleLoading(false);
    }, [toggleLoading, loading]);

    return (
        loading
            ? <div className="flex justify-center items-center min-h-screen"><Loader className="animate-spin" /></div>
            : children
    );
}