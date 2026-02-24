"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfilePhotoProps {
    className?: string;
}

export function ProfilePhoto({ className }: ProfilePhotoProps) {
    return (
        <div
            className={cn(
                "relative w-[280px] h-[350px]",
                className
            )}
        >
            {/* Glass frame */}
            <div
                className={cn(
                    "relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden",
                    "bg-[hsl(var(--card-glass))]",
                    "border border-[hsl(var(--border))]",
                    "shadow-lg shadow-black/10 dark:shadow-black/30",
                    "hover-lift"
                )}
            >
                {/* Specular highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-20" />

                {/* Glass refraction overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-20 opacity-20"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)",
                    }}
                />

                {/* Photo */}
                <div className="relative w-full h-full">
                    <Image
                        src="/profile.jpg"
                        alt="Aditya Kumar — Frontend Developer"
                        fill
                        sizes="(max-width: 768px) 160px, (max-width: 1024px) 280px, 320px"
                        className="object-cover object-center"
                        priority
                    />
                </div>

                {/* Inner border */}
                <div className="absolute inset-[1px] rounded-[inherit] border border-white/[0.04] pointer-events-none z-20" />

                {/* Noise */}
                <div
                    className="absolute inset-0 opacity-[0.025] pointer-events-none z-20 rounded-[inherit]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        mixBlendMode: "overlay",
                    }}
                />
            </div>
        </div>
    );
}
