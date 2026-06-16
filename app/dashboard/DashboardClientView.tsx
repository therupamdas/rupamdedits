"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";
import Link from "next/link";

// ==========================================
// 1. SHARED COMPONENT: The Project Row
// ==========================================
export type Project = {
  id: string;
  title: string;
  status: string;
  date: string;
  videos: number;
};

function ProjectRow({ project, isAdminView = false }: { project: Project; isAdminView?: boolean }) {
  const router = useRouter();
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "received": return "bg-neutral-200 text-neutral-700";
      case "editing": return "bg-blue-100 text-blue-700";
      case "review": return "bg-yellow-100 text-yellow-700";
      case "delivered": return "bg-green-100 text-green-700";
      case "paused": return "bg-red-100 text-red-700";
      default: return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <div className="p-5 hover:bg-white/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-6">
        <span className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md w-fit md:w-28 text-center ${getStatusColor(project.status)}`}>
          {project.status}
        </span>

        <div>
          <h3 className="text-xl font-bold text-neutral-900 leading-tight">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-neutral-500 mt-1">
            <span>{project.videos} {project.videos === 1 ? "Video" : "Videos"}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
            <span>Requested on {project.date}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-neutral-100">
        {!isAdminView && project.status === "delivered" && (
          <Buttonx beamSize={30} buttonClassName="px-4 h-10 bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center rounded-md transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </Buttonx>
        )}
        <Buttonx 
          onClick={() => router.push(`/dashboard/projectdetails/${project.id}`)} 
          buttonClassName="flex-1 md:flex-none px-6 h-10 bg-green-400 text-white border-0 hover:bg-green-500 flex items-center justify-center rounded-md text-sm transition-colors"
        >
          View Details
        </Buttonx>
      </div>
    </div>
  );
}

// ==========================================
// 2. COMPONENT: Admin Dashboard View
// ==========================================
export function AdminDashboard({ projects = [] }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Received", "Editing", "Review", "Delivered", "Paused"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.status.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden bg-neutral-50/50">
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 z-0 bg-green-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 z-0 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>

      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-6 mt-12">
        {/* HEADER */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
          <h1 className="text-4xl font-bebas uppercase font-bold text-neutral-900">
            <TextAnimate animation="blurInUp" by="character" once>
              Admin Portal
            </TextAnimate>
          </h1>
          <p className="text-neutral-500 mt-2 text-lg">
            Manage and track all client projects across the platform.
          </p>

          {/* ADMIN SWITCH / FILTER TABS */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                  activeFilter === filter 
                    ? "bg-neutral-900 text-white shadow-sm" 
                    : "bg-white text-neutral-500 border border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS LIST */}
        <div className="flex flex-col bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden divide-y divide-neutral-200/60">
          {filteredProjects.length === 0 ? (
            <div className="p-8 text-center text-neutral-500">
              No projects found for status: {activeFilter}.
            </div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectRow key={project.id} project={project} isAdminView={true} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. COMPONENT: Client Dashboard View
// ==========================================
export function ClientDashboard({ projects = [], userName }: { projects: Project[]; userName: string }) {
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
            onClick={() => router.push("/projectsubmission")}
            buttonClassName="h-12 bg-green-300 text-neutral-900 border-0 hover:bg-green-400 flex items-center justify-center rounded-md font-semibold shadow-sm transition-all"
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

          {/* NEW PROJECT DROPZONE ROW (CLIENT ONLY) */}
          <div className="p-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center cursor-pointer bg-neutral-50/30 hover:bg-white/60 transition-all border-t-2 border-dashed border-neutral-300/80">
            <Link href="/projectsubmission" className="w-10 h-10 bg-white shadow-sm border border-neutral-200 rounded-full flex items-center justify-center hover:bg-green-100">
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

// ==========================================
// 4. MAIN EXPORT: The Controller
// ==========================================
type DashboardProps = {
  projects: Project[];
  userName: string;
  isAdmin: boolean;
};

export default function DashboardClientView({ projects = [], userName, isAdmin }: DashboardProps) {
  // Acts as the central traffic controller deciding which view to render
  if (isAdmin) {
    return <AdminDashboard projects={projects} />;
  }
  
  return <ClientDashboard projects={projects} userName={userName} />;
}