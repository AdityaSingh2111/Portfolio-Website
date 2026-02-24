"use client";

import { cn } from "@/lib/utils";

// Skills from resume - Areas of Expertise & Technical Proficiencies
const skills = [
    // Row 1 - Leadership & Business
    { name: "Team Leadership", category: "leadership" },
    { name: "Business Development", category: "business" },
    { name: "CRM", category: "business" },
    { name: "High-Ticket Negotiation", category: "business" },
    { name: "Employee Retention", category: "leadership" },
    { name: "Performance Coaching", category: "leadership" },
    { name: "Lead Generation", category: "business" },
    { name: "B2C Sales Strategy", category: "business" },
    { name: "Conflict Resolution", category: "leadership" },
    { name: "Client Retention", category: "business" },
    { name: "Mentoring", category: "leadership" },
    { name: "Sales", category: "business" },

    // Row 2 - Tech & Operations
    { name: "React.js", category: "tech" },
    { name: "Firebase", category: "tech" },
    { name: "IT Infrastructure", category: "tech" },
    { name: "Web Development", category: "tech" },
    { name: "Operations Management", category: "ops" },
    { name: "Process Automation", category: "tech" },
    { name: "Digital Payment Integration", category: "tech" },
    { name: "Website Management", category: "tech" },
    { name: "Office Network Setup", category: "tech" },
    { name: "Escalation Handling", category: "ops" },
    { name: "Tech Troubleshooting", category: "tech" },
];

const categoryColors = {
    leadership: "border-purple-400/20 text-purple-300 hover:border-purple-400/50 hover:bg-purple-400/5",
    business: "border-green-400/20 text-green-300 hover:border-green-400/50 hover:bg-green-400/5",
    tech: "border-[hsl(var(--electric-cyan)/0.2)] text-[hsl(var(--electric-cyan))] hover:border-[hsl(var(--electric-cyan)/0.5)] hover:bg-[hsl(var(--electric-cyan)/0.05)]",
    ops: "border-yellow-400/20 text-yellow-300 hover:border-yellow-400/50 hover:bg-yellow-400/5",
};

export function SkillsMarquee() {
    const row1 = skills.slice(0, 12);
    const row2 = skills.slice(12);
    const duplicatedRow1 = [...row1, ...row1, ...row1, ...row1];
    const duplicatedRow2 = [...row2, ...row2, ...row2, ...row2];

    return (
        <section id="skills" className="section-padding overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="container-main mb-12">
                <p className="text-center text-fluid-xs text-primary uppercase tracking-[0.3em] mb-4">
                    Expertise
                </p>
                <h2 className="text-center text-fluid-3xl font-bold text-foreground mb-4">
                    Skills & Proficiencies
                </h2>
                <p className="text-center text-muted-foreground font-serif italic">
                    &quot;Expert in Sales, Coding, and Operations&quot;
                </p>
            </div>

            {/* Row 1 - Slides Left */}
            <div className="relative mb-8 transform-gpu">
                <div className="flex gap-4 animate-marquee w-max">
                    {duplicatedRow1.map((skill, index) => (
                        <SkillPill key={`row1-${index}`} skill={skill} />
                    ))}
                </div>
            </div>

            {/* Row 2 - Slides Right */}
            <div className="relative transform-gpu">
                <div className="flex gap-4 animate-marquee-reverse w-max">
                    {duplicatedRow2.map((skill, index) => (
                        <SkillPill key={`row2-${index}`} skill={skill} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function SkillPill({ skill }: { skill: typeof skills[0] }) {
    return (
        <div
            className={cn(
                "flex-shrink-0 px-6 py-3 rounded-full border backdrop-blur-sm transition-all duration-300",
                "bg-card",
                categoryColors[skill.category as keyof typeof categoryColors]
            )}
        >
            <span className="text-sm font-medium whitespace-nowrap">
                {skill.name}
            </span>
        </div>
    );
}
