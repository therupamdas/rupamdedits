"use client";

import Image from "next/image";

const brands = [
  "/ok (1).png",
  "/ok (2).png",
  "/ok (3).png",
  "/ok (4).png",
  "/ok (5).png",
];

function CarouselItem({ text }: { text: string }) {
  return (
    <Image src={text} width={200} height={200} alt="Picture of the author" />
  );
}

export default function BrandMarquee() {
  return (
    <>
    <h2 className="ml-8 px-4 text-2xl md:text-5xl text-neutral-800 font-bebas uppercase font-bold">
              Brands I've worked with
            </h2>
      <div className="w-full pb-0.5 overflow-hidden">
        <div className="relative w-full mx-auto overflow-hidden">
          <div
            className="flex w-max gap-20 pr-20"
            style={{ animation: "marquee 16s linear infinite" }}
          >
            {[...Array(4)].flatMap((_, ci) =>
              brands.map((item, i) => (
                <CarouselItem key={`${ci}-${i}`} text={item} />
              )),
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
