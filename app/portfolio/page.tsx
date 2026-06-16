"use client";

import { Buttonx } from "@/components/layout/Buttonx";
import { OptimizedVideo } from "@/components/layout/OptimizedVideo";
import { TextAnimate } from "@/components/ui/text-animate";
import { ArrowRight } from "lucide-react";

export default function Portfolio() {
  return (
    <section id="work" className="scroll-mt-20 mx-5 md:mx-80 px-4 py-10">
      <div className="flex items-center justify-center">
        <h2 className="text-4xl md:text-7xl text-neutral-800 font-bebas uppercase font-bold">
          <TextAnimate animation="blurInUp" by="character" once>
            Featured Work
          </TextAnimate>
        </h2>
      </div>

      <div className="my-6" />

      {/* Removed 'items-start' to allow natural grid alignment */}
      <main className="grid grid-cols-3 gap-2 grid-flow-dense">
        {/* Item 1: Portrait */}
        {/* Changed aspect-9/16 to h-64 md:h-80 */}
        <div className="group relative rounded-md overflow-hidden col-span-1 h-50 md:h-80 w-full bg-neutral-900 shadow-xl transition-transform">
          <OptimizedVideo
            src="./portrait (1).mp4"
            poster="./poster.png"
            videocaption="Tattoo Artist"
          />
        </div>

        {/* Item 3: Portrait */}
        <div className="group relative rounded-md overflow-hidden col-span-1 h-50 md:h-80 w-full bg-neutral-900 shadow-xl transition-transform">
          <OptimizedVideo
            src="./portrait (3).mp4"
            poster="./poster.png"
            videocaption="Product Ad"
          />
        </div>

        {/* Item 5: Portrait */}
        <div className="group relative rounded-md overflow-hidden col-span-1 h-50 md:h-80 w-full bg-neutral-900 shadow-xl transition-transform">
          <OptimizedVideo
            src="./portrait (4).mp4"
            poster="./poster.png"
            videocaption="Clothing Store"
          />
        </div>

        {/* Item 6: Portrait */}
        <div className="group relative rounded-md overflow-hidden col-span-1 h-50 md:h-80 w-full bg-neutral-900 shadow-xl transition-transform">
          <OptimizedVideo
            src="./portrait (5).mp4"
            poster="./poster.png"
            videocaption="Sports Montage"
          />
        </div>
      </main>
    </section>
  );
}
