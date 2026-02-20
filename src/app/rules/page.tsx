import { AlertTriangle, CheckCircle2, XCircle, Info } from "lucide-react";

const rules = [
  {
    category: "Storage Requirements",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50",
    items: [
      "Store equipment in climate-controlled environment (15-25°C, <70% humidity)",
      "Protect from direct sunlight and UV exposure",
      "Keep away from chemicals, oils, and solvents",
      "Ensure proper ventilation in storage areas",
      "Implement pest prevention measures",
      "Maintain security measures and access control",
      "Store ropes loosely coiled or hung, never kinked",
      "Keep harnesses hung or laid flat, not compressed",
    ],
  },
  {
    category: "Handling Procedures",
    icon: Info,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    items: [
      "Clean hands before handling equipment",
      "Avoid contamination with chemicals, oils, or dirt",
      "Prevent contact with sharp objects or abrasive surfaces",
      "Use proper lifting techniques for heavy equipment",
      "Transport equipment in protective bags or containers",
      "Never drag ropes across rough surfaces",
      "Do not step on equipment",
      "Handle hardware carefully to prevent drops",
    ],
  },
  {
    category: "Inspection Requirements",
    icon: AlertTriangle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    items: [
      "Pre-use inspection required before EVERY use",
      "Detailed inspection required every 6 months",
      "Interim inspection after any incident or unusual event",
      "Only competent persons may perform detailed inspections",
      "All inspections must be documented",
      "Equipment with expired inspection must NOT be used",
      "Report any concerns immediately to supervisor",
      "Follow manufacturer inspection guidelines",
    ],
  },
  {
    category: "Prohibited Actions",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    items: [
      "NEVER use equipment with expired inspection",
      "NEVER use equipment that has failed inspection",
      "NEVER modify equipment without manufacturer approval",
      "NEVER use equipment beyond its service life",
      "NEVER store equipment when wet or contaminated",
      "NEVER loan equipment to unauthorized persons",
      "NEVER remove or alter identification labels",
      "NEVER bypass quarantine procedures",
    ],
  },
  {
    category: "Documentation Requirements",
    icon: CheckCircle2,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    items: [
      "Log all equipment check-outs and check-ins",
      "Document all inspections with findings",
      "Record any issues or concerns immediately",
      "Maintain equipment register up to date",
      "Keep training records current",
      "File quarantine and destruction documentation",
      "Retain records for minimum 5 years",
      "Ensure audit trail is complete",
    ],
  },
  {
    category: "Color Coding Compliance",
    icon: Info,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    items: [
      "BLUE label = H1 (Jan-Jun) inspection period",
      "YELLOW label = H2 (Jul-Dec) inspection period",
      "RED label = H1 next year inspection period",
      "GREEN label = H2 next year inspection period",
      "Labels from 2+ periods ago indicate OVERDUE equipment",
      "Verify label color matches current or previous period before use",
      "Report any missing or illegible labels",
      "New labels applied only after successful inspection",
    ],
  },
];

export default function RulesPage() {
  return (
    <div className="p-4 md:p-10">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/70 text-xs uppercase tracking-[0.2em] text-gray-500">
          Warehouse Rules
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-4">
          Warehouse Rules
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Mandatory rules for equipment storage, handling, and compliance.
        </p>
      </div>

      <div className="space-y-6">
        {rules.map((rule, index) => {
          const Icon = rule.icon;
          return (
            <div
              key={index}
              className="glass-card overflow-hidden"
            >
              <div className={`${rule.bgColor} glass-card-header px-6 py-4`}>
                <div className="flex items-center gap-3">
                  <Icon className={`w-6 h-6 ${rule.color}`} />
                  <h2 className="font-semibold text-gray-900">{rule.category}</h2>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {rule.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full ${rule.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Important Notice */}
      <div className="mt-8 glass-card p-6 border border-red-200/60">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Important Notice</h3>
            <p className="text-sm text-red-700 mt-1">
              Failure to follow these rules may result in equipment damage, personal injury,
              or regulatory non-compliance. All personnel are responsible for adhering to
              these requirements. Report any violations immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
