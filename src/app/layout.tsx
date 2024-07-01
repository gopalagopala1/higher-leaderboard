import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const kreadonBold = localFont({ src: "../../public/fonts/Kreadon-Bold.ttf" });

export const metadata: Metadata = {
  title: "Higherboard",
  description:
    "Engagement tracking and recognition in higher community on warpcast",
  applicationName: "higerboard",
  authors: [
    { name: "Gopala", url: "https://warpcast.com/gopala" },
    { name: "Tushar", url: "https://warpcast.com/tusharvrma" },
    { name: "Rachna", url: "https://warpcast.com/rachna" },
  ],
  keywords: [
    "higherboard",
    "higher engagement tracking",
    "higher channel",
    "higher warpcast",
  ],
  openGraph: {
    title: "higherboard",
    description:
      "Engagement tracking and recognition in higher community on warpcast.",
    url: "https://www.higherboard.xyz/",
    siteName: "Higherboard",
    type: "website",
    images: [
      {
        url: "https://raw.githubusercontent.com/gopalagopala1/higher-leaderboard/main/public/higherboard.png",
        secureUrl:
          "https://raw.githubusercontent.com/gopalagopala1/higher-leaderboard/main/public/higherboard.png",
        width: 1200,
        height: 630,
        alt: "Higherboard Preview Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kreadonBold.className}>{children}</body>
    </html>
  );
}
