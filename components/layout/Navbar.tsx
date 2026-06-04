"use client";
import Link from "next/link";
import { Buttonx } from "./Buttonx";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="ml-5 md:ml-10 px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            // Only prevent navigation and smooth scroll IF we are already on the home page
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-semibold tracking-tight text-xl"
        >
          rupamedits<span className="text-neutral-400">.com</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Buttonx
            buttonClassName="w-28"
            beamDuration={4}
            beamDelay={2}
            beamSize={36}
            href="#work"
          >
            Work
          </Buttonx>
          <Buttonx
            buttonClassName="w-28"
            beamDuration={4}
            beamDelay={2}
            beamSize={36}
            href="#services"
          >
            Services
          </Buttonx>
          <Buttonx
            buttonClassName="w-28"
            beamDuration={4}
            beamDelay={2}
            beamSize={36}
            href="#contact"
          >
            Contact
          </Buttonx>
          <Buttonx
            buttonClassName="w-28"
            beamDuration={4}
            beamDelay={2}
            beamSize={36}
            href="#about"
          >
            About
          </Buttonx>
        </nav>
      </div>
    </header>
  );
}
