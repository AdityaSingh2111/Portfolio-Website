"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { motion } from "framer-motion";
import {
    Briefcase,
    Code,
    Users,
    Zap,
    Tractor,
    Quote,
} from "lucide-react";

// Tech stack from resume
const techStack = [
    "React.js",
    "Firebase",
    "Web Dev",
    "CRM",
    "Excel",
    "IT Infra",
];

export function BentoGrid() {
    return (
        <section id="about" className="section-padding relative section-alt section-divider-soft">
            <div className="container-main">
                <AnimatedSection className="text-center lg:text-left mb-16 md:mb-24">
                    <p className="text-fluid-xs text-primary uppercase tracking-[0.3em] mb-4">
                        About Me
                    </p>
                    <h2 className="text-fluid-3xl font-bold text-foreground mb-6">
                        Bridging Leadership
                        <br />
                        <span className="font-serif italic text-muted-foreground font-normal">
                            & Technical Innovation
                        </span>
                    </h2>
                </AnimatedSection>

                {/* Bento Grid - Asymmetric Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">

                    {/* Large Card - Current Role */}
                    <AnimatedSection
                        delay={0.05}
                        className="md:col-span-2 lg:col-span-8 lg:row-span-2"
                    >
                        <LiquidGlass hoverable className="h-full p-6 md:p-8 lg:p-10">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-2xl bg-primary/10">
                                        <Briefcase className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-fluid-xs text-primary uppercase tracking-[0.2em]">
                                            Current Role
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            May 2025 – Present
                                        </p>
                                    </div>
                                </div>

                                <h3 className="text-fluid-2xl font-bold text-foreground mb-4">
                                    Team Leader & IT Specialist
                                    <br />
                                    <span className="text-primary">@ VRL Logistics</span>
                                </h3>

                                <p className="text-fluid-base text-muted-foreground mb-6 prose-body flex-grow">
                                    Rapidly promoted from Customer Support to manage a{" "}
                                    <span className="text-foreground">12-member business development team</span>{" "}
                                    with <span className="text-foreground">0% attrition</span>. Directed{" "}
                                    <span className="text-primary">#1 sales-performing team</span> while
                                    personally handling high-value accounts generating{" "}
                                    <span className="text-foreground">₹5–7 Lakhs monthly</span>.
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {["Team Leadership", "CRM Systems", "Sales Strategy", "IT Infrastructure", "Web Development"].map(
                                        (tag) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground"
                                            >
                                                {tag}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </LiquidGlass>
                    </AnimatedSection>

                    {/* Quote Card */}
                    <AnimatedSection delay={0.12} className="lg:col-span-4">
                        <LiquidGlass hoverable className="h-full p-6 md:p-8 flex flex-col justify-center">
                            <Quote className="h-8 w-8 text-primary/40 mb-4" />
                            <p className="text-fluid-lg font-serif italic text-foreground leading-relaxed">
                                &quot;Expert in Sales, Coding, and Operations.&quot;
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                — Professional Summary
                            </p>
                        </LiquidGlass>
                    </AnimatedSection>

                    {/* Leadership Stats */}
                    <AnimatedSection delay={0.18} className="lg:col-span-4">
                        <LiquidGlass hoverable className="h-full p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-purple-400/10">
                                    <Users className="h-5 w-5 text-purple-400" />
                                </div>
                                <p className="text-fluid-xs text-purple-400 uppercase tracking-[0.2em]">
                                    Leadership
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-fluid-3xl font-bold text-foreground">12</p>
                                    <p className="text-sm text-muted-foreground">Executives Managed</p>
                                </div>
                                <div>
                                    <p className="text-fluid-3xl font-bold text-foreground">100%</p>
                                    <p className="text-sm text-muted-foreground">Retention Rate</p>
                                </div>
                            </div>
                        </LiquidGlass>
                    </AnimatedSection>

                    {/* TractorShare Project */}
                    <AnimatedSection delay={0.22} className="lg:col-span-6">
                        <LiquidGlass hoverable className="h-full p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-green-400/10">
                                    <Tractor className="h-5 w-5 text-green-400" />
                                </div>
                                <p className="text-fluid-xs text-green-400 uppercase tracking-[0.2em]">
                                    Side Project
                                </p>
                            </div>
                            <h3 className="text-fluid-xl font-bold text-foreground mb-3">
                                TractorShare
                            </h3>
                            <p className="text-fluid-base text-muted-foreground mb-4 prose-body">
                                OLX-style agricultural marketplace connecting farmers with tractor owners.
                                Built with <span className="text-foreground">React.js + Firebase</span> for real-time listings.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-xs">
                                    React.js
                                </span>
                                <span className="px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-xs">
                                    Firebase
                                </span>
                            </div>
                        </LiquidGlass>
                    </AnimatedSection>

                    {/* VRL Projects */}
                    <AnimatedSection delay={0.28} className="lg:col-span-6">
                        <LiquidGlass hoverable className="h-full p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-yellow-400/10">
                                    <Zap className="h-5 w-5 text-yellow-400" />
                                </div>
                                <p className="text-fluid-xs text-yellow-400 uppercase tracking-[0.2em]">
                                    Built at VRL
                                </p>
                            </div>
                            <h3 className="text-fluid-xl font-bold text-foreground mb-4">
                                Internal Systems
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "VRL Customer Review Portal",
                                    "VRL Slot Booking Website",
                                    "Automated Excel Tracking Systems",
                                    "Digital Payment Integration",
                                ].map((project) => (
                                    <li
                                        key={project}
                                        className="flex items-center gap-3 text-muted-foreground"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                        {project}
                                    </li>
                                ))}
                            </ul>
                        </LiquidGlass>
                    </AnimatedSection>

                    {/* Tech Stack */}
                    <AnimatedSection delay={0.32} className="md:col-span-2 lg:col-span-12">
                        <LiquidGlass hoverable className="p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-electric-cyan/10">
                                    <Code className="h-5 w-5 text-electric-cyan" />
                                </div>
                                <p className="text-fluid-xs text-electric-cyan uppercase tracking-[0.2em]">
                                    Technical Proficiencies
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {techStack.map((tech) => (
                                    <motion.div
                                        key={tech}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="px-6 py-3 rounded-2xl bg-card border border-border text-foreground font-medium hover:border-primary/30 transition-colors"
                                    >
                                        {tech}
                                    </motion.div>
                                ))}
                            </div>
                        </LiquidGlass>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
