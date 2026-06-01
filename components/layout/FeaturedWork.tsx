"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { Separator } from "../ui/separator";
import { TextAnimate } from "../ui/text-animate";

export default function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-20 mx-15 px-4 py-10">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-5xl text-neutral-800 font-bebas uppercase font-bold">
          <TextAnimate animation="blurInUp" by="character" once>
            Featured Work
          </TextAnimate>
        </h2>
        <a
          href="#contact"
          className="text-sm hover:opacity-70 flex items-center"
        >
          Request full portfolio <ArrowRight className="h-4 w-4 ml-1" />
        </a>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-3/5 w-full rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
