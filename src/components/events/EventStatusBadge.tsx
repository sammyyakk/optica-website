import { EventStatus, statusColors } from "@/lib/events/types";

interface EventStatusBadgeProps {
  status: EventStatus;
  className?: string;
}

export default function EventStatusBadge({
  status,
  className = "",
}: EventStatusBadgeProps) {
  const statusLabels: Record<EventStatus, string> = {
    upcoming: "Upcoming",
    ongoing: "Ongoing",
    completed: "Completed",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[status]} ${className}`}
    >
      {statusLabels[status]}
    </span>
  );
}
