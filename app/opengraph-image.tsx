import { ImageResponse } from "next/og";

export const alt = "SABXI — Freshly Cut, Quickly Delivered";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #FAF8F5 0%, #FFE0CC 55%, #FFC79A 100%)",
          color: "#141414",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: "#FF6B00",
          }}
        >
          SABXI
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Freshly Cut, Quickly Delivered
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#4A4A4A",
              maxWidth: 820,
              lineHeight: 1.35,
            }}
          >
            Cut veggies, fruits & juices from Kurla Studio — at your door in under 30 minutes.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 600,
            color: "#2E8540",
          }}
        >
          sabxi.com
        </div>
      </div>
    ),
    { ...size }
  );
}
