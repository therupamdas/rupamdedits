"use client";

import { useState } from "react";
import { Plus, Minus, Trash2, PlusCircle } from "lucide-react";
import { Buttonx } from "@/components/layout/Buttonx";
import { Input } from "@/components/ui/input";

// 1. Define the shape of rounded-sm VideoBatch object
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
    <div className="m-3 md:m-12 p-6 md:p-8 bg-white/80 backdrop-blur-md border border-white/60 rounded-sm  shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      {/* Header section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-4xl font-bebas uppercase text-neutral-900">
          Start Your Project
        </h2>
        <p className="text-neutral-500 mt-1">
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
          <label className="mb-3 block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Name
          </label>
          <Input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Write your name here.."
            className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-sm focus:ring-0   outline-none transition-all resize-none"
          />
        </div>

        {/* 2. Phone Number */}
        <div className="w-full md:w-1/3 md:px-4 flex flex-col">
          <label className="mb-3 block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Phone Number
          </label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="Your Phone Number"
            className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-sm focus:ring-red-600 outline-none transition-all resize-none"
          />
        </div>

        {/* 3. Email Id */}
        <div className="w-full md:w-1/3 md:px-4 flex flex-col">
          <label className="mb-3 block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Email Id
          </label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your Email Id"
            className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-sm focus:ring-0   outline-none transition-all resize-none"
          />
        </div>

        {/* --- ROW 2 --- */}

        {/* 4. Video Requirements */}
        <div className="w-full md:w-1/3 md:px-4 flex flex-col space-y-4">
          <label className="block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Video Requirements
          </label>

          <div className="flex-1 flex flex-col space-y-3">
            {videoBatches.map((batch) => (
              <div
                key={batch.id}
                className="flex flex-col xl:flex-row xl:items-center justify-between gap-2 p-3 bg-neutral-50 rounded-sm border border-neutral-200"
              >
                <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-sm px-2 py-1 shadow-sm">
                  <button
                    onClick={() => updateBatch(batch.id, "count", -1)}
                    className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <div className="w-6 text-center font-bold text-neutral-900 select-none">
                    {batch.count}
                  </div>
                  <button
                    onClick={() => updateBatch(batch.id, "count", 1)}
                    className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>

                <span className="text-xs font-medium text-neutral-500 whitespace-nowrap hidden xl:block">
                  videos of
                </span>

                <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-sm px-2 py-1 shadow-sm">
                  <button
                    onClick={() => updateBatch(batch.id, "duration", -1)}
                    className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <div className="w-10 text-center font-bold text-neutral-900 select-none">
                    {batch.duration}s
                  </div>
                  <button
                    onClick={() => updateBatch(batch.id, "duration", 1)}
                    className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>

                {videoBatches.length > 1 && (
                  <button
                    onClick={() => removeVideoBatch(batch.id)}
                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            <Buttonx
              onClick={addVideoBatch}
              buttonClassName="h-10 w-full bg-green-300 text-neutral-900 hover:bg-green-400 border-0 rounded-sm text-sm"
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
          <label className="block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Number of Revisions
          </label>
          <div className="flex-1 p-4 border border-neutral-200 bg-neutral-50 rounded-sm flex flex-col justify-center items-center space-y-3">
            <div className="flex items-center w-full bg-white border border-neutral-200 rounded-sm px-2 py-2 shadow-sm">
              <button
                onClick={() => updateRevisions(-1)}
                className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <Minus size={16} strokeWidth={3} />
              </button>
              <div className="flex-1 text-center text-lg font-bold text-neutral-900 select-none">
                {revisions}
              </div>
              <button
                onClick={() => updateRevisions(1)}
                className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs text-neutral-500 m-0">
                Includes {FREE_REVISIONS} free revision.
              </p>
              <p className="text-xs text-neutral-500 m-0">
                Extra revisions are ₹{RATE_PER_EXTRA_REVISION} each.
              </p>
            </div>
          </div>
        </div>

        {/* 6. Project Details */}
        <div className="w-full md:w-1/3 md:px-4 flex flex-col space-y-4">
          <label className="block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Project Details
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about the style, brand, and any reference videos..."
            className="flex-1 w-full min-h-30 p-4 bg-neutral-50 border border-neutral-200 rounded-sm outline-none transition-all resize-none"
          ></textarea>
        </div>
      </div>

      <hr className="border-neutral-200/60 my-8" />

      {/* Footer / Total calculation */}
      <div className="flex flex-row items-end justify-between gap-6">
        <div className="w-full">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider m-0">
            Estimated Budget
          </p>
          <p className="text-4xl mt-1 font-extrabold text-neutral-900">
            ₹{calculateTotal()}
          </p>
        </div>

        <Buttonx
          buttonClassName="h-12 px-8 bg-green-300 text-neutral-900 border-0 hover:bg-green-400 rounded-sm text-sm whitespace-nowrap"
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