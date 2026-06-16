"use client";

import { useRouter } from "next/navigation";
import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";
import Link from "next/link";

// ==========================================
// 1. SHARED HELPERS & TYPES
// ==========================================
type ProjectDetailsProps = {
  project: any;
  revisions: any[];
  feedback: any[];
  isAdmin?: boolean; // Added to the main export
};

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "received": return "bg-neutral-200 text-neutral-700";
    case "editing": return "bg-blue-100 text-blue-700";
    case "review": return "bg-yellow-100 text-yellow-700";
    case "delivered": return "bg-green-100 text-green-700";
    case "paused": return "bg-red-100 text-red-700";
    default: return "bg-neutral-100 text-neutral-600";
  }
};

const getRevisionColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending": return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "approved": return "text-green-600 bg-green-50 border-green-200";
    case "rejected": return "text-red-600 bg-red-50 border-red-200";
    default: return "text-neutral-600 bg-neutral-50 border-neutral-200";
  }
};

// ==========================================
// 2. COMPONENT: Admin View
// ==========================================
function AdminProjectDetails({ project, revisions, feedback }: ProjectDetailsProps) {
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

        {/* ADMIN HEADER */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border-t-4 border-t-neutral-900">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-100 pb-6 mb-6">
            <div>
              <p className="text-xs font-bold text-neutral-400 tracking-widest uppercase mb-1">Admin Management</p>
              <h1 className="text-3xl font-bebas uppercase font-bold text-neutral-900">
                <TextAnimate animation="blurInUp" by="character" once>{project.project_title}</TextAnimate>
              </h1>
              <p className="text-neutral-500 mt-1">Client: <span className="font-semibold text-neutral-900">{project.client_name}</span> ({project.client_email})</p>
            </div>
            
            {/* Admin Controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-end md:items-center">
              <span className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-md ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <button className="text-sm font-medium px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors">
                Update Status
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
              <p className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                {project.drive_link ? "View Folder" : "+ Add Link"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Client Notes & Batch Details</h2>
              <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap">
                {project.notes || "No additional notes provided."}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-neutral-900">Pending Change Requests</h2>
              </div>
              <div className="divide-y divide-neutral-100">
                {!revisions?.length ? (
                  <div className="p-6 text-center text-neutral-500">No active change requests.</div>
                ) : (
                  revisions.map((rev) => (
                    <div key={rev.id} className="p-6 hover:bg-neutral-50/50 transition-colors flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-neutral-900 capitalize text-sm block mb-1">
                          {rev.request_type.replace('_', ' ')}
                        </span>
                        <p className="text-sm text-neutral-600">{rev.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md border border-green-200 hover:bg-green-100">Approve</button>
                        <button className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-md border border-red-200 hover:bg-red-100">Reject</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ADMIN FEEDBACK CHAT */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col h-125">
              <div className="p-6 border-b border-neutral-100 bg-white">
                <h2 className="text-lg font-bold text-neutral-900">Client Chat</h2>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {!feedback?.length ? (
                  <div className="text-center text-sm text-neutral-500 mt-10">No messages yet.</div>
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

// ==========================================
// 3. COMPONENT: Client View
// ==========================================
function ClientProjectDetails({ project, revisions, feedback }: ProjectDetailsProps) {
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
          Back to Dashboard
        </button>

        {/* CLIENT HEADER */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-100 pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-bebas uppercase font-bold text-neutral-900">
                <TextAnimate animation="blurInUp" by="character" once>{project.project_title}</TextAnimate>
              </h1>
              <p className="text-neutral-500 mt-1">Started on {new Date(project.created_at).toLocaleDateString("en-IN")}</p>
            </div>
            <span className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-md ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Videos</p>
              <p className="text-lg font-medium text-neutral-900">{project.expected_video_count}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Price</p>
              <p className="text-lg font-medium text-neutral-900">₹{project.agreed_price || "Pending Review"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Deadline</p>
              <p className="text-lg font-medium text-neutral-900">{project.deadline ? new Date(project.deadline).toLocaleDateString("en-IN") : "Flexible"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Final Files</p>
              {project.drive_link ? (
                <a href={project.drive_link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-green-600 hover:underline">Download</a>
              ) : (
                <p className="text-sm font-medium text-neutral-400">Not Ready</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Project Notes</h2>
              <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap">{project.notes || "No additional notes provided."}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-neutral-900">Change Requests</h2>
                <button className="text-sm font-semibold text-green-600 hover:text-green-700">+ New Request</button>
              </div>
              <div className="divide-y divide-neutral-100">
                {!revisions?.length ? (
                  <div className="p-6 text-center text-neutral-500">No change requests yet.</div>
                ) : (
                  revisions.map((rev) => (
                    <div key={rev.id} className="p-6 hover:bg-neutral-50/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-neutral-900 capitalize text-sm">{rev.request_type.replace('_', ' ')}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-md border ${getRevisionColor(rev.status)}`}>{rev.status}</span>
                      </div>
                      <p className="text-sm text-neutral-600">{rev.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* CLIENT FEEDBACK CHAT */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col h-125">
              <div className="p-6 border-b border-neutral-100 bg-white">
                <h2 className="text-lg font-bold text-neutral-900">Messages to Editor</h2>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {!feedback?.length ? (
                  <div className="text-center text-sm text-neutral-500 mt-10">No messages yet.</div>
                ) : (
                  feedback.map((msg) => {
                    const isClientMessage = msg.author !== 'rupam' && msg.author !== 'admin';
                    return (
                      <div key={msg.id} className={`flex flex-col ${isClientMessage ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 mb-1 px-1">
                          {isClientMessage ? 'You' : 'Editor'}
                        </span>
                        <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                          isClientMessage 
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
                  <input type="text" placeholder="Type a message..." className="flex-1 bg-neutral-100 border-transparent rounded-lg px-4 py-2 text-sm focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all" />
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

// ==========================================
// 4. MAIN EXPORT: The Controller
// ==========================================
export default function ProjectDetailsClientView({ project, revisions, feedback, isAdmin }: ProjectDetailsProps) {
  // Routes to the correct component based on the user's role
  if (isAdmin) {
    return <AdminProjectDetails project={project} revisions={revisions} feedback={feedback} />;
  }
  
  return <ClientProjectDetails project={project} revisions={revisions} feedback={feedback} />;
}