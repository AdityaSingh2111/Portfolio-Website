"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";

/* ─── Animated Section (IntersectionObserver reveal) ─── */

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export function AnimatedSection({
    children,
    className,
    delay = 0,
    direction = "up",
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const directionOffset = {
        up: { y: 20, x: 0 },
        down: { y: -20, x: 0 },
        left: { y: 0, x: 20 },
        right: { y: 0, x: -20 },
    };

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                ...directionOffset[direction],
            }}
            animate={
                isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        x: 0,
                    }
                    : undefined
            }
            transition={{
                duration: 0.3,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ─── Stagger Children ─── */

interface StaggerChildrenProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function StaggerChildren({
    children,
    className,
    staggerDelay = 0.08,
}: StaggerChildrenProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export const staggerChildVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

/* ─── Counter ─── */

interface CounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    duration?: number;
}

export function Counter({
    value,
    prefix = "",
    suffix = "",
    className,
    duration = 2,
}: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <span ref={ref} className={cn("tabular-nums", className)}>
            {prefix}
            <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
            >
                {isInView ? (
                    <CounterAnimation value={value} duration={duration} />
                ) : (
                    "0"
                )}
            </motion.span>
            {suffix}
        </span>
    );
}

function CounterAnimation({
    value,
    duration,
}: {
    value: number;
    duration: number;
}) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        const updateValue = () => {
            const now = Date.now();
            const progress = Math.min(
                (now - startTime) / (duration * 1000),
                1
            );
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setDisplayValue(Math.floor(easeOutQuart * value));

            if (now < endTime) {
                requestAnimationFrame(updateValue);
            } else {
                setDisplayValue(value);
            }
        };

        requestAnimationFrame(updateValue);
    }, [value, duration]);

    return <span>{displayValue}</span>;
}
