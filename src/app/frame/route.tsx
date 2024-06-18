//@ts-nocheck
import { ImageResponse } from "next/og";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  const reason = searchParams.get("reason") ?? "something";

  const imageData = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/images/background.png`
  ).then((res) => res.arrayBuffer());

  const fontData = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/fonts/Kreadon-Demi.ttf`
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "relative",
        }}
      >
        I am here
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { data: fontData, style: "normal", weight: 600, name: "Kreadon-Demi" },
      ],
    }
  );
}
