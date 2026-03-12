import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Wayora – Travel Beyond Maps, Explore Beyond Limits",
  description: "Wayora is your AI-powered travel companion. Plan personalized itineraries, track budgets smartly, discover local artisans, and explore with confidence. Travel, Reimagined.",
  keywords: "travel, AI itinerary, trip planner, budget tracker, travel safety, artisan marketplace, wandrix, gamified travel",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="pt-16 md:pt-16 pb-20 md:pb-0 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
