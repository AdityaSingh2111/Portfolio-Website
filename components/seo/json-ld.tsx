export function JsonLd() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Aditya Kumar",
        jobTitle: "Frontend Developer",
        description:
            "Frontend Developer and React Specialist building performant web applications with React, Next.js, and TypeScript.",
        url: "https://adityaks-portfolio.vercel.app",
        image: "https://adityaks-portfolio.vercel.app/profile.jpg",
        email: "adityaks2111@gmail.com",
        telephone: "+918102408762",
        address: {
            "@type": "PostalAddress",
            addressLocality: "New Delhi",
            addressCountry: "IN",
        },
        sameAs: [
            "https://github.com/adityasingh2111",
            "https://linkedin.com/in/aditya2111",
        ],
        knowsAbout: [
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "Frontend Development",
            "Web Performance",
            "Progressive Web Apps",
        ],
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Aditya Kumar Portfolio",
        url: "https://adityaks-portfolio.vercel.app",
        description:
            "Portfolio of Aditya Kumar — Frontend Developer & React Specialist based in India.",
        author: {
            "@type": "Person",
            name: "Aditya Kumar",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(personSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
        </>
    );
}
