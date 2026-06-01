"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Sparkles, Mail, ArrowRight } from "lucide-react";
import { BorderBeam } from "../ui/border-beam";
import { AuroraText } from "../ui/aurora-text";
import { NumberTicker } from "../ui/number-ticker";

export default function Hero() {
  return (
    <section className="mx-15 mt-4 px-5 sm:px-7  mb-6 sm:mb-9 p-4 sm:p-5 md:mb-14 overflow-hidden">
      <Badge
        variant="secondary"
        className="rounded-full drop-shadow-2xl mb-4 sm:mb-6 flex bg-white p-3 items-center gap-1 text-xs sm:text-sm"
      >
        <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Minimal. Precise.
        On-brand.
      </Badge>
      <h1 className="flex flex-col text-3xl sm:text-4xl md:text-6xl  font-bebas font-bold leading-snug sm:leading-tight tracking-tight text-neutral-800 drop-shadow text-left">
        
        <span>
          Video <AuroraText>Editing</AuroraText> for
        </span>
        <span>Creators and Brands</span>
      </h1>

      <p className="flex flex-col md:flex mt-4 sm:mt-6 text-neutral-600 max-w-full sm:max-w-xl text-sm sm:text-base">
        <span>
          I craft tight, story-first edits that boost watch time, clicks, and
          conversions.
        </span>
        <span>
          Short-form, YouTube, ads, and event highlights delivered with
          agency-level polish.
        </span>
      </p>
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
        <div className="rounded-md relative overflow-hidden bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
          <Button
            asChild
            variant="outline"
            className="w-36 h-12 rounded-md bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <a className="flex items-center flex-row" href="#work">
              <Play className="h-5 w-5  pr-1" /> See work
            </a>
          </Button>
          <BorderBeam duration={3} size={50} />
        </div>
        <div className="rounded-md relative overflow-hidden bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
          <Button
            asChild
            variant="outline"
            className=" w-36 h-12 rounded-md bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <a className="flex items-center flex-row" href="#contact">
              <Mail className="h-5 w-5  pr-1" /> Get a quote
            </a>
          </Button>
          <BorderBeam duration={3} size={50} />
        </div>
      </div>
      <p className="mt-4 sm:mt-8 text-xs sm:text-xs text-neutral-500">
        48h turnaround options • NDA-friendly • Remote worldwide
      </p>
      <div className="flex flex-rows"><NumberTicker
        value={147}
        startValue={80}
        className="text-5xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
      />
      <p className="text-5xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white">
        + Videos made till now.
      </p>
      </div>
    </section>
  );
}
