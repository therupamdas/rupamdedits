import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomContextMenu from "@/components/layout/CustomContextMenu";
import SpotlightBackground from "@/components/layout/SpotlightBackground";
import { Pointer } from "@/components/ui/pointer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // <-- Added swap here so paragraphs paint instantly
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});
// (Deleted the duplicate 'bebas' initialization!)

export const metadata: Metadata = {
  title: "Rupam Edits",
  description:
    "Premium video editing for creators, brands and campaigns. Based in Kolkata.",
  keywords: ["video editor", "kolkata", "reels", "commercial", "rupam edits"],
  openGraph: {
    title: "Rupam Edits",
    description: "Premium video editing for creators and brands.",
    url: "https://rupam-edits.vercel.app",
    siteName: "Rupam Edits",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-sans flex flex-col antialiased text-neutral-900 bg-transparent select-none">
        <CustomContextMenu>
          <SpotlightBackground />
          <Navbar />
          <main className="grow flex flex-col relative z-10">{children}</main>
          <Footer />
        </CustomContextMenu>
        <Pointer className="fill-green-500" />
      </body>
    </html>
  );
}