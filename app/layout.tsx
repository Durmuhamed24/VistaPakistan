import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VistaPakistan | Premium Travel Portal & AI Concierge",
  description: "Explore the natural wonders, ancient history, and cultural heritage of Pakistan with VistaPakistan. Plan your custom itineraries and consult our intelligent RAG chatbot.",
  keywords: ["Pakistan travel", "Hunza Valley", "Swat", "Skardu", "Pakistan tourism guide", "Itinerary Planner", "AI travel assistant"],
  authors: [{ name: "AI Course Project Group" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans bg-zinc-50 text-gray-800 antialiased min-h-screen flex flex-col justify-between selection:bg-[#d4af37]/35 selection:text-[#0f5132]">
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
