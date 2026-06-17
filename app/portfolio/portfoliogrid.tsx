"use client";

import { OptimizedVideoHover } from "@/components/layout/OptimizedVideoHover";

interface PortfolioItem {
  id: string;
  title: string;
  video_url: string;
  poster_url: string;
}

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  if (!items.length) {
    return (
      <div className="flex items-center justify-center py-32">
        {" "}
        <p className="text-neutral-500 text-lg">
          No portfolio items available.{" "}
        </p>{" "}
      </div>
    );
  }

  return (
    <main
      className="
     grid
     grid-cols-3
     md:grid-cols-8
     gap-2
   "
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="
         group
         relative
         col-span-1
         md:col-span-1
         overflow-hidden
         rounded-md
         aspect-9/16
         bg-neutral-100
     "
        >
          {" "}
          // Inside your PortfolioGrid component's map function:
          <OptimizedVideoHover
            src={item.video_url}
            poster={item.poster_url} // ⚡ This is the critical connection!
            videocaption={item.title}
          />
          {/* <div
        className="
          absolute
          inset-0
          flex
          items-end
          bg-linear-to-t
          from-black/70
          via-black/10
          to-transparent
          opacity-100
          md:opacity-0
          md:group-hover:opacity-100
          transition-opacity
          duration-300
          p-4
          pointer-events-none
        "
      >
        <div>
          <h3
            className="
              text-white
              font-medium
              text-xs
              md:text-base
              line-clamp-2
            "
          >
            {item.title}
          </h3>
        </div>
      </div> */}
        </div>
      ))}
    </main>
  );
}
