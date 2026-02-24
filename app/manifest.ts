import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Aditya Kumar — Frontend Developer",
        short_name: "Aditya Kumar",
        description:
            "Frontend Developer building performant web apps with React, Next.js, and TypeScript.",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        orientation: "portrait-primary",
        scope: "/",
        lang: "en",
        categories: ["portfolio", "developer", "personal"],
        icons: [
            {
                src: "/icon",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/icon",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}
