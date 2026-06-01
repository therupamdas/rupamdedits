"use client";

import Image from "next/image";
import { RetroGrid } from "../ui/retro-grid";
import { TextAnimate } from "../ui/text-animate";

const brands = [
  "/ok (1).png",
  "/ok (2).png",
  "/ok (3).png",
  "/ok (4).png",
  "/ok (5).png",
];

export default function BrandMarquee() {
  return (
    <section
      className="relative w-full min-h-100 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
      }}
    >
      <RetroGrid />

      <h2 className="px-4 text-center text-2xl font-bold uppercase text-neutral-800 md:text-5xl font-bebas">
        <TextAnimate animation="blurInUp" by="character" once>
          Brands I've worked with
        </TextAnimate>
      </h2>

      <div className="relative z-10 mt-8 overflow-hidden">
        <div
          className="flex w-max gap-20 pr-20"
          style={{ animation: "marquee 16s linear infinite" }}
        >
          {Array.from({ length: 4 }).flatMap((_, ci) =>
            brands.map((src, i) => (
              <Image
                key={`${ci}-${i}`}
                src={src}
                alt=""
                width={100}
                height={100}
                className="rounded-full bg-white p-2.5"
              />
            )),
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
