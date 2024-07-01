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
  openGraph: { title: "higherboard", images: "/higherboard.png" },
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
