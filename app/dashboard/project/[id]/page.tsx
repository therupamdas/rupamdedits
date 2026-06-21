import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/server";
import { AdminProjectDetails } from "@/components/features/admin/AdminProjectDetails";
import { ClientProjectDetails } from "@/components/features/client/ClientProjectDetails";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Authenticate User
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/login");

  // 2. Fetch Profile & Role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  // 3. Fetch the Specific Project
  const { data: project, error: projectError } = await supabase
    .from("client_projects")
    .select("*")
    .eq("id", id)
    .single();

  // If the project doesn't exist in the database, throw a 404
  if (projectError || !project) {
    notFound();
  }

  // 4. BULLETPROOF SECURITY CHECK 🚨
  // If the user is NOT an admin, and the project doesn't belong to them, kick them out.
  if (!isAdmin && project.client_id !== user.id) {
    redirect("/dashboard"); 
  }

  // 5. Fetch Real-time Revisions & Chat Messages
  const { data: revisionsData } = await supabase
    .from("revisions")
    .select("*")
    .eq("project_id", id)
    .order("created_at", { ascending: false });

  const { data: messagesData } = await supabase
    .from("project_messages")
    .select("*")
    .eq("project_id", id)
    .order("created_at", { ascending: false });

  const revisions = revisionsData || [];
  const messages = messagesData || [];

  // 6. Route directly to the Feature Components!
  if (isAdmin) {
    return (
      <AdminProjectDetails 
        project={project} 
        revisions={revisions} 
        messages={messages} 
      />
    );
  }

  return (
    <ClientProjectDetails 
      project={project} 
      revisions={revisions} 
      messages={messages} 
    />
  );
}