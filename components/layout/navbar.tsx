"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Home", href: "#hero" },
    { label: "Impact", href: "#impact" },
    { label: "About", href: "#about" },
    { label: "Journey", href: "#timeline" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

// Magnetic menu item component
function MagneticMenuItem({
    children,
    href,
    onClick,
    isActive,
    className,
}: {
    children: React.ReactNode;
    href: string;
    onClick: () => void;
    isActive: boolean;
    className?: string;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 300, damping: 30 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.15; // 15% pull strength
        const deltaY = (e.clientY - centerY) * 0.15;
        x.set(Math.max(-12, Math.min(12, deltaX))); // Clamp to ±12px
        y.set(Math.max(-6, Math.min(6, deltaY)));
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!ref.current || e.touches.length === 0) return;
        const touch = e.touches[0];
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (touch.clientX - centerX) * 0.1; // Reduced for mobile
        const deltaY = (touch.clientY - centerY) * 0.1;
        x.set(Math.max(-6, Math.min(6, deltaX)));
        y.set(Math.max(-4, Math.min(4, deltaY)));
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onTouchEnd={handleMouseLeave}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.97 }}
            className={cn(
                "relative block px-6 py-4 rounded-2xl text-lg font-medium transition-colors duration-300",
                "will-change-transform",
                isActive
                    ? "bg-white/[0.08] text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                className
            )}
        >
            {/* Glow effect on hover */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 rounded-2xl bg-primary/10 pointer-events-none"
                    />
                )}
            </AnimatePresence>
            <span className="relative z-10">{children}</span>
        </motion.a>
    );
}

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [atTop, setAtTop] = useState(true);
    const [activeSection, setActiveSection] = useState("hero");
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const { scrollY } = useScroll();

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    // Body scroll lock when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close menu on ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    // Hide navbar on scroll down, show on scroll up
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setAtTop(latest < 50);
    });

    // Track active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section[id]");

            // Handle bottom of page - activate last section
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
                // Find the last visible section that is in navItems
                const lastSectionId = navItems[navItems.length - 1].href.slice(1);
                setActiveSection(lastSectionId);
                return;
            }

            // Normal scroll - check which section is in the upper third of screen
            const viewPoint = window.scrollY + (window.innerHeight * 0.3);

            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop;
                const sectionHeight = (section as HTMLElement).offsetHeight;

                if (viewPoint >= sectionTop && viewPoint < sectionTop + sectionHeight) {
                    setActiveSection(section.id);
                }
            });
        };

        // Initial check
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = () => {
        setIsOpen(false);
    };

    // Animation variants
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const menuVariants = {
        hidden: { opacity: 0, scale: 0.95, y: -20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: -20,
            transition: { duration: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <>
            {/* Desktop Navbar - Floating Pill */}
            <motion.header
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{
                    y: 0,
                    x: "-50%",
                    opacity: 1
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-6 left-1/2 z-50 hidden md:block" // removed -translate-x-1/2 as framer handles it
            >
                <nav
                    className={cn(
                        "flex items-center gap-1 px-2 py-2 rounded-full",
                        "backdrop-blur-xl border transition-all duration-400",
                        atTop
                            ? "bg-transparent border-transparent"
                            : "bg-black/40 border-[hsl(var(--border))]"
                    )}
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300",
                                activeSection === item.href.slice(1)
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {activeSection === item.href.slice(1) && (
                                <motion.div
                                    layoutId="activeSection"
                                    className="absolute inset-0 bg-white/[0.08] rounded-full"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{item.label}</span>
                        </Link>
                    ))}

                    {/* Resume button */}
                    {/* <a
                        href="/resume.pdf"
                        download="Aditya_Kumar_Resume.pdf"
                        className="ml-2 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        <Download className="h-4 w-4" />
                        Resume
                    </a> */}
                </nav>
            </motion.header>

            {/* Mobile Navbar Header */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: hidden && !isOpen ? -100 : 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-[60] md:hidden",
                    "backdrop-blur-xl border-b transition-colors duration-300",
                    atTop && !isOpen
                        ? "bg-transparent border-transparent"
                        : "bg-black/80 border-[hsl(var(--border))]"
                )}
            >
                <div className="flex items-center justify-between px-6 py-4">
                    <Link href="#hero" onClick={handleNavClick} className="text-xl font-bold text-foreground">
                        AK<span className="text-primary">.</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-foreground"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="h-6 w-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="h-6 w-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[55] md:hidden bg-black/70 backdrop-blur-md"
                            style={{
                                background: "radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%)"
                            }}
                        />

                        {/* Menu Panel */}
                        <motion.nav
                            variants={prefersReducedMotion ? {} : menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={cn(
                                "fixed top-[72px] left-4 right-4 z-[60] md:hidden",
                                "p-4 rounded-3xl",
                                "bg-[hsl(var(--card-glass))] backdrop-blur-2xl",
                                "border border-[hsl(var(--border))]",
                                "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                            )}
                        >
                            {/* Specular highlight */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-3xl" />

                            <div className="flex flex-col gap-1">
                                {navItems.map((item) => (
                                    <motion.div key={item.label} variants={itemVariants}>
                                        <MagneticMenuItem
                                            href={item.href}
                                            onClick={handleNavClick}
                                            isActive={activeSection === item.href.slice(1)}
                                        >
                                            {item.label}
                                        </MagneticMenuItem>
                                    </motion.div>
                                ))}

                                {/* Resume button */}
                                <motion.div variants={itemVariants}>
                                    <a
                                        href="/resume.pdf"
                                        download="Aditya_Kumar_Resume.pdf"
                                        className="flex items-center justify-center gap-2 mt-3 px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-medium"
                                    >
                                        <Download className="h-5 w-5" />
                                        Download Resume
                                    </a>
                                </motion.div>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
