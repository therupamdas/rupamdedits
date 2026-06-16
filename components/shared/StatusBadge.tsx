export function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (s: string) => {
    switch (s?.toLowerCase()) {
      case "received": return "bg-neutral-200 text-neutral-700";
      case "editing": return "bg-blue-100 text-blue-700";
      case "review": return "bg-yellow-100 text-yellow-700";
      case "delivered": return "bg-green-100 text-green-700";
      case "paused": return "bg-red-100 text-red-700";
      default: return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <span className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md w-fit md:w-28 text-center ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}