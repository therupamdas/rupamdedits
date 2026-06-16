// app/dashboard/profile/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/server";
import { AdminProfile } from "@/components/features/admin/AdminProfile";
import { ClientProfile } from "@/components/features/client/ClientProfile";

export default async function ProfilePage() {
  const supabase = await createClient();

  // 1. Authenticate User
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/login");

  // 2. Fetch Profile & Role
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  // 3. Fetch Projects for Stats (Admin = All, Client = Own)
  let query = supabase
    .from("client_projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (!isAdmin) {
    query = query.eq("client_id", user.id);
  }

  const { data: projects } = await query;

  // 4. Route directly to the new Feature Components
  if (isAdmin) {
    return (
      <AdminProfile 
        userEmail={user.email} 
        profile={profile} 
        projects={projects || []} 
      />
    );
  }

  return (
    <ClientProfile 
      userEmail={user.email} 
      profile={profile} 
      projects={projects || []} 
    />
  );
}