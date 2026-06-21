"use client";

import {
  Check,
  X,
  Edit2,
  Link as LinkIcon,
  Send,
  Video,
  CheckCircle,
  XCircle,
  Eye,
  Download,
} from "lucide-react";
import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectAdmin } from "@/hooks/useProjectAdmin";

interface AdminProjectDetailsProps {
  project: any;
  revisions: any[];
  messages: any[];
}

export function AdminProjectDetails({
  project,
  revisions,
  messages,
}: AdminProjectDetailsProps) {
  // 1. Initialize our powerful new custom hook
  const { state, actions, router } = useProjectAdmin(
    project,
    revisions,
    messages,
  );

  return (
    <div className="relative min-h-screen px-3 p-3 md:px-4 md:p-8 overflow-hidden bg-neutral-50/50 font-sans">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 z-0 bg-green-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 z-0 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none"></div>

      <div className="relative z-10 ml-0 mr-0 md:ml-24 md:mr-20 space-y-3 md:space-y-6 mt-0">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center text-xs md:text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors w-fit"
        >
          <svg
            className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1"
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
          Back to Admin Dashboard
        </button>
        <p className="text-xs md:text-md ml-1 font-bold text-neutral-500 tracking-normal uppercase mb-0">
          Admin Operations
        </p>

        {/* 2. Cleanly stitch the sub-components together */}
        <ProjectHeader state={state} actions={actions} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          <div className="lg:col-span-2 space-y-3 md:space-y-6">
            <DeliverablesSection state={state} actions={actions} />
            <VideoAssetsSection state={state} />
            <RequirementsSection state={state} actions={actions} />
            <RevisionsSection state={state} actions={actions} />
          </div>

          <div className="space-y-3 md:space-y-6">
            <ChatSection state={state} actions={actions} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENTS (Kept clean and separate!)
// ==========================================

function ProjectHeader({ state, actions }: any) {
  const { currentProject, isUpdating } = state;
  return (
    <div className="bg-white/80 backdrop-blur-md border-green-200 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 md:p-8 border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4 pb-3 md:pb-6">
        <div>
          <h1 className="text-base md:text-xl ml-1 font-bold text-neutral-900 uppercase">
            <TextAnimate>{currentProject.project_title}</TextAnimate>
          </h1>
          <div className="text-neutral-600 mt-1 p-1 md:p-1.5 pt-1 pl-2 bg-neutral-100 rounded-sm flex flex-row flex-wrap gap-1.5 md:gap-2">
            {currentProject.client_name && (
              <p className="text-xs md:text-sm mt-0.5">{currentProject.client_name}</p>
            )}
            {currentProject.client_email && (
              <p className="text-xs md:text-sm mt-0.5">{currentProject.client_email}</p>
            )}
            {currentProject.client_phone && (
              <p className="text-xs md:text-sm mt-0.5">{currentProject.client_phone}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 items-end md:items-center">
          <StatusBadge status={currentProject.status} />
          <Select
            value={currentProject.status}
            onValueChange={actions.handleStatusChange}
            disabled={isUpdating}
          >
            <SelectTrigger className="text-xs md:text-sm font-medium bg-neutral-100 text-neutral-700 border-neutral-200 rounded-sm hover:bg-neutral-700 hover:text-white transition-colors outline-none disabled:opacity-50">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4}>
              <SelectGroup>
                <SelectItem value="received">Set: Received</SelectItem>
                <SelectItem value="editing">Set: Editing</SelectItem>
                <SelectItem value="revisions">Set: Revisions</SelectItem>
                <SelectItem value="completed">Set: Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ProjectMetrics state={state} actions={actions} />
    </div>
  );
}

function ProjectMetrics({ state, actions }: any) {
  const { currentProject, editingField, tempPrice, tempDeadline, tempLink } =
    state;
  const {
    setEditingField,
    setTempPrice,
    setTempDeadline,
    setTempLink,
    handleUpdateProject,
  } = actions;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 h-auto md:h-10">
      <div>
        <p className="text-[10px] md:text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          Videos
        </p>
        <p className="text-sm md:text-md font-medium text-neutral-900 mt-1">
          {currentProject.expected_video_count}
        </p>
      </div>

      <div>
        <p className="text-[10px] md:text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
          Agreed Price <Edit2 size={10} className="md:size-3" />
        </p>
        {editingField === "price" ? (
          <div className="flex items-center gap-2 mt-1">
            <input
              type="number"
              value={tempPrice}
              onChange={(e) => setTempPrice(e.target.value)}
              className="w-16 md:w-20 p-1 text-xs md:text-sm border rounded outline-none"
            />
            <button
              onClick={() => handleUpdateProject("agreed_price", tempPrice)}
              className="text-green-600"
            >
              <Check size={14} className="md:size-4" />
            </button>
            <button
              onClick={() => setEditingField(null)}
              className="text-red-500"
            >
              <X size={14} className="md:size-4" />
            </button>
          </div>
        ) : (
          <p
            onClick={() => setEditingField("price")}
            className="text-sm md:text-md font-medium text-neutral-900 cursor-pointer hover:text-green-600 transition-colors border-b border-dashed border-neutral-300 w-fit mt-1"
          >
            ₹{currentProject.agreed_price || "0"}
          </p>
        )}
      </div>

      <div>
        <p className="text-[10px] md:text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
          Deadline <Edit2 size={10} className="md:size-3" />
        </p>
        {editingField === "deadline" ? (
          <div className="flex items-center gap-2 mt-1">
            <input
              type="date"
              value={tempDeadline}
              onChange={(e) => setTempDeadline(e.target.value)}
              className="w-28 md:w-32 p-1 text-xs md:text-sm border rounded outline-none"
            />
            <button
              onClick={() => handleUpdateProject("deadline", tempDeadline)}
              className="text-green-600"
            >
              <Check size={14} className="md:size-4" />
            </button>
            <button
              onClick={() => setEditingField(null)}
              className="text-red-500"
            >
              <X size={14} className="md:size-4" />
            </button>
          </div>
        ) : (
          <p
            onClick={() => setEditingField("deadline")}
            className="text-sm md:text-md font-medium text-neutral-900 cursor-pointer hover:text-green-600 transition-colors border-b border-dashed border-neutral-300 w-fit mt-1"
          >
            {currentProject.deadline
              ? new Date(currentProject.deadline).toLocaleDateString("en-IN")
              : "Set Date"}
          </p>
        )}
      </div>

      <div>
        <p className="text-[10px] md:text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
          Raw Assets <Edit2 size={10} className="md:size-3" />
        </p>
        {editingField === "link" ? (
          <div className="flex items-center gap-2 mt-1">
            <input
              type="url"
              placeholder="https://"
              value={tempLink}
              onChange={(e) => setTempLink(e.target.value)}
              className="w-28 md:w-32 p-1 text-xs md:text-sm border rounded outline-none"
            />
            <button
              onClick={() => handleUpdateProject("drive_link", tempLink)}
              className="text-green-600"
            >
              <Check size={14} className="md:size-4" />
            </button>
            <button
              onClick={() => setEditingField(null)}
              className="text-red-500"
            >
              <X size={14} className="md:size-4" />
            </button>
          </div>
        ) : (
          <a
            href={currentProject.drive_link || "#"}
            target="_blank"
            rel="noreferrer"
            className={`text-xs md:text-sm font-medium flex items-center gap-1 mt-2 w-fit ${currentProject.drive_link ? "text-blue-600 hover:underline" : "text-neutral-400"}`}
          >
            <LinkIcon size={12} className="md:size-3.5" />{" "}
            {currentProject.drive_link ? "Open Folder" : "No Link"}
          </a>
        )}
        {!editingField && (
          <p
            onClick={() => setEditingField("link")}
            className="text-[9px] md:text-[10px] text-neutral-500 cursor-pointer hover:text-neutral-900 mt-1"
          >
            Edit Link
          </p>
        )}
      </div>
    </div>
  );
}

function DeliverablesSection({ state, actions }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-green-200 rounded-md shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
      <div className="bg-green-50/50 border-b border-green-100 p-3 md:p-4 flex items-center gap-2">
        <Video className="text-green-600" size={16} />
        <h3 className="font-semibold text-green-900 uppercase tracking-wider text-xs md:text-sm">
          Final Deliverables
        </h3>
      </div>
      <div className="p-4 md:p-6">
        <p className="text-xs md:text-sm text-neutral-500 mb-2 md:mb-3">
          Paste the Frame.io review link or final Google Drive folder here for
          the client to see.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <input
            type="url"
            value={state.deliverableLink}
            onChange={(e) => actions.setDeliverableLink(e.target.value)}
            placeholder="https://frame.io/..."
            className="flex-1 bg-neutral-50 border border-neutral-200 rounded-md px-3 md:px-4 py-2 text-xs md:text-sm outline-none focus:border-green-400"
          />
          <button
            onClick={() =>
              actions.handleUpdateProject(
                "final_delivery_link",
                state.deliverableLink,
              )
            }
            disabled={
              state.isUpdating ||
              state.deliverableLink === state.currentProject.final_delivery_link
            }
            className="px-3 md:px-4 py-2 bg-neutral-900 text-white rounded-md text-xs md:text-sm font-medium hover:bg-neutral-800 disabled:opacity-50 shrink-0"
          >
            Save Link
          </button>
        </div>
      </div>
    </div>
  );
}

function VideoAssetsSection({ state }: any) {
  if (state.expectedVideos.length === 0) return null;

  return (
    <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-md shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
      <SectionHeader title="Expected Video Assets" />
      <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {state.expectedVideos.map((vid: any) => (
          <div
            key={vid.id}
            className={`flex items-center justify-between p-2.5 md:p-3 rounded-xl border ${vid.theme.border} ${vid.theme.bg} transition-all hover:shadow-md group`}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-sm ${vid.theme.iconBg} ${vid.theme.text}`}
              >
                <Video size={15} className="md:size-4" />
              </div>
              <div>
                <p className={`font-bold text-xs md:text-sm ${vid.theme.text}`}>
                  {vid.name}
                </p>
                <p className="text-[9px] md:text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                  {vid.duration} Seconds
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
              <a
                href={
                  state.deliverableLink ||
                  state.currentProject.drive_link ||
                  "#"
                }
                target="_blank"
                rel="noreferrer"
                className={`p-1.5 md:p-2 rounded-lg bg-white shadow-sm hover:scale-105 transition-transform ${vid.theme.text}`}
                title="View Final Link"
              >
                <Eye size={14} className="md:size-4" />
              </a>
              <a
                href={state.currentProject.drive_link || "#"}
                target="_blank"
                rel="noreferrer"
                className={`p-1.5 md:p-2 rounded-lg bg-white shadow-sm hover:scale-105 transition-transform ${vid.theme.text}`}
                title="Raw Drive Link"
              >
                <Download size={14} className="md:size-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RequirementsSection({ state, actions }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-md shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
      <SectionHeader title="Project Requirements & Details" />
      {state.requirements.length > 0 ? (
        <div className="divide-y divide-neutral-100">
          {state.requirements.map((req: any, idx: number) => (
            <div
              key={req.id}
              className="p-3 md:p-5 flex flex-col sm:flex-row justify-between items-start gap-2 md:gap-4 hover:bg-neutral-50/50 transition-colors"
            >
              <div className="flex gap-2 md:gap-3">
                <span className="text-neutral-400 font-bold text-xs md:text-sm mt-0.5">
                  {idx + 1}.
                </span>
                <div>
                  <p className="text-neutral-800 text-xs md:text-sm leading-relaxed">
                    {req.text}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 md:mt-2">
                    <span
                      className={`text-[9px] md:text-[10px] font-bold uppercase px-1.5 md:px-2 py-0.5 rounded-full ${
                        req.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : req.status === "approved"
                            ? "bg-blue-100 text-blue-700"
                            : req.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {req.status}
                    </span>
                    <span className="text-[9px] md:text-[10px] text-neutral-400">
                      {new Date(req.date).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 md:gap-1.5 shrink-0 self-end sm:self-auto">
                {req.status === "sent" && (
                  <>
                    <button
                      onClick={() =>
                        actions.handleRequirementAction(req.id, "approved")
                      }
                      disabled={state.isUpdating}
                      className="p-1 md:p-1.5 text-blue-600 hover:bg-blue-50 rounded disabled:opacity-50"
                      title="Approve"
                    >
                      <CheckCircle size={16} className="md:size-4" />
                    </button>
                    <button
                      onClick={() =>
                        actions.handleRequirementAction(req.id, "rejected")
                      }
                      disabled={state.isUpdating}
                      className="p-1 md:p-1.5 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                      title="Reject"
                    >
                      <XCircle size={16} className="md:size-4" />
                    </button>
                  </>
                )}
                {(req.status === "approved" || req.status === "sent") && (
                  <button
                    onClick={() =>
                      actions.handleRequirementAction(req.id, "completed")
                    }
                    disabled={state.isUpdating}
                    className="px-2 md:px-3 py-1 md:py-1.5 bg-green-50 text-green-700 hover:bg-green-100 text-[10px] md:text-xs font-bold rounded-md border border-green-200 disabled:opacity-50"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 md:p-6">
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed whitespace-pre-wrap">
            {state.legacyNotes || "No additional notes provided by the client."}
          </p>
        </div>
      )}
    </div>
  );
}

function RevisionsSection({ state, actions }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-md shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
      <SectionHeader title="Change Requests (Revisions)" />
      <div className="divide-y divide-neutral-100">
        {!state.localRevisions?.length ? (
          <div className="p-4 md:p-6 text-center text-sm text-neutral-500">
            No active change requests from client.
          </div>
        ) : (
          state.localRevisions.map((rev: any) => (
            <div
              key={rev.id}
              className="p-4 md:p-6 hover:bg-neutral-50/50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4"
            >
              <div>
                <span className="font-semibold text-neutral-900 capitalize text-xs md:text-sm block mb-1">
                  {rev.request_type
                    ? rev.request_type.replace("_", " ")
                    : "Revision"}
                </span>
                <p className="text-xs md:text-sm text-neutral-600">{rev.description}</p>
                {rev.status && (
                  <p
                    className={`text-[10px] md:text-xs mt-1.5 md:mt-2 font-bold ${rev.status === "approved" ? "text-green-600" : rev.status === "rejected" ? "text-red-600" : "text-amber-500"}`}
                  >
                    Status: {rev.status.toUpperCase()}
                  </p>
                )}
              </div>

              {rev.status !== "approved" && rev.status !== "rejected" && (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() =>
                      actions.handleRevisionAction(rev.id, "approved")
                    }
                    disabled={state.isUpdating}
                    className="px-2.5 md:px-3 py-1 md:py-1.5 bg-green-50 text-green-700 text-[10px] md:text-xs font-bold rounded-md border border-green-200 hover:bg-green-100 disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      actions.handleRevisionAction(rev.id, "rejected")
                    }
                    disabled={state.isUpdating}
                    className="px-2.5 md:px-3 py-1 md:py-1.5 bg-red-50 text-red-700 text-[10px] md:text-xs font-bold rounded-md border border-red-200 hover:bg-red-100 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ChatSection({ state, actions }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-md shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col h-100 md:h-150">
      <SectionHeader title="Client Chat" />

      <div className="flex-1 p-3 md:p-6 overflow-y-auto space-y-3 md:space-y-4 flex flex-col-reverse">
        <div className="flex flex-col space-y-3 md:space-y-4 w-full">
          {!state.localMessages?.length ? (
            <div className="text-center text-xs md:text-sm text-neutral-500 mt-6 md:mt-10">
              No messages yet. Start the conversation.
            </div>
          ) : (
            state.localMessages.map((msg: any) => {
              const isAdminMessage =
                msg.author === "rupam" || msg.author === "admin";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAdminMessage ? "items-end" : "items-start"}`}
                >
                  <span className="text-[9px] md:text-[10px] uppercase font-bold text-neutral-400 mb-1 px-1">
                    {isAdminMessage ? "You" : state.currentProject.client_name}
                  </span>
                  <div
                    className={`p-2.5 md:p-3 rounded-2xl max-w-[85%] text-xs md:text-sm ${isAdminMessage ? "bg-neutral-900 text-white rounded-tr-sm" : "bg-neutral-100 text-neutral-800 rounded-tl-sm"}`}
                  >
                    {msg.message}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="p-3 md:p-4 bg-white border-t border-neutral-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={state.chatMessage}
            onChange={(e) => actions.setChatMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && actions.handleSendMessage()}
            placeholder="Message client..."
            className="flex-1 bg-neutral-100 border-transparent rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all"
          />
          <Buttonx
            onClick={actions.handleSendMessage}
            disabled={state.isUpdating || !state.chatMessage.trim()}
            buttonClassName="bg-green-400 hover:bg-green-500 text-white p-2 rounded-lg aspect-square flex items-center justify-center disabled:opacity-50"
          >
            <Send size={16} />
          </Buttonx>
        </div>
      </div>
    </div>
  );
}