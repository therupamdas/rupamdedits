"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, type MotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { Buttonx } from "./Buttonx";

// --- Types & Constants ---

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  ref?: React.Ref<HTMLDivElement>;
}

const MARQUEE_ITEMS = [
  "Creator",
  "Brand",
  "Campaign",
  "Commercial",
  "Social",
  "Documentary",
];

// --- Sub-components ---

function ScrollProgressBar({ className, ref, ...props }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={cn(
        // Changed to absolute so it perfectly aligns with the top of the sticky header
        "absolute inset-x-0 top-0 z-50 h-0.5 origin-left bg-linear-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  );
}

function CarouselItem({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center text-sm font-medium font-bebas text-neutral-800 px-8 whitespace-nowrap">
      {text}
      <span className="ml-8 text-neutral-300">·</span>
    </div>
  );
}

// --- Main Export ---

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white will-change-transform transform-gpu flex flex-col border-b shadow-sm">
      {/* 1. Scroll Progress */}
      <ScrollProgressBar />

      {/* 2. Main Navigation Links */}
      <div className="ml-5 md:ml-10 px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            // Only prevent navigation and smooth scroll IF we are already on the home page
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-semibold tracking-tight text-xl"
        >
          rupamedits<span className="text-neutral-400">.com</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Buttonx
            buttonClassName="w-28"
            beamDuration={4}
            beamDelay={2}
            beamSize={0}
            href="#work"
          >
            Work
          </Buttonx>
          <Buttonx
            buttonClassName="w-28"
            beamDuration={4}
            beamDelay={2}
            beamSize={0}
            href="#services"
          >
            Services
          </Buttonx>
          <Buttonx
            buttonClassName="w-28"
            beamDuration={4}
            beamDelay={2}
            beamSize={0}
            href="#contact"
          >
            Contact
          </Buttonx>
          <Buttonx
            buttonClassName="w-28"
            wrapperClassName="relative overflow-hidden"
            beamDuration={4}
            beamDelay={2}
            beamSize={0}
            href="#about"
          >
            About
          </Buttonx>
        </nav>
      </div>

      {/* 3. Marquee Ticker */}
      <div className="w-full border-t pb-0.5 bg-white overflow-hidden">
        <div className="relative w-full mx-auto overflow-hidden">
          <div
            className="flex w-max gap-30 pr-8"
            style={{ animation: "marquee 36s linear infinite" }}
          >
            {[...Array(4)].flatMap((_, ci) =>
              MARQUEE_ITEMS.map((item, i) => (
                <CarouselItem key={`${ci}-${i}`} text={item} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Marquee Keyframes */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </header>
  );
}