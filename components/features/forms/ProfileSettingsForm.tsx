"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";
import { Input } from "@/components/ui/input";
import { Buttonx } from "@/components/layout/Buttonx";

export interface ProfileData {
  id: string;
  email: string;
  full_name: string | null;
  phone_number: string | null;
  role: "admin" | "client";
  taking_orders: boolean;
}

interface ProfileSettingsFormProps {
  profile: ProfileData;
  onCancel?: () => void; // Optional function to close the form after saving
}

export function ProfileSettingsForm({ profile, onCancel }: ProfileSettingsFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone_number || "");
  const [takingOrders, setTakingOrders] = useState(profile?.taking_orders ?? true);

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // Prepare the update payload based on the schema
    const updatePayload: any = {
      full_name: fullName.trim(),
      phone_number: phone.trim(),
      updated_at: new Date().toISOString(),
    };

    // Only allow admins to update the taking_orders status
    if (profile.role === "admin") {
      updatePayload.taking_orders = takingOrders;
    }

    const { error } = await supabase
      .from("profiles")
      .update(updatePayload)
      .eq("id", profile.id);

    if (error) {
      console.error("Profile update error:", error);
      setMessage({ type: "error", text: "Failed to save changes. Please try again." });
      setIsSaving(false);
    } else {
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsSaving(false);
      router.refresh();
      
      // Close the form after 1.5 seconds if an onCancel prop was provided
      if (onCancel) {
        setTimeout(() => {
          onCancel();
        }, 1500);
      }
    }
  };

  return (
    <form onSubmit={handleSaveProfile} className="space-y-5">
      
      {/* Alert Message */}
      {message && (
        <div className={`p-3 rounded-md text-sm border ${
          message.type === "success" 
            ? "bg-green-50 text-green-700 border-green-200" 
            : "bg-red-50 text-red-700 border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      {/* Row 1: Full Name */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-2">
          Full Name
        </label>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          placeholder="e.g. John Doe"
          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-sm focus:ring-0 outline-none transition-all"
        />
      </div>

      {/* Row 2: Phone Number */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-2">
          Phone Number
        </label>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91"
          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-sm focus:ring-0 outline-none transition-all"
        />
      </div>

      {/* Row 3: Email (Read Only - Governed by Supabase Auth) */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-2">
          Account Email
        </label>
        <Input
          type="email"
          value={profile.email || ""}
          disabled
          className="w-full px-4 py-3 bg-neutral-100 border border-neutral-200 text-neutral-500 rounded-sm cursor-not-allowed"
        />
        <p className="text-xs text-neutral-400 mt-1">
          Your email is tied to your Google authentication and cannot be changed here.
        </p>
      </div>

      {/* Row 4: ADMIN ONLY - Taking Orders Toggle */}
      {profile.role === "admin" && (
        <div className="pt-4 border-t border-neutral-100">
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <p className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
                Accepting New Projects
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                Toggle this off to prevent clients from submitting new requests.
              </p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={takingOrders}
                onChange={(e) => setTakingOrders(e.target.checked)}
              />
              <div className={`block w-14 h-8 rounded-full transition-colors ${takingOrders ? 'bg-green-400' : 'bg-neutral-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${takingOrders ? 'transform translate-x-6' : ''}`}></div>
            </div>
          </label>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row gap-3">
        {onCancel && (
          <Buttonx
            type="button"
            onClick={onCancel}
            buttonClassName="w-full sm:w-auto px-6 h-12 bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 rounded-sm font-medium"
          >
            Cancel
          </Buttonx>
        )}
        <Buttonx
          type="submit"
          disabled={isSaving}
          buttonClassName="w-full sm:w-auto px-8 h-12 bg-neutral-900 text-white border-0 hover:bg-neutral-800 rounded-sm font-medium disabled:opacity-50 transition-colors"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Buttonx>
      </div>
    </form>
  );
}