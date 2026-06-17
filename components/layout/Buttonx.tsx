"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "../ui/border-beam"; // Ensure this path is correct

interface ButtonxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  children: ReactNode;
  wrapperClassName?: string;
  buttonClassName?: string;
  beamDuration?: number;
  beamSize?: number;
  beamDelay?: number;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Buttonx({
  href,
  onClick,
  children,
  wrapperClassName = "",
  buttonClassName = "",
  beamDuration = 3,
  beamSize = 50,
  beamDelay = 5,
  type = "button", // Defaulted to button to prevent accidental form submissions
  disabled = false,
  ...props
}: ButtonxProps) {
  
  // ⚡ SPEED FIX: Evaluate the link type instantly
  const isHashOnly = href?.startsWith("#"); 
  const isExternal = href?.startsWith("http"); 
  const isCrossPageHash = href?.includes("#") && !isHashOnly;

  const combinedButtonClasses = `h-12 bg-red-600 text-center border-white bg-white text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white px-6 py-2 rounded-sm text-md font-semibold transition-colors duration-200 ${buttonClassName}`;

  return (
    <div
      className={`relative rounded-md bg-white text-sm text-black transition duration-200 hover:shadow-[4px_4px_0px_0px] ${wrapperClassName}`}
    >
      {/* CASE 1: Standard Button (No Link) */}
      {!href ? (
        <Button
          variant="outline"
          onClick={onClick as any}
          type={type}
          disabled={disabled}
          className={combinedButtonClasses}
          {...props}
        >
          <span className="flex justify-center items-center">{children}</span>
        </Button>

      /* CASE 2: Same-Page Anchor or External Link (Bypass Next.js Router) */
      ) : isHashOnly || isExternal ? (
        <Button asChild variant="outline" disabled={disabled} className={combinedButtonClasses}>
          <a
            href={href}
            onClick={onClick as any}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="flex justify-center items-center"
          >
            {children}
          </a>
        </Button>

      /* CASE 3: Next.js Navigation (Use Link for Prefetching) */
      ) : (
        <Button asChild variant="outline" disabled={disabled} className={combinedButtonClasses}>
          <Link 
            href={href} 
            onClick={onClick as any}
            replace={isCrossPageHash} // Fixes back-button clogging on hash jumps
            className="flex justify-center items-center"
          >
            {children}
          </Link>
        </Button>
      )}

      {/* Beam Animation */}
      <BorderBeam duration={beamDuration} size={beamSize} delay={beamDelay} />
    </div>
  );
}