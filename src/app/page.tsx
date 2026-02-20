import Link from "next/link";
import {
  ClipboardList,
  FileText,
  ScrollText,
  Shield,
  ArrowRight,
} from "lucide-react";
import { ColorBadge } from "@/components/ColorBadge";

const quickLinks = [
  {
    href: "/procedures",
    title: "Procedures",
    description: "Equipment return, quarantine, and destruction procedures",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    href: "/checklists",
    title: "Checklists",
    description: "Interactive step-by-step checklists for all processes",
    icon: ClipboardList,
    color: "bg-green-500",
  },
  {
    href: "/rules",
    title: "Warehouse Rules",
    description: "Storage, handling, and safety protocols",
    icon: ScrollText,
    color: "bg-yellow-500",
  },
  {
    href: "/inspection-sheets",
    title: "Inspection Sheets",
    description: "Petzl equipment inspection guides and checklists",
    icon: Shield,
    color: "bg-red-500",
  },
];

export default function Home() {
  return (
    <div className="p-4 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/70 text-xs uppercase tracking-[0.2em] text-gray-500">
          IRATA System
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-4">
          IRATA Gear Track
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Procedures, checklists, and inspection references for rope access gear.
          Use this app for field guidance while Papertrail remains the system of record.
        </p>
      </div>

      <div className="glass-card p-6 md:p-8 mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          System of Record
        </h2>
        <p className="text-sm text-gray-600">
          All equipment records and inspection logs are managed in <strong>papertrail.io</strong>.
          This app provides procedures, checklists, and inspection references only.
        </p>
      </div>

      {/* Color Period Status */}
      <div className="glass-card p-6 md:p-8 mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Current Inspection Period
        </h2>
        <div className="flex flex-wrap gap-4">
          <ColorBadge
            color="blue"
            period="H1-26"
            dateRange="Jan 1st 2026 - Jun 30th 2026"
            active
          />
          <ColorBadge
            color="yellow"
            period="H2-26"
            dateRange="Jul 1st 2026 - Dec 31st 2026"
          />
          <ColorBadge
            color="red"
            period="H1-27"
            dateRange="Jan 1st 2027 - Jun 30th 2027"
          />
          <ColorBadge
            color="green"
            period="H2-27"
            dateRange="Jul 1st 2027 - Dec 31st 2027"
          />
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Equipment inspected in the current period receives a <strong>BLUE</strong> label.
          Labels from 2+ periods ago indicate overdue equipment.
        </p>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="glass-card p-6 hover:shadow-xl transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`${link.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/10`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                    {link.title}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* IRATA Compliance Notice */}
      <div className="mt-8 glass-card p-6">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900">IRATA Compliant</h3>
            <p className="text-sm text-blue-700 mt-1">
              This system follows IRATA International Code of Practice (ICOP) requirements
              for equipment tracking, inspection, and documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
