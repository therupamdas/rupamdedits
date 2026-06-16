"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Buttonx } from "@/components/layout/Buttonx";
import { StatusBadge } from "./StatusBadge";

export type ProjectData = {
  id: string;
  project_title: string;
  status: string;
  created_at: string;
  expected_video_count: number;
};

interface ProjectRowProps {
  project: ProjectData;
  isAdminView?: boolean;
}

export function ProjectRow({ project, isAdminView = false }: ProjectRowProps) {
  const router = useRouter();

  return (
    <div className="p-5 hover:bg-white/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-6">
        
        {/* Using our reusable StatusBadge */}
        <StatusBadge status={project.status} />

        <div>
          <h3 className="text-xl font-bold text-neutral-900 leading-tight">
            {project.project_title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-neutral-500 mt-1">
            <span>{project.expected_video_count} {project.expected_video_count === 1 ? "Video" : "Videos"}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
            <span>Requested on {new Date(project.created_at).toLocaleDateString("en-IN")}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-neutral-100">
        
        {/* Only show the download button for clients on delivered projects */}
        {!isAdminView && project.status === "delivered" && (
          <Buttonx beamSize={30} buttonClassName="px-4 h-10 bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center rounded-md transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </Buttonx>
        )}
        
        {/* Dynamic button styling based on role */}
        <Buttonx 
          onClick={() => router.push(`/dashboard/project/${project.id}`)} 
          buttonClassName={`flex-1 md:flex-none px-6 h-10 flex items-center justify-center rounded-md text-sm transition-colors border-0 ${
            isAdminView 
              ? "bg-neutral-900 text-white hover:bg-neutral-800" 
              : "bg-green-400 text-white hover:bg-green-500"
          }`}
        >
          {isAdminView ? "Manage" : "View Details"}
        </Buttonx>
      </div>
    </div>
  );
}