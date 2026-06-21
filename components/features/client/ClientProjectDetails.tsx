"use client";

import React, { useState } from "react";
import { Video, Send, CheckCircle, Clock, XCircle, Eye } from "lucide-react";

import { useRouter } from "next/navigation";
import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { createClient } from "@/lib/client";

interface ClientProjectDetailsProps {
  project: any;
  revisions: any[];
  messages: any[]; // Updated to match the new database structure
}

export function ClientProjectDetails({
  project,
  revisions,
  messages,
}: ClientProjectDetailsProps) {
  const router = useRouter();
  const supabase = createClient();

  // --- PARSE DYNAMIC NOTES & REQURIEMENTS ---
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
    {
      border: "border-green-200",
      bg: "bg-green-50/50",
      text: "text-green-700",
      iconBg: "bg-green-100",
    },
    {
      border: "border-blue-200",
      bg: "bg-blue-50/50",
      text: "text-blue-700",
      iconBg: "bg-blue-100",
    },
    {
      border: "border-purple-200",
      bg: "bg-purple-50/50",
      text: "text-purple-700",
      iconBg: "bg-purple-100",
    },
    {
      border: "border-amber-200",
      bg: "bg-amber-50/50",
      text: "text-amber-700",
      iconBg: "bg-amber-100",
    },
  ];

  let expectedVideos: any[] = [];
  try {
    const batches =
      typeof project.batch_details === "string"
        ? JSON.parse(project.batch_details)
        : project.batch_details || [];
    let vCount = 1;
    expectedVideos = batches.flatMap((b: any, i: number) =>
      Array.from({ length: b.count || 1 }).map((_, j) => ({
        id: `v-${i}-${j}`,
        name: `Video ${String(vCount++).padStart(2, "0")}`,
        duration: b.duration,
        theme: colorThemes[i % 4],
      })),
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
      author: "client", // Hardcoded author
      message: chatMessage.trim(),
    });

    if (!error) {
      setLocalMessages([
        { id: Date.now(), author: "client", message: chatMessage.trim() },
        ...localMessages,
      ]);
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
    });

    // In a real environment with `.select()` you get data back.
    // For this mock, we'll manually append it.
    if (!error) {
      const newRev = data
        ? data[0]
        : {
            id: Date.now(),
            request_type: newRevType,
            description: newRevText.trim(),
            status: "pending",
          };
      setLocalRevisions([newRev, ...localRevisions]);
      setNewRevText("");
      setShowRevForm(false);
      router.refresh();
    } else {
      alert("Failed to submit change request. Please try again.");
    }
    setIsSubmitting(false);
  };

  const getRevisionColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "approved":
        return "text-green-600 bg-green-50 border-green-200";
      case "rejected":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-neutral-600 bg-neutral-50 border-neutral-200";
    }
  };

  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden bg-neutral-50/50 font-sans">
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 z-0 bg-green-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 z-0 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none"></div>

      <div className="relative z-10 mx-10 space-y-6 mt-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Dashboard
        </button>

        {/* CLIENT HEADER */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-100 pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold uppercase text-neutral-900">
                <TextAnimate animation="blurInUp" by="character" once>
                  {project.project_title}
                </TextAnimate>
              </h1>
              <p className="text-neutral-500 mt-1">
                Started on{" "}
                {new Date(project.created_at).toLocaleDateString("en-IN")}
              </p>
            </div>
            <StatusBadge status={project.status} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Videos
              </p>
              <p className="text-lg font-medium text-neutral-900">
                {project.expected_video_count}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Price
              </p>
              <p className="text-lg font-medium text-neutral-900">
                ₹{project.agreed_price || "Pending Review"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Deadline
              </p>
              <p className="text-lg font-medium text-neutral-900">
                {project.deadline
                  ? new Date(project.deadline).toLocaleDateString("en-IN")
                  : "Flexible"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Final Files
              </p>
              {project.final_delivery_link ? (
                <a
                  href={project.final_delivery_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-green-600 hover:underline flex items-center gap-1 mt-1"
                >
                  <Eye size={14} /> Review & Download
                </a>
              ) : (
                <p className="text-sm font-medium text-neutral-400 mt-1">
                  Not Ready Yet
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* ⚡ NEW: VIDEO ASSET TRACKER */}
            {expectedVideos.length > 0 && (
              <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
                <SectionHeader title="Your Expected Assets" />
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {expectedVideos.map((vid) => (
                    <div
                      key={vid.id}
                      className={`flex items-center justify-between p-3 rounded-xl border ${vid.theme.border} ${vid.theme.bg}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${vid.theme.iconBg} ${vid.theme.text}`}
                        >
                          <Video size={18} />
                        </div>
                        <div>
                          <p className={`font-bold text-sm ${vid.theme.text}`}>
                            {vid.name}
                          </p>
                          <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                            {vid.duration} Seconds
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ⚡ UPDATED: STRUCTURED PROJECT NOTES */}
            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
              <SectionHeader title="Project Requirements" />
              {parsedReqs.length > 0 ? (
                <div className="divide-y divide-neutral-100">
                  {parsedReqs.map((req, idx) => (
                    <div
                      key={req.id}
                      className="p-5 flex flex-col sm:flex-row justify-between items-start gap-4"
                    >
                      <div className="flex gap-3">
                        <span className="text-neutral-400 font-bold text-sm mt-0.5">
                          {idx + 1}.
                        </span>
                        <div>
                          <p className="text-neutral-800 text-sm leading-relaxed">
                            {req.text}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-50 border border-neutral-200">
                        {req.status === "completed" && (
                          <CheckCircle size={12} className="text-green-600" />
                        )}
                        {req.status === "approved" && (
                          <CheckCircle size={12} className="text-blue-600" />
                        )}
                        {req.status === "rejected" && (
                          <XCircle size={12} className="text-red-600" />
                        )}
                        {req.status === "sent" && (
                          <Clock size={12} className="text-neutral-400" />
                        )}
                        <span className="text-[10px] font-bold uppercase text-neutral-600 tracking-wider">
                          {req.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6">
                  <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap">
                    {legacyNotes || "No additional requirements provided."}
                  </p>
                </div>
              )}
            </div>

            {/* ⚡ UPDATED: FUNCTIONAL CHANGE REQUESTS */}
            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
              <SectionHeader
                title="Change Requests"
                action={
                  <button
                    onClick={() => setShowRevForm(!showRevForm)}
                    className="text-sm font-semibold text-green-400 hover:text-green-300 transition-colors"
                  >
                    {showRevForm ? "Cancel" : "+ New Request"}
                  </button>
                }
              />

              {/* Revision Submission Form */}
              {showRevForm && (
                <div className="p-5 bg-green-50/50 border-b border-green-100 flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={newRevType}
                      onChange={(e) => setNewRevType(e.target.value)}
                      className="p-2 text-sm border border-green-200 rounded-md bg-white outline-none focus:border-green-400"
                    >
                      <option value="revision">General Revision</option>
                      <option value="color_correction">Color Correction</option>
                      <option value="vfx">VFX / Effects</option>
                      <option value="sound_design">Sound / Audio</option>
                    </select>
                    <input
                      type="text"
                      value={newRevText}
                      onChange={(e) => setNewRevText(e.target.value)}
                      placeholder="Describe what you want changed..."
                      className="flex-1 p-2 text-sm border border-green-200 rounded-md bg-white outline-none focus:border-green-400"
                    />
                    <button
                      onClick={handleRequestRevision}
                      disabled={isSubmitting || !newRevText.trim()}
                      className="px-4 py-2 bg-green-600 text-white font-bold rounded-md text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                  <p className="text-xs text-green-700">
                    Note: You have {project.revisions_requested || 1} total
                    revision rounds included.
                  </p>
                </div>
              )}

              <div className="divide-y divide-neutral-100">
                {!localRevisions?.length ? (
                  <div className="p-6 text-center text-neutral-500">
                    No change requests yet.
                  </div>
                ) : (
                  localRevisions.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-6 hover:bg-neutral-50/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-neutral-900 capitalize text-sm">
                          {rev.request_type?.replace("_", " ") || "Revision"}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md border ${getRevisionColor(rev.status)}`}
                        >
                          {rev.status}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600">
                        {rev.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ⚡ UPDATED: FUNCTIONAL CLIENT CHAT */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col h-150">
              <SectionHeader title="Messages to Editor" />

              <div className="flex-1 p-6 overflow-y-auto flex flex-col-reverse">
                <div className="flex flex-col space-y-4 w-full">
                  {!localMessages?.length ? (
                    <div className="text-center text-sm text-neutral-500 mt-10">
                      No messages yet. Send a message to get started.
                    </div>
                  ) : (
                    localMessages.map((msg) => {
                      const isClientMessage = msg.author === "client";
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isClientMessage ? "items-end" : "items-start"}`}
                        >
                          <span className="text-[10px] uppercase font-bold text-neutral-400 mb-1 px-1">
                            {isClientMessage ? "You" : "Editor"}
                          </span>
                          <div
                            className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                              isClientMessage
                                ? "bg-neutral-900 text-white rounded-tr-sm"
                                : "bg-white border border-neutral-100 text-neutral-800 rounded-tl-sm"
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="p-4 bg-white border-t border-neutral-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-neutral-100 border-transparent rounded-lg px-4 py-2 text-sm focus:border-green-400 outline-none transition-all"
                  />
                  <Buttonx
                    onClick={handleSendMessage}
                    disabled={isSubmitting || !chatMessage.trim()}
                    beamSize={0}
                    buttonClassName="bg-green-400 hover:bg-green-500 text-white p-2 rounded-lg aspect-square flex items-center justify-center disabled:opacity-50"
                  >
                    <Send size={16} />
                  </Buttonx>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper for Preview Environment
export default function App() {
  const mockProject = {
    id: 1,
    project_title: "Summer Ad Campaign 2026",
    client_name: "Creative Agency X",
    client_email: "hello@creativex.com",
    client_phone: "+91 9876543210",
    status: "review",
    expected_video_count: 3,
    agreed_price: 4500,
    deadline: "2026-07-15T00:00:00Z",
    drive_link: "https://drive.google.com/...",
    final_delivery_link: "https://frame.io/...",
    batch_details: JSON.stringify([
      { count: 1, duration: 60 },
      { count: 2, duration: 15 },
    ]),
    notes: JSON.stringify([
      {
        id: 101,
        text: "Prioritize a fast-paced edit for the 15-second cut.",
        date: "2026-06-21T10:00:00Z",
        status: "completed",
      },
      {
        id: 102,
        text: "Music should be upbeat and energetic.",
        date: "2026-06-21T10:05:00Z",
        status: "approved",
      },
      {
        id: 103,
        text: "Wait on the new logo file before finalizing.",
        date: "2026-06-21T11:00:00Z",
        status: "sent",
      },
    ]),
  };

  const mockRevisions = [
    {
      id: 1,
      request_type: "VFX Update",
      description: "Can we track the logo onto the wall in the opening shot?",
      status: "pending",
    },
    {
      id: 2,
      request_type: "Color Correction",
      description: "Make the outdoor scenes slightly warmer.",
      status: "approved",
    },
  ];

  const mockMessages = [
    {
      id: 1,
      author: "client",
      message: "Hey Rupam, just uploaded the raw files to the drive!",
    },
    {
      id: 2,
      author: "admin",
      message: "Received! I'll start assembling the timeline today.",
    },
  ];

  return (
    <ClientProjectDetails
      project={mockProject}
      revisions={mockRevisions}
      messages={mockMessages}
    />
  );
}
