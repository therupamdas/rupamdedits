"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase_client";
import { Play, Sparkles, Mail, ArrowRight } from "lucide-react";
import Contact from "@/components/layout/Contact";
import Hero from "@/components/layout/Hero";
import {
  Clapperboard,
  Scissors,
  Briefcase,
  Music,
  Palette,
} from "lucide-react";
import BrandMarquee from "@/components/layout/BrandMarquee";
import FeaturedWork from "@/components/layout/FeaturedWork";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const imageUrl = "/mypic.png";

  useEffect(() => {
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => setIsLoaded(true);
  }, []);



  const services = [
    {
      id: "s1",
      title: "Commercial Editing",
      description:
        "High-quality edits for ads, brand films, and promotional content that engage and convert.",
      icon: Clapperboard,
    },
    {
      id: "s2",
      title: "Event Highlights",
      description:
        "Cinematic highlight reels for weddings, concerts, and events that capture emotions and memories.",
      icon: Sparkles,
    },
    {
      id: "s3",
      title: "Short-form Content",
      description:
        "Trendy, fast-paced edits for reels, YouTube Shorts, and TikToks that boost reach and engagement.",
      icon: Scissors,
    },
    {
      id: "s4",
      title: "Corporate Videos",
      description:
        "Professional edits for training, presentations, and internal communications with clarity and polish.",
      icon: Briefcase,
    },
    {
      id: "s5",
      title: "Music Videos",
      description:
        "Dynamic storytelling and rhythm-synced visuals that bring music to life.",
      icon: Music,
    },
    {
      id: "s6",
      title: "Color Grading",
      description:
        "Enhancing mood, tone, and consistency with professional color correction and grading.",
      icon: Palette,
    },
  ];


  return (
    <div className="bg-fixed  text-neutral-900 ">
      <main id="home">
        <Hero />
        <FeaturedWork/>
        <section
          id="services"
          className="ml-8 scroll-mt-20 px-4 py-10"
        >
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-5xl  text-neutral-800 font-bebas uppercase font-bold">Services</h2>
            <a
              href="#contact"
              className="text-sm hover:opacity-70 flex items-center "
            >
              Get a quote <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {services.map((s) => (
              <motion.div
                key={s.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group relative block border border-neutral-200 overflow-hidden rounded-lg backdrop-blur"
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium">{s.title}</h3>
                  <p className="text-sm text-neutral-600 mt-2">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        <BrandMarquee/>               
        <Contact/>       
      </main>
    </div>
  );
}
