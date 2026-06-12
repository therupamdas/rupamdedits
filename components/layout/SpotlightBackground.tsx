"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

export default function SpotlightBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // === THE FIX ===
  // Move the hook to the top level so it is always called, 
  // satisfying React's Rules of Hooks.
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      700px circle at ${mouseX}px ${mouseY}px,
      rgb(0 0 0 / 8%),
      transparent 80%
    )
  `;

  // Mobile Detection State (Default to true for SSR safety)
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check screen size on mount and window resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    checkMobile(); // Run once on client
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Skip mouse tracking entirely on mobile to save battery/CPU
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, isMobile]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white">
      {/* =======================================================
          LAYER 1 — AMBIENT COLOR WASH
      ======================================================= */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(34,197,94,0.05), transparent 70%)",
        }}
      />

      {/* =======================================================
          LAYER 2 — PRIMARY LIGHT LEAK
      ======================================================= */}
      <motion.div
        animate={
          isMobile
            ? {} // Frozen on mobile
            : {
                x: [0, 60, 0],
                y: [0, -40, 0],
                scale: [1, 1.15, 1],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="
          absolute
          -top-52
          -right-52
          h-[212.5px]
          w-[212.5px]
          rounded-full
          bg-emerald-500/20
          blur-[220px]
          opacity-50
          will-change-transform
          transform-gpu
        "
      />

      {/* =======================================================
          LAYER 3 — SECONDARY LIGHT LEAK
      ======================================================= */}
      <motion.div
        animate={
          isMobile
            ? {}
            : {
                x: [0, -50, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="
          absolute
          top-[15%]
          -left-64
          h-44
          w-44
          rounded-full
          bg-blue-500/25
          blur-[200px]
          opacity-50
          will-change-transform
          transform-gpu
        "
      />

      {/* =======================================================
          LAYER 4 — ELLIPTICAL LIGHT STREAK
      ======================================================= */}
      <motion.div
        animate={
          isMobile
            ? {}
            : {
                x: [0, 40, 0],
                y: [0, 20, 0],
              }
        }
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="
          absolute
          left-[20%]
          top-[20%]
          h-20
          w-60
          rotate-12
          rounded-full
          bg-green-300/10
          blur-[180px]
          opacity-50
          will-change-transform
          transform-gpu
        "
      />

      {/* =======================================================
          LAYER 5 — BOTTOM BALANCING GLOW
      ======================================================= */}
      <motion.div
        animate={
          isMobile
            ? {}
            : {
                x: [0, -30, 0],
                scale: [1, 1.15, 1],
              }
        }
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="
          absolute
          -bottom-56
          left-1/3
          h-42
          w-42
          rounded-full
          bg-emerald-300/10
          blur-[220px]
          opacity-50
          will-change-transform
          transform-gpu
        "
      />

      {/* =======================================================
          LAYER 6 — DOT MATRIX
      ======================================================= */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(rgb(229 231 235) 1px, transparent 1px) 0 0 / 24px 24px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(rgb(229 231 235) 1px, transparent 1px) 12px 12px / 24px 24px",
          }}
        />
      </div>

      {/* =======================================================
          LAYER 7 — MOUSE SPOTLIGHT (Hidden on mobile entirely)
      ======================================================= */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: spotlightBackground, // Use the pre-calculated hook value here
          }}
        />
      )}

      {/* =======================================================
          LAYER 8 — SUBTLE VIGNETTE
      ======================================================= */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 55%, rgba(0,0,0,0.03) 100%)",
        }}
      />
    </div>
  );
}