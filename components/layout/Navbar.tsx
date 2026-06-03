"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BorderBeam } from "../ui/border-beam";

export default function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="ml-5 md:ml-10 px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-semibold tracking-tight text-xl"
          >
            rupamedits<span className="text-neutral-400">.com</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <div className="relative overflow-hidden rounded-md bg-white text-sm text-black 
              transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
              <Button
                asChild
                variant="outline"
                className="h-12  sm:w-26 border-white bg-white text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white px-6 py-2 rounded-sm text-lg font-semibold transition-colors duration-200"
              >
                <Link href="#work" className="flex items-center">
                  Work
                </Link>
              </Button>
              <BorderBeam duration={3} size={50} />
            </div>

            <div className="relative overflow-hidden rounded-md bg-white text-sm text-black 
              transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
              <Button
                asChild
                variant="outline"
                className="h-12  sm:w-26 border-white bg-white text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white px-6 py-2 rounded-sm text-lg font-semibold transition-colors duration-200"
              >
                <Link href="#services" className="flex items-center">
                  Services
                </Link>
              </Button>
              <BorderBeam duration={3} size={50} />
            </div>

            <div className="relative overflow-hidden rounded-md bg-white text-sm text-black 
              transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
              <Button
                asChild
                variant="outline"
                className="h-12  sm:w-26 border-white bg-white text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white px-6 py-2 rounded-sm text-lg font-semibold transition-colors duration-200"
              >
                <Link href="#about" className="flex items-center">
                  About
                </Link>
              </Button>
              <BorderBeam duration={3} size={50} />
            </div>

            <div className="relative overflow-hidden rounded-md bg-white text-sm text-black 
              transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
              <Button
                asChild
                variant="outline"
                className="h-12  sm:w-26 border-white bg-white text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white px-6 py-2 rounded-sm text-lg font-semibold transition-colors duration-200"
              >
                <Link href="#contact" className="flex items-center">
                  Contact
                </Link>
              </Button>
              <BorderBeam duration={3} size={50} />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
