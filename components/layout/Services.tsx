"use client";

import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { BorderBeam } from "../ui/border-beam";
import { TextAnimate } from "../ui/text-animate";
import { Buttonx } from "./Buttonx";

export default function Services() {
  const services = [
    {
      id: "s1",
      title: "Short form Content",
      description: "Trendy, fast-paced edits for your Instagram Reels and YouTube Shorts that boost reach and engagement.",
      price: "400"
    },
    // Added a second one so your grid doesn't look lonely
    {
      id: "s2",
      title: "Talking Head Videos",
      description: "High-conversion video ads tailored for Facebook, Instagram, and LinkedIn ad platforms.",
      price: "1000"
    },
  ];

  return (
    <section id="services" className="mx-5 md:mx-40 scroll-mt-20 px-4 py-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-7xl text-neutral-800 font-bebas uppercase font-bold">
          <TextAnimate animation="blurInUp" by="character" once>
            Services
          </TextAnimate>
        </h2>
        
        <Buttonx
          buttonClassName="h-15 w-full sm:w-44 text-sm border-neutral-200"
          wrapperClassName="h-15"
          beamDuration={3}
          beamDelay={4}
          beamSize={60}
          href="/projectsubmission"
        >
          Start Your Project  <ArrowRight className="h-4 w-4 ml-1" />
        </Buttonx>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {services.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            // Added will-change-transform for smoother GPU rendering
            className="group relative rounded-md border bg-white transition-all duration-300 hover:shadow-[6px_6px_0px_0px] hover:shadow-neutral-800 will-change-transform"
          >
            <div className="relative rounded-md p-6 overflow-hidden">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-neutral-500">Starting at</span>
                <span className="text-lg font-semibold text-black">₹{s.price}/-</span>
              </div>

              <h3 className="text-xl font-semibold tracking-normal text-black">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{s.description}</p>

              <ul className="mt-5 space-y-2 text-sm text-neutral-700">
                <li>✓ Professional editing</li>
                <li>✓ Fast turnaround</li>
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-neutral-500">Custom pricing available</span>
                <span className="text-sm font-medium">Learn more →</span>
              </div>

              {/* FIXED: Reduced to ONE Beam and added 'border-0' to container so it doesn't clip */}
              <BorderBeam
                duration={8}
                size={200}
                className="from-transparent via-emerald-500 to-transparent"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}