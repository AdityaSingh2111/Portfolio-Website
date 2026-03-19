"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ===================================
   LIQUID GLASS — Single reusable component
   Desktop: uses backdrop-filter (composited)
   Mobile: backdrop-filter disabled for perf
   =================================== */

interface LiquidGlassProps {
    children: ReactNode;
    className?: string;
    /** Backdrop blur in px — 8, 10, or 12 (desktop only) */
    blur?: 8 | 10 | 12;
    /** Show noise texture overlay */
    noise?: boolean;
    /** Show subtle gradient glow overlay */
    glow?: boolean;
    /** Enable hover lift + shadow + border glow interaction */
    hoverable?: boolean;
    /** HTML element to render as */
    as?: "div" | "section" | "article";
}

export function LiquidGlass({
    children,
    className,
    blur = 10,
    noise = true,
    glow = false,
    hoverable = false,
    as: Component = "div",
}: LiquidGlassProps) {
    return (
        <Component
            className={cn(
                "liquid-glass relative rounded-2xl lg:rounded-3xl overflow-hidden",
                "border border-white/[0.08] dark:border-white/[0.06]",
                "bg-white/[0.04] dark:bg-white/[0.03]",
                "transition-colors duration-200",
                hoverable && "hover-card",
                className
            )}
            style={{
                // @ts-expect-error CSS custom property for media query usage
                "--lg-blur": `${blur}px`,
            }}
        >
            {/* Specular highlight — top edge */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            {/* Inner border */}
            <div className="absolute inset-[1px] rounded-[inherit] border border-white/[0.04] pointer-events-none" />

            {/* Low-opacity gradient overlay */}
            {glow && (
                <div
                    className="absolute inset-0 pointer-events-none opacity-60"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)",
                    }}
                />
            )}

            {/* Noise texture */}
            {noise && (
                <div
                    className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-[inherit]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        mixBlendMode: "overlay",
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </Component>
    );
}
