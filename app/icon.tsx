import { ImageResponse } from "next/og";

// Static icon — no external dependencies, no circular fetches
export const runtime = "edge";

export const size = {
    width: 512,
    height: 512,
};
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 260,
                    background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    borderRadius: "128px",
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
