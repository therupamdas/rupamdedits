"use client";
import { motion } from "motion/react";
import { Separator } from "../ui/separator";
import Image from "next/image";

import { Buttonx } from "./Buttonx";

export default function Contact() {
  return (
    <section className="relative w-full overflow-hidden flex flex-col md:flex-row justify-center items-center md:items-stretch pb-5 scroll-mt-20 gap-10 md:gap-0">
      {/* 2. Changed w-1/3 to w-full for mobile, md:w-1/3 for desktop. Replaced m-20 with responsive margins. */}
      <section
        id="contact"
        className="w-full md:w-1/3 px-6 pb-8 md:m-10 scroll-mt-20  md:pb-16 md:mt-0"
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

        <div className="flex flex-col gap-4 justify-center items-center px-4">
          {/* WhatsApp Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            rel="noopener noreferrer"
          >
            <Buttonx
              buttonClassName="h-12 text-sm w-70 sm:w-70 border-1 border-neutral-200"
              wrapperClassName="shadow-green-600"
              beamDuration={3}
              beamDelay={2}
              beamSize={70}
              href="https://wa.me/918348890844"
            >
              <Image
                width={24}
                height={24}
                src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                alt="WhatsApp"
                className="w-6 h-6 mr-2"
              />
              <p>Message on Whatsapp</p>
            </Buttonx>
          </motion.div>
          {/* Phone Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            rel="noopener noreferrer"
          >
            <Buttonx
              buttonClassName="h-12 text-sm w-70 sm:w-70 border-1 border-neutral-200"
              wrapperClassName="shadow-blue-600"
              beamDuration={3}
              beamDelay={2}
              beamSize={70}
              href="tel:+918348890844"
            >
              <Image
                width={24}
                height={24}
                src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
                alt="Phone"
                className="w-6 h-6 mr-2"
              />
              <p>Call Now</p>
            </Buttonx>
          </motion.div>
          {/* Email Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            rel="noopener noreferrer"
          >
            <Buttonx
              buttonClassName="h-12 text-sm w-70 border-1 border-neutral-200 sm:w-70"
              wrapperClassName="shadow-red-600"
              beamDuration={3}
              beamDelay={2}
              beamSize={70}
              href="https://mail.google.com/mail/?view=cm&fs=1&to=rupam1624@gmail.com&su=Project%20Inquiry&body=Hi%20Rupam,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
            >
              <Image
                width={24}
                height={24}
                src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                alt="Email"
                className="w-6 h-6 mr-2"
              />
              <p>Send an Email</p>
            </Buttonx>
          </motion.div>
        </div>
      </section>

      <section
        id="about"
        className="relative overflow-hidden w-full md:w-2/3 scroll-mt-20 px-6 pb-8 md:m-10 md:pb-16 md:mt-0"
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
