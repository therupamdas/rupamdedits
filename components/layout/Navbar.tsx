"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, type MotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { Buttonx } from "./Buttonx";
import { Button } from "../ui/button";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BorderBeam } from "../ui/border-beam";
// --- Types & Constants ---

interface ScrollProgressProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof MotionProps
> {
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
        className,
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
          className="font-semibold normal tight text-xl"
        >
          rupamedits<span className="text-neutral-400">.com</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Buttonx
            buttonClassName="w-28 font-normal"
            beamDuration={4}
            beamDelay={2}
            beamSize={0}
            href="/#work"
          >
            Portfolio
          </Buttonx>
          <Buttonx
            buttonClassName="w-28 font-normal"
            beamDuration={4}
            beamDelay={2}
            beamSize={0}
            href="/#services"
          >
            Services
          </Buttonx>
          <Buttonx
            buttonClassName="w-28 font-normal"
            beamDuration={4}
            beamDelay={2}
            beamSize={0}
            href="/#contact"
          >
            Contact
          </Buttonx>
          <Buttonx
            buttonClassName="w-28 font-normal"
            wrapperClassName="relative overflow-hidden"
            beamDuration={4}
            beamDelay={2}
            beamSize={0}
            href="/dashboard"
          >
            Dashboard
          </Buttonx>
          <Button
            variant="outline"
            className="h-12 w-12 py-0 p-0 rounded-sm border-0 hover:shadow-[4px_4px_0px_0px] dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <Link
              href="/dashboard/profile"
              className="flex justify-center items-center"
            >
              <Image
                src="/rupam.png"
                alt=""
                width={50}
                height={50}
                className="rounded-sm aspect-square object-fill bg-white py-0 p-0"
              />
            </Link>
          </Button>
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-neutral-900"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-100 bg-white">
              <SheetHeader>
                <SheetTitle className="text-left font-bebas text-3xl uppercase tracking-wide">
                  rupamedits<span className="text-neutral-400">.com</span>
                </SheetTitle>
              </SheetHeader>
              <div className="border-t border-neutral-300"></div>
              <div className="flex flex-col gap-1">
                {/* Wrapping each in SheetClose so the menu closes on click */}
                <SheetClose asChild>
                  <Link
                    className="w-full pl-2 pt-2 h-12 text-lg text-left text-neutral-600 font-normal"
                    href="/#work"
                  >
                    Portfolio
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className="w-full pl-2 pt-2 h-12 text-lg text-left text-neutral-600 font-normal"
                    href="/#services"
                  >
                    Services
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    className="w-full pl-2 pt-2 h-12 text-lg text-left text-neutral-900 font-medium"
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </SheetClose>

                <div className="my-4 mx-3 border-t border-neutral-300"></div>

                <SheetClose asChild>
                  <Link
                    href="/dashboard/profile"
                    className=" relative flex items-center bg-green-100 gap-4 p-4 ml-1.5 mr-3 rounded-md hover:bg-neutral-50 transition-colors"
                  >
                    <Image
                      src="/rupam.png"
                      alt="Profile"
                      width={48}
                      height={48}
                      className="rounded-sm aspect-square object-cover bg-white shadow-sm"
                    />
                    <div>
                      <p className="font-semibold text-neutral-900">
                        My Profile
                      </p>
                      <p className="text-xs text-neutral-500">Manage account</p>
                    </div>
                    <BorderBeam />
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
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
              )),
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
