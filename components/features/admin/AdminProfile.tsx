"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";
import { StatsCard } from "@/components/shared/StatsCard";
import { ProjectRow, ProjectData } from "@/components/shared/ProjectRow";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProfileSettingsForm } from "@/components/features/forms/ProfileSettingsForm";

interface AdminProfileProps {
  userEmail: string | undefined;
  profile: any;
  projects: ProjectData[];
}

export function AdminProfile({ userEmail, profile, projects }: AdminProfileProps) {
  const router = useRouter();

  // State is now simply used to toggle the view. Data logic lives in the Form component.
  const [isEditing, setIsEditing] = useState(false);

  const activeProjects = projects.filter(p => !["delivered", "paused"].includes(p.status.toLowerCase())).length;
  const deliveredProjects = projects.filter(p => p.status === "delivered").length;

  const initials = profile?.full_name ? profile.full_name.substring(0, 2).toUpperCase() : "AD";

  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden bg-neutral-50/50">
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 bg-green-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto mt-12 space-y-8">
        {/* HERO */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border-t-4 border-t-neutral-900">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-28 h-28 rounded-full bg-neutral-900 flex items-center justify-center shadow-sm shrink-0">
                <span className="text-4xl font-bold text-white">{initials}</span>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-neutral-400 tracking-widest uppercase mb-1">System Administrator</p>
                <h1 className="text-5xl font-bebas uppercase text-neutral-900 overflow-hidden">
                  <TextAnimate animation="blurInUp" by="character" once>{profile?.full_name || "Admin User"}</TextAnimate>
                </h1>
                <p className="text-neutral-500 mt-2">{userEmail}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Buttonx onClick={() => setIsEditing(!isEditing)} buttonClassName="w-full h-12 px-6 bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 rounded-md">
                {isEditing ? "Cancel Edit" : "Edit Admin Settings"}
              </Buttonx>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatsCard value={projects.length} label="Total Platform Projects" />
          <StatsCard value={activeProjects} label="Active Platform Projects" valueColor="text-blue-700" />
          <StatsCard value={deliveredProjects} label="Delivered Platform Projects" valueColor="text-green-700" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* PROFILE SETTINGS */}
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
            <SectionHeader title={isEditing ? "Edit Details" : "Admin Details"} />
            <div className="p-6">
              {isEditing ? (
                // Reusable form injected here. It knows you are an admin based on profile.role
                <ProfileSettingsForm 
                  profile={{ ...profile, email: userEmail }} 
                  onCancel={() => setIsEditing(false)} 
                />
              ) : (
                <div className="space-y-5">
                  <div><p className="text-sm text-neutral-500">Full Name</p><p className="font-medium text-neutral-900">{profile?.full_name}</p></div>
                  <div><p className="text-sm text-neutral-500">Admin Email</p><p className="font-medium text-neutral-900">{userEmail}</p></div>
                  <div><p className="text-sm text-neutral-500">Support Phone</p><p className="font-medium text-neutral-900">{profile?.phone_number || "Not provided"}</p></div>
                  <div>
                    <p className="text-sm text-neutral-500">Accepting Orders</p>
                    <p className={`font-medium ${profile?.taking_orders ? "text-green-600" : "text-red-600"}`}>
                      {profile?.taking_orders ? "Active" : "Paused"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RECENT PLATFORM ACTIVITY */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
            <SectionHeader title="Recent Platform Activity" subtitle="Latest global project updates." />
            <div className="divide-y divide-neutral-200/60">
              {projects.length === 0 ? (
                <div className="p-6 text-center text-neutral-500">No projects yet.</div>
              ) : (
                projects.slice(0, 4).map((activity) => (
                  <ProjectRow key={activity.id} project={activity} isAdminView={true} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}