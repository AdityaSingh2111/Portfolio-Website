"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Responsive Theme Toggle - works on all devices
export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isOpen]);

    if (!mounted) {
        return <div className={cn("w-10 h-10", className)} />;
    }

    const options = [
        { label: "Light", value: "light", icon: Sun, color: "text-amber-500" },
        { label: "Dark", value: "dark", icon: Moon, color: "text-blue-400" },
        { label: "System", value: "system", icon: Laptop, color: "text-muted-foreground" },
    ];

    const CurrentIcon = resolvedTheme === "dark" ? Moon : Sun;
    const currentColor = resolvedTheme === "dark" ? "text-blue-400" : "text-amber-500";

    return (
        <div ref={dropdownRef} className={cn("relative", className)}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full",
                    "bg-card/80 hover:bg-card",
                    "transition-all duration-200 backdrop-blur-md",
                    "border border-border shadow-sm hover:shadow-md",
                    "touch-manipulation"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Toggle theme"
                aria-expanded={isOpen}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={resolvedTheme}
                        initial={{ opacity: 0, rotate: -90, scale: 0 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <CurrentIcon className={cn("h-5 w-5", currentColor)} />
                    </motion.div>
                </AnimatePresence>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Dropdown menu */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -5 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className={cn(
                                "absolute right-0 top-full mt-2",
                                "w-36 rounded-xl overflow-hidden",
                                "bg-card/95 backdrop-blur-xl",
                                "border border-border shadow-xl",
                                "z-[100] p-1"
                            )}
                        >
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setTheme(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-lg",
                                        "transition-colors duration-150 relative",
                                        "touch-manipulation", // Better touch response
                                        theme === option.value
                                            ? "bg-primary/10 text-foreground font-medium"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 active:bg-muted"
                                    )}
                                >
                                    <option.icon className={cn("h-4 w-4", theme === option.value && option.color)} />
                                    {option.label}
                                    {theme === option.value && (
                                        <motion.div
                                            layoutId="active-theme-indicator"
                                            className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary"
                                        />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
