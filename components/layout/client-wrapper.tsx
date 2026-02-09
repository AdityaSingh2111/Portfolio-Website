"use client";

import { useEffect, useState } from "react";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Clean up any potential hydration mismatches by ensuring we only 
        // render strict client-side logic after mount if needed.

        // Register Service Worker for PWA
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(
                    (registration) => {
                        console.log('ServiceWorker registration successful');
                    },
                    (err) => {
                        console.log('ServiceWorker registration failed: ', err);
                    }
                );
            });
        }
    }, []);

    // Global Error Handler for ChunkLoadError
    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            const error = event.error;
            if (
                error?.name === "ChunkLoadError" ||
                error?.message?.includes("Loading chunk") ||
                error?.message?.includes("undefined is not an object (evaluating 'e.length')")
            ) {
                // If a chunk fails to load, reload the page to get fresh chunks
                if (!sessionStorage.getItem("chunk_reload")) {
                    sessionStorage.setItem("chunk_reload", "true");
                    window.location.reload();
                }
            }
        };

        window.addEventListener("error", handleError);
        return () => window.removeEventListener("error", handleError);
    }, []);

    // Clear reload flag on successful load
    useEffect(() => {
        if (sessionStorage.getItem("chunk_reload")) {
            sessionStorage.removeItem("chunk_reload");
        }
    }, []);

    return <>{children}</>;
}
