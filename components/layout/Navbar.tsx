"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, type MotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { Buttonx } from "./Buttonx";
import { Button } from "../ui/button";
import Image from "next/image";
import { Menu, LogOut, User } from "lucide-react";
import { createClient } from "@/lib/client";
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
        "absolute inset-x-0 top-0 z-50 h-0.5 origin-left bg-linear-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
        className,
      )}
      style={{ scaleX: scrollYProgress }}
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
export default function Navbar({ user }: { user?: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // Dropdown State & Ref
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    setIsProfileOpen(false);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white will-change-transform transform-gpu flex flex-col border-b shadow-sm">
      <ScrollProgressBar />

      <div className="ml-5 md:ml-10 px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-semibold normal tight text-xl"
        >
          rupamedits<span className="text-neutral-400">.com</span>
        </Link>

        {/* --- DESKTOP NAV --- */}
        <nav className="hidden md:flex items-center gap-2 text-sm">
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

          {/* 1. DASHBOARD IS ALWAYS VISIBLE - Routes to login if !user */}
          <Buttonx
            buttonClassName="w-28 font-normal"
            wrapperClassName="relative overflow-hidden"
            beamDuration={4}
            beamDelay={2}
            beamSize={0}
            href={user ? "/dashboard" : "/login"}
          >
            Dashboard
          </Buttonx>

          {/* 2. AUTHENTICATION CONDITIONAL RENDERING */}
          {!user ? (
            <Buttonx
              buttonClassName="w-28 font-normal bg-neutral-900 text-white hover:bg-neutral-800"
              beamDuration={4}
              beamDelay={2}
              beamSize={0}
              href="/login"
            >
              Sign In
            </Buttonx>
          ) : (
            <div className="relative mt-2 group" ref={dropdownRef}>
              <Buttonx
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                beamDuration={4}
                beamDelay={2}
                beamSize={30}
                buttonClassName="p-0 w-12 aspect-square border-0 h-12 rounded-md"
                wrapperClassName="p-0 w-12 aspect-square border-0 h-12 rounded-md"
              >
                <Image
                  src="/rupam.png"
                  alt="Profile"
                  width={50}
                  height={50}
                  className="object-cover aspect-square border-0 rounded-md p-0"
                />
              </Buttonx>

              {/* 🚨 HYBRID DROPDOWN: Uses state (isProfileOpen) OR CSS (group-hover) */}
              <div
                className={cn(
                  "absolute right-0 mt-3 w-48 bg-white border border-neutral-100 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-1 flex-col z-50 overflow-hidden transition-all duration-200",
                  // If clicked open, show it. Otherwise, hide it UNLESS hovered.
                  isProfileOpen
                    ? "flex opacity-100 visible translate-y-0"
                    : "invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 flex",
                )}
              >
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 border-b border-neutral-100"
                >
                  <User className="w-4 h-4 text-neutral-500" /> My Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 w-full text-left transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* --- MOBILE NAV (SHEET) --- */}
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

                {/* MOBILE DASHBOARD ALWAYS VISIBLE */}
                <SheetClose asChild>
                  <Link
                    className="w-full pl-2 pt-2 h-12 text-lg text-left text-neutral-900 font-medium"
                    href={user ? "/dashboard" : "/login"}
                  >
                    Dashboard
                  </Link>
                </SheetClose>

                {/* MOBILE AUTH RENDERING */}
                {!user ? (
                  <SheetClose asChild>
                    <Link
                      className="w-full pl-2 pt-4 h-12 text-lg text-left text-neutral-900 font-semibold"
                      href="/login"
                    >
                      Sign In
                    </Link>
                  </SheetClose>
                ) : (
                  <>
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
                          <p className="text-xs text-neutral-500">
                            Manage account
                          </p>
                        </div>
                        <BorderBeam />
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <button
                        onClick={handleSignOut}
                        className="w-full pl-2 pt-6 flex items-center gap-2 text-lg text-left text-red-600 font-normal"
                      >
                        <LogOut className="w-5 h-5" /> Sign Out
                      </button>
                    </SheetClose>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Marquee Ticker */}
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

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </header>
  );
}
