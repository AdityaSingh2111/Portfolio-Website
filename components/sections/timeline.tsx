"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { LiquidCard } from "@/components/ui/liquid-glass";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Building2, Heart } from "lucide-react";

const timelineItems = [
    {
        id: 1,
        type: "current",
        icon: Briefcase,
        title: "Team Leader & IT Specialist",
        organization: "VRL Logistics Packers and Movers",
        location: "New Delhi",
        period: "May 2025 – Present",
        description:
            "Promoted rapidly from Customer Support. Managing 12 executives with zero resignations. Directing #1 sales-performing team. Handling high-value accounts (₹5–7L/month).",
        color: "text-primary",
        bgColor: "bg-primary/10",
    },
    {
        id: 2,
        type: "past",
        icon: Building2,
        title: "Engineering Intern",
        organization: "Various Industrial Organizations",
        location: "Mohali",
        period: "Oct 2024 – Apr 2025",
        description:
            "Technical workflow analysis, quality control documentation, safety protocol adherence, and operational data logging.",
        color: "text-muted-foreground",
        bgColor: "bg-white/5",
    },
    {
        id: 3,
        type: "volunteering",
        icon: Heart,
        title: "Academic Mentor",
        organization: "Self-Initiated Free Coaching",
        location: "Kharar",
        period: "May 2023 – Jan 2024",
        description:
            "Provided free coaching in Mathematics and Physics to underprivileged Class 12 students. Simplified technical concepts.",
        color: "text-pink-400",
        bgColor: "bg-pink-400/10",
    },
    {
        id: 4,
        type: "education",
        icon: GraduationCap,
        title: "B.E. Electrical Engineering",
        organization: "Chandigarh University",
        location: "Mohali",
        period: "Aug 2020 – Apr 2024",
        description:
            "Higher Secondary (12th): 84.2% | Secondary (10th): 10.0 CGPA",
        color: "text-purple-400",
        bgColor: "bg-purple-400/10",
    },
];

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section id="timeline" className="section-padding relative overflow-hidden">
            <div className="relative z-10 mx-auto max-w-5xl px-6">
                <AnimatedSection className="text-center mb-16 md:mb-24">
                    <p className="text-fluid-xs text-primary uppercase tracking-[0.3em] mb-4">
                        Journey
                    </p>
                    <h2 className="text-fluid-3xl font-bold text-foreground mb-6">
                        From Education
                        <br />
                        <span className="font-serif italic text-muted-foreground font-normal">
                            to Leadership
                        </span>
                    </h2>
                </AnimatedSection>

                <div ref={containerRef} className="relative">
                    {/* Vertical Line - Desktop */}
                    <motion.div
                        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden lg:block"
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ originY: 0 }}
                    />

                    {/* Timeline Items */}
                    <div className="space-y-8 lg:space-y-0">
                        {timelineItems.map((item, index) => {
                            const Icon = item.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <AnimatedSection
                                    key={item.id}
                                    delay={index * 0.15}
                                    className="lg:grid lg:grid-cols-[1fr_80px_1fr] lg:items-center lg:gap-8"
                                >
                                    {/* Left content (even) or empty (odd) */}
                                    <div
                                        className={`${isEven ? "lg:text-right" : "lg:order-3 lg:text-left"
                                            } hidden lg:block`}
                                    >
                                        {isEven && (
                                            <LiquidCard
                                                className="inline-block p-6"
                                                tiltStrength={6}
                                            >
                                                <TimelineContent item={item} align="right" />
                                            </LiquidCard>
                                        )}
                                    </div>

                                    {/* Center node */}
                                    <div className="hidden lg:flex lg:order-2 justify-center">
                                        <motion.div
                                            className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center bg-background ${item.type === "current"
                                                    ? "border-primary glow-pulse"
                                                    : "border-[hsl(var(--border))]"
                                                }`}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <Icon className={`h-6 w-6 ${item.color}`} />
                                        </motion.div>
                                    </div>

                                    {/* Right content (odd) or empty (even) */}
                                    <div
                                        className={`${!isEven ? "" : "lg:order-3"
                                            } hidden lg:block`}
                                    >
                                        {!isEven && (
                                            <LiquidCard
                                                className="inline-block p-6"
                                                tiltStrength={6}
                                            >
                                                <TimelineContent item={item} align="left" />
                                            </LiquidCard>
                                        )}
                                    </div>

                                    {/* Mobile card */}
                                    <div className="lg:hidden">
                                        <LiquidCard className="p-6" tiltStrength={4}>
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className={`p-3 rounded-xl ${item.bgColor} shrink-0`}
                                                >
                                                    <Icon className={`h-5 w-5 ${item.color}`} />
                                                </div>
                                                <TimelineContent item={item} align="left" />
                                            </div>
                                        </LiquidCard>
                                    </div>
                                </AnimatedSection>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineContent({
    item,
    align,
}: {
    item: typeof timelineItems[0];
    align: "left" | "right";
}) {
    return (
        <div className={align === "right" ? "text-right" : "text-left"}>
            <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${item.type === "current"
                        ? "bg-primary/10 text-primary"
                        : item.type === "education"
                            ? "bg-purple-400/10 text-purple-400"
                            : item.type === "volunteering"
                                ? "bg-pink-400/10 text-pink-400"
                                : "bg-white/5 text-muted-foreground"
                    }`}
            >
                {item.period}
            </span>
            <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-primary mb-2">
                {item.organization} • {item.location}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
            </p>
        </div>
    );
}
