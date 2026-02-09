import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";

// Dynamic imports for heavy sections
const ImpactMetrics = dynamic(
    () =>
        import("@/components/sections/impact-metrics").then(
            (mod) => mod.ImpactMetrics
        ),
    { ssr: true }
);

const BentoGrid = dynamic(
    () =>
        import("@/components/sections/bento-grid").then((mod) => mod.BentoGrid),
    { ssr: true }
);

const Timeline = dynamic(
    () => import("@/components/sections/timeline").then((mod) => mod.Timeline),
    { ssr: true }
);

const SkillsMarquee = dynamic(
    () =>
        import("@/components/sections/skills-marquee").then(
            (mod) => mod.SkillsMarquee
        ),
    { ssr: true }
);

const ContactSection = dynamic(
    () =>
        import("@/components/sections/contact-section").then(
            (mod) => mod.ContactSection
        ),
    { ssr: true }
);

export default function Home() {
    return (
        <>
            <Hero />
            <ImpactMetrics />
            <BentoGrid />
            <Timeline />
            <SkillsMarquee />
            <ContactSection />
        </>
    );
}
