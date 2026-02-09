"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const directionOffset = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 },
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
                duration: 0.6,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerChildrenProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function StaggerChildren({
    children,
    className,
    staggerDelay = 0.1,
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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
        },
    },
};

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
                    <motion.span
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                    >
                        <CounterAnimation value={value} duration={duration} />
                    </motion.span>
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
    const [displayValue, setDisplayValue] = React.useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        const updateValue = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);
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

    return <span ref={ref}>{displayValue}</span>;
}

import React from "react";
