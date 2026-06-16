"use client";

import { useRouter } from "next/navigation";
import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";

type ProjectDetailsProps = {
  project: any;
  revisions: any[];
  feedback: any[];
};

export default function ProjectDetailsClientView({ project, revisions, feedback }: ProjectDetailsProps) {
  const router = useRouter();

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

  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden bg-neutral-50/50">
      
      {/* BACKGROUND ORBS */}
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 z-0 bg-green-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 z-0 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-6 mt-6">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => router.push('/dashboard')}
          className="flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        {/* HEADER SECTION */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-100 pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-bebas uppercase font-bold text-neutral-900">
                <TextAnimate animation="blurInUp" by="character" once>
                  {project.project_title}
                </TextAnimate>
              </h1>
              <p className="text-neutral-500 mt-1">
                Started on {new Date(project.created_at).toLocaleDateString("en-IN")}
              </p>
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
              <p className="text-lg font-medium text-neutral-900">${project.agreed_price || "TBD"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Deadline</p>
              <p className="text-lg font-medium text-neutral-900">
                {project.deadline ? new Date(project.deadline).toLocaleDateString("en-IN") : "Flexible"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Client</p>
              <p className="text-lg font-medium text-neutral-900">{project.client_name}</p>
            </div>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: Notes & Revisions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Notes */}
            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Project Notes</h2>
              <p className="text-neutral-600 leading-relaxed">
                {project.notes || "No additional notes provided for this project."}
              </p>
            </div>

            {/* Revisions / Change Requests */}
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
                        <span className="font-semibold text-neutral-900 capitalize text-sm">
                          {rev.request_type.replace('_', ' ')}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-md border ${getRevisionColor(rev.status)}`}>
                          {rev.status}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600">{rev.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Feedback & Messages */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col h-125">
              <div className="p-6 border-b border-neutral-100 bg-white">
                <h2 className="text-lg font-bold text-neutral-900">Messages & Feedback</h2>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {!feedback?.length ? (
                  <div className="text-center text-sm text-neutral-500 mt-10">No messages yet.</div>
                ) : (
                  feedback.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.author === 'rupam' ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 mb-1 px-1">
                        {msg.author}
                      </span>
                      <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                        msg.author === 'rupam' 
                          ? 'bg-neutral-900 text-white rounded-tr-sm' 
                          : 'bg-neutral-100 text-neutral-800 rounded-tl-sm'
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input Area */}
              <div className="p-4 bg-white border-t border-neutral-100">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="flex-1 bg-neutral-100 border-transparent rounded-lg px-4 py-2 text-sm focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                  />
                  <Buttonx buttonClassName="bg-green-400 hover:bg-green-500 text-white p-2 rounded-lg aspect-square flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
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