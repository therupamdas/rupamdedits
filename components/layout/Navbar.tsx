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
            <a
              href="#work"
              className="cursor-none px-6 py-2 rounded-sm text-lg font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors duration-200"
            >
              Work
            </a>

            <a
              href="#services"
              className="cursor-none px-6 py-2 rounded-sm text-lg font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors duration-200"
            >
              Services
            </a>

            <a
              href="#about"
              className=" cursor-none px-6 py-2 rounded-sm text-lg font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors duration-200"
            >
              About
            </a>

            <a
              href="#contact"
              className=" cursor-none px-6 py-2 rounded-sm text-lg font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors duration-200"
            >
              Book a Call
            </a>
          </nav>

        </div>
      </header>
    </>
  );
}
