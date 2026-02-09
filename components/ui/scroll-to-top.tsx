"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
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
                        "bg-[hsl(var(--card-glass))] backdrop-blur-md border border-[hsl(var(--border))]",
                        "text-foreground shadow-lg hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
                        "hover:bg-[hsl(var(--primary)/0.1)] hover:border-[hsl(var(--primary)/0.3)]",
                        "transition-all duration-300 group hidden md:flex" // Hidden on mobile as requested "on pc"
                    )}
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
