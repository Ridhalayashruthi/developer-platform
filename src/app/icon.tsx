import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
          color: "#ffffff",
          fontSize: 30,
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: "-1px",
        }}
      >
        {"</>"}
      </div>
    ),
    {
      ...size,
    }
  );
}