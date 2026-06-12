"use client";

import { Badge } from "@/components/ui/badge";
import { Play, Sparkles, Mail } from "lucide-react";
import { AuroraText } from "../ui/aurora-text";
import { NumberTicker } from "../ui/number-ticker";
import { Iphone } from "../ui/iphone";
import { Buttonx } from "./Buttonx";

export default function Hero() {
  return (
    <section
      className="
        mx-4
        sm:mx-7
        md:mx-15
        mt-4
        px-5
        sm:px-7
        flex
        flex-col
        lg:flex-row
        items-center
        lg:items-start
        gap-10
        lg:gap-0
        mb-6
        sm:mb-9
        md:mb-14
        p-4
        sm:p-5
        overflow-hidden"
    >
      {/* Content */}
      <div className="w-full">
        <Badge
          variant="secondary"
          className="mb-4 flex items-center gap-1 rounded-full bg-white p-3 text-xs drop-shadow-2xl sm:mb-6 sm:text-sm"
        >
          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          Minimal. Precise. On-brand.
        </Badge>

        <h1 className="flex flex-col text-left font-bebas text-3xl font-bold tracking-tight text-neutral-800 drop-shadow sm:text-4xl md:text-6xl">
          <span>
            Video <AuroraText>Editing</AuroraText> for
          </span>
          <span>Creators and Brands</span>
        </h1>

        <p className="mt-4 flex flex-col text-sm text-neutral-600 sm:mt-6 sm:max-w-xl sm:text-base">
          <span>
            I craft tight, story-first edits that boost watch time, clicks, and
            conversions.
          </span>
          <span>
            Short-form, YouTube, ads, and event highlights delivered with
            agency-level polish.
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
          <Buttonx
            buttonClassName="h-12 w-full sm:w-36 text-sm border-neutral-200"
            beamDuration={6}
            beamDelay={3}
            beamSize={36}
            href="./portfolio"
          >
            <Play className="mr-1 h-5 w-5" />
            See work
          </Buttonx>
          <Buttonx
            buttonClassName="h-12 w-full sm:w-36 text-sm border-neutral-200"
            beamDuration={6}
            beamDelay={3}
            beamSize={36}
            href="./projectsubmission"
          >
            <Mail className="mr-1 h-5 w-5" />
            Get a quote
          </Buttonx>
        </div>

        <p className="mt-4 text-xs text-neutral-500 sm:mt-8">
          48h turnaround options • NDA-friendly • Remote worldwide
        </p>

        {/* Stats */}
        <div className="mt-4 flex flex-row items-center gap-2">
          <NumberTicker
            value={150}
            startValue={111}
            className="whitespace-pre-wrap text-3xl font-medium tracking-tighter text-black dark:text-white sm:text-4xl md:text-5xl"
          />
          <p className="text-3xl font-medium tracking-tighter text-black dark:text-white sm:text-4xl md:text-5xl">
            + Videos delivered.
          </p>
        </div>

        <div className="flex flex-row items-center gap-2">
          <NumberTicker
            value={20}
            startValue={3}
            className="whitespace-pre-wrap text-3xl font-medium tracking-tighter text-black dark:text-white sm:text-4xl md:text-5xl"
          />
          <p className="text-3xl font-medium tracking-tighter text-black dark:text-white sm:text-4xl md:text-5xl">
            + Brand Partnerships.
          </p>
        </div>
      </div>

      {/* Phone */}
      <div
        className="
          flex
          justify-center

          w-full
          lg:w-140
          ml-0
          lg:ml-120

          pt-2
          lg:pt-5
        "
      >
        <div className="w-full max-w-60 sm:max-w-70 md:max-w-[320px] lg:max-w-none">
          <Iphone videoSrc="/Drinklapse.mp4" />
        </div>
      </div>
    </section>
  );
}
