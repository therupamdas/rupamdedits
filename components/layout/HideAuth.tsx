"use client";

import { usePathname } from "next/navigation";

export function HideAuth({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Add any other routes here where you want to hide the Nav/Footer!
  const isAuthPage = pathname === "/login"; 

  if (isAuthPage) {
    return null;
  }

  return <>{children}</>;
}