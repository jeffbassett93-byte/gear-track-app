interface ColorBadgeProps {
  color: "blue" | "yellow" | "red" | "green";
  period: string;
  dateRange?: string;
  active?: boolean;
}

const colorClasses = {
  blue: {
    bg: "bg-blue-600",
    border: "border-blue-600",
    text: "text-blue-600",
    label: "BLUE",
  },
  yellow: {
    bg: "bg-yellow-500",
    border: "border-yellow-500",
    text: "text-yellow-600",
    label: "YELLOW",
  },
  red: {
    bg: "bg-red-600",
    border: "border-red-600",
    text: "text-red-600",
    label: "RED",
  },
  green: {
    bg: "bg-green-600",
    border: "border-green-600",
    text: "text-green-600",
    label: "GREEN",
  },
};

export function ColorBadge({
  color,
  period,
  dateRange,
  active = false,
}: ColorBadgeProps) {
  const classes = colorClasses[color];

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
        active
          ? `${classes.border} bg-white/90 shadow-lg shadow-blue-500/10`
          : "border-white/60 bg-white/70 shadow-sm"
      } backdrop-blur`}
    >
      <div className={`w-4 h-4 rounded-full ${classes.bg} shadow-sm`} />
      <div className="flex flex-col">
        <span
          className={`text-sm font-semibold ${
            active ? classes.text : "text-gray-500"
          }`}
        >
          {classes.label}
        </span>
        <span className="text-xs text-gray-500">{period}</span>
        {dateRange && (
          <span className="text-[11px] text-gray-400 leading-tight">
            {dateRange}
          </span>
        )}
      </div>
      {active && (
        <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
          Current
        </span>
      )}
    </div>
  );
}
