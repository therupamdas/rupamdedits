import { Buttonx } from "@/components/layout/Buttonx";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pb-50 flex flex-col items-center justify-center min-h-screen bg-white text-black dark:bg-slate-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <Buttonx
        buttonClassName="w-28"
        wrapperClassName="relative overflow-hidden"
        beamDuration={4}
        beamDelay={2}
        beamSize={40}
        href="/"
      >
        Return Home
      </Buttonx>
    </div>
  );
}
