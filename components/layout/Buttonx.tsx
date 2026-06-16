import React, { ReactNode } from "react";
import Link from "next/link";
// Adjust these imports to match your project structure
import { Button } from "@/components/ui/button";
import { BorderBeam } from "../ui/border-beam";

interface ButtonxProps {
  href?: string; // Made optional
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Added onClick
  children: ReactNode;
  wrapperClassName?: string;
  buttonClassName?: string;
  beamDuration?: number;
  beamSize?: number;
  beamDelay?: number;
  type?: string;
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
  type = "",
  disabled = false,
}: ButtonxProps) {
  // Extracted styles to keep the conditional rendering clean
  const combinedButtonClasses = `h-12 bg-red-600 text-center border-white bg-white text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white px-6 py-2 rounded-sm text-md font-semibold transition-colors duration-200 ${buttonClassName}`;

  return (
    <div
      className={`relative rounded-md bg-white text-sm text-black transition duration-200 hover:shadow-[4px_4px_0px_0px]  ${wrapperClassName}`}
    >
      {/* If an href is provided, render as a Next.js Link */}
      {href ? (
        <Button asChild type="submit" disabled={false}  variant="outline" className={combinedButtonClasses}>
          <Link href={href} className="flex justify-center  items-center">
            {children}
          </Link>
        </Button>
      ) : (
        /* If no href is provided, render as a standard button with onClick */
        <Button
          variant="outline"
          onClick={onClick}
          type="submit"
          disabled={false}
          className={combinedButtonClasses}
        >
          <span className="flex justify-center items-center ">{children}</span>
        </Button>
      )}

      <BorderBeam duration={beamDuration} size={beamSize} />
      {/* <BorderBeam duration={beamDuration} size={beamSize} delay={beamDelay}/> */}
    </div>
  );
}
