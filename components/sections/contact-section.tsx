"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { LiquidCard } from "@/components/ui/liquid-glass";
import { Send, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactSection() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    // Cursor glow tracking for the card
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const glowX = useSpring(useTransform(mouseX, (v) => v), { stiffness: 500, damping: 50 });
    const glowY = useSpring(useTransform(mouseY, (v) => v), { stiffness: 500, damping: 50 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Build mailto URL with prefilled fields
        const subject = encodeURIComponent("Contact from Portfolio");
        const body = encodeURIComponent(
            `Name: ${name || "Not provided"}\nEmail: ${email || "Not provided"}\n\n${message}`
        );
        const mailtoUrl = `mailto:adityaks2111@gmail.com?subject=${subject}&body=${body}`;

        // Open default email client
        window.location.href = mailtoUrl;
    };

    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[hsl(var(--primary)/0.05)] blur-[100px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[hsl(var(--electric-cyan)/0.04)] blur-[80px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Heading & Copy */}
                    <AnimatedSection className="text-center lg:text-left">
                        <p className="text-fluid-xs text-primary uppercase tracking-[0.3em] mb-4 flex items-center justify-center lg:justify-start gap-2">
                            <Sparkles className="h-4 w-4" />
                            Get in Touch
                        </p>

                        <h2 className="text-fluid-3xl font-bold text-foreground mb-6 leading-tight">
                            Let&apos;s Build Something
                            <br />
                            <span className="text-gradient-primary">Meaningful</span>
                        </h2>

                        <p className="text-fluid-base text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                            I&apos;m always open to discussing new opportunities, innovative projects,
                            or meaningful collaborations. Whether you&apos;re looking for a{" "}
                            <span className="text-foreground">team leader</span>,{" "}
                            <span className="text-foreground">technical specialist</span>, or just
                            want to connect — I&apos;d love to hear from you.
                        </p>

                        {/* Quick stats reminder */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className="w-2 h-2 rounded-full bg-green-400" />
                                Available for opportunities
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                Response within 24hrs
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Right Side - Contact Card */}
                    <AnimatedSection delay={0.2}>
                        <motion.div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            animate={{
                                y: isHovered ? -8 : 0,
                            }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <LiquidCard className="p-6 md:p-8 relative">
                                {/* Cursor tracked glow */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none rounded-3xl z-0"
                                    style={{
                                        background: `radial-gradient(600px circle at ${glowX.get()}% ${glowY.get()}%, hsl(var(--primary) / 0.08), transparent 40%)`,
                                        opacity: isHovered ? 1 : 0,
                                        transition: "opacity 0.4s ease",
                                    }}
                                />

                                <form
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    className="relative z-10 space-y-6"
                                >
                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="contact-name"
                                            className="text-sm text-muted-foreground"
                                        >
                                            Your Name <span className="text-muted-foreground/50">(optional)</span>
                                        </label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Akash Gupta"
                                            aria-label="Your name"
                                            className={cn(
                                                "w-full px-4 py-3 rounded-xl",
                                                "bg-white/[0.03] border border-[hsl(var(--border))]",
                                                "text-foreground placeholder:text-muted-foreground/50",
                                                "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                                                "transition-all duration-300"
                                            )}
                                        />
                                    </div>

                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="contact-email"
                                            className="text-sm text-muted-foreground"
                                        >
                                            Your Email <span className="text-muted-foreground/50">(optional)</span>
                                        </label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="akash@mail.com"
                                            aria-label="Your email address"
                                            className={cn(
                                                "w-full px-4 py-3 rounded-xl",
                                                "bg-white/[0.03] border border-[hsl(var(--border))]",
                                                "text-foreground placeholder:text-muted-foreground/50",
                                                "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                                                "transition-all duration-300"
                                            )}
                                        />
                                    </div>

                                    {/* Message Textarea */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="contact-message"
                                            className="text-sm text-muted-foreground"
                                        >
                                            Your Message
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Tell me about your project or opportunity..."
                                            rows={4}
                                            aria-label="Your message"
                                            className={cn(
                                                "w-full px-4 py-3 rounded-xl resize-none",
                                                "bg-white/[0.03] border border-[hsl(var(--border))]",
                                                "text-foreground placeholder:text-muted-foreground/50",
                                                "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                                                "transition-all duration-300"
                                            )}
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={cn(
                                            "w-full flex items-center justify-center gap-3",
                                            "px-6 py-4 rounded-2xl",
                                            "bg-primary text-primary-foreground font-medium",
                                            "relative overflow-hidden group",
                                            "transition-all duration-300"
                                        )}
                                    >
                                        {/* Hover gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-[hsl(var(--electric-cyan))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <span className="relative z-10 flex items-center gap-2">
                                            <Send className="h-5 w-5" />
                                            Send Message
                                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </span>
                                    </motion.button>

                                    {/* Privacy note */}
                                    <p className="text-xs text-center text-muted-foreground/70">
                                        This opens your email client. No data is stored.
                                    </p>
                                </form>
                            </LiquidCard>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
