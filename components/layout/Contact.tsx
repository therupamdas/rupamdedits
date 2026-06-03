"use client";
import { motion } from "motion/react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { BorderBeam } from "../ui/border-beam";
import { Button } from "../ui/button";

export default function Contact() {
  return (
    <section className="relative w-full overflow-hidden flex flex-col md:flex-row justify-center items-center md:items-stretch py-12 md:py-20 scroll-mt-20 gap-10 md:gap-0">
      {/* 2. Changed w-1/3 to w-full for mobile, md:w-1/3 for desktop. Replaced m-20 with responsive margins. */}
      <section
        id="contact"
        className="w-full md:w-1/3 px-6 py-8 md:m-10 md:py-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl text-neutral-800 font-bebas uppercase font-bold text-center"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-neutral-500 text-center mt-2"
        >
          Let us talk about your project or idea
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="my-8"
        >
          <Separator className="max-w-md mx-auto" />
        </motion.div>

        <div className="flex flex-col gap-4 justify-center items-center max-w-4xl mx-auto px-4">
          {/* WhatsApp Button */}
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            href="https://wa.me/918348890844"
            target="_blank"
            rel="noopener noreferrer"
            className="relative "
          >
            <div
              className="relative overflow-hidden rounded-md bg-white text-sm text-black transition duration-200
             hover:shadow-[4px_4px_0px_0px] hover:shadow-green-600"
            >
              <Button
                asChild
                variant="outline"
                className="h-12 w-full sm:w-70 rounded-md border-neutral-200 bg-white text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                <div className="flex items-center">
                  <Image
                    width={24}
                    height={24}
                    src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                    alt="WhatsApp"
                    className="w-6 h-6"
                  />
                  Message on Whatsapp
                </div>
              </Button>
              <BorderBeam duration={3} size={50} />
            </div>
          </motion.a>

          {/* Phone Button */}
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            href="tel:+918348890844"
            className="relative"
          >
            <div
              className="relative overflow-hidden rounded-md bg-white text-sm text-black transition duration-200
             hover:shadow-[4px_4px_0px_0px] hover:shadow-blue-500"
            >
              <Button
                asChild
                variant="outline"
                className="h-12 w-full sm:w-70 rounded-md border-neutral-200 bg-white text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                <div className="flex items-center">
                  <Image
                    width={24}
                    height={24}
                    src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
                    alt="Phone"
                    className="w-6 h-6"
                  />
                  Call Now
                </div>
              </Button>
              <BorderBeam duration={3} size={50} />
            </div>
          </motion.a>

          {/* Email Button */}
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            href="https://mail.google.com/mail/?view=cm&fs=1&to=rupam1624@gmail.com&su=Project%20Inquiry&body=Hi%20Rupam,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="relative"
          >
            <div
              className="relative overflow-hidden rounded-md bg-white text-sm text-black transition duration-200
             hover:shadow-[4px_4px_0px_0px] hover:shadow-red-500"
            >
              <Button
                asChild
                variant="outline"
                className="h-12 w-full sm:w-70 rounded-md border-neutral-200 bg-white text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                <div className="flex items-center">
                  <Image
                    width={24}
                    height={24}
                    src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                    alt="Email"
                    className="w-6 h-6"
                  />
                  Send an Email
                </div>
              </Button>
              <BorderBeam duration={3} size={50} />
            </div>
          </motion.a>
        </div>
      </section>

      <section
        id="about"
        className="relative overflow-hidden w-full md:w-2/3 scroll-mt-20 px-6 py-8 md:m-10 md:py-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl text-neutral-800 font-bebas uppercase font-bold text-center md:text-left"
        >
          About
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-neutral-500 text-center md:text-left mt-2"
        >
          Hi, I am Rupam
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="my-6 md:hidden"
        >
          <Separator className="max-w-md mx-auto" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="prose prose-neutral max-w-3xl mx-auto md:mx-0 text-left mt-6 md:mt-10"
        >
          <p>
            I am Rupam, a dedicated video editor who thrives on transforming raw
            footage into compelling visual stories. With a strong background in
            crafting high-end commercials, capturing the energy of live events,
            and designing highly engaging short-form content, I help brands and
            individuals bring their boldest ideas to life. My editing approach
            seamlessly blends imaginative creativity with deep technical
            expertise, ensuring that every single frame serves the larger
            narrative. I focus heavily on pacing, rhythm, and precision to
            guarantee that every project feels incredibly polished. Whether you
            are looking to launch a dynamic social media campaign or need a
            cinematic touch for your next brand documentary, my goal is to
            elevate your vision, connect deeply with your audience, and make
            your content completely unforgettable.
          </p>
        </motion.div>
      </section>
    </section>
  );
}
