"use client";

import { useRouter } from "next/navigation";
import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";
import { ProjectRow, ProjectData } from "@/components/shared/ProjectRow";
import Link from "next/link";

interface ClientDashboardProps {
  projects: ProjectData[];
  userName: string;
}

export function ClientDashboard({ projects = [], userName }: ClientDashboardProps) {
  const router = useRouter();
  
  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden bg-neutral-50/50">
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 z-0 bg-green-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 z-0 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>

      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-8 mt-12">
        {/* HEADER */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bebas uppercase font-bold text-neutral-900">
              <TextAnimate animation="blurInUp" by="character" once>
                {`Welcome Back, ${userName?.split(' ')[0] || "Client"}`}
              </TextAnimate>
            </h1>
            <p className="text-neutral-500 mt-2 text-lg">
              Here is the current status of your video projects.
            </p>
          </div>

          <Buttonx
            href="/dashboard/new"
            buttonClassName="h-12 px-6 bg-green-300 text-neutral-900 border-0 hover:bg-green-400 flex items-center justify-center rounded-md font-semibold shadow-sm transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Request
          </Buttonx>
        </div>

        {/* PROJECTS LIST */}
        <div className="flex flex-col bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden divide-y divide-neutral-200/60">
          
          {projects.length === 0 ? (
            <div className="p-8 text-center text-neutral-500">
              No projects found. Start a new request below!
            </div>
          ) : (
            projects.map((project) => (
              <ProjectRow key={project.id} project={project} isAdminView={false} />
            ))
          )}

          {/* NEW PROJECT DROPZONE ROW */}
          <div className="p-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center cursor-pointer bg-neutral-50/30 hover:bg-white/60 transition-all border-t-2 border-dashed border-neutral-300/80">
            <Link href="/dashboard/new" className="w-10 h-10 bg-white shadow-sm border border-neutral-200 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors">
              <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </Link>
            <div>
              <h3 className="text-lg font-bold text-neutral-900">Start a new project</h3>
              <p className="text-sm text-neutral-500 hidden sm:block">Need more videos edited? Submit a new request here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}