"use client";

import Image from "next/image";

export default function Footer() {
  return (

        <footer className="bg-neutral-900 text-neutral-300 py-10">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-semibold text-white">Rupam Edits</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                Crafting compelling stories through video editing, commercials,
                and events.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-white transition">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:rupam1624@gmail.com"
                    className="hover:text-white transition"
                  >
                    rupam1624@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+918348890844"
                    className="hover:text-white transition"
                  >
                    +91 83488 90844
                  </a>
                </li>
              </ul>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://wa.me/918348890844"
                  target="_blank"
                  className="hover:text-white"
                >
                  <Image
                    width="10"
                    height="10"
                    src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                    className="w-5 h-5"
                    alt="WhatsApp"
                  />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  className="hover:text-white"
                >
                  <Image
                    width="10"
                    height="10"
                    src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                    className="w-5 h-5"
                    alt="Instagram"
                  />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  className="hover:text-white"
                >
                  <Image
                    width="10"
                    height="10"
                    src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                    className="w-5 h-5"
                    alt="YouTube"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-10 pt-6 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} Rupam Edits. All rights reserved.
          </div>
        </footer>
    
  );
}
