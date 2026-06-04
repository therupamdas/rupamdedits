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
      title: "Short-form Content",
      description:
        "Trendy, fast-paced edits for your Instagram Reels and YouTube Shorts  that boost reach and engagement.",
    },
  ];

  return (
    <section id="services" className="mx-5 md:mx-80 scroll-mt-20 px-4 py-10">
      <div className="flex justify-between">
        <h2 className="text-2xl md:text-5xl  text-neutral-800 font-bebas uppercase font-bold">
          <TextAnimate animation="blurInUp" by="character" once>
            Services
          </TextAnimate>
        </h2>
        
        <Buttonx
            buttonClassName="h-8 w-full sm:w-36 text-sm border-neutral-200"
            wrapperClassName="h-8"
            beamDuration={3}
            beamDelay={4}
            beamSize={60}
            href="/projectsubmission"
          >
            Get a Quote <ArrowRight className="h-4 w-4 ml-1" />
          </Buttonx>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                <span className="text-lg font-semibold text-black">₹400/-* only</span>
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
                {/* <li>✓ Color grading</li>
                <li>✓ Sound design</li> */}
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
