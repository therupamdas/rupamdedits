"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useEffect } from "react";

export default function SpotlightBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 bg-white overflow-hidden pointer-events-none">
      
      {/* 1. The Light Leaks */}
      {/* Top Right Orange Glow */}
      <motion.div
        animate={{ 
          opacity: [0.4, 0.6, 0.4], 
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-green-500/20 blur-[120px]"
      />
      
      {/* Top Left Rose Glow */}
      <motion.div
        animate={{ 
          opacity: [0.4, 0.7, 0.4], 
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[15%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-500/20 blur-[120px]"
      />

      {/* 2. The Dot Matrix (Draws OVER the light leaks) */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-gray-200)_1px,transparent_0px)] bg-size-[9px_9px]" />
      
      {/* 3. The Interactive Spotlight */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgb(0 0 0 / 4%),
              transparent 80%
            )
          `,
        }}
      />
    </div>
  );
}