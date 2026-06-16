// app/dashboard/profile/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/server";
import ProfileClientView from "./ProjectClientView";

export default async function ProfilePage() {
  const supabase = await createClient();

  // Securely get user auth
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/login");

  // Fetch real profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch real projects to populate the stats and recent activity
  const { data: projects } = await supabase
    .from("client_projects")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <ProfileClientView 
      userEmail={user.email} 
      profile={profile} 
      projects={projects || []} 
    />
  );
}