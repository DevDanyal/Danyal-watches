import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import Providers from "@/app/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CRYSMA Watches - Premium Timepieces",
  description:
    "Discover premium watches for men, women, and couples. Free nationwide shipping, 7-day easy returns, 1-year warranty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          <Footer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}