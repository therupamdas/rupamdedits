"use client";

import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";

export default function ProfilePage() {
  const user = {
    name: "Rupam Das",
    email: "rupam@example.com",
    phone: "+91 98765 43210",
    joined: "January 2025",
    clientId: "CL-1024",
    totalProjects: 12,
    activeProjects: 4,
    deliveredProjects: 8,
  };

  const recentActivity = [
    {
      id: 1,
      title: "Summer Commercial Reel",
      status: "editing",
      date: "Oct 24, 2024",
    },
    {
      id: 2,
      title: "TikTok Vertical Cuts",
      status: "review",
      date: "Oct 28, 2024",
    },
    {
      id: 3,
      title: "Corporate Event Highlights",
      status: "delivered",
      date: "Nov 02, 2024",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "editing":
        return "bg-blue-100 text-blue-700";
      case "review":
        return "bg-yellow-100 text-yellow-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-neutral-100 text-neutral-700";
    }
  };

  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden bg-neutral-50/50">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 bg-green-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60" />
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60" />

      <div className="relative z-10 max-w-6xl mx-auto mt-12 space-y-8">
        {/* HERO */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="w-28 h-28 rounded-full bg-linear-to-br from-green-200 to-blue-200 flex items-center justify-center shadow-sm">
                <span className="text-4xl font-bold text-neutral-900">
                  RD
                </span>
              </div>

              {/* User Info */}
              <div className="text-center sm:text-left">
                <h1 className="text-5xl font-bebas uppercase text-neutral-900">
                  <TextAnimate animation="blurInUp" by="character" once>
                    {user.name}
                  </TextAnimate>
                </h1>

                <p className="text-green-700 font-medium">
                  Premium Client
                </p>

                <p className="text-neutral-500 mt-2">
                  {user.email}
                </p>

                <p className="text-neutral-400 text-sm mt-1">
                  Client ID: {user.clientId}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Buttonx
                buttonClassName="
                  h-12
                  px-6
                  bg-white
                  text-neutral-900
                  border
                  border-neutral-200
                  hover:bg-neutral-50
                  rounded-md
                "
              >
                Edit Profile
              </Buttonx>

              <Buttonx
                buttonClassName="
                  h-12
                  px-6
                  bg-green-300
                  text-neutral-900
                  border-0
                  hover:bg-green-400
                  rounded-md
                "
              >
                New Request
              </Buttonx>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <p className="text-4xl font-bold text-neutral-900">
              {user.totalProjects}
            </p>
            <p className="text-neutral-500 mt-2">
              Total Projects
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <p className="text-4xl font-bold text-blue-700">
              {user.activeProjects}
            </p>
            <p className="text-neutral-500 mt-2">
              Active Projects
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <p className="text-4xl font-bold text-green-700">
              {user.deliveredProjects}
            </p>
            <p className="text-neutral-500 mt-2">
              Delivered Projects
            </p>
          </div>
        </div>

        {/* INFO + ACTIVITY */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Account Info */}
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">
              Account Information
            </h2>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-neutral-500">
                  Full Name
                </p>
                <p className="font-medium text-neutral-900">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-500">
                  Email
                </p>
                <p className="font-medium text-neutral-900">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-500">
                  Phone Number
                </p>
                <p className="font-medium text-neutral-900">
                  {user.phone}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-500">
                  Joined
                </p>
                <p className="font-medium text-neutral-900">
                  {user.joined}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-500">
                  Client ID
                </p>
                <p className="font-medium text-neutral-900">
                  {user.clientId}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
            <div className="p-6 border-b border-neutral-200/60">
              <h2 className="text-xl font-bold text-neutral-900">
                Recent Activity
              </h2>
              <p className="text-neutral-500 text-sm mt-1">
                Latest project updates and deliveries.
              </p>
            </div>

            <div className="divide-y divide-neutral-200/60">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md ${getStatusColor(
                        activity.status
                      )}`}
                    >
                      {activity.status}
                    </span>

                    <div>
                      <h3 className="font-bold text-neutral-900">
                        {activity.title}
                      </h3>

                      <p className="text-sm text-neutral-500 mt-1">
                        Updated on {activity.date}
                      </p>
                    </div>
                  </div>

                  <Buttonx
                    buttonClassName="
                      h-10
                      px-5
                      bg-green-300
                      text-neutral-900
                      hover:bg-green-400
                      rounded-md
                    "
                  >
                    View
                  </Buttonx>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
