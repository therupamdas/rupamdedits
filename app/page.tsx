"use client";

import Contact from "@/components/layout/Contact";
import Hero from "@/components/layout/Hero";
import BrandMarquee from "@/components/layout/BrandMarquee";
import FeaturedWork from "@/components/layout/FeaturedWork";
import Services from "@/components/layout/Services";
export default function Home() {
  return (
    <div className="text-neutral-900 ">

      <main id="home">
        <Hero />
        <FeaturedWork />
        <Services />
        <BrandMarquee />
        <Contact />
      </main>
    </div>
  );
}
