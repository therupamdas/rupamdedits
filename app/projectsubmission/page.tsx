import { redirect } from "next/navigation";
import { createClient } from "@/lib/server";
import { ProjectSubmissionForm } from "@/components/features/forms/ProjectSubmissionForm";

export default async function ProjectSubmissionPage() {
  const supabase = await createClient();

  // Secure the page - kick out unauthenticated users
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/login");

  // Render the interactive client form
  return <ProjectSubmissionForm />;
}