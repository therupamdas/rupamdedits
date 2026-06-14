"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptimizedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  className?: string;
  videocaption?:string;
}

export function OptimizedVideo({
  src,
  poster,
  className,
  videocaption,
  ...props
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // margin: "200px" tells it to start playing slightly before it scrolls into view
  const isInView = useInView(videoRef, { margin: "200px" });

  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  // Handle mute toggle
  // We use a function to stop the click from bubbling up if you wrap the card in a Link later
  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted={isMuted}
        preload="none"
        playsInline
        className={cn("absolute inset-0 w-full h-full object-cover", className)}
        {...props}
      />

      <button
        onClick={toggleMute}
        className="
          absolute
          bottom-1
          right-1
          z-50
          flex
          items-center
          justify-center
          h-8
          w-8
          rounded-full
          border
          border-white/20
          bg-black/40
          backdrop-blur-xl
          text-white
          transition-all
          duration-300
          hover:scale-110
          hover:bg-black/60
          active:scale-95
        "
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </button>
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
        <h3 className="text-xs md:text-sm font-bold text-white">
          {videocaption}
        </h3>
      </div>
    </>
  );
}
