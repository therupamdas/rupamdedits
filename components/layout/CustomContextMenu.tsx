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

export default function CustomContextMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild>
        <div className="min-h-screen">{children}</div>
      </ContextMenuTrigger>

      <ContextMenuContent className="bg-transparent backdrop-blur-sm flex items-center justify-center rounded-full h-35 w-35">
        <ContextMenuGroup>
          <ContextMenuItem className="flex items-center justify-center w-33 h-33 rounded-full">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex flex-col items-center justify-center w-33  tracking-tight"
            >
              <p>Hi, welcome to</p>

              <p className="ml-1 font-semibold">
                rupamedits<span className="text-neutral-400">.com</span>
              </p>
            </a>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
