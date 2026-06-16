"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";
import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";

// ==========================================
// SHARED HELPERS
// ==========================================
type ProfileProps = {
  userEmail: string | undefined;
  profile: any;
  projects: any[];
};

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "editing": return "bg-blue-100 text-blue-700";
    case "review": return "bg-yellow-100 text-yellow-700";
    case "delivered": return "bg-green-100 text-green-700";
    default: return "bg-neutral-100 text-neutral-700";
  }
};

const getInitials = (name: string) => {
  return name ? name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : "U";
};

// ==========================================
// 1. COMPONENT: Admin Profile
// ==========================================
function AdminProfile({ userEmail, profile, projects }: ProfileProps) {
  const router = useRouter();
  const supabase = createClient();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone_number || "");
  const [isSaving, setIsSaving] = useState(false);

  const activeProjects = projects.filter(p => p.status !== "delivered").length;
  const deliveredProjects = projects.filter(p => p.status === "delivered").length;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await supabase.from("profiles").update({ full_name: fullName, phone_number: phone }).eq("id", profile.id);
    setIsSaving(false);
    setIsEditing(false);
    router.refresh();
  };

  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden bg-neutral-50/50">
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 bg-green-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto mt-12 space-y-8">
        {/* ADMIN HERO */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border-t-4 border-t-neutral-900">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-28 h-28 rounded-full bg-neutral-900 flex items-center justify-center shadow-sm shrink-0">
                <span className="text-4xl font-bold text-white">{getInitials(profile?.full_name)}</span>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-neutral-400 tracking-widest uppercase mb-1">System Administrator</p>
                <h1 className="text-5xl font-bebas uppercase text-neutral-900 overflow-hidden">
                  <TextAnimate animation="blurInUp" by="character" once>{profile?.full_name || "Admin User"}</TextAnimate>
                </h1>
                <p className="text-neutral-500 mt-2">{userEmail}</p>
                {/* <p className="text-neutral-400 text-sm mt-1">Admin ID: {profile?.id.substring(0, 8)}...</p> */}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Buttonx
                onClick={() => setIsEditing(!isEditing)}
                buttonClassName="w-full h-12 px-6 bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 rounded-md"
              >
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </Buttonx>
            </div>
          </div>
        </div>

        {/* ADMIN STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <p className="text-4xl font-bold text-neutral-900">{projects.length}</p>
            <p className="text-neutral-500 mt-2">Total Platform Projects</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <p className="text-4xl font-bold text-blue-700">{activeProjects}</p>
            <p className="text-neutral-500 mt-2">Active Platform Projects</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <p className="text-4xl font-bold text-green-700">{deliveredProjects}</p>
            <p className="text-neutral-500 mt-2">Delivered Platform Projects</p>
          </div>
        </div>

        {/* INFO + ACTIVITY */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">
              {isEditing ? "Edit Information" : "Account Information"}
            </h2>
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-500 mb-1">Full Name</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full px-3 py-2 border border-neutral-200 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-500 mb-1">Phone Number</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 border border-neutral-200 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-500 mb-1">Email</label>
                  <input type="email" value={userEmail || ""} disabled className="w-full px-3 py-2 border border-neutral-200 bg-neutral-50 text-neutral-400 rounded-md cursor-not-allowed" />
                </div>
                <button type="submit" disabled={isSaving} className="w-full mt-4 h-10 bg-neutral-900 text-white rounded-md font-medium hover:bg-neutral-800 transition-colors">
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            ) : (
              <div className="space-y-5">
                <div><p className="text-sm text-neutral-500">Full Name</p><p className="font-medium text-neutral-900">{profile?.full_name}</p></div>
                <div><p className="text-sm text-neutral-500">Email</p><p className="font-medium text-neutral-900">{userEmail}</p></div>
                <div><p className="text-sm text-neutral-500">Phone Number</p><p className="font-medium text-neutral-900">{profile?.phone_number || "Not provided"}</p></div>
                <div><p className="text-sm text-neutral-500">Joined</p><p className="font-medium text-neutral-900">{new Date(profile?.created_at).toLocaleDateString("en-IN")}</p></div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
            <div className="p-6 border-b border-neutral-200/60">
              <h2 className="text-xl font-bold text-neutral-900">Recent Platform Activity</h2>
            </div>
            <div className="divide-y divide-neutral-200/60">
              {projects.length === 0 ? (
                <div className="p-6 text-center text-neutral-500">No projects yet.</div>
              ) : (
                projects.slice(0, 4).map((activity) => (
                  <div key={activity.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md ${getStatusColor(activity.status)}`}>{activity.status}</span>
                      <div>
                        <h3 className="font-bold text-neutral-900">{activity.project_title}</h3>
                        <p className="text-sm text-neutral-500 mt-1">Created on {new Date(activity.created_at).toLocaleDateString("en-IN")}</p>
                      </div>
                    </div>
                    <Buttonx onClick={() => router.push(`/dashboard/projectdetails/${activity.id}`)} buttonClassName="h-10 px-5 bg-neutral-900 text-white hover:bg-neutral-800 rounded-md">
                      Manage
                    </Buttonx>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. COMPONENT: Client Profile
// ==========================================
function ClientProfile({ userEmail, profile, projects }: ProfileProps) {
  const router = useRouter();
  const supabase = createClient();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone_number || "");
  const [isSaving, setIsSaving] = useState(false);

  const activeProjects = projects.filter(p => p.status !== "delivered").length;
  const deliveredProjects = projects.filter(p => p.status === "delivered").length;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await supabase.from("profiles").update({ full_name: fullName, phone_number: phone }).eq("id", profile.id);
    setIsSaving(false);
    setIsEditing(false);
    router.refresh();
  };

  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden bg-neutral-50/50">
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 bg-green-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto mt-12 space-y-8">
        {/* CLIENT HERO */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-28 h-28 rounded-full bg-linear-to-br from-green-200 to-blue-200 flex items-center justify-center shadow-sm shrink-0">
                <span className="text-4xl font-bold text-neutral-900">{getInitials(profile?.full_name)}</span>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-5xl font-bebas uppercase text-neutral-900 overflow-hidden">
                  <TextAnimate animation="blurInUp" by="character" once>{profile?.full_name || "New Client"}</TextAnimate>
                </h1>
                <p className="text-green-700 font-medium">Premium Client</p>
                <p className="text-neutral-500 mt-2">{userEmail}</p>
                <p className="text-neutral-400 text-sm mt-1">Client ID: {profile?.id.substring(0, 8)}...</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Buttonx onClick={() => setIsEditing(!isEditing)} buttonClassName="w-full h-12 px-6 bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 rounded-md">
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </Buttonx>
              <Buttonx href="/projectsubmission" buttonClassName="w-full h-12 px-6 bg-green-300 text-neutral-900 border-0 hover:bg-green-400 rounded-md">
                New Request
              </Buttonx>
            </div>
          </div>
        </div>

        {/* CLIENT STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <p className="text-4xl font-bold text-neutral-900">{projects.length}</p>
            <p className="text-neutral-500 mt-2">Total Projects</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <p className="text-4xl font-bold text-blue-700">{activeProjects}</p>
            <p className="text-neutral-500 mt-2">Active Projects</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <p className="text-4xl font-bold text-green-700">{deliveredProjects}</p>
            <p className="text-neutral-500 mt-2">Delivered Projects</p>
          </div>
        </div>

        {/* INFO + ACTIVITY */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">
              {isEditing ? "Edit Information" : "Account Information"}
            </h2>
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-500 mb-1">Full Name</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full px-3 py-2 border border-neutral-200 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-500 mb-1">Phone Number</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 border border-neutral-200 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-500 mb-1">Email</label>
                  <input type="email" value={userEmail || ""} disabled className="w-full px-3 py-2 border border-neutral-200 bg-neutral-50 text-neutral-400 rounded-md cursor-not-allowed" />
                </div>
                <button type="submit" disabled={isSaving} className="w-full mt-4 h-10 bg-neutral-900 text-white rounded-md font-medium hover:bg-neutral-800 transition-colors">
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            ) : (
              <div className="space-y-5">
                <div><p className="text-sm text-neutral-500">Full Name</p><p className="font-medium text-neutral-900">{profile?.full_name}</p></div>
                <div><p className="text-sm text-neutral-500">Email</p><p className="font-medium text-neutral-900">{userEmail}</p></div>
                <div><p className="text-sm text-neutral-500">Phone Number</p><p className="font-medium text-neutral-900">{profile?.phone_number || "Not provided"}</p></div>
                <div><p className="text-sm text-neutral-500">Joined</p><p className="font-medium text-neutral-900">{new Date(profile?.created_at).toLocaleDateString("en-IN")}</p></div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
            <div className="p-6 border-b border-neutral-200/60">
              <h2 className="text-xl font-bold text-neutral-900">Recent Activity</h2>
            </div>
            <div className="divide-y divide-neutral-200/60">
              {projects.length === 0 ? (
                <div className="p-6 text-center text-neutral-500">No projects yet. Click 'New Request' to get started!</div>
              ) : (
                projects.slice(0, 4).map((activity) => (
                  <div key={activity.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md ${getStatusColor(activity.status)}`}>{activity.status}</span>
                      <div>
                        <h3 className="font-bold text-neutral-900">{activity.project_title}</h3>
                        <p className="text-sm text-neutral-500 mt-1">Created on {new Date(activity.created_at).toLocaleDateString("en-IN")}</p>
                      </div>
                    </div>
                    <Buttonx onClick={() => router.push(`/dashboard/projectdetails/${activity.id}`)} buttonClassName="h-10 px-5 bg-green-300 text-neutral-900 hover:bg-green-400 rounded-md">
                      View
                    </Buttonx>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. MAIN EXPORT: The Controller
// ==========================================
export default function ProfileClientView({ userEmail, profile, projects }: ProfileProps) {
  // Determine if the current user is an admin
  const isAdmin = profile?.role === 'admin';

  if (isAdmin) {
    return <AdminProfile userEmail={userEmail} profile={profile} projects={projects} />;
  }

  return <ClientProfile userEmail={userEmail} profile={profile} projects={projects} />;
}