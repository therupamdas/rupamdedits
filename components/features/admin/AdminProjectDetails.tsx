"use client";

import { useRouter } from "next/navigation";
import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface AdminProjectDetailsProps {
  project: any;
  revisions: any[];
  feedback: any[];
}

export function AdminProjectDetails({ project, revisions, feedback }: AdminProjectDetailsProps) {
  const router = useRouter();

  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden bg-neutral-50/50">
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 z-0 bg-green-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 z-0 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>

      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-6 mt-6">
        <button onClick={() => router.push('/dashboard')} className="flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Admin Dashboard
        </button>

        {/* ADMIN OVERRIDES HEADER */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border-t-4 border-t-neutral-900">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-100 pb-6 mb-6">
            <div>
              <p className="text-xs font-bold text-neutral-400 tracking-widest uppercase mb-1">Admin Operations</p>
              <h1 className="text-3xl font-bebas uppercase font-bold text-neutral-900">
                <TextAnimate animation="blurInUp" by="character" once>{project.project_title}</TextAnimate>
              </h1>
              <p className="text-neutral-500 mt-1">Client: <span className="font-semibold text-neutral-900">{project.client_name}</span> ({project.client_email})</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 items-end md:items-center">
              <StatusBadge status={project.status} />
              <button className="text-sm font-medium px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors">
                Change Status
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Videos</p>
              <p className="text-lg font-medium text-neutral-900">{project.expected_video_count}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Agreed Price</p>
              <p className="text-lg font-medium text-neutral-900 cursor-pointer hover:text-green-600 transition-colors border-b border-dashed border-neutral-300 w-fit">
                ₹{project.agreed_price || "Set Price"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Deadline</p>
              <p className="text-lg font-medium text-neutral-900 cursor-pointer hover:text-green-600 transition-colors border-b border-dashed border-neutral-300 w-fit">
                {project.deadline ? new Date(project.deadline).toLocaleDateString("en-IN") : "Set Deadline"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Drive Link</p>
              <p className="text-sm font-medium text-blue-600 cursor-pointer hover:underline mt-1">
                {project.drive_link ? "Edit Link" : "+ Add Folder Link"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
              <SectionHeader title="Client Notes & Details" />
              <div className="p-6">
                <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap">
                  {project.notes || "No additional notes provided by the client."}
                </p>
              </div>
            </div>

            {/* REVISION APPROVAL CENTER */}
            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
              <SectionHeader title="Pending Change Requests" />
              <div className="divide-y divide-neutral-100">
                {!revisions?.length ? (
                  <div className="p-6 text-center text-neutral-500">No active change requests from client.</div>
                ) : (
                  revisions.map((rev) => (
                    <div key={rev.id} className="p-6 hover:bg-neutral-50/50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="font-semibold text-neutral-900 capitalize text-sm block mb-1">
                          {rev.request_type.replace('_', ' ')}
                        </span>
                        <p className="text-sm text-neutral-600">{rev.description}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-md border border-green-200 hover:bg-green-100">Approve</button>
                        <button className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-bold rounded-md border border-red-200 hover:bg-red-100">Reject</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ADMIN CHAT */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col h-125">
              <SectionHeader title="Client Chat" />
              
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {!feedback?.length ? (
                  <div className="text-center text-sm text-neutral-500 mt-10">No messages yet. Start the conversation.</div>
                ) : (
                  feedback.map((msg) => {
                    const isAdminMessage = msg.author === 'rupam' || msg.author === 'admin';
                    return (
                      <div key={msg.id} className={`flex flex-col ${isAdminMessage ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 mb-1 px-1">
                          {isAdminMessage ? 'You' : project.client_name}
                        </span>
                        <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                          isAdminMessage 
                            ? 'bg-neutral-900 text-white rounded-tr-sm' 
                            : 'bg-neutral-100 text-neutral-800 rounded-tl-sm'
                        }`}>
                          {msg.message}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="p-4 bg-white border-t border-neutral-100">
                <div className="flex gap-2">
                  <input type="text" placeholder="Message client..." className="flex-1 bg-neutral-100 border-transparent rounded-lg px-4 py-2 text-sm focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all" />
                  <Buttonx buttonClassName="bg-green-400 hover:bg-green-500 text-white p-2 rounded-lg aspect-square flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
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