import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/loading-animations.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AsHelp - Academic Assignment Platform",
  description:
    "Connect with verified toppers for seamless academic assistance. Get professional assignment writing services with 100% AI-free, plagiarism-free content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
