"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Nav Items ─── */
const navItems = [
    { label: "Home", href: "#hero" },
    { label: "Impact", href: "#impact" },
    { label: "About", href: "#about" },
    { label: "Journey", href: "#timeline" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
] as const;

/* ─── Animation variants (extracted — no re-creation per render) ─── */
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const menuVariants = {
    hidden: { opacity: 0, scale: 0.96, y: -12 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 30,
            staggerChildren: 0.04,
            delayChildren: 0.06,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        y: -12,
        transition: { duration: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0 },
};

/* ─── Focus ring utility class ─── */
const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-full";

/* ─── Hook: detect touch device ─── */
function useIsTouchDevice() {
    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => {
        setIsTouch(
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0
        );
    }, []);
    return isTouch;
}

/* ─── Hook: focus trap ─── */
function useFocusTrap(ref: React.RefObject<HTMLElement | null>, active: boolean) {
    useEffect(() => {
        if (!active || !ref.current) return;

        const el = ref.current;
        const focusableSelector =
            'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const focusableElements = el.querySelectorAll<HTMLElement>(focusableSelector);
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        // Focus first element on open
        first?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }
        };

        el.addEventListener("keydown", handleKeyDown);
        return () => el.removeEventListener("keydown", handleKeyDown);
    }, [active, ref]);
}

/* ═══════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════ */
export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [atTop, setAtTop] = useState(true);
    const [activeSection, setActiveSection] = useState("hero");
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const isTouch = useIsTouchDevice();

    // Focus trap for mobile menu
    useFocusTrap(mobileMenuRef, isOpen);

    /* ── Reduced motion preference ── */
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    /* ── Body scroll lock when menu open ── */
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    /* ── Close menu on Escape ── */
    useEffect(() => {
        if (!isOpen) return;
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    /* ── Close menu on hash change ── */
    useEffect(() => {
        const handleHash = () => setIsOpen(false);
        window.addEventListener("hashchange", handleHash);
        return () => window.removeEventListener("hashchange", handleHash);
    }, []);

    /* ── IO #1: atTop + hide/show (consolidated) ── */
    useEffect(() => {
        // Sentinel at top: 50px tall element. When fully visible → atTop.
        const topSentinel = document.createElement("div");
        topSentinel.style.cssText =
            "position:absolute;top:0;left:0;width:1px;height:50px;pointer-events:none;";
        topSentinel.setAttribute("aria-hidden", "true");
        document.body.prepend(topSentinel);

        const topObserver = new IntersectionObserver(
            ([entry]) => setAtTop(entry.isIntersecting),
            { threshold: 0.5 }
        );
        topObserver.observe(topSentinel);

        // Direction detection: observe all sections.
        // When a section's boundingClientRect.top decreases → scrolling down.
        let lastTopY = 0;
        let pastThreshold = false;

        // Threshold sentinel at 150px
        const thresholdSentinel = document.createElement("div");
        thresholdSentinel.style.cssText =
            "position:absolute;top:150px;left:0;width:1px;height:1px;pointer-events:none;";
        thresholdSentinel.setAttribute("aria-hidden", "true");
        document.body.prepend(thresholdSentinel);

        const thresholdObserver = new IntersectionObserver(
            ([entry]) => {
                pastThreshold = !entry.isIntersecting;
                if (entry.isIntersecting) setHidden(false);
            },
            { threshold: 1.0 }
        );
        thresholdObserver.observe(thresholdSentinel);

        const directionObserver = new IntersectionObserver(
            (entries) => {
                if (!pastThreshold) return;
                for (const entry of entries) {
                    const currentY = entry.boundingClientRect.top;
                    if (currentY < lastTopY) {
                        setHidden(true);
                    } else if (currentY > lastTopY) {
                        setHidden(false);
                    }
                    lastTopY = currentY;
                }
            },
            {
                rootMargin: "0px 0px -85% 0px",
                threshold: [0, 0.25, 0.5, 1],
            }
        );

        navItems.forEach(({ href }) => {
            const el = document.getElementById(href.slice(1));
            if (el) directionObserver.observe(el);
        });

        return () => {
            topObserver.disconnect();
            thresholdObserver.disconnect();
            directionObserver.disconnect();
            topSentinel.remove();
            thresholdSentinel.remove();
        };
    }, []);

    /* ── IO #2: active section tracking ── */
    useEffect(() => {
        const sectionIds = navItems.map((item) => item.href.slice(1));
        const observers: IntersectionObserver[] = [];
        const visibilityMap = new Map<string, number>();

        sectionIds.forEach((id) => {
            const section = document.getElementById(id);
            if (!section) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        visibilityMap.set(id, entry.intersectionRatio);

                        let maxRatio = 0;
                        let activeId = "hero";

                        visibilityMap.forEach((ratio, sectionId) => {
                            if (ratio > maxRatio) {
                                maxRatio = ratio;
                                activeId = sectionId;
                            }
                        });

                        if (maxRatio > 0) setActiveSection(activeId);
                    });
                },
                {
                    rootMargin: "-10% 0px -50% 0px",
                    threshold: [0, 0.25, 0.5, 1],
                }
            );

            observer.observe(section);
            observers.push(observer);
        });

        // Bottom-of-page sentinel
        const bottomSentinel = document.createElement("div");
        bottomSentinel.style.cssText = "width:1px;height:1px;pointer-events:none;";
        bottomSentinel.setAttribute("aria-hidden", "true");
        document.body.appendChild(bottomSentinel);

        const bottomObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActiveSection(sectionIds[sectionIds.length - 1]);
                }
            },
            { threshold: 0.1 }
        );
        bottomObserver.observe(bottomSentinel);

        return () => {
            observers.forEach((obs) => obs.disconnect());
            bottomObserver.disconnect();
            bottomSentinel.remove();
        };
    }, []);

    const handleNavClick = useCallback(() => {
        setIsOpen(false);
    }, []);

    /* ═══════════════════════════════════════════════
       RENDER
       ═══════════════════════════════════════════════ */
    return (
        <>
            {/* ── Skip to content (a11y) ── */}
            <a
                href="#hero"
                className={cn(
                    "fixed top-2 left-1/2 -translate-x-1/2 z-[100]",
                    "px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium",
                    "opacity-0 pointer-events-none",
                    "focus-visible:opacity-100 focus-visible:pointer-events-auto",
                    "transition-opacity duration-200",
                    focusRing
                )}
            >
                Skip to content
            </a>

            {/* ── Desktop Navbar — Floating Pill ── */}
            <motion.header
                initial={prefersReducedMotion ? { opacity: 0 } : { y: -100, x: "-50%", opacity: 0 }}
                animate={{
                    y: hidden ? -100 : 0,
                    x: "-50%",
                    opacity: 1,
                }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-6 left-1/2 z-50 hidden md:block"
            >
                <nav
                    role="navigation"
                    aria-label="Main navigation"
                    className={cn(
                        "flex items-center gap-1 px-2 py-2 rounded-full",
                        "backdrop-blur-2xl border",
                        "transition-colors transition-shadow duration-250",
                        atTop
                            ? "bg-transparent border-transparent"
                            : "bg-card/90 dark:bg-card/70 border-border shadow-xl shadow-black/5 dark:shadow-black/20"
                    )}
                >
                    <LayoutGroup id="desktop-nav">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.href.slice(1);
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    aria-current={isActive ? "true" : undefined}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium rounded-full",
                                        "transition-colors duration-200",
                                        focusRing,
                                        isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute inset-0 bg-primary/10 rounded-full"
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.label}</span>

                                    {/* Active bottom accent */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeAccent"
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-primary"
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </LayoutGroup>

                    <div className="pl-3 border-l border-muted-foreground/20 dark:border-border/50 ml-1">
                        <ThemeToggle />
                    </div>
                </nav>
            </motion.header>

            {/* ── Mobile Navbar Header ── */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: hidden && !isOpen ? -100 : 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-[60] md:hidden",
                    "backdrop-blur-2xl border-b",
                    "transition-colors duration-200",
                    atTop && !isOpen
                        ? "bg-transparent border-transparent"
                        : "bg-card/95 dark:bg-card/80 border-border shadow-lg shadow-black/5 dark:shadow-black/20"
                )}
            >
                <div className="flex items-center justify-between px-5 py-3.5">
                    <Link
                        href="#hero"
                        onClick={handleNavClick}
                        className={cn(
                            "text-xl font-bold text-foreground",
                            focusRing
                        )}
                    >
                        AK<span className="text-primary">.</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={cn(
                                "relative p-2.5 text-foreground rounded-full",
                                "hover:bg-secondary/30",
                                "transition-colors duration-150 touch-manipulation",
                                focusRing
                            )}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <X className="h-5 w-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <Menu className="h-5 w-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* ── Mobile Menu Overlay ── */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[55] md:hidden bg-background/80 backdrop-blur-md"
                            aria-hidden="true"
                        />

                        {/* Menu Panel — focus trapped */}
                        <motion.div
                            ref={mobileMenuRef}
                            id="mobile-menu"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                            variants={prefersReducedMotion ? undefined : menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={cn(
                                "fixed top-[68px] left-3 right-3 z-[60] md:hidden",
                                "p-3 rounded-2xl",
                                "bg-card/95 dark:bg-card/90 backdrop-blur-2xl",
                                "border border-border",
                                "shadow-xl shadow-black/10 dark:shadow-black/30"
                            )}
                        >
                            {/* Specular top edge */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent rounded-t-2xl" />

                            <nav role="navigation" aria-label="Mobile navigation">
                                <ul className="flex flex-col gap-0.5">
                                    {navItems.map((item) => {
                                        const isActive = activeSection === item.href.slice(1);
                                        return (
                                            <motion.li key={item.label} variants={itemVariants}>
                                                <a
                                                    href={item.href}
                                                    onClick={handleNavClick}
                                                    aria-current={isActive ? "true" : undefined}
                                                    className={cn(
                                                        "relative flex items-center px-4 py-3.5 rounded-xl",
                                                        "text-base font-medium",
                                                        "transition-colors duration-150",
                                                        "active:scale-[0.98] touch-manipulation",
                                                        focusRing,
                                                        isActive
                                                            ? "bg-primary/10 text-foreground"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                                                    )}
                                                >
                                                    {/* Active left accent */}
                                                    {isActive && (
                                                        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-primary" />
                                                    )}
                                                    <span className={isActive ? "ml-2" : ""}>
                                                        {item.label}
                                                    </span>
                                                </a>
                                            </motion.li>
                                        );
                                    })}

                                    {/* Resume CTA */}
                                    <motion.li variants={itemVariants}>
                                        <a
                                            href="/resume.pdf"
                                            download="Aditya_Kumar_Resume.pdf"
                                            className={cn(
                                                "flex items-center justify-center gap-2",
                                                "mt-1 px-5 py-3.5 rounded-xl",
                                                "bg-primary text-primary-foreground font-medium",
                                                "active:scale-[0.97] touch-manipulation",
                                                "transition-opacity duration-150",
                                                focusRing
                                            )}
                                        >
                                            <Download className="h-4 w-4" />
                                            Download Resume
                                        </a>
                                    </motion.li>
                                </ul>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
