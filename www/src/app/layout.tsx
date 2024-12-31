import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-200">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <nav className="flex gap-2 border-b border-black">
          <Link href="/" className="flex gap-2 p-1 hocus:bg-slate-300">
            <HomeIcon />
            <span>Home</span>
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}