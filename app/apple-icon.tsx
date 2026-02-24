import { ImageResponse } from "next/og";

// Static apple icon — no external dependencies
export const runtime = "edge";

export const size = {
    width: 180,
    height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 96,
                    background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    borderRadius: "40px",
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                }}
            >
                AK
            </div>
        ),
        { ...size }
    );
}
