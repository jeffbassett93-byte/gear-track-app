import Link from "next/link";
import { ArrowRight, RotateCcw, AlertTriangle, Trash2, Eye, ClipboardCheck, Package } from "lucide-react";

const checklists = [
  {
    id: "return",
    title: "Equipment Return Checklist",
    description: "Step-by-step checklist for returning equipment to warehouse",
    icon: RotateCcw,
    color: "bg-blue-500",
    steps: 7,
  },
  {
    id: "quarantine",
    title: "Quarantine Checklist",
    description: "Checklist for quarantining damaged or failed equipment",
    icon: AlertTriangle,
    color: "bg-yellow-500",
    steps: 8,
  },
  {
    id: "destruction",
    title: "Destruction Checklist",
    description: "Checklist for equipment destruction process",
    icon: Trash2,
    color: "bg-red-500",
    steps: 6,
  },
  {
    id: "pre-use",
    title: "Pre-Use Inspection Checklist",
    description: "Daily inspection checklist before equipment use",
    icon: Eye,
    color: "bg-green-500",
    steps: 5,
  },
  {
    id: "acceptance",
    title: "Acceptance Check Checklist",
    description: "New equipment acceptance and registration checklist",
    icon: Package,
    color: "bg-purple-500",
    steps: 6,
  },
  {
    id: "detailed",
    title: "Detailed Inspection Checklist",
    description: "6-month comprehensive inspection checklist",
    icon: ClipboardCheck,
    color: "bg-indigo-500",
    steps: 8,
  },
];

export default function ChecklistsPage() {
  return (
    <div className="p-4 md:p-10">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/70 text-xs uppercase tracking-[0.2em] text-gray-500">
          Checklists
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-4">
          Checklists
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Interactive checklists for equipment management processes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {checklists.map((checklist) => {
          const Icon = checklist.icon;
          return (
            <Link
              key={checklist.id}
              href={`/checklists/${checklist.id}`}
              className="glass-card p-6 hover:shadow-xl transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`${checklist.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/10`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                    {checklist.title}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {checklist.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {checklist.steps} steps
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
