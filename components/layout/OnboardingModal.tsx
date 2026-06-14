"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";
import { Buttonx } from "@/components/layout/Buttonx";

export function OnboardingModal({ userId }: { userId: string }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePhone = (phoneStr: string) => {
    return /^\+?[\d\s\-()]{7,15}$/.test(phoneStr);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!validatePhone(phone)) {
      setError("Please enter a valid phone number.");
      setIsLoading(false);
      return;
    }

    // Update their row in the profiles table!
    const { error } = await supabase
      .from("profiles")
      .update({ 
        full_name: fullName, 
        phone_number: phone 
      })
      .eq("id", userId);

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      // Refresh the server component. The modal will instantly disappear!
      router.refresh(); 
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark blurry backdrop */}
      <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-md"></div>
      
      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-neutral-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">Welcome to the Portal!</h2>
          <p className="text-neutral-500 mt-2">Let's get your profile set up before we look at your projects.</p>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Rupam Saha"
              required
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-neutral-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              required
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-neutral-50"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
              {error}
            </div>
          )}

          <Buttonx 
            type="submit" 
            disabled={isLoading}
            buttonClassName="w-full mt-4 h-12 bg-neutral-900 text-white border-0 hover:bg-neutral-800 flex items-center justify-center rounded-xl transition-all"
          >
            {isLoading ? "Saving..." : "Save Profile & Continue"}
          </Buttonx>
        </form>
      </div>
    </div>
  );
}