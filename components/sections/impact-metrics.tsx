"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { Counter } from "@/components/ui/animated-section";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { TrendingUp, Users, Trophy, Clock } from "lucide-react";

const metrics = [
    {
        icon: TrendingUp,
        value: 7,
        prefix: "₹",
        suffix: "L+",
        label: "Monthly Revenue",
        sublabel: "Generated through sales",
        color: "text-green-400",
        bgColor: "bg-green-400/10",
    },
    {
        icon: Users,
        value: 0,
        suffix: "%",
        label: "Team Attrition",
        sublabel: "12 executives, 8 months",
        color: "text-electric-cyan",
        bgColor: "bg-electric-cyan/10",
    },
    {
        icon: Trophy,
        value: 1,
        prefix: "#",
        suffix: "",
        label: "Sales Rank",
        sublabel: "Top performing team",
        color: "text-yellow-400",
        bgColor: "bg-yellow-400/10",
    },
    {
        icon: Clock,
        value: 40,
        suffix: "%",
        label: "Time Saved",
        sublabel: "Through automation",
        color: "text-purple-400",
        bgColor: "bg-purple-400/10",
    },
];

export function ImpactMetrics() {
    return (
        <section id="impact" className="section-tight relative overflow-hidden section-divider-soft">
            {/* Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

            <div className="relative z-10 container-main">
                {/* Static heading — intentional stillness */}
                <div className="text-center mb-16 md:mb-24">
                    <p className="text-fluid-xs text-primary uppercase tracking-[0.3em] mb-4">
                        Key Metrics
                    </p>
                    <h2 className="text-fluid-3xl font-bold text-foreground mb-6">
                        Measurable Impact
                        <br />
                        <span className="font-serif italic text-muted-foreground font-normal">
                            at VRL Logistics
                        </span>
                    </h2>
                </div>

                {/* Organic stagger — slight variation avoids robotic feel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => {
                        const Icon = metric.icon;
                        const organicDelays = [0, 0.08, 0.18, 0.24];
                        return (
                            <AnimatedSection key={metric.label} delay={organicDelays[index] ?? index * 0.1}>
                                <LiquidGlass hoverable className="p-6 md:p-8 text-center h-full">
                                    {/* Icon */}
                                    <div
                                        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${metric.bgColor} mb-6`}
                                    >
                                        <Icon className={`h-7 w-7 ${metric.color}`} />
                                    </div>

                                    {/* Value */}
                                    <div className="text-fluid-4xl font-bold text-foreground mb-2">
                                        <Counter
                                            value={metric.value}
                                            prefix={metric.prefix}
                                            suffix={metric.suffix}
                                            duration={2}
                                        />
                                    </div>

                                    {/* Labels */}
                                    <p className="text-fluid-base font-medium text-foreground mb-1">
                                        {metric.label}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {metric.sublabel}
                                    </p>
                                </LiquidGlass>
                            </AnimatedSection>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
