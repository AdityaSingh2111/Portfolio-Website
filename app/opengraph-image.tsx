import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Aditya Kumar — Frontend Developer & React Specialist";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default function OgImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px",
                    background: "#0a0a0a",
                    fontFamily: "system-ui, sans-serif",
                    position: "relative",
                }}
            >
                {/* Subtle gradient accent */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: "linear-gradient(90deg, #2563eb, #06b6d4, #2563eb)",
                    }}
                />

                {/* Content */}
                <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
                    {/* Monogram circle */}
                    <div
                        style={{
                            width: "160px",
                            height: "160px",
                            borderRadius: "80px",
                            background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "72px",
                            fontWeight: 700,
                            color: "white",
                            letterSpacing: "-0.03em",
                            flexShrink: 0,
                        }}
                    >
                        AK
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div
                            style={{
                                fontSize: "56px",
                                fontWeight: 700,
                                color: "white",
                                letterSpacing: "-0.02em",
                                lineHeight: 1.1,
                            }}
                        >
                            Aditya Kumar
                        </div>
                        <div
                            style={{
                                fontSize: "28px",
                                color: "#60a5fa",
                                fontWeight: 500,
                            }}
                        >
                            Frontend Developer & React Specialist
                        </div>
                    </div>
                </div>

                {/* Tech stack */}
                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        marginTop: "48px",
                    }}
                >
                    {["React", "Next.js", "TypeScript", "PWA"].map((tech) => (
                        <div
                            key={tech}
                            style={{
                                padding: "8px 20px",
                                borderRadius: "999px",
                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                color: "rgba(255, 255, 255, 0.7)",
                                fontSize: "18px",
                                fontWeight: 500,
                            }}
                        >
                            {tech}
                        </div>
                    ))}
                </div>

                {/* URL */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "40px",
                        right: "80px",
                        fontSize: "18px",
                        color: "rgba(255, 255, 255, 0.3)",
                    }}
                >
                    adityaks-portfolio.vercel.app
                </div>
            </div>
        ),
        { ...size }
    );
}
