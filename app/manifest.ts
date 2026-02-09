import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Aditya Kumar Portfolio",
        short_name: "Aditya Kumar",
        description: "Portfolio of Aditya Kumar - Business Development Team Leader & IT Specialist",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
            {
                src: "/icon",
                sizes: "192x192",
                type: "image/png",
                purpose: "any maskable" as any,
            },
            {
                src: "/icon",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable" as any,
            },
        ],
    };
}
