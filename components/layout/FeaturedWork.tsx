"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { Separator } from "../ui/separator";
import { TextAnimate } from "../ui/text-animate";
import Link from "next/link";
import { BorderBeam } from "../ui/border-beam";

export default function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-20 mx-5 md:mx-15 px-4 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-5xl text-neutral-800 font-bebas uppercase font-bold">
          <TextAnimate animation="blurInUp" by="character" once>
            Featured Work
          </TextAnimate>
        </h2>
        <div className="h-8 rounded-md relative">
          <Button
            asChild
            variant="outline"
            className=" relative h-8 overflow-hidden rounded-md bg-white text-sm text-black transition duration-200
            hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]  sm:w-36  border-neutral-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <Link href="#work" className="flex items-center">
              Full portfolio <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
          <BorderBeam duration={3} size={60} />
        </div>
      </div>
      <Separator className="my-6" />
      <main className="mx-auto grid grid-cols-2 md:grid-cols-5 gap-2 items-start grid-flow-dense">
        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./portrait (1).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-xl font-bold text-white">
              Tattoo Artist
            </h3>
          </div>
        </div>

        {/* Landscape 1 */}
        <div className="group relative rounded-md overflow-hidden col-span-2 md:aspect-8/7 aspect-video w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./vdo_Landscape (01).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-xl font-bold text-white">
              Restaurant tour
            </h3>
          </div>
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./portrait (2).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-xl font-bold text-white">
              Preparation
            </h3>
          </div>
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./portrait (3).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent  group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-xl font-bold text-white">
              Product Ad
            </h3>
          </div>
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-2 md:aspect-8/7 aspect-video w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./vdo_Landscape (02).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent  group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-xl font-bold text-white">
              Fashion Outlook
            </h3>
          </div>
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./portrait (4).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent  group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-xl font-bold text-white">
              Clothing Store
            </h3>
          </div>
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./portrait (5).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent  group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-xl font-bold text-white">
              Sports Montage
            </h3>
          </div>
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./portrait (6).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent  group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-xl font-bold text-white">
              Food Montage
            </h3>
          </div>
        </div>
      </main>
    </section>
  );
}
{
  /* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-3/5 w-full rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          </div>
        ))}
      </div> */
}
