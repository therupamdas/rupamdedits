"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";

export function useProjectClient(project: any, revisions: any[], messages: any[]) {
  const router = useRouter();
  const supabase = createClient();

  // --- PARSE DYNAMIC NOTES & REQUIREMENTS ---
  let parsedReqs: any[] = [];
  let legacyNotes = "";
  try {
    if (project.notes && project.notes.startsWith("[")) {
      parsedReqs = JSON.parse(project.notes);
    } else {
      legacyNotes = project.notes || "";
    }
  } catch (e) {
    legacyNotes = project.notes || "";
  }

  // --- VIDEO ASSET TRACKER LOGIC ---
  const colorThemes = [
    { border: "border-green-200", bg: "bg-green-50/50", text: "text-green-700", iconBg: "bg-green-100" },
    { border: "border-blue-200", bg: "bg-blue-50/50", text: "text-blue-700", iconBg: "bg-blue-100" },
    { border: "border-purple-200", bg: "bg-purple-50/50", text: "text-purple-700", iconBg: "bg-purple-100" },
    { border: "border-amber-200", bg: "bg-amber-50/50", text: "text-amber-700", iconBg: "bg-amber-100" },
  ];

  let expectedVideos: any[] = [];
  try {
    const batches = typeof project.batch_details === "string" ? JSON.parse(project.batch_details) : project.batch_details || [];
    let vCount = 1;
    expectedVideos = batches.flatMap((b: any, i: number) =>
      Array.from({ length: b.count || 1 }).map((_, j) => ({
        id: `v-${i}-${j}`,
        name: `Video ${String(vCount++).padStart(2, "0")}`,
        duration: b.duration,
        theme: colorThemes[i % 4],
      }))
    );
  } catch (e) {
    console.error("Failed to parse batch details", e);
  }

  // --- INTERACTIVE STATES ---
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Chat States
  const [chatMessage, setChatMessage] = useState("");
  const [localMessages, setLocalMessages] = useState(messages || []);

  // Revision States
  const [showRevForm, setShowRevForm] = useState(false);
  const [newRevType, setNewRevType] = useState("revision");
  const [newRevText, setNewRevText] = useState("");
  const [localRevisions, setLocalRevisions] = useState(revisions || []);

  // --- DATABASE FUNCTIONS ---

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    setIsSubmitting(true);

    const { error } = await supabase.from("project_messages").insert({
      project_id: project.id,
      author: "client",
      message: chatMessage.trim(),
    });

    if (!error) {
      setLocalMessages([{ id: Date.now(), author: "client", message: chatMessage.trim() }, ...localMessages]);
      setChatMessage("");
      router.refresh();
    }
    setIsSubmitting(false);
  };

  const handleRequestRevision = async () => {
    if (!newRevText.trim()) return;
    setIsSubmitting(true);

    const { data, error } = await supabase.from("revisions").insert({
      project_id: project.id,
      request_type: newRevType,
      description: newRevText.trim(),
      status: "pending",
    }).select();

    if (!error && data) {
      setLocalRevisions([data[0], ...localRevisions]);
      setNewRevText("");
      setShowRevForm(false);
      router.refresh();
    } else {
      alert("Failed to submit change request. Please try again.");
    }
    setIsSubmitting(false);
  };

  return {
    state: {
      project,
      parsedReqs,
      legacyNotes,
      expectedVideos,
      isSubmitting,
      chatMessage,
      localMessages,
      showRevForm,
      newRevType,
      newRevText,
      localRevisions
    },
    actions: {
      setChatMessage,
      setShowRevForm,
      setNewRevType,
      setNewRevText,
      handleSendMessage,
      handleRequestRevision
    },
    router
  };
}