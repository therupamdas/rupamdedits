"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function CustomContextMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="min-h-screen">
          {children}
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56">
        <ContextMenuItem
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Go to Top
        </ContextMenuItem>

        <ContextMenuItem
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          Go to Bottom
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem
          onClick={() => location.reload()}
        >
          Reload Page
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}