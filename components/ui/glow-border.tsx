"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface GlowBorderProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    animate?: boolean;
    duration?: number;
    borderRadius?: string;
}

export function GlowBorder({
    children,
    className,
    containerClassName,
    animate = true,
    duration = 4,
    borderRadius = "1rem",
}: GlowBorderProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden p-[1px]",
                containerClassName
            )}
            style={{ borderRadius }}
        >
            {/* Animated gradient border */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(90deg, 
            transparent, 
            rgba(59, 130, 246, 0.8), 
            rgba(34, 211, 238, 0.8), 
            rgba(59, 130, 246, 0.8), 
            transparent
          )`,
                    backgroundSize: "200% 100%",
                    borderRadius,
                }}
                animate={
                    animate
                        ? {
                            backgroundPosition: ["200% 0", "-200% 0"],
                        }
                        : undefined
                }
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Inner content */}
            <div
                className={cn("relative bg-background", className)}
                style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
            >
                {children}
            </div>
        </div>
    );
}

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: "light" | "medium" | "strong";
}

export function GlassCard({
    children,
    className,
    intensity = "medium",
}: GlassCardProps) {
    const intensityStyles = {
        light: "bg-card/40 backdrop-blur-md",
        medium: "bg-card/60 backdrop-blur-xl",
        strong: "bg-card/80 backdrop-blur-2xl",
    };

    return (
        <div
            className={cn(
                "rounded-2xl border border-border/50 p-6",
                intensityStyles[intensity],
                className
            )}
        >
            {children}
        </div>
    );
}
