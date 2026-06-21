"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";

export interface ProjectRequest {
  id: number;
  text: string;
  date: string;
  status: "sent" | "approved" | "rejected" | "completed";
}

export function useProjectAdmin(project: any, revisions: any[], messages: any[]) {
  const router = useRouter();
  const supabase = createClient();

  // --- PARSE DYNAMIC NOTES ---
  let initialRequirements: ProjectRequest[] = [];
  let legacyNotes = "";
  try {
    if (project.notes && project.notes.startsWith("[")) {
      initialRequirements = JSON.parse(project.notes);
    } else {
      legacyNotes = project.notes || "";
    }
  } catch (e) {
    legacyNotes = project.notes || "";
  }

  // --- INTERACTIVE STATES ---
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentProject, setCurrentProject] = useState(project);
  const [requirements, setRequirements] = useState<ProjectRequest[]>(initialRequirements);

  // Inline Editing States
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState(currentProject.agreed_price || "");
  const [tempDeadline, setTempDeadline] = useState(currentProject.deadline ? currentProject.deadline.split("T")[0] : "");
  const [tempLink, setTempLink] = useState(currentProject.drive_link || "");
  const [deliverableLink, setDeliverableLink] = useState(currentProject.final_delivery_link || "");

  // Chat & Revisions State
  const [chatMessage, setChatMessage] = useState("");
  const [localMessages, setLocalMessages] = useState(messages || []);
  const [localRevisions, setLocalRevisions] = useState(revisions || []);

  // --- VIDEO ASSET TRACKER LOGIC ---
  const colorThemes = [
    { border: "border-green-200", bg: "bg-green-50/50", text: "text-green-700", iconBg: "bg-green-100" },
    { border: "border-blue-200", bg: "bg-blue-50/50", text: "text-blue-700", iconBg: "bg-blue-100" },
    { border: "border-purple-200", bg: "bg-purple-50/50", text: "text-purple-700", iconBg: "bg-purple-100" },
    { border: "border-amber-200", bg: "bg-amber-50/50", text: "text-amber-700", iconBg: "bg-amber-100" },
    { border: "border-rose-200", bg: "bg-rose-50/50", text: "text-rose-700", iconBg: "bg-rose-100" },
  ];

  let parsedBatches: any[] = [];
  try {
    if (typeof currentProject.batch_details === 'string') {
      parsedBatches = JSON.parse(currentProject.batch_details);
    } else if (Array.isArray(currentProject.batch_details)) {
      parsedBatches = currentProject.batch_details;
    }
  } catch (e) {
    console.error("Failed to parse batch details", e);
  }

  let videoCounter = 1;
  const expectedVideos = parsedBatches.flatMap((batch, batchIdx) => {
    const theme = colorThemes[batchIdx % colorThemes.length];
    return Array.from({ length: batch.count || 1 }).map((_, i) => {
      const vid = {
        id: `batch-${batch.id || batchIdx}-vid-${i}`,
        name: `Video ${String(videoCounter).padStart(2, '0')}`,
        duration: batch.duration,
        theme: theme
      };
      videoCounter++;
      return vid;
    });
  });

  // --- DATABASE FUNCTIONS ---

  const handleUpdateProject = async (field: string, value: any) => {
    setIsUpdating(true);
    const { error } = await supabase
      .from("client_projects")
      .update({ [field]: value })
      .eq("id", currentProject.id);

    if (!error) {
      setCurrentProject({ ...currentProject, [field]: value });
      setEditingField(null);
      router.refresh();
    } else {
      console.error(error);
      alert("Failed to update project.");
    }
    setIsUpdating(false);
  };

  const handleStatusChange = async (value: string) => {
    await handleUpdateProject("status", value);
  };

  const handleRequirementAction = async (reqId: number, newStatus: ProjectRequest["status"]) => {
    setIsUpdating(true);
    const updatedReqs = requirements.map((req) =>
      req.id === reqId ? { ...req, status: newStatus } : req,
    );

    const { error } = await supabase
      .from("client_projects")
      .update({ notes: JSON.stringify(updatedReqs) })
      .eq("id", currentProject.id);

    if (!error) {
      setRequirements(updatedReqs);
      router.refresh();
    } else {
      console.error(error);
      alert("Failed to update requirement status.");
    }
    setIsUpdating(false);
  };

  const handleRevisionAction = async (revId: number, action: "approved" | "rejected") => {
    setIsUpdating(true);
    const { error } = await supabase
      .from("revisions")
      .update({ status: action })
      .eq("id", revId);

    if (!error) {
      setLocalRevisions(
        localRevisions.map((r) =>
          r.id === revId ? { ...r, status: action } : r,
        ),
      );
      router.refresh();
    }
    setIsUpdating(false);
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    setIsUpdating(true);

    const { error } = await supabase.from("project_messages").insert({
      project_id: currentProject.id,
      author: "admin",
      message: chatMessage.trim(),
    });

    if (!error) {
      setLocalMessages([
        { id: Date.now(), author: "admin", message: chatMessage.trim() },
        ...localMessages,
      ]);
      setChatMessage("");
      router.refresh();
    }
    setIsUpdating(false);
  };

  // Return everything the UI needs
  return {
    state: {
      currentProject,
      requirements,
      legacyNotes,
      editingField,
      tempPrice,
      tempDeadline,
      tempLink,
      deliverableLink,
      chatMessage,
      localMessages,
      localRevisions,
      expectedVideos,
      isUpdating
    },
    actions: {
      setEditingField,
      setTempPrice,
      setTempDeadline,
      setTempLink,
      setDeliverableLink,
      setChatMessage,
      handleUpdateProject,
      handleStatusChange,
      handleRequirementAction,
      handleRevisionAction,
      handleSendMessage
    },
    router
  };
}