"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Link from "next/link";

export default function CustomContextMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild>
        <div className=" ">{children}</div>
      </ContextMenuTrigger>

      <ContextMenuContent className="bg-transparent backdrop-blur-sm flex items-center justify-center rounded-full h-35 w-35">
        <ContextMenuGroup>
          <ContextMenuItem className="flex items-center justify-center w-33 h-33 rounded-full">
            <Link
              href="/"
              className="flex flex-col items-center justify-center w-33  tracking-normal"
            >
              <p>Hi, welcome to</p>

              <p className="ml-1 font-semibold">
                rupamedits<span className="text-neutral-400">.in</span>
              </p>
            </Link>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
