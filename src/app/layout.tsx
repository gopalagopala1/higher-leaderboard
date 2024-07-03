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
    title: "Engagement Leaderboard for /higher",
    description:
      "Check where you're at inside the community based on engagement.",
    url: "https://www.higherboard.xyz/",
    siteName: "Higherboard",
    type: "website",
    images: [
      {
        url: "https://www.higherboard.xyz/higher_preview.png",
        secureUrl: "https://www.higherboard.xyz/higher_preview.png",
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
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={kreadonBold.className}>{children}</body>
    </html>
  );
}
