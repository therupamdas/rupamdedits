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
        <div className="ml-10 px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="cursor-none font-semibold tracking-tight text-xl">
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

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-6">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <nav className="flex flex-col gap-4">
                <SheetClose asChild>
                  <a href="#work">Work</a>
                </SheetClose>
                <SheetClose asChild>
                  <a href="#services">Services</a>
                </SheetClose>
                <SheetClose asChild>
                  <a href="#about">About</a>
                </SheetClose>
                <SheetClose asChild>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <Button
                      asChild
                      className="rounded-md font-semibold shadow-md hover:shadow-xl
             bg-linear-to-r from-pink-500 via-red-500 to-yellow-500
             text-white hover:brightness-110 transition-all duration-200"
                    >
                      <a href="#contact">Book a call</a>
                    </Button>
                  </motion.div>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      
    </>
  );
}
