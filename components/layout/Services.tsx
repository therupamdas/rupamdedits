import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { BorderBeam } from "../ui/border-beam";
import { TextAnimate } from "../ui/text-animate";

export default function Services() {
  const services = [
    {
      id: "s1",
      title: "Commercial Editing",
      description:
        "High-quality edits for ads, brand films, and promotional content that engage and convert.",
    },
    {
      id: "s2",
      title: "Event Highlights",
      description:
        "Cinematic highlight reels for weddings, concerts, and events that capture emotions and memories.",
    },
    {
      id: "s3",
      title: "Short-form Content",
      description:
        "Trendy, fast-paced edits for reels, YouTube Shorts, and TikToks that boost reach and engagement.",
    },
    {
      id: "s4",
      title: "Corporate Videos",
      description:
        "Professional edits for training, presentations, and internal communications with clarity and polish.",
    },
    {
      id: "s5",
      title: "Music Videos",
      description:
        "Dynamic storytelling and rhythm-synced visuals that bring music to life.",
    },
    {
      id: "s6",
      title: "Color Grading",
      description:
        "Enhancing mood, tone, and consistency with professional color correction and grading.",
    },
  ];

  return (
    <section id="services" className="mx-15 scroll-mt-20 px-4 py-10">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-5xl  text-neutral-800 font-bebas uppercase font-bold">
          <TextAnimate animation="blurInUp" by="character" once>
            Services
          </TextAnimate>
        </h2>
        <a
          href="#contact"
          className="text-sm hover:opacity-70 flex items-center "
        >
          Get a quote <ArrowRight className="h-4 w-4 ml-1" />
        </a>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {services.map((s) => (
          <motion.div
            key={s.id}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="
    group
    relative
    overflow-hidden
    rounded-xl
    border
    border-neutral-200
    bg-white
    transition-all
    duration-100
    hover:shadow-xl
    hover:border-neutral-300
  "
          >
            <div className="relative p-6">
              {/* Price */}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-neutral-500">
                  Starting at
                </span>

                <span className="text-lg font-semibold text-black">
                  ₹4,999+
                </span>
              </div>

              {/* Service */}
              <h3 className="text-xl font-semibold tracking-tight text-black">
                {s.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {s.description}
              </p>

              {/* Deliverables */}
              <ul className="mt-5 space-y-2 text-sm text-neutral-700">
                <li>✓ Professional editing</li>
                <li>✓ Color grading</li>
                <li>✓ Sound design</li>
                <li>✓ Fast turnaround</li>
              </ul>

              {/* CTA */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-neutral-500">
                  Custom pricing available
                </span>

                <span
                  className="
          text-sm
          font-medium
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
                >
                  Learn more →
                </span>
              </div>

              {/* Border Beams */}
              <BorderBeam
                duration={6}
                size={150}
                className="from-transparent via-emerald-500 to-transparent"
              />

              <BorderBeam
                duration={6}
                delay={3}
                size={150}
                className="from-transparent via-cyan-500 to-transparent"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
