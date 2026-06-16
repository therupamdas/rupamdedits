// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/server";
import DashboardClientView from "./DashboardClientView";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/login");

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single();

  const isAdmin = profile?.role === 'admin';

  let query = supabase
    .from("client_projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (!isAdmin) {
    query = query.eq("client_id", user.id);
  }

  const { data: projects } = await query;

  // ✅ FIX: Map the database columns to the UI's expected types
  const formattedProjects = (projects ?? []).map((p: any) => ({
    id: p.id,
    title: p.project_title, 
    status: p.status,
    date: new Date(p.created_at).toLocaleDateString("en-IN"), // Formats the timestamp to a clean string
    videos: p.expected_video_count || 0, 
  }));

  return (
    <DashboardClientView
      projects={formattedProjects}
      userName={profile?.full_name ?? user.email ?? ''}
      isAdmin={isAdmin}
    />
  );
}