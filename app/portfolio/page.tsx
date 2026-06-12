"use client";

import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";
import { ArrowRight } from "lucide-react";

export default function Portfolio() {
  return(<section id="work" className="scroll-mt-20 mx-5  md:mx-80 px-4 py-10">
      <div className="flex items-center justify-center">
        <h2 className="text-2xl md:text-5xl text-neutral-800 font-bebas uppercase font-bold">
          <TextAnimate animation="blurInUp" by="character" once>
            Featured Work
          </TextAnimate>
        </h2>
      </div>
      <div className="my-6" />
      <main className="mx-auto grid grid-cols-2 md:grid-cols-5 gap-2 items-start  grid-flow-dense">
        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./portrait (1).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-sm font-bold text-white">
              Tattoo Artist
            </h3>
          </div>
        </div>

        {/* Landscape 1 */}
        <div className="group relative rounded-md overflow-hidden col-span-2 md:aspect-8/7 aspect-video w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./vdo_Landscape (01).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-sm font-medium text-white">
              Restaurant tour
            </h3>
          </div>
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./portrait (2).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-sm font-medium text-white">
              Preparation
            </h3>
          </div>
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./portrait (3).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent  group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-sm font-medium text-white">
              Product Ad
            </h3>
          </div>
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-2 md:aspect-8/7 aspect-video w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./vdo_Landscape (02).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent  group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-sm font-medium text-white">
              Fashion Outlook
            </h3>
          </div>
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./portrait (4).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent  group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-sm font-medium text-white">
              Clothing Store
            </h3>
          </div>
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./portrait (5).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent  group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-sm font-medium text-white">
              Sports Montage
            </h3>
          </div>
        </div>

        <div className="group relative rounded-md overflow-hidden col-span-1 aspect-9/16 w-full bg-white/0 shadow-xl transition-transform ">
          <video
            src="./portrait (6).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent  group-hover:opacity-100 transition-opacity duration-300 flex items-end px-3 py-1.5">
            <h3 className="text-md md:text-sm font-medium text-white">
              Food Montage
            </h3>
          </div>
        </div>
      </main>
    </section>
)
  
}
// Context: I am building a freelance portal with Supabase and Next.js. We previously set up my SQL schema with projects, client_projects, inquiries, and feedback tables. We left off needing to secure the inquiries table by dropping the public RLS insert policy and moving the contact form submission to a Next.js API route using the service_role key.  
// I just finished building authentication. Can you write that Next.js API route for the inquiry form now?


// Get Anthropic key: https://console.anthropic.com → API Keys → Create Key
// Get Resend key: https://resend.com → Sign up free → API Keys → Create. For now use their sandbox — it sends emails only to your own verified email address, which is all you need for testing.