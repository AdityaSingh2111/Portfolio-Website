"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Download, ArrowRight, Share2, X } from "lucide-react";
import { ProfilePhoto } from "@/components/ui/profile-photo";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import { cn } from "@/lib/utils";

/* ─── Status Badge ─── */
function StatusBadge({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
                "bg-emerald-500/10 dark:bg-emerald-500/15",
                "border border-emerald-500/30 dark:border-emerald-500/20",
                "backdrop-blur-sm shadow-sm",
                className
            )}
        >
            <span className="relative flex h-2 w-2">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase">
                Available for work
            </span>
        </div>
    );
}

/* ─── iOS Install Modal ─── */
function IOSInstallModal({ onClose }: { onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                    "relative w-full max-w-sm p-6 rounded-2xl",
                    "bg-card border border-border",
                    "shadow-2xl"
                )}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10">
                        <Share2 className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                        Install App
                    </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-1">
                    To install this app on your device:
                </p>
                <ol className="text-sm text-muted-foreground space-y-2 mt-3">
                    <li className="flex items-start gap-2">
                        <span className="font-semibold text-foreground shrink-0">1.</span>
                        <span>
                            Tap the{" "}
                            <span className="font-medium text-foreground">Share</span>{" "}
                            button in your browser
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="font-semibold text-foreground shrink-0">2.</span>
                        <span>
                            Scroll down and tap{" "}
                            <span className="font-medium text-foreground">
                                &ldquo;Add to Home Screen&rdquo;
                            </span>
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="font-semibold text-foreground shrink-0">3.</span>
                        <span>
                            Tap{" "}
                            <span className="font-medium text-foreground">Add</span>
                        </span>
                    </li>
                </ol>
            </motion.div>
        </motion.div>
    );
}

/* ─── Animation variants (static — not re-created per render) ─── */
const heroContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
};

const heroItem = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
};

const heroFadeIn = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { duration: 0.3, delay: 0.6 },
    },
};

/* ─── Hero Section ─── */
export function Hero() {
    const { isInstallable, isInstalled, isIOS, promptInstall } = usePWAInstall();
    const [showIOSModal, setShowIOSModal] = useState(false);

    const handleInstallClick = async () => {
        if (isIOS) {
            setShowIOSModal(true);
        } else {
            await promptInstall();
        }
    };

    return (
        <section
            id="hero"
            className="relative min-h-[100dvh] flex items-center overflow-hidden bg-background"
        >
            {/* Minimal background — noise only, no blobs/gradient orbs */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Light mode subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-background to-background dark:hidden" />

                {/* Grain noise */}
                <div
                    className="absolute inset-0 opacity-[0.025] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Corner metadata — desktop only */}
            <motion.div
                variants={heroFadeIn}
                initial="hidden"
                animate="show"
                className="hidden lg:block absolute top-8 left-8 xl:top-12 xl:left-12"
            >
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-1">
                    Frontend Developer
                </p>
                <p className="text-sm text-foreground font-semibold tracking-wide">
                    React · Next.js · TypeScript
                </p>
            </motion.div>

            <motion.div
                variants={heroFadeIn}
                initial="hidden"
                animate="show"
                className="hidden lg:flex absolute top-8 right-8 xl:top-12 xl:right-12 items-center gap-2.5 text-muted-foreground"
            >
                <div className="p-1.5 rounded-full bg-secondary/50 border border-border backdrop-blur-sm">
                    <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.15em]">
                    New Delhi, India
                </span>
            </motion.div>

            <motion.div
                variants={heroFadeIn}
                initial="hidden"
                animate="show"
                className="hidden lg:block absolute bottom-8 left-8 xl:bottom-12 xl:left-12"
            >
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-1">
                    Currently at
                </p>
                <p className="text-base text-primary font-bold tracking-wide">
                    VRL Logistics
                </p>
            </motion.div>

            {/* Main content — asymmetric 60/40 layout */}
            <motion.div
                variants={heroContainer}
                initial="hidden"
                animate="show"
                className="relative z-10 container-main w-full py-24 md:py-0"
            >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
                    {/* Left — Text content (dominant) */}
                    <div className="text-center lg:text-left order-2 lg:order-1 max-w-2xl mx-auto lg:mx-0">
                        {/* Mobile: photo + badge */}
                        <motion.div
                            variants={heroItem}
                            className="lg:hidden flex flex-col items-center mb-6"
                        >
                            <StatusBadge className="mb-4" />
                            <ProfilePhoto className="w-[140px] h-[175px] sm:w-[160px] sm:h-[200px]" />
                        </motion.div>

                        {/* Desktop: badge */}
                        <motion.div
                            variants={heroItem}
                            className="hidden lg:block mb-6"
                        >
                            <StatusBadge />
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            variants={heroItem}
                            className="text-fluid-hero font-bold tracking-tighter text-foreground leading-[0.95] mb-2 lg:mb-3"
                        >
                            ADITYA
                            <br />
                            <span className="text-primary">KUMAR</span>
                        </motion.h1>

                        {/* Role — static, no typewriter */}
                        <motion.p
                            variants={heroItem}
                            className="text-fluid-lg text-muted-foreground font-light tracking-wide mb-4 lg:mb-6"
                        >
                            Frontend Developer &amp; React Specialist
                        </motion.p>

                        {/* Summary — desktop only */}
                        <motion.p
                            variants={heroItem}
                            className="hidden lg:block text-base text-muted-foreground max-w-lg leading-relaxed mb-8"
                        >
                            Building performant web applications with{" "}
                            <span className="text-foreground font-medium">React, Next.js, and TypeScript</span>.
                            Shipping production code, leading teams, and solving real engineering problems.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={heroItem}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
                        >
                            {/* Primary: Download App (PWA) */}
                            {!isInstalled && isInstallable && (
                                <button
                                    onClick={handleInstallClick}
                                    className={cn(
                                        "press group relative px-6 py-3 rounded-full",
                                        "bg-primary text-primary-foreground font-semibold",
                                        "transition-colors duration-200",
                                        "hover:bg-primary/90",
                                        "flex items-center gap-2"
                                    )}
                                >
                                    <Download className="h-4 w-4" />
                                    Download App
                                </button>
                            )}

                            {/* If already installed, show resume download as primary */}
                            {isInstalled && (
                                <a
                                    href="/resume.pdf"
                                    download="Aditya_Kumar_Resume.pdf"
                                    className={cn(
                                        "press group relative px-6 py-3 rounded-full",
                                        "bg-primary text-primary-foreground font-semibold",
                                        "transition-colors duration-200",
                                        "hover:bg-primary/90",
                                        "flex items-center gap-2"
                                    )}
                                >
                                    <Download className="h-4 w-4" />
                                    Download Resume
                                </a>
                            )}

                            {/* If PWA not supported and not installed, show resume as primary */}
                            {!isInstalled && !isInstallable && (
                                <a
                                    href="/resume.pdf"
                                    download="Aditya_Kumar_Resume.pdf"
                                    className={cn(
                                        "press group relative px-6 py-3 rounded-full",
                                        "bg-primary text-primary-foreground font-semibold",
                                        "transition-colors duration-200",
                                        "hover:bg-primary/90",
                                        "flex items-center gap-2"
                                    )}
                                >
                                    <Download className="h-4 w-4" />
                                    Download Resume
                                </a>
                            )}

                            {/* Secondary CTA */}
                            <a
                                href="#about"
                                className={cn(
                                    "press px-6 py-3 rounded-full",
                                    "border border-border text-foreground font-medium",
                                    "hover:border-primary/50 hover:bg-primary/5",
                                    "transition-all duration-200",
                                    "flex items-center gap-2"
                                )}
                            >
                                View My Work
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Right — Profile photo (desktop) */}
                    <motion.div
                        variants={heroItem}
                        className="hidden lg:flex justify-end order-1 lg:order-2"
                    >
                        <ProfilePhoto className="lg:w-[280px] lg:h-[350px] xl:w-[320px] xl:h-[400px]" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: 2,
                        ease: "easeInOut",
                    }}
                    className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
                >
                    <motion.div className="w-1 h-1.5 rounded-full bg-muted-foreground/50" />
                </motion.div>
            </motion.div>

            {/* iOS install modal */}
            {showIOSModal && (
                <IOSInstallModal onClose={() => setShowIOSModal(false)} />
            )}
        </section>
    );
}
