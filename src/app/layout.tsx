import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const kreadonBold = localFont({ src: "../../public/fonts/Kreadon-Bold.ttf" });

export const metadata: Metadata = {
  title: "Higherboard",
  description:
    "Leaderboard to display user engagement on higher farcaster channel",
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
