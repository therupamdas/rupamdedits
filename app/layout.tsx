import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/server"; // Your server client
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomContextMenu from "@/components/layout/CustomContextMenu";
import SpotlightBackground from "@/components/layout/SpotlightBackground";
import { Pointer } from "@/components/ui/pointer";
import { HideAuth } from "@/components/layout/HideAuth";
import { Analytics } from '@vercel/analytics/next';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  // ⚡ SPEED FIX: Decode the local session instantly instead of pinging the Auth server.
  // This completely unblocks your Root Layout rendering pipeline.
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-sans flex flex-col antialiased text-neutral-900 bg-transparent select-none">
        <CustomContextMenu>
          <SpotlightBackground />
          <HideAuth>
            <Navbar user={user} />
          </HideAuth>
          <main className="grow flex flex-col relative z-10">{children}</main>
          <HideAuth>
            <Footer />
          </HideAuth>
        </CustomContextMenu>
        <Pointer className="fill-green-500" />
        <Analytics />
      </body>
    </html>
  );
}
