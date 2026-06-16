"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";
import { StatsCard } from "@/components/shared/StatsCard";
import { ProjectRow, ProjectData } from "@/components/shared/ProjectRow";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProfileSettingsForm } from "@/components/features/forms/ProfileSettingsForm";

interface ClientProfileProps {
  userEmail: string | undefined;
  profile: any;
  projects: ProjectData[];
}

export function ClientProfile({ userEmail, profile, projects }: ClientProfileProps) {
  const router = useRouter();

  // We only need to track if we are in "edit mode" or not.
  // The actual form data and saving logic is handled inside ProfileSettingsForm.
  const [isEditing, setIsEditing] = useState(false);

  const activeProjects = projects.filter(p => !["delivered", "paused"].includes(p.status.toLowerCase())).length;
  const deliveredProjects = projects.filter(p => p.status === "delivered").length;
  const initials = profile?.full_name ? profile.full_name.substring(0, 2).toUpperCase() : "CL";

  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden bg-neutral-50/50">
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 bg-green-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto mt-12 space-y-8">
        {/* HERO */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-28 h-28 rounded-full bg-linear-to-br from-green-200 to-blue-200 flex items-center justify-center shadow-sm shrink-0">
                <span className="text-4xl font-bold text-neutral-900">{initials}</span>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-5xl font-bebas uppercase text-neutral-900 overflow-hidden">
                  <TextAnimate animation="blurInUp" by="character" once>{profile?.full_name || "New Client"}</TextAnimate>
                </h1>
                <p className="text-green-700 font-medium tracking-wide">Premium Client</p>
                <p className="text-neutral-500 mt-2">{userEmail}</p>
                <p className="text-neutral-400 text-sm mt-1">Client ID: {profile?.id.substring(0, 8)}...</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Buttonx onClick={() => setIsEditing(!isEditing)} buttonClassName="w-full h-12 px-6 bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 rounded-md">
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </Buttonx>
              <Buttonx href="/dashboard/projectsubmission" buttonClassName="w-full h-12 px-6 bg-green-300 text-neutral-900 border-0 hover:bg-green-400 rounded-md">
                New Request
              </Buttonx>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatsCard value={projects.length} label="Total Projects" />
          <StatsCard value={activeProjects} label="Active Projects" valueColor="text-blue-700" />
          <StatsCard value={deliveredProjects} label="Delivered Projects" valueColor="text-green-700" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* PROFILE FORM OR DETAILS */}
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
            <SectionHeader title={isEditing ? "Edit Information" : "Account Information"} />
            <div className="p-6">
              {isEditing ? (
                // Using the reusable ProfileSettingsForm component here
                <ProfileSettingsForm 
                  profile={{...profile, email: userEmail}} 
                  onCancel={() => setIsEditing(false)} 
                />
              ) : (
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-neutral-500">Full Name</p>
                    <p className="font-medium text-neutral-900">{profile?.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Email</p>
                    <p className="font-medium text-neutral-900">{userEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Phone Number</p>
                    <p className="font-medium text-neutral-900">{profile?.phone_number || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Joined</p>
                    <p className="font-medium text-neutral-900">{new Date(profile?.created_at).toLocaleDateString("en-IN")}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
            <SectionHeader title="Recent Activity" subtitle="Latest project updates and deliveries." />
            <div className="divide-y divide-neutral-200/60">
              {projects.length === 0 ? (
                <div className="p-6 text-center text-neutral-500">No projects yet. Click 'New Request' to get started!</div>
              ) : (
                projects.slice(0, 4).map((activity) => (
                  <ProjectRow key={activity.id} project={activity} isAdminView={false} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}