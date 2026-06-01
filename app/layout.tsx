// app/layout.tsx
import type { Metadata } from "next"
import { Inter, Bebas_Neue } from "next/font/google"
import "./globals.css"

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// 1. Import your new interactive background
import SpotlightBackground from "@/components/layout/SpotlightBackground"; 

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
})

export const metadata: Metadata = {
  title: "Rupam Edits",
  description: "Premium video editing for creators, brands and campaigns. Based in Kolkata.",
  keywords: ["video editor", "kolkata", "reels", "commercial", "rupam edits"],
  openGraph: {
    title: "Rupam Edits",
    description: "Premium video editing for creators and brands.",
    url: "https://rupam-edits.vercel.app",
    siteName: "Rupam Edits",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      {/* 2. Removed the bg-fixed and gradient classes, kept flexbox for structure */}
      <body className="min-h-screen flex flex-col antialiased text-neutral-900 bg-transparent">
        
        {/* 3. Inject the background behind everything */}
        <SpotlightBackground />
        
        <Navbar />
        
        <main className="grow flex flex-col relative z-10">
          {children}
        </main>
        
        <Footer />
        
      </body>
    </html>
  )
}