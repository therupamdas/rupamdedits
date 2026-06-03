"use client";
import React, { useState } from "react";
import { Plus, Minus, Trash2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";

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

  // 4. Type 'id', 'field' (restricted to exactly those two strings), and 'delta'
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
    <div className="m-12 p-6  md:p-8 bg-white border border-gray-100 rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
          Start Your Project
        </h2>
        <p className="text-gray-500 mt-2">
          Tell us what you need, and get an instant estimate.
        </p>
      </div>

      <div className="space-x-8 flex flex-row">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Video Requirements
          </label>

          {videoBatches.map((batch) => (
            <div
              key={batch.id}
              className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between w-full md:w-auto bg-white border border-gray-200 rounded-lg px-2 py-1">
                <button
                  onClick={() => updateBatch(batch.id, "count", -1)}
                  className="p-2 text-gray-400 hover:text-black transition-colors"
                >
                  <Minus size={16} strokeWidth={3} />
                </button>
                <div className="w-12 text-center font-bold text-gray-900 select-none">
                  {batch.count}
                </div>
                <button
                  onClick={() => updateBatch(batch.id, "count", 1)}
                  className="p-2 text-gray-400 hover:text-black transition-colors"
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>

              <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                videos of
              </span>

              <div className="flex items-center justify-between w-full md:w-auto bg-white border border-gray-200 rounded-lg px-2 py-1">
                <button
                  onClick={() => updateBatch(batch.id, "duration", -1)}
                  className="p-2 text-gray-400 hover:text-black transition-colors"
                >
                  <Minus size={16} strokeWidth={3} />
                </button>
                <div className="w-16 text-center font-bold text-gray-900 select-none">
                  {batch.duration}s
                </div>
                <button
                  onClick={() => updateBatch(batch.id, "duration", 1)}
                  className="p-2 text-gray-400 hover:text-black transition-colors"
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>

              {videoBatches.length > 1 && (
                <button
                  onClick={() => removeVideoBatch(batch.id)}
                  className="ml-auto p-2 text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}

          <div className="h-8 rounded-md relative">
            <Button
              onClick={addVideoBatch}
              asChild
              variant="outline"
              className=" relative h-8 border-green-500 overflow-hidden rounded-md bg-white text-sm transition duration-200
            hover:shadow-[4px_4px_0px_0px] shadow-green-500 text-green-500 hover:text-green-500 sm:w-full 0 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            >
              <div className="text-green-500 hover:text-green-500 flex items-center">
                <PlusCircle size={15} />
                Add another video type
              </div>
            </Button>
            <BorderBeam duration={3} size={60} />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Number of Revisions
          </label>
          <div className="p-4 border bg-gray-50 rounded-lg">
            <div className="flex items-center w-full md:w-48 bg-white border border-gray-200 rounded-lg px-2 py-1">
              <button
                onClick={() => updateRevisions(-1)}
                className="p-2 text-gray-400 hover:text-black transition-colors"
              >
                <Minus size={16} strokeWidth={3} />
              </button>
              <div className="flex-1 text-center font-bold text-gray-900 select-none">
                {revisions}
              </div>
              <button
                onClick={() => updateRevisions(1)}
                className="p-2 text-gray-400 hover:text-black transition-colors"
              >
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>
          </div>
          <p className="text-center mb-0 text-xs text-gray-400">
            Includes {FREE_REVISIONS} free revision.
          </p>
          <p className="text-center  text-xs text-gray-400">
            {" "}
            Extra revisions are ₹{RATE_PER_EXTRA_REVISION} each.
          </p>
        </div>

        <div className="w-full space-y-4">
          <label className="block  text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Project Details
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about the style, brand, and any reference videos..."
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all resize-none"
          ></textarea>
        </div>

        <hr className="border-gray-100" />
      </div>
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 pt-2">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Estimated Budget
          </p>
          <p className="text-4xl mt-2 font-extrabold text-gray-900">
            ₹{calculateTotal()}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-md bg-white text-sm text-black transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
          <Button
            asChild
            variant="outline"
            className="h-12 w-full sm:w-36 rounded-md border-neutral-200 bg-white text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <a className="flex items-center">Submit Request</a>
          </Button>
          <BorderBeam duration={3} size={50} />
        </div>
      </div>
    </div>
  );
}
