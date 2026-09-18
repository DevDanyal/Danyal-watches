import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Danyal Watches - Premium Timepieces",
    template: "%s",
  },
  description:
    "Discover premium watches for men, women, and couples. Free nationwide shipping, 7-day easy returns, 1-year warranty.",
  keywords: [
    "Danyal",
    "watches",
    "men's watches",
    "women's watches",
    "couple watches",
    "luxury watches",
    "Pakistani watch brand",
    "quartz watches",
  ],
  openGraph: {
    title: "Danyal Watches - Premium Timepieces",
    description:
      "Discover premium watches for men, women, and couples. Free nationwide shipping, 7-day easy returns, 1-year warranty.",
    type: "website",
    locale: "en_PK",
    images: ["/images/home/images (8).jpg"],
  },
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
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}