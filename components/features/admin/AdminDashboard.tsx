"use client";

import { useState } from "react";
import { TextAnimate } from "@/components/ui/text-animate";
import { ProjectRow, ProjectData } from "@/components/shared/ProjectRow";
import { StatsCard } from "@/components/shared/StatsCard";

interface AdminDashboardProps {
  projects: ProjectData[];
}

export function AdminDashboard({ projects = [] }: AdminDashboardProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Received", "Editing", "Review", "Delivered", "Paused"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.status.toLowerCase() === activeFilter.toLowerCase());

  const activeCount = projects.filter(p => !["delivered", "paused"].includes(p.status.toLowerCase())).length;
  const reviewCount = projects.filter(p => p.status.toLowerCase() === "review").length;

  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden bg-neutral-50/50">
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 z-0 bg-green-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 z-0 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>

      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-6 mt-12">
        {/* HEADER */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border-t-4 border-t-neutral-900">
          <h1 className="text-4xl font-bebas uppercase font-bold text-neutral-900">
            <TextAnimate animation="blurInUp" by="character" once>
              Admin Portal
            </TextAnimate>
          </h1>
          <p className="text-neutral-500 mt-2 text-lg">
            Manage and track all client projects across the platform.
          </p>
        </div>

        {/* GLOBAL STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard value={projects.length} label="Total Projects" />
          <StatsCard value={activeCount} label="Active Pipelines" valueColor="text-blue-700" />
          <StatsCard value={reviewCount} label="Pending Review" valueColor="text-yellow-600" />
        </div>

        {/* PROJECTS LIST WITH FILTER */}
        <div className="flex flex-col bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
          
          {/* FILTER TABS */}
          <div className="p-6 border-b border-neutral-200/60 flex flex-wrap gap-2">
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

          <div className="divide-y divide-neutral-200/60">
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
    </div>
  );
}