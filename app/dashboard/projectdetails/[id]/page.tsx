import { notFound } from "next/navigation";
import { createClient } from "@/lib/server";
import ProjectDetailsClientView from "../../ProjectDetailsClientView";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  const { id } = await params;

  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("client_projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    notFound();
  }
  
  return (
    <ProjectDetailsClientView
      project={project}
      revisions={[]}
      feedback={[]}
    />
  );
}