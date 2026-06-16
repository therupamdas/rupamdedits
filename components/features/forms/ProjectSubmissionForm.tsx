"use client";

import { useState } from "react";
import { Plus, Minus, Trash2, PlusCircle } from "lucide-react";
import { Buttonx } from "@/components/layout/Buttonx";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";

interface VideoBatch {
  id: number;
  count: number;
  duration: number;
}

export function ProjectSubmissionForm() {
  const router = useRouter();
  const supabase = createClient();

  const BASE_RATE_PER_30_SEC = 350;
  const RATE_PER_EXTRA_REVISION = 20;
  const FREE_REVISIONS = 1;

  // Form State
  const [clientName, setClientName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [projectTitle, setProjectTitle] = useState<string>("");
  const [driveLink, setDriveLink] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const [videoBatches, setVideoBatches] = useState<VideoBatch[]>([
    { id: Date.now(), count: 1, duration: 30 },
  ]);
  const [revisions, setRevisions] = useState<number>(1);
  const [description, setDescription] = useState<string>("");

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addVideoBatch = () => {
    setVideoBatches([
      ...videoBatches,
      { id: Date.now(), count: 1, duration: 30 },
    ]);
  };

  const removeVideoBatch = (id: number) => {
    if (videoBatches.length > 1) {
      setVideoBatches(videoBatches.filter((batch) => batch.id !== id));
    }
  };

  const updateBatch = (id: number, field: "count" | "duration", delta: number) => {
    setVideoBatches((batches) =>
      batches.map((batch) => {
        if (batch.id === id) {
          if (field === "count") return { ...batch, count: Math.max(1, batch.count + delta) };
          if (field === "duration") return { ...batch, duration: Math.max(15, batch.duration + delta * 15) };
        }
        return batch;
      }),
    );
  };

  const updateRevisions = (delta: number) => {
    setRevisions(Math.max(0, revisions + delta));
  };

  const calculateTotal = (): number => {
    let total = 0;
    videoBatches.forEach((batch) => {
      total += BASE_RATE_PER_30_SEC * (batch.duration / 30) * batch.count;
    });
    const extraRevisions = Math.max(0, revisions - FREE_REVISIONS);
    total += extraRevisions * RATE_PER_EXTRA_REVISION;
    return Math.round(total);
  };

  const handleProjectSubmit = async () => {
    setError(null);

    // 1. Strict Validation
    if (!clientName.trim() || !projectTitle.trim()) {
      setError("Please fill out your Name and the Project Title.");
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!description.trim() || description.trim().length < 10) {
      setError("Please provide a bit more detail about your project requirements.");
      return;
    }

    setIsSubmitting(true);

    // 2. Fetch User
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      setError("Security error: You must be logged in to submit a project.");
      setIsSubmitting(false);
      return;
    }

    // 3. Prepare Data
    const totalVideoCount = videoBatches.reduce((sum, batch) => sum + batch.count, 0);
    // Append phone number to notes since it's not a standalone column in your schema
    const combinedNotes = `${description.trim()}${phone ? `\n\nClient Phone: ${phone}` : ''}`;

    // 4. Database Insert
    const { error: insertError } = await supabase
      .from("client_projects")
      .insert({
        client_id: user.id,
        client_name: clientName.trim(),
        client_email: email.trim(),
        project_title: projectTitle.trim(),
        status: "received", // explicitly set to match schema CHECK constraint
        drive_link: driveLink.trim() || null,
        deadline: deadline || null, // expects ISO string or null
        notes: combinedNotes,
        expected_video_count: totalVideoCount,
        agreed_price: calculateTotal(),
        revisions_requested: revisions,
        batch_details: videoBatches,
      });

    if (insertError) {
      console.error(insertError);
      setError("Failed to submit project. Please try again.");
      setIsSubmitting(false);
    } else {
      router.push("/dashboard/profile");
      router.refresh();
    }
  };

  return (
    <div className="m-3 md:m-12 p-6 md:p-8 bg-white/80 backdrop-blur-md border border-white/60 rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="mb-6 md:mb-8">
        <h2 className="text-4xl font-bebas uppercase text-neutral-900">
          Start Your Project
        </h2>
        <p className="text-neutral-500 mt-1">
          Tell me what you need, and get an instant estimate.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:flex-wrap md:mx-4 gap-y-6 md:gap-y-8">
        
        {/* --- ROW 1: PERSONAL INFO --- */}
        <div className="w-full md:w-1/3 md:px-4 flex flex-col">
          <label className="mb-3 block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g. John Doe"
            className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-sm focus:ring-0 outline-none transition-all"
          />
        </div>

        <div className="w-full md:w-1/3 md:px-4 flex flex-col">
          <label className="mb-3 block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="john@company.com"
            className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-sm focus:ring-0 outline-none transition-all"
          />
        </div>

        <div className="w-full md:w-1/3 md:px-4 flex flex-col">
          <label className="mb-3 block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Phone Number
          </label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="+91"
            className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-sm focus:ring-0 outline-none transition-all"
          />
        </div>

        {/* --- ROW 2: PROJECT INFO --- */}
        <div className="w-full md:w-1/3 md:px-4 flex flex-col">
          <label className="mb-3 block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Project Title <span className="text-red-500">*</span>
          </label>
          <Input
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="e.g. Summer Ad Campaign"
            className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-sm focus:ring-0 outline-none transition-all"
          />
        </div>

        <div className="w-full md:w-1/3 md:px-4 flex flex-col">
          <label className="mb-3 block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Raw Assets Link
          </label>
          <Input
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            type="url"
            placeholder="Google Drive / Dropbox Link"
            className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-sm focus:ring-0 outline-none transition-all"
          />
        </div>

        <div className="w-full md:w-1/3 md:px-4 flex flex-col">
          <label className="mb-3 block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Target Deadline
          </label>
          <Input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            type="date"
            className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-sm focus:ring-0 outline-none transition-all text-neutral-600"
          />
        </div>

        {/* --- ROW 3: TECHNICALS --- */}
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
                  <button onClick={() => updateBatch(batch.id, "count", -1)} className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors">
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <div className="w-6 text-center font-bold text-neutral-900 select-none">{batch.count}</div>
                  <button onClick={() => updateBatch(batch.id, "count", 1)} className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors">
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>

                <span className="text-xs font-medium text-neutral-500 whitespace-nowrap hidden xl:block">
                  videos of
                </span>

                <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-sm px-2 py-1 shadow-sm">
                  <button onClick={() => updateBatch(batch.id, "duration", -1)} className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors">
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <div className="w-10 text-center font-bold text-neutral-900 select-none">{batch.duration}s</div>
                  <button onClick={() => updateBatch(batch.id, "duration", 1)} className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors">
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

        <div className="w-full md:w-1/3 md:px-4 flex flex-col space-y-4">
          <label className="block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Number of Revisions
          </label>
          <div className="flex-1 p-4 border border-neutral-200 bg-neutral-50 rounded-sm flex flex-col justify-center items-center space-y-3">
            <div className="flex items-center w-full bg-white border border-neutral-200 rounded-sm px-2 py-2 shadow-sm">
              <button onClick={() => updateRevisions(-1)} className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
                <Minus size={16} strokeWidth={3} />
              </button>
              <div className="flex-1 text-center text-lg font-bold text-neutral-900 select-none">{revisions}</div>
              <button onClick={() => updateRevisions(1)} className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs text-neutral-500 m-0">Includes {FREE_REVISIONS} free revision.</p>
              <p className="text-xs text-neutral-500 m-0">Extra revisions are ₹{RATE_PER_EXTRA_REVISION} each.</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 md:px-4 flex flex-col space-y-4">
          <label className="block text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Project Details <span className="text-red-500">*</span>
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

      <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
        <div className="w-full sm:w-auto text-center sm:text-left">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider m-0">
            Estimated Budget
          </p>
          <p className="text-4xl mt-1 font-extrabold text-neutral-900">
            ₹{calculateTotal()}
          </p>
        </div>

        <button
          onClick={handleProjectSubmit}
          disabled={isSubmitting}
          className="h-12 w-full sm:w-auto px-8 bg-green-300 text-neutral-900 font-medium hover:bg-green-400 rounded-sm text-sm whitespace-nowrap disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </div>
  );
}