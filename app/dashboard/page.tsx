// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/server";
import { AdminDashboard } from "@/components/features/admin/AdminDashboard";
import { ClientDashboard } from "@/components/features/client/ClientDashboard";

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Authenticate
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/login");

  // 2. Fetch Profile & Role
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single();

  const isAdmin = profile?.role === 'admin';

  // 3. Fetch Projects
  let query = supabase
    .from("client_projects")
    .select("*")
    .order("created_at", { ascending: false });

  // If it's a client, restrict the query to only their projects
  if (!isAdmin) {
    query = query.eq("client_id", user.id);
  }

  const { data: projects } = await query;

  // 4. Route directly to the new Feature Components
  if (isAdmin) {
    return <AdminDashboard projects={projects || []} />;
  }

  return (
    <ClientDashboard 
      projects={projects || []} 
      userName={profile?.full_name ?? user.email ?? 'Client'} 
    />
  );
}