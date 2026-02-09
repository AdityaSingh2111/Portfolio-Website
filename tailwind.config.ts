import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                serif: ["var(--font-instrument)", "Georgia", "serif"],
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                border: "hsl(var(--border))",
                "electric-blue": "hsl(var(--electric-blue))",
                "electric-cyan": "hsl(var(--electric-cyan))",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
                "2xl": "24px",
                "3xl": "32px",
                "4xl": "40px",
            },
            backdropBlur: {
                xs: "4px",
                sm: "var(--blur-sm)",
                md: "var(--blur-md)",
                lg: "var(--blur-lg)",
                xl: "var(--blur-xl)",
                "2xl": "64px",
            },
            spacing: {
                "18": "4.5rem",
                "22": "5.5rem",
                "30": "7.5rem",
                "section": "var(--section-gap)",
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "float-slow": "float 10s ease-in-out infinite",
                "glow-pulse": "glow-pulse 3s ease-in-out infinite",
                "shimmer": "shimmer 2.5s linear infinite",
                "fade-in": "fade-in 0.6s ease-out forwards",
                "fade-up": "fade-up 0.6s ease-out forwards",
                "scale-in": "scale-in 0.5s ease-out forwards",
                "slide-left": "slide-left 30s linear infinite",
                "slide-right": "slide-right 35s linear infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
                    "50%": { transform: "translateY(-20px) rotate(2deg)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                "slide-left": {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "slide-right": {
                    "0%": { transform: "translateX(-50%)" },
                    "100%": { transform: "translateX(0)" },
                },
            },
            transitionTimingFunction: {
                "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
                "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
            },
            transitionDuration: {
                "400": "400ms",
                "600": "600ms",
            },
        },
    },
    plugins: [],
};

export default config;
