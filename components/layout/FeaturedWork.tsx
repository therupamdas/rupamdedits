"use client";

import { ArrowRight } from "lucide-react";
import { Separator } from "../ui/separator";
import { TextAnimate } from "../ui/text-animate";
import { Buttonx } from "./Buttonx";
import { OptimizedVideo } from "@/components/layout/OptimizedVideo"; // Adjust path if needed

export default function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-20 mx-5  md:mx-40 px-4 py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-7xl text-neutral-800 font-bebas uppercase font-bold">
          <TextAnimate animation="blurInUp" by="character" once>
            Featured Work
          </TextAnimate>
        </h2>

        <Buttonx
          buttonClassName="h-15 w-full sm:w-36 text-sm border-neutral-200"
          wrapperClassName="h-15"
          beamDuration={3}
          beamDelay={4}
          beamSize={60}
          href="./portfolio"
        >
          Full portfolio <ArrowRight className="h-4 w-4 ml-1" />
        </Buttonx>
      </div>
      <Separator className="my-6" />
      <main className="mx-auto grid grid-cols-3 md:grid-cols-5 gap-2 items-start  grid-flow-dense">
        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <OptimizedVideo
            src="./portrait (1).mp4"
            poster="./poster.png"
            videocaption="Tattoo Artist" // IMPORTANT: You need to create these!
          />

        </div>

        {/* Landscape 1 */}
        <div className="group relative rounded-md overflow-hidden col-span-2 h-full w-full bg-white/0 shadow-xl transition-transform ">
          <OptimizedVideo
            src="./vdo_Landscape (01).mp4"
            poster="./poster.png"
            videocaption="Restaurant Tour" // IMPORTANT: You need to create these!
          />
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <OptimizedVideo
            src="./portrait (2).mp4"
            poster="./poster.png"
            videocaption="Preparation" // IMPORTANT: You need to create these!
          />
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <OptimizedVideo
            src="./portrait (3).mp4"
            poster="./poster.png"
            videocaption="Product Ad" // IMPORTANT: You need to create these!
          />
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-2 h-full w-full bg-white/0 shadow-xl transition-transform ">
          <OptimizedVideo
            src="./vdo_Landscape (02).mp4"
            poster="./poster.png"
            videocaption="Fashion Outlook" // IMPORTANT: You need to create these!
          />
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <OptimizedVideo
            src="./portrait (4).mp4"
            poster="./poster.png"
            videocaption="Clothing Store" // IMPORTANT: You need to create these!
          />
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <OptimizedVideo
            src="./portrait (5).mp4"
            poster="./poster.png"
            videocaption="Sports Montage" // IMPORTANT: You need to create these!
          />
        </div>

        <div className="hidden md:block group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <OptimizedVideo
            src="./portrait (6).mp4"
            poster="./poster.png"
            videocaption="Food Montage" // IMPORTANT: You need to create these!
          />
        </div>
      </main>
    </section>
  );
}