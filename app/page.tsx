"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
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
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import BrandMarquee from "@/components/layout/BrandMarquee";

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

const BUCKET = "media";

function ThumbWithSkeleton({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden ">
      {!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <img
        src={src}
        alt="project thumbnail"
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("id", { ascending: false });

        if (error) throw error;

        const mapped: Project[] = (data as Row[]).map((p) => {
          const thumb_url = p.thumb
            ? supabase.storage.from(BUCKET).getPublicUrl(p.thumb)?.data
                ?.publicUrl || ""
            : "";

          const video_url = p.video
            ? supabase.storage.from(BUCKET).getPublicUrl(p.video)?.data
                ?.publicUrl || ""
            : "";

          return {
            id: p.id,
            title: p.title,
            thumb_url,
            video_url,
            insta_name: p.insta_name || null,
            insta_link: p.insta_link || null,
          };
        });

        setProjects(mapped);
      } catch (err: any) {
        console.error("Error fetching projects:", err.message || err);
      } finally {
        setLoading(false);
      }
    };

    //fetchProjects();
  }, []);

  return (
    <div className="bg-fixed  text-neutral-900 ">
      <main id="home">
        <Hero />
        {/* Work Section */}
        <section
          id="work"
          className="scroll-mt-20 ml-8 px-4 py-10"
        >
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-5xl text-neutral-800 font-bebas uppercase font-bold">
              Featured Work
            </h2>
            <a
              href="#contact"
              className="text-sm hover:opacity-70 flex items-center"
            >
              Request full portfolio <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          <Separator className="my-6" />

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-3/5 w-full rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[60%]" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <p className="text-neutral-500">No projects yet...</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-5">
              {projects.map((p) => (
                <motion.div
                  key={p.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group relative block overflow-hidden rounded-2xl border"
                >
                  {p.video_url ? (
                    <video
                      src={p.video_url}
                      poster={p.thumb_url || ""}
                      className="aspect-3/5 border-0 object-cover transition-transform duration-300"
                      loop
                      playsInline
                      muted
                      preload="metadata"
                      onMouseEnter={(e) => {
                        const video = e.currentTarget;
                        if (video.readyState >= 2) {
                          document.querySelectorAll("video").forEach((v) => {
                            if (v !== video) v.pause();
                          });
                          video.currentTime = 0;
                          video.play().catch(() => {});
                        } else {
                          video.oncanplay = () => {
                            document.querySelectorAll("video").forEach((v) => {
                              if (v !== video) v.pause();
                            });
                            video.play().catch(() => {});
                          };
                        }
                      }}
                    />
                  ) : (
                    <ThumbWithSkeleton src={p.thumb_url || ""} />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/70 via-black/30 to-transparent flex items-end justify-between">
                    <div className="text-white drop-shadow-md">
                      <div className="text-base font-semibold leading-tight wrap-break-word flex-1 min-w-0 hidden sm:block">
                        {p.title}
                      </div>

                      {p.insta_link && p.insta_name && (
                        <a
                          href={p.insta_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-white hover:text-purple-400 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-3.5 h-3.5 shrink-0"
                          >
                            <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm10.5 1.5a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                          </svg>
                          <span className="leading-none">{p.insta_name}</span>
                        </a>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full z-10 bg-white/90 text-black hover:bg-purple-600 hover:text-white transition shrink-0 hidden sm:inline-flex"
                      onClick={(e) => {
                        e.stopPropagation();
                        const video = e.currentTarget
                          .closest(".group")
                          ?.querySelector("video");
                        if (!video) return;
                        document.querySelectorAll("video").forEach((v) => {
                          if (v !== video) v.pause();
                        });
                        if (video.paused) {
                          video.currentTime = 0;
                          video.play().catch(() => {});
                        }
                      }}
                    >
                      Play
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Services Section */}
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
