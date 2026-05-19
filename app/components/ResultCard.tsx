import React from "react";

interface ResultCardProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  accenntColor: keyof typeof accentColorsMap;
  children: React.ReactNode;
}

const accentColorsMap = {
  indigo: {
    border: "border-indigo-500/20",
    bg: "bg-indigo-500/5",
    iconBg: "bg-indigo-500/10",
    iconText: "text-indigo-400",
    label: "text-indigo-300",
    badge: "bg-indigo-500/10 text-indigo-400",
  },
  violet: {
    border: "border-violet-500/20",
    bg: "bg-violet-500/5",
    iconBg: "bg-violet-500/10",
    iconText: "text-violet-400",
    label: "text-violet-300",
    badge: "bg-violet-500/10 text-violet-400",
  },
  amber: {
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-400",
    label: "text-amber-300",
    badge: "bg-amber-500/10 text-amber-400",
  },
};

function ResultCard({
  icon,
  label,
  accenntColor,
  count,
  children,
}: ResultCardProps) {
  const colors = accentColorsMap[accenntColor];

  return (
    <div className={`rounded-2xl border ${colors.border} ${colors.bg}`}>
      <div
        className={`px-6 py-3 border-b ${colors.border} flex items-center justify-between`}
      >
        <div className={`flex items-center gap-2`}>
          <div
            className={`h-7 w-7 rounded-lg ${colors.iconBg} ${colors.iconText} flex items-center justify-center`}
          >
            {icon}
          </div>
          <h3 className={`uppercase text-sm font-medium ${colors.label}`}>
            {label}
          </h3>
        </div>
        {count !== undefined && (
          <span className={`text-sm ${colors.badge} px-3 py-0.5 rounded-full`}>
            {count}
          </span>
        )}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

export default ResultCard;
