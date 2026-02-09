import { Github, Linkedin, Mail, Phone, Globe } from "lucide-react";
import Link from "next/link";

const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com/adityasingh2111",
        icon: Github,
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/aditya2111",
        icon: Linkedin,
    },
    {
        label: "Portfolio",
        href: "https://adityaks-portfolio.vercel.app",
        icon: Globe,
    },
    {
        label: "Email",
        href: "mailto:adityaks2111@gmail.com",
        icon: Mail,
    },
    {
        label: "Phone",
        href: "tel:+918102408762",
        icon: Phone,
    },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-[hsl(var(--border))]">
            {/* Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Brand */}
                    <div className="text-center lg:text-left">
                        <Link
                            href="#hero"
                            className="inline-block text-4xl font-bold tracking-tight text-foreground mb-3"
                        >
                            AK<span className="text-primary">.</span>
                        </Link>
                        <p className="text-muted-foreground max-w-xs">
                            Business Development Team Leader
                            <br />
                            <span className="font-serif italic">CRM & IT Specialist</span>
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith("http") ? "_blank" : undefined}
                                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="p-3 rounded-2xl border border-[hsl(var(--border))] bg-white/[0.02] text-muted-foreground hover:text-foreground hover:border-[hsl(var(--border-glow))] transition-all duration-300"
                                    aria-label={link.label}
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div className="text-center lg:text-right">
                        <p className="text-sm text-muted-foreground mb-3">
                            Ready to connect?
                        </p>
                        <a
                            href="/resume.pdf"
                            download="Aditya_Kumar_Resume.pdf"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                        >
                            Download Resume
                        </a>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-[hsl(var(--border))] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {currentYear} Aditya Kumar. All rights reserved.</p>
                    <p>
                        New Delhi, India •{" "}
                        <a
                            href="mailto:adityaks2111@gmail.com"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            adityaks2111@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
