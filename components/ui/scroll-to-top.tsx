"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    // IO sentinel: placed at ~500px from top. When it leaves viewport, show button.
    useEffect(() => {
        const sentinel = document.createElement("div");
        sentinel.style.cssText =
            "position:absolute;top:500px;left:0;width:1px;height:1px;pointer-events:none;";
        document.body.prepend(sentinel);
        sentinelRef.current = sentinel;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Sentinel is at 500px. If not intersecting, user scrolled past 500px.
                setIsVisible(!entry.isIntersecting);
            },
            { threshold: 1.0 }
        );
        observer.observe(sentinel);

        return () => {
            observer.disconnect();
            sentinel.remove();
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.2 }}
                    onClick={scrollToTop}
                    className={cn(
                        "fixed bottom-8 right-8 z-50 p-3 rounded-full",
                        "bg-card/90 dark:bg-card/80 backdrop-blur-2xl border border-border",
                        "text-foreground shadow-lg shadow-black/10 dark:shadow-black/30",
                        "hover:bg-primary/10 hover:border-primary/30",
                        "transition-all duration-300 group hidden md:flex"
                    )}
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
