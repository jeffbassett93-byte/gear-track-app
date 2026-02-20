import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const inspectionSheets = [
  {
    id: "harness",
    title: "Harness Inspection",
    description: "Full body harness and sit harness inspection criteria",
    equipment: ["AVAO", "FALCON", "NEWTON", "SEQUOIA"],
    petzlUrl: "https://www.petzl.com/US/en/Professional/Harnesses",
  },
  {
    id: "rope",
    title: "Rope Inspection",
    description: "Static and dynamic rope inspection criteria",
    equipment: ["AXIS", "PARALLEL", "VECTOR", "MAMBO"],
    petzlUrl: "https://www.petzl.com/US/en/Professional/Ropes",
  },
  {
    id: "karabiner",
    title: "Karabiner Inspection",
    description: "Connector and karabiner inspection criteria",
    equipment: ["Am'D", "OK", "WILLIAM", "OXAN"],
    petzlUrl: "https://www.petzl.com/US/en/Professional/Connectors",
  },
  {
    id: "descender",
    title: "Descender Inspection",
    description: "Descender and belay device inspection criteria",
    equipment: ["I'D", "RIG", "STOP", "SIMPLE"],
    petzlUrl: "https://www.petzl.com/US/en/Professional/Descenders",
  },
  {
    id: "ascender",
    title: "Ascender Inspection",
    description: "Rope clamp and ascender inspection criteria",
    equipment: ["ASCENSION", "CROLL", "PANTIN", "ASAP"],
    petzlUrl: "https://www.petzl.com/US/en/Professional/Ascenders",
  },
  {
    id: "helmet",
    title: "Helmet Inspection",
    description: "Safety helmet inspection criteria",
    equipment: ["VERTEX", "STRATO", "ALVEO", "BOREO"],
    petzlUrl: "https://www.petzl.com/US/en/Professional/Helmets",
  },
  {
    id: "lanyard",
    title: "Lanyard Inspection",
    description: "Lanyard and energy absorber inspection criteria",
    equipment: ["ABSORBICA", "JANE", "GRILLON", "PROGRESS"],
    petzlUrl: "https://www.petzl.com/US/en/Professional/Lanyards-and-energy-absorbers",
  },
  {
    id: "pulley",
    title: "Pulley Inspection",
    description: "Pulley and hauling device inspection criteria",
    equipment: ["PRO", "RESCUE", "MINI", "PARTNER"],
    petzlUrl: "https://www.petzl.com/US/en/Professional/Pulleys",
  },
];

export default function InspectionSheetsPage() {
  return (
    <div className="p-4 md:p-10">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/70 text-xs uppercase tracking-[0.2em] text-gray-500">
          Inspection Sheets
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-4">
          Petzl Inspection Sheets
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Equipment-specific inspection criteria based on Petzl guidelines.
        </p>
      </div>

      {/* Petzl Official Link */}
      <div className="glass-card p-6 mb-6 border border-orange-200/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-orange-900">Official Petzl Technical Information</h3>
            <p className="text-sm text-orange-700 mt-1">
              Always refer to official manufacturer documentation for complete inspection requirements.
            </p>
          </div>
          <a
            href="https://www.petzl.com/US/en/Professional/PPE-inspection"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-colors text-sm font-medium shadow-lg shadow-orange-500/20"
          >
            Petzl PPE Inspection
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {inspectionSheets.map((sheet) => (
          <Link
            key={sheet.id}
            href={`/inspection-sheets/${sheet.id}`}
            className="glass-card p-6 hover:shadow-xl transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                  {sheet.title}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {sheet.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {sheet.equipment.map((eq) => (
                    <span
                      key={eq}
                      className="text-xs bg-white/80 border border-white/70 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
