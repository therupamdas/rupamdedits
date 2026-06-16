import React from "react";

interface StatsCardProps {
  value: string | number;
  label: string;
  valueColor?: string;
}

export function StatsCard({ value, label, valueColor = "text-neutral-900" }: StatsCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      <p className={`text-4xl font-bold ${valueColor}`}>{value}</p>
      <p className="text-neutral-500 mt-2 font-medium">{label}</p>
    </div>
  );
}