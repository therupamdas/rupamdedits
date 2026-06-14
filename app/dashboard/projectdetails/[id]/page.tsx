"use client";

import { projects } from "@/lib/mockdata";
import { Buttonx } from "@/components/layout/Buttonx";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const params = useParams();
  const id = params.id as string;

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Project not found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen p-4 md:p-8 bg-neutral-50/50 overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 bg-green-200 rounded-full blur-[120px] opacity-60" />
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 bg-blue-200 rounded-full blur-[120px] opacity-60" />

      <div className="relative z-10 max-w-6xl mx-auto mt-12 space-y-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h1 className="text-5xl font-bebas uppercase text-neutral-900">
            {project.title}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-semibold uppercase">
              {project.status}
            </span>

            <span className="text-neutral-500">
              Requested {project.requested}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/80 rounded-2xl p-6 border border-white/60">
            <p className="text-4xl font-bold">{project.progress}%</p>
            <p className="text-neutral-500 mt-2">Progress</p>
          </div>

          <div className="bg-white/80 rounded-2xl p-6 border border-white/60">
            <p className="text-4xl font-bold">{project.videos}</p>
            <p className="text-neutral-500 mt-2">Videos</p>
          </div>

          <div className="bg-white/80 rounded-2xl p-6 border border-white/60">
            <p className="text-4xl font-bold">{project.comments}</p>
            <p className="text-neutral-500 mt-2">Comments</p>
          </div>
        </div>

        {/* Deliverables */}
        <div className="bg-white/80 rounded-2xl border border-white/60 overflow-hidden">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-xl font-bold">Deliverables</h2>
          </div>

          <div className="divide-y divide-neutral-200">
            {project.deliverables.map((file) => (
              <div
                key={file}
                className="p-5 flex items-center justify-between"
              >
                <span>{file}</span>

                <Buttonx buttonClassName="h-10 px-5 bg-green-300 text-neutral-900">
                  Download
                </Buttonx>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white/80 rounded-2xl p-6 border border-white/60">
          <h2 className="text-xl font-bold mb-4">Client Notes</h2>

          <p className="text-neutral-600 leading-relaxed">
            {project.notes}
          </p>
        </div>
      </div>
    </div>
  );
}