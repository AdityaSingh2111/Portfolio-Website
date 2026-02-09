"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfilePhotoProps {
    className?: string;
}

export function ProfilePhoto({ className }: ProfilePhotoProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
        stiffness: 300,
        damping: 30,
    });

    // Cursor glow tracking
    const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), {
        stiffness: 500,
        damping: 50,
    });
    const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), {
        stiffness: 500,
        damping: 50,
    });

    // Parallax scroll
    const { scrollY } = useScroll();
    const parallaxY = useTransform(scrollY, [0, 500], [0, 50]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={cn(
                "relative w-[280px] h-[350px] md:w-[320px] md:h-[400px] lg:w-[360px] lg:h-[450px]",
                "will-change-transform",
                className
            )}
            style={{
                rotateX,
                rotateY,
                y: parallaxY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            {/* Liquid Glass Frame */}
            <div
                className={cn(
                    "relative w-full h-full rounded-3xl overflow-hidden",
                    "bg-[hsl(var(--card-glass))] backdrop-blur-xl",
                    "border border-[hsl(var(--border))]",
                    "transition-all duration-400 group"
                )}
                style={{
                    boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px inset rgba(255, 255, 255, 0.05)", // Default (Mobile)
                }}
            >
                {/* Desktop Hover Shadow (Only applies on lg screens) */}
                <div
                    className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px inset rgba(255, 255, 255, 0.1)"
                    }}
                />

                {/* Specular Highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none z-30" />

                {/* Cursor-tracked glow (Desktop Only) */}
                <motion.div
                    className="hidden lg:block absolute inset-0 pointer-events-none z-20 rounded-3xl"
                    style={{
                        background: `radial-gradient(400px circle at ${glowX.get()}% ${glowY.get()}%, hsl(var(--primary) / 0.15), transparent 50%)`,
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.4s ease",
                    }}
                />

                {/* Glass Refraction Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-20 opacity-30"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
                    }}
                />

                {/* The Photo */}
                <div className="relative w-full h-full">
                    <Image
                        src="/profile.jpg"
                        alt="Aditya Kumar - Business Development Team Leader"
                        fill
                        sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 360px"
                        className="object-cover object-center"
                        priority
                    />
                </div>

                {/* Inner Border Glow */}
                <div className="absolute inset-[1px] rounded-[23px] border border-white/5 pointer-events-none z-30" />

                {/* Noise Texture */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none z-30 rounded-3xl"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        mixBlendMode: "overlay",
                    }}
                />
            </div>
        </motion.div>
    );
}
