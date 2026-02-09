"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// ===================================
// MOUSE POSITION HOOK
// ===================================

interface MousePosition {
    x: number;
    y: number;
}

export function useMousePosition(): MousePosition {
    const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return position;
}

// ===================================
// LIQUID CARD - 3D Tilt + Cursor Glow
// ===================================

interface LiquidCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: string;
    tiltStrength?: number;
    glowStrength?: number;
    disabled?: boolean;
}

export function LiquidCard({
    children,
    className,
    glowColor = "var(--primary)",
    tiltStrength = 10,
    glowStrength = 0.15,
    disabled = false,
}: LiquidCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Motion values for tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth movement
    const springConfig = { damping: 25, stiffness: 300 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltStrength, -tiltStrength]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltStrength, tiltStrength]), springConfig);

    // Glow position
    const glowX = useMotionValue(50);
    const glowY = useMotionValue(50);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        mouseX.set(x);
        mouseY.set(y);
        glowX.set(((e.clientX - rect.left) / rect.width) * 100);
        glowY.set(((e.clientY - rect.top) / rect.height) * 100);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
        glowX.set(50);
        glowY.set(50);
    };

    return (
        <motion.div
            ref={ref}
            className={cn(
                "relative rounded-3xl overflow-hidden",
                "bg-[hsl(var(--card-glass))] backdrop-blur-xl",
                "border border-[hsl(var(--border))]",
                "transition-colors duration-400",
                "will-change-transform",
                className
            )}
            style={{
                rotateX: disabled ? 0 : rotateX,
                rotateY: disabled ? 0 : rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
                boxShadow: isHovered
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px inset rgba(255, 255, 255, 0.1)"
                    : "0 10px 30px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px inset rgba(255, 255, 255, 0.05)",
                transition: "box-shadow 0.4s ease, transform 0.1s ease",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            whileHover={{
                borderColor: "rgba(255, 255, 255, 0.2)",
                transition: { duration: 0.3 }
            }}
        >
            {/* Noise texture - Refined opacity */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-3xl z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    mixBlendMode: "overlay",
                }}
            />

            {/* Specular Highlight - Top Edge */}
            <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 pointer-events-none z-20"
            />

            {/* Inner Border Glow */}
            <div
                className="absolute inset-[1px] rounded-[23px] border border-white/5 pointer-events-none z-20"
            />

            {/* Cursor-tracked glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none rounded-3xl z-0"
                style={{
                    background: `radial-gradient(800px circle at ${glowX.get()}% ${glowY.get()}%, hsl(${glowColor} / ${glowStrength}), transparent 40%)`,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                }}
            />

            {/* Edge highlight */}
            <motion.div
                className="absolute inset-0 pointer-events-none rounded-3xl z-10"
                style={{
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    background: `linear-gradient(135deg, hsl(var(--primary) / 0.1), transparent 50%, hsl(var(--electric-cyan) / 0.1))`,
                }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

// ===================================
// GLASS PANEL - Simple glass surface
// ===================================

interface GlassPanelProps {
    children: ReactNode;
    className?: string;
    intensity?: "light" | "medium" | "heavy";
}

export function GlassPanel({
    children,
    className,
    intensity = "medium",
}: GlassPanelProps) {
    const blurMap = {
        light: "backdrop-blur-sm",
        medium: "backdrop-blur-lg",
        heavy: "backdrop-blur-xl",
    };

    const bgMap = {
        light: "bg-white/[0.02]",
        medium: "bg-white/[0.04]",
        heavy: "bg-white/[0.06]",
    };

    return (
        <div
            className={cn(
                "relative rounded-3xl overflow-hidden",
                blurMap[intensity],
                bgMap[intensity],
                "border border-[hsl(var(--border))]",
                className
            )}
        >
            {/* Noise texture */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// ===================================
// SPOTLIGHT - Cursor following light
// ===================================

export function Spotlight({ className }: { className?: string }) {
    const mousePosition = useMousePosition();

    return (
        <div
            className={cn(
                "pointer-events-none fixed inset-0 z-30 transition-opacity duration-300",
                className
            )}
            style={{
                background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.03), transparent 40%)`,
            }}
        />
    );
}
