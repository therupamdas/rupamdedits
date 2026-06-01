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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white">
      {/* =======================================================
          LAYER 1 — AMBIENT COLOR WASH
          -------------------------------------------------------
          Creates overall atmosphere.
          Increase opacity for stronger color presence.
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
          -------------------------------------------------------
          Main hero glow.
          Change:
          - bg-green-500/15 → color
          - w/h → size
          - blur → softness
      ======================================================= */}

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-52
          -right-52
          h-212.5
          w-212.5
          rounded-full
          bg-emerald-500/15
          blur-[220px]
        "
      />

      {/* =======================================================
          LAYER 3 — SECONDARY LIGHT LEAK
          -------------------------------------------------------
          Adds depth and motion.
      ======================================================= */}

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-[15%]
          -left-64
          h-175
          w-175
          rounded-full
          bg-cyan-500/15
          blur-[200px]
        "
      />

      {/* =======================================================
          LAYER 4 — ELLIPTICAL LIGHT STREAK
          -------------------------------------------------------
          Makes it feel less artificial.
          Real light leaks are rarely circles.
      ======================================================= */}

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[20%]
          top-[20%]
          h-75
          w-225
          rotate-12
          rounded-full
          bg-green-300/10
          blur-[180px]
        "
      />

      {/* =======================================================
          LAYER 5 — BOTTOM BALANCING GLOW
          -------------------------------------------------------
          Prevents top-heavy composition.
      ======================================================= */}

      <motion.div
        animate={{
          x: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-56
          left-1/3
          h-160
          w-160
          rounded-full
          bg-emerald-300/10
          blur-[220px]
        "
      />

      {/* =======================================================
          LAYER 6 — DOT MATRIX
          -------------------------------------------------------
          Premium staggered grid.
          Change 24px → spacing.
      ======================================================= */}

      <div className="absolute inset-0 opacity-80">
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
          LAYER 7 — MOUSE SPOTLIGHT
          -------------------------------------------------------
          Follows cursor.
          Increase 4% → stronger spotlight.
      ======================================================= */}

      <motion.div
        className="absolute inset-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              700px circle at ${mouseX}px ${mouseY}px,
              rgb(0 0 0 / 4%),
              transparent 80%
            )
          `,
        }}
      />

      {/* =======================================================
          LAYER 8 — SUBTLE VIGNETTE
          -------------------------------------------------------
          Makes center feel brighter.
          Very important for premium feel.
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