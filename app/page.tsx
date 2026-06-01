"use client";

import Contact from "@/components/layout/Contact";
import Hero from "@/components/layout/Hero";
import BrandMarquee from "@/components/layout/BrandMarquee";
import FeaturedWork from "@/components/layout/FeaturedWork";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Navmarq from "@/components/layout/Navmagg";
import Services from "@/components/layout/Services";

type Row = {
  id: string;
  title: string;
  thumb: string;
  video: string | null;
  insta_name: string | null;
  insta_link: string | null;
};

type Project = {
  id: string;
  title: string;
  thumb_url: string | null;
  video_url: string | null;
  insta_name: string | null;
  insta_link: string | null;
};

export default function Home() {
  return (
    <div className="bg-fixed text-neutral-900 ">
      <ScrollProgress className="top-17.8" />
      <Navmarq />
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
