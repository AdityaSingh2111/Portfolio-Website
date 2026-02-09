import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
    themeColor: "#000000",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // Prevents zooming for a more native app feel
};
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ClientWrapper } from "@/components/layout/client-wrapper";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    variable: "--font-instrument",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://adityaks-portfolio.vercel.app"),
    title: {
        default: "Aditya Kumar | Business Development Team Leader | CRM & IT Specialist",
        template: "%s | Aditya Kumar",
    },
    description:
        "High-performing Team Leader & IT Specialist at VRL Logistics. Managed 12-member team with 0% attrition, #1 sales rank, ₹7L+ monthly revenue. Expert in Sales, Coding, and Operations.",
    keywords: [
        "Aditya Kumar",
        "Business Development",
        "Team Leader",
        "CRM Specialist",
        "IT Specialist",
        "VRL Logistics",
        "React.js",
        "Firebase",
        "Sales",
        "New Delhi",
    ],
    authors: [{ name: "Aditya Kumar" }],
    creator: "Aditya Kumar",
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://adityaks-portfolio.vercel.app",
        siteName: "Aditya Kumar Portfolio",
        title: "Aditya Kumar | Business Development Team Leader",
        description:
            "High-performing Team Leader & IT Specialist. ₹7L+ revenue, 0% attrition, #1 sales rank.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Aditya Kumar Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Aditya Kumar | Business Development Team Leader",
        description:
            "Team Leader & IT Specialist at VRL Logistics. Expert in Sales, Coding, and Operations.",
        images: ["/og-image.png"],
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Aditya Kumar",
    },
    formatDetection: {
        telephone: false,
    },
    other: {
        "mobile-web-app-capable": "yes",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${instrumentSerif.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
            >
                <ClientWrapper>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                    <ScrollToTop />
                </ClientWrapper>
            </body>
        </html>
    );
}
