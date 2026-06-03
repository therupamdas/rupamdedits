import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { BorderBeam } from "../ui/border-beam";
import { TextAnimate } from "../ui/text-animate";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      id: "s1",
      title: "Short-form Content",
      description:
        "Trendy, fast-paced edits for reels, YouTube Shorts, and TikToks that boost reach and engagement.",
    },
  ];

  return (
    <section id="services" className="mx-5 md:mx-15 scroll-mt-20 px-4 py-10">
      <div className="flex justify-between">
        <h2 className="text-2xl md:text-5xl  text-neutral-800 font-bebas uppercase font-bold">
          <TextAnimate animation="blurInUp" by="character" once>
            Services
          </TextAnimate>
        </h2>
        <div className="h-8 rounded-md relative">
          <Button
            asChild
            variant="outline"
            className=" relative h-8 overflow-hidden rounded-md bg-white text-sm text-black transition duration-200
            hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]  sm:w-36  border-neutral-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <Link href="#contact" className="flex items-center">
              Get a Quote <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
          <BorderBeam duration={3} size={60} />
        </div>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {services.map((s) => (
          <motion.div
            key={s.id}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group relative rounded-md border bg-white transition-all duration-100 hover:shadow-[6px_6px_0px_0px] hover:shadow-neutral-800 "
          >
            <div className="relative rounded-md p-6">
              {/* Price */}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-neutral-500">
                  Starting at
                </span>

                <span className="text-lg font-semibold text-black">₹400/-</span>
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

                <span className="text-sm font-medium transition-transform duration-300">
                  Learn more →
                </span>
              </div>
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
