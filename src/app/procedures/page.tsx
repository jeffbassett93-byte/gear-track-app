import Link from "next/link";
import { ArrowRight, RotateCcw, AlertTriangle, Trash2, Eye, ClipboardCheck } from "lucide-react";

const procedures = [
  {
    id: "return",
    title: "Equipment Return Procedure",
    description: "Standard process for returning equipment to the warehouse after field use",
    icon: RotateCcw,
    color: "bg-blue-500",
  },
  {
    id: "quarantine",
    title: "Equipment Quarantine Procedure",
    description: "Process for isolating equipment that has failed inspection or been damaged",
    icon: AlertTriangle,
    color: "bg-yellow-500",
  },
  {
    id: "destruction",
    title: "Equipment Destruction Procedure",
    description: "Process for permanently destroying unsafe or end-of-life equipment",
    icon: Trash2,
    color: "bg-red-500",
  },
  {
    id: "pre-use",
    title: "Pre-Use Inspection Procedure",
    description: "Visual and tactile inspection before each equipment use",
    icon: Eye,
    color: "bg-green-500",
  },
  {
    id: "detailed",
    title: "Detailed Inspection Procedure",
    description: "Comprehensive 6-month inspection by competent person",
    icon: ClipboardCheck,
    color: "bg-purple-500",
  },
];

export default function ProceduresPage() {
  return (
    <div className="p-4 md:p-10">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/70 text-xs uppercase tracking-[0.2em] text-gray-500">
          Procedures
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-4">
          Procedures
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Standard operating procedures for equipment management.
        </p>
      </div>

      <div className="space-y-5">
        {procedures.map((procedure) => {
          const Icon = procedure.icon;
          return (
            <Link
              key={procedure.id}
              href={`/procedures/${procedure.id}`}
              className="block glass-card p-6 hover:shadow-xl transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`${procedure.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/10`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                    {procedure.title}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {procedure.description}
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
