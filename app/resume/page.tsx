import { Metadata } from "next";
import { LinkButton } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Resume",
    description: "Download Aditya Kumar's resume - Business Development Team Leader and Full-Stack Developer.",
    openGraph: {
        title: "Aditya Kumar - Resume",
        description: "Business Development Team Leader | Full-Stack Developer | VRL Logistics",
        type: "profile",
        images: [
            {
                url: "/og-resume.png",
                width: 1200,
                height: 630,
                alt: "Aditya Kumar Resume",
            },
        ],
    },
};

export default function ResumePage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                {/* Icon */}
                <div className="mx-auto mb-8 w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Download className="h-10 w-10 text-primary" />
                </div>

                {/* Heading */}
                <h1 className="text-fluid-3xl font-bold text-foreground mb-4">
                    My Resume
                </h1>
                <p className="text-muted-foreground mb-8">
                    Download my resume to learn more about my experience, skills, and qualifications.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <LinkButton
                        href="/resume.pdf"
                        download="Aditya_Kumar_Resume.pdf"
                        variant="default"
                        size="lg"
                    >
                        <Download className="mr-2 h-5 w-5" />
                        Download PDF
                    </LinkButton>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Portfolio
                    </Link>
                </div>

                {/* Resume Preview Embed */}
                <div className="mt-12 rounded-2xl border border-border bg-card overflow-hidden">
                    <iframe
                        src="/resume.pdf"
                        className="w-full h-[600px]"
                        title="Resume Preview"
                    />
                </div>
            </div>
        </div>
    );
}
