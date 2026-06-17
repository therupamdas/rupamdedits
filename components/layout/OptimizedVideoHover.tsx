"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptimizedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string; // We are making this the star of the show
  className?: string;
  videocaption?: string;
}

export function OptimizedVideoHover({
  src,
  poster,
  className,
  videocaption,
  ...props
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false); // ⚡ Tracks when the heavy video is finally ready

  const handleMouseEnter = async () => {
    if (window.innerWidth < 768) return;
    if (!videoRef.current) return;
    try {
      await videoRef.current.play();
    } catch (err) {
      console.error("Video play failed:", err);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  const handleMobileClick = async () => {
    if (window.innerWidth >= 768) return;
    if (!videoRef.current) return;
    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    } catch (err) {
      console.error("Video toggle failed:", err);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      {/* ⚡ THE INSTANT LAYER: This loads in 0.01 seconds */}
      {poster && (
        <Image
          src={poster}
          alt={videocaption || "Video thumbnail"}
          fill
          priority // Forces Next.js to load this instantly, ignoring lazy loading
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn(
            "object-cover transition-opacity duration-700 z-10 pointer-events-none",
            isVideoReady ? "opacity-0" : "opacity-100" // Dissolves when video is ready
          )}
        />
      )}

      {/* 🐢 THE HEAVY LAYER: This loads quietly underneath */}
      <video
        ref={videoRef}
        src={src}
        loop
        muted={isMuted}
        preload="metadata"
        playsInline
        onLoadedData={() => setIsVideoReady(true)} // ⚡ Tells the image to dissolve!
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMobileClick}
        className={cn(
          "absolute inset-0 h-full w-full object-cover cursor-pointer bg-neutral-100 dark:bg-neutral-900",
          className,
        )}
        {...props}
      />

      <button
        onClick={toggleMute}
        className="absolute bottom-1 right-1 z-50 flex items-center justify-center h-8 w-8 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-white transition-all duration-300 hover:scale-110 hover:bg-black/60 active:scale-95"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      {videocaption && (
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end px-3 py-1.5 pointer-events-none z-20">
          <h3 className="text-xs md:text-sm font-bold text-white">{videocaption}</h3>
        </div>
      )}
    </>
  );
}