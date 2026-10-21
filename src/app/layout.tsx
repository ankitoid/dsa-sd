import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Premium DSA & System Design Learning Platform`,
  description: siteConfig.description,
  keywords: [
    "Data Structures",
    "Algorithms",
    "System Design",
    "Engineering Interviews",
    "Computer Science",
    "Interactive Visualizers",
    "Software Architecture",
  ],
  authors: [{ name: siteConfig.author.name }],
  openGraph: {
    title: `${siteConfig.name} — Understand the engineering behind great software`,
    description: siteConfig.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased selection:bg-accent selection:text-[#112402]">
        <SmoothScrollProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
