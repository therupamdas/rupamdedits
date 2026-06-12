"use client";
import { useState } from "react";
import { Plus, Minus, Trash2, PlusCircle } from "lucide-react";
import { Buttonx } from "@/components/layout/Buttonx";
import { Input } from "@/components/ui/input";

// 1. Define the shape of our VideoBatch object
interface VideoBatch {
  id: number;
  count: number;
  duration: number;
}

export default function ProjectSubmissionForm() {
  const BASE_RATE_PER_30_SEC = 350;
  const RATE_PER_EXTRA_REVISION = 20;
  const FREE_REVISIONS = 1;

  // 2. Tell useState that this array will hold VideoBatch objects
  const [videoBatches, setVideoBatches] = useState<VideoBatch[]>([
    { id: Date.now(), count: 1, duration: 30 },
  ]);
  
  const [revisions, setRevisions] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  // Changed phone to string to fix TS error and preserve leading zeros
  const [phone, setPhone] = useState<string>(""); 
  const [email, setEmail] = useState<string>("");

  const addVideoBatch = () => {
    setVideoBatches([
      ...videoBatches,
      { id: Date.now(), count: 1, duration: 30 },
    ]);
  };

  // 3. Type the 'id' parameter as a number
  const removeVideoBatch = (id: number) => {
    if (videoBatches.length > 1) {
      setVideoBatches(videoBatches.filter((batch) => batch.id !== id));
    }
  };

  // 4. Type 'id', 'field', and 'delta'
  const updateBatch = (
    id: number,
    field: "count" | "duration",
    delta: number,
  ) => {
    setVideoBatches((batches) =>
      batches.map((batch) => {
        if (batch.id === id) {
          if (field === "count") {
            return { ...batch, count: Math.max(1, batch.count + delta) };
          }
          if (field === "duration") {
            return {
              ...batch,
              duration: Math.max(15, batch.duration + delta * 15),
            };
          }
        }
        return batch;
      }),
    );
  };

  // 5. Type 'delta' as a number
  const updateRevisions = (delta: number) => {
    setRevisions(Math.max(0, revisions + delta));
  };

  const calculateTotal = (): number => {
    let total = 0;

    videoBatches.forEach((batch) => {
      const batchCost =
        BASE_RATE_PER_30_SEC * (batch.duration / 30) * batch.count;
      total += batchCost;
    });

    const extraRevisions = Math.max(0, revisions - FREE_REVISIONS);
    total += extraRevisions * RATE_PER_EXTRA_REVISION;

    return Math.round(total);
  };

  return (
    <div className="m-3 md:m-12 p-6 md:p-8 bg-white border border-gray-100 rounded-lg shadow-sm">
      
      {/* Header section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-normal uppercase">
          Start Your Project
        </h2>
        <p className="text-gray-500 mt-0">
          Tell me what you need, and get an instant estimate.
        </p>
      </div>

      {/* Flexbox Layout Strategy:
        - flex-col for mobile (stacked vertical rows)
        - md:flex-row & md:flex-wrap for PC (boxes)
        - md:w-1/3 forces exactly 3 items per line
      */}
      <div className="flex flex-col md:flex-row md:flex-wrap md:mx-4 gap-y-6 md:gap-y-8">
        
        {/* --- ROW 1 --- */}

        {/* 1. Name */}
        <div className="w-full md:w-1/3 md:px-4 flex flex-col">
          <label className="mb-3 block text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Name
          </label>
          <Input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Write your name here.."
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        {/* 2. Phone Number */}
        <div className="w-full md:w-1/3 md:px-4 flex flex-col">
          <label className="mb-3 block text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Phone Number
          </label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="Your Phone Number"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        {/* 3. Email Id */}
        <div className="w-full md:w-1/3 md:px-4 flex flex-col">
          <label className="mb-3 block text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Email Id
          </label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your Email Id"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        {/* --- ROW 2 --- */}

        {/* 4. Video Requirements */}
        <div className="w-full md:w-1/3 md:px-4 flex flex-col space-y-4">
          <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Video Requirements
          </label>
          <div className="flex-1 flex flex-col space-y-3">
            {videoBatches.map((batch) => (
              <div
                key={batch.id}
                className="flex flex-col xl:flex-row xl:items-center justify-between gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-2 py-1">
                  <button onClick={() => updateBatch(batch.id, "count", -1)} className="p-1 text-gray-400 hover:text-black transition-colors">
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <div className="w-6 text-center font-bold text-gray-900 select-none">
                    {batch.count}
                  </div>
                  <button onClick={() => updateBatch(batch.id, "count", 1)} className="p-1 text-gray-400 hover:text-black transition-colors">
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>

                <span className="text-xs font-medium text-gray-500 whitespace-nowrap hidden xl:block">
                  videos of
                </span>

                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-2 py-1">
                  <button onClick={() => updateBatch(batch.id, "duration", -1)} className="p-1 text-gray-400 hover:text-black transition-colors">
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <div className="w-10 text-center font-bold text-gray-900 select-none">
                    {batch.duration}s
                  </div>
                  <button onClick={() => updateBatch(batch.id, "duration", 1)} className="p-1 text-gray-400 hover:text-black transition-colors">
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>

                {videoBatches.length > 1 && (
                  <button onClick={() => removeVideoBatch(batch.id)} className="p-1 text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            <Buttonx
              onClick={addVideoBatch}
              buttonClassName="h-8 w-full border-1 border-neutral-200 text-sm text-green-500 hover:text-green-500 mt-auto"
              wrapperClassName="shadow-green-500"
              beamDuration={6}
              beamDelay={2}
              beamSize={50}
            >
              <PlusCircle size={15} className="mr-2" />
              Add another video type
            </Buttonx>
          </div>
        </div>

        {/* 5. Number of Revisions */}
        <div className="w-full md:w-1/3 md:px-4 flex flex-col space-y-4">
          <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Number of Revisions
          </label>
          <div className="flex-1 p-4 border border-gray-200 bg-gray-50 rounded-lg flex flex-col justify-center items-center space-y-3">
            <div className="flex items-center w-full bg-white border border-gray-200 rounded-lg px-2 py-2">
              <button onClick={() => updateRevisions(-1)} className="p-2 text-gray-400 hover:text-black transition-colors">
                <Minus size={16} strokeWidth={3} />
              </button>
              <div className="flex-1 text-center text-lg font-bold text-gray-900 select-none">
                {revisions}
              </div>
              <button onClick={() => updateRevisions(1)} className="p-2 text-gray-400 hover:text-black transition-colors">
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs text-gray-400 m-0">Includes {FREE_REVISIONS} free revision.</p>
              <p className="text-xs text-gray-400 m-0">Extra revisions are ₹{RATE_PER_EXTRA_REVISION} each.</p>
            </div>
          </div>
        </div>

        {/* 6. Project Details */}
        <div className="w-full md:w-1/3 md:px-4 flex flex-col space-y-4">
          <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Project Details
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about the style, brand, and any reference videos..."
            className="flex-1 w-full min-h-30 p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all resize-none"
          ></textarea>
        </div>

      </div>

      <hr className="border-gray-100 my-8" />

      {/* Footer / Total calculation */}
      <div className="flex flex-row items-end justify-between">
        <div className="w-full">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider m-0">
            Estimated Budget
          </p>
          <p className="text-4xl mt-1 font-extrabold text-gray-900">
            ₹{calculateTotal()}
          </p>
        </div>
        <Buttonx
          buttonClassName="h-12 border-1 border-neutral-200 text-sm whitespace-nowrap px-8"
          beamDuration={3}
          beamDelay={2}
          beamSize={40}
          href="/submit"
        >
          Submit Request
        </Buttonx>
      </div>
      
    </div>
  );
}
// Context: I am building a freelance portal with Supabase and Next.js. We previously set up my SQL schema with projects, client_projects, inquiries, and feedback tables. We left off needing to secure the inquiries table by dropping the public RLS insert policy and moving the contact form submission to a Next.js API route using the service_role key.  
// I just finished building authentication. Can you write that Next.js API route for the inquiry form now?


// Get Anthropic key: https://console.anthropic.com → API Keys → Create Key
// Get Resend key: https://resend.com → Sign up free → API Keys → Create. For now use their sandbox — it sends emails only to your own verified email address, which is all you need for testing.