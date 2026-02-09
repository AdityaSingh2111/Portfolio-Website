"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ArrowDown } from "lucide-react";
import { ProfilePhoto } from "@/components/ui/profile-photo";
import { Spotlight } from "@/components/ui/spotlight";
import { Counter } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

function StatusBadge({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm",
                className
            )}
        >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-green-400 tracking-wide uppercase">Available for work</span>
        </div>
    );
}

export function Hero() {
    // Typewriter effect
    const roles = [
        "Business Development Team Leader",
        "CRM Specialist",
        "IT Specialist",
    ];

    const [currentRole, setCurrentRole] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const deleteIndexRef = useRef(0);

    const role = roles[currentRole];

    useEffect(() => {
        if (isTyping) {
            deleteIndexRef.current = role.length;
        }
    }, [isTyping, role.length]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isTyping) {
            let charIndex = 0;
            const typeChar = () => {
                if (charIndex <= role.length) {
                    setDisplayText(role.slice(0, charIndex));
                    charIndex++;
                    timeout = setTimeout(typeChar, 50);
                } else {
                    timeout = setTimeout(() => setIsTyping(false), 2500);
                }
            };
            typeChar();
        } else {
            const deleteChar = () => {
                if (deleteIndexRef.current > 0) {
                    deleteIndexRef.current--;
                    setDisplayText(role.slice(0, deleteIndexRef.current));
                    timeout = setTimeout(deleteChar, 30);
                } else {
                    setCurrentRole((prev) => (prev + 1) % roles.length);
                    setIsTyping(true);
                }
            };
            deleteChar();
        }

        return () => clearTimeout(timeout);
    }, [currentRole, isTyping, role]);

    // Parallax scroll
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    // Staggered animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        },
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { duration: 1, delay: 0.8 }
        },
    };

    return (
        <section
            id="hero"
            className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-12 md:py-0 bg-black"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />

                {/* Subtle Color Accents */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-20 animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-cyan/20 rounded-full blur-[128px] opacity-20" />

                {/* Grain Noise Texture */}
                <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.8)_100%)]" />
            </div>

            {/* Corner metadata - desktop only */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="show"
                className="hidden md:block absolute top-12 left-12 text-left"
            >
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em] mb-1">
                    Driving Growth Through
                </p>
                <p className="text-base text-foreground font-semibold tracking-wide">
                    Leadership & Technology
                </p>
            </motion.div>

            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="show"
                className="hidden md:flex absolute top-12 right-12 items-center gap-3 text-muted-foreground"
            >
                <div className="p-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                    <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium uppercase tracking-[0.15em]">New Delhi, India</span>
            </motion.div>

            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="show"
                className="hidden md:block absolute bottom-12 left-12"
            >
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em] mb-1">
                    Currently at
                </p>
                <p className="text-lg text-primary font-bold tracking-wide">
                    VRL Logistics
                </p>
            </motion.div>

            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="show"
                className="hidden md:block absolute bottom-12 right-12 text-right group cursor-default"
            >
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em] mb-1 group-hover:text-primary transition-colors">
                    Impact
                </p>
                <div className="flex items-baseline justify-end gap-1">
                    <span className="text-3xl font-bold text-gradient-primary tracking-tight">₹</span>
                    <Counter
                        value={7}
                        duration={2.5}
                        className="text-3xl font-bold text-gradient-primary tracking-tight"
                    />
                    <span className="text-3xl font-bold text-gradient-primary tracking-tight">L+</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Monthly Revenue</p>
            </motion.div>

            {/* Main content - Tighter Layout */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative z-10 px-6 max-w-5xl mx-auto w-full"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="text-center md:text-left order-2 md:order-1">

                        {/* Mobile Profile Photo & Badge Container */}
                        <motion.div
                            variants={item}
                            className="lg:hidden flex flex-col items-center justify-center mb-6"
                        >
                            <StatusBadge className="mb-4" />
                            <ProfilePhoto className="w-[130px] h-[160px] sm:w-[160px] sm:h-[200px]" />
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            variants={item}
                            className="text-fluid-hero font-bold tracking-tighter text-white leading-[0.9] mb-3 md:mb-4"
                        >
                            ADITYA
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-electric-cyan to-primary bg-[length:200%_auto] animate-shimmer">
                                KUMAR
                            </span>
                        </motion.h1>

                        {/* Typewriter role */}
                        <motion.div
                            variants={item}
                            className="h-8 sm:h-10 md:h-12 flex items-center justify-center md:justify-start mb-4 md:mb-6"
                        >
                            <p className="text-fluid-lg md:text-2xl font-light text-muted-foreground tracking-wide">
                                {displayText}
                                <span className="inline-block w-[2px] h-5 lg:h-6 bg-electric-cyan ml-1 animate-pulse" />
                            </p>
                        </motion.div>

                        {/* Tagline - Hidden on mobile for cleaner look */}
                        <motion.p
                            variants={item}
                            className="hidden lg:block text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed"
                        >
                            High-performing Team Leader managing <span className="text-white font-medium">12 executives</span> with{" "}
                            <span className="text-white font-medium">0% attrition</span>. Securing{" "}
                            <span className="text-primary font-medium">#1 sales rank</span> while building IT infrastructure.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={item}
                            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
                        >
                            <a
                                href="/resume.pdf"
                                download="Aditya_Kumar_Resume.pdf"
                                className="group relative px-6 py-3 md:px-8 rounded-full bg-primary text-primary-foreground font-semibold overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
                            >
                                <span className="relative z-10 w-full text-center">Download Resume</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-electric-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </a>
                            <a
                                href="#about"
                                className="px-6 py-3 md:px-8 rounded-full border border-[hsl(var(--border))] text-foreground font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                            >
                                View My Work
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: Profile Photo - Desktop Only */}
                    <motion.div
                        variants={item}
                        className="hidden md:flex justify-end order-1 md:order-2"
                    >
                        <div className="flex flex-col items-center">
                            <StatusBadge className="mb-6" />
                            <div className="relative">
                                <ProfilePhoto className="md:w-[280px] md:h-[350px] lg:w-[320px] lg:h-[400px]" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown className="h-5 w-5 text-muted-foreground/80" />
                </motion.div>
            </motion.div>
        </section >
    );
}
