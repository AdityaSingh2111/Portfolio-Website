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
                "fade-in": "fade-in 0.3s ease-out forwards",
                "fade-up": "fade-up 0.3s ease-out forwards",
                "scale-in": "scale-in 0.25s ease-out forwards",
                "slide-left": "slide-left 30s linear infinite",
                "slide-right": "slide-right 35s linear infinite",
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.97)" },
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
            },
        },
    },
    plugins: [],
};

export default config;
