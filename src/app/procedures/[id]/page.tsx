import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

const proceduresData: Record<string, {
  title: string;
  description: string;
  sections: {
    title: string;
    steps: string[];
  }[];
}> = {
  return: {
    title: "Equipment Return Procedure",
    description: "Standard process for returning rope access equipment to the warehouse after field use.",
    sections: [
      {
        title: "Step 1: Pre-Return Inspection",
        steps: [
          "Perform visual inspection for obvious damage",
          "Perform tactile inspection for abnormalities",
          "Check for contamination (chemicals, oils, dirt)",
          "Verify all components are present",
          "Note any issues discovered during use",
        ],
      },
      {
        title: "Step 2: Condition Assessment",
        steps: [
          "Classify as GOOD: No issues, normal wear only",
          "Classify as FAIR: Minor wear observed, monitor on next use",
          "Classify as DAMAGED: Visible damage, requires inspection",
          "Classify as CONTAMINATED: Chemical exposure, immediate quarantine",
        ],
      },
      {
        title: "Step 3: Issue Reporting",
        steps: [
          "Document any issues clearly",
          "Note when and where the issue occurred",
          "Describe the nature of the problem",
          "Indicate if equipment was involved in any incidents",
        ],
      },
      {
        title: "Step 4: Warehouse Receipt",
        steps: [
          "Verify equipment ID matches return documentation",
          "Confirm quantity of items returned",
          "Review technician's condition assessment",
          "Check for obvious damage or contamination",
          "Sign receipt confirmation",
        ],
      },
      {
        title: "Step 5: Post-Return Inspection",
        steps: [
          "Visual inspection of all returned items",
          "Verify condition matches technician's assessment",
          "Check labels and markings are intact",
          "Verify color-coded inspection status is current",
          "Flag any discrepancies",
        ],
      },
      {
        title: "Step 6: Status Update",
        steps: [
          "Log return date and time",
          "Record condition assessment",
          "Update equipment location in system",
          "Note any issues requiring follow-up",
          "Schedule inspection if needed",
        ],
      },
      {
        title: "Step 7: Gear Manifest Cross-Check",
        steps: [
          "Cross-reference returned equipment against the job Gear Manifest in Papertrail",
          "Confirm all items are accounted for",
          "If any equipment is missing, complete a Lost Equipment Report",
          "Notify the supervisor and update the manifest with discrepancies",
        ],
      },
      {
        title: "Step 8: Re-Shelving",
        steps: [
          "Clean equipment if necessary",
          "Store in designated location",
          "Ensure proper storage conditions",
          "Verify equipment is accessible for next deployment",
        ],
      },
    ],
  },
  quarantine: {
    title: "Equipment Quarantine Procedure",
    description: "Process for quarantining rope access equipment that has failed inspection, been damaged, or is suspected of being unsafe.",
    sections: [
      {
        title: "Quarantine Triggers",
        steps: [
          "Failed pre-use or detailed inspection",
          "Visible cuts, tears, or abrasions",
          "Deformation of hardware",
          "Contact with chemicals, oils, or solvents",
          "Dropped from height (>2 meters)",
          "Involved in fall arrest event",
          "Involved in incident or near-miss",
          "Suspected manufacturing defect",
        ],
      },
      {
        title: "Step 1: Immediate Isolation",
        steps: [
          "Stop using equipment immediately",
          "Remove from service area",
          "Do not allow others to use",
          "Secure equipment to prevent accidental use",
        ],
      },
      {
        title: "Step 2: Red Tag Application",
        steps: [
          "Attach RED quarantine tag",
          "Write date of quarantine",
          "Write reason for quarantine",
          "Write name of person quarantining",
          "Ensure tag is clearly visible",
        ],
      },
      {
        title: "Step 3: System Update",
        steps: [
          "Change status to 'Quarantined'",
          "Record quarantine date",
          "Document reason for quarantine",
          "Note location in quarantine zone",
          "Assign investigation owner",
        ],
      },
      {
        title: "Step 4: Quarantine Zone Storage",
        steps: [
          "Transport safely to quarantine zone",
          "Store in designated quarantine location",
          "Ensure physical separation from serviceable equipment",
          "Log entry in quarantine zone inventory",
        ],
      },
      {
        title: "Step 5: Investigation",
        steps: [
          "Assign qualified inspector",
          "Review equipment history",
          "Perform detailed inspection",
          "Document all findings",
          "Identify root cause of issue",
        ],
      },
      {
        title: "Step 6: Decision",
        steps: [
          "RETURN TO SERVICE: Issue resolved, equipment safe",
          "REPAIR: Repairable per manufacturer guidelines",
          "DESTROY: Unsafe, unrepairable, or end of life",
        ],
      },
    ],
  },
  destruction: {
    title: "Equipment Destruction Procedure",
    description: "Process for permanently destroying rope access equipment that has been deemed unsafe, unrepairable, or has reached end of service life.",
    sections: [
      {
        title: "Authorization Requirements",
        steps: [
          "Admin approval required before any destruction",
          "Written documentation of reason for destruction",
          "Equipment ID confirmed against register",
        ],
      },
      {
        title: "Step 1: Destruction Request",
        steps: [
          "Complete destruction request form",
          "Document reason for destruction",
          "Attach inspection findings",
          "Submit to Admin for approval",
        ],
      },
      {
        title: "Step 2: Admin Review",
        steps: [
          "Review destruction request",
          "Verify equipment cannot be repaired",
          "Confirm destruction is appropriate",
          "Sign authorization",
        ],
      },
      {
        title: "Step 3: Pre-Destruction Documentation",
        steps: [
          "Verify equipment ID matches documentation",
          "Record equipment details (ID, serial, model)",
          "Document date of manufacture and service dates",
          "Update register status to 'Pending Destruction'",
        ],
      },
      {
        title: "Step 4: Physical Destruction - Textiles",
        steps: [
          "Cut into minimum 3 separate pieces",
          "Each piece must be less than 50cm",
          "Cut through all load-bearing components",
          "Render completely unusable",
        ],
      },
      {
        title: "Step 4: Physical Destruction - Hardware",
        steps: [
          "Cut through gate mechanism (karabiners)",
          "Bend or deform the body",
          "Destroy rope-bearing surfaces",
          "Ensure device cannot function",
        ],
      },
      {
        title: "Step 4: Physical Destruction - Helmets",
        steps: [
          "Drill minimum 3 holes through shell (25mm)",
          "Cut all straps and harness components",
          "Crack or deform shell structure",
          "Ensure helmet cannot be worn",
        ],
      },
      {
        title: "Step 5: Post-Destruction",
        steps: [
          "Record destruction date and time",
          "Document destruction method used",
          "Update register status to 'Destroyed'",
          "File destruction documentation",
          "Dispose of materials appropriately",
        ],
      },
    ],
  },
  "pre-use": {
    title: "Pre-Use Inspection Procedure",
    description: "Visual and tactile inspection performed before each equipment use to ensure safe working condition.",
    sections: [
      {
        title: "Visual Inspection",
        steps: [
          "Check for obvious damage",
          "Look for fraying or wear",
          "Verify color coding status is current",
          "Check for contamination",
          "Verify labels and markings are legible",
        ],
      },
      {
        title: "Tactile Inspection",
        steps: [
          "Feel for abnormalities in material",
          "Check for stiffness or unusual softness",
          "Verify structural integrity",
          "Test moving parts operation",
        ],
      },
      {
        title: "Function Check",
        steps: [
          "Test buckles and adjustments",
          "Verify karabiner gate function",
          "Check rope grab operation",
          "Verify ascender/descender function",
          "Test locking mechanisms",
        ],
      },
      {
        title: "Documentation",
        steps: [
          "Record pre-use check completion",
          "Note any concerns discovered",
          "Update usage log",
          "Report issues immediately to supervisor",
        ],
      },
      {
        title: "Buddy Check",
        steps: [
          "Have partner verify your inspection",
          "Check each other's equipment",
          "Confirm both technicians are satisfied",
          "Proceed only when both approve",
        ],
      },
    ],
  },
  detailed: {
    title: "Detailed Inspection Procedure",
    description: "Comprehensive 6-month inspection performed by a competent person, documenting all findings.",
    sections: [
      {
        title: "Preparation",
        steps: [
          "Gather inspection tools and documentation",
          "Review equipment history and previous findings",
          "Clean equipment thoroughly before inspection",
          "Ensure adequate lighting and workspace",
        ],
      },
      {
        title: "Harness Inspection",
        steps: [
          "Full length visual and tactile check of webbing",
          "Edge wear assessment",
          "UV damage evaluation",
          "Stitching integrity check",
          "Buckle function test",
          "Wear pattern analysis",
          "Label and marking verification",
        ],
      },
      {
        title: "Rope Inspection",
        steps: [
          "Lay out rope completely",
          "Check for core exposure",
          "Look for flat spots",
          "Verify uniform diameter throughout",
          "Flexibility test",
          "Compression check",
          "End termination inspection",
        ],
      },
      {
        title: "Hardware Inspection",
        steps: [
          "Gate operation test",
          "Locking mechanism check",
          "Spring tension verification",
          "Rope groove inspection",
          "Surface wear measurement",
          "Deformation check",
          "Corrosion assessment",
        ],
      },
      {
        title: "Documentation",
        steps: [
          "Complete detailed inspection form",
          "Record all findings",
          "Take photographs if issues found",
          "Update equipment register",
          "Apply new inspection label with current period color",
          "Schedule next inspection date",
        ],
      },
      {
        title: "Decision",
        steps: [
          "SERVICEABLE: Equipment passes, return to service",
          "REPAIR REQUIRED: Minor issues, schedule repair",
          "RETIRE: Equipment fails, initiate destruction procedure",
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(proceduresData).map((id) => ({ id }));
}

export default async function ProcedurePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const procedure = proceduresData[id];

  if (!procedure) {
    notFound();
  }

  return (
    <div className="p-4 md:p-10">
      <Link
        href="/procedures"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Procedures
      </Link>

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/70 text-xs uppercase tracking-[0.2em] text-gray-500">
          Procedure
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-4">
          {procedure.title}
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">{procedure.description}</p>
      </div>

      <div className="space-y-6">
        {procedure.sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="glass-card overflow-hidden"
          >
            <div className="glass-card-header px-6 py-4">
              <h2 className="font-semibold text-gray-900">{section.title}</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {section.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
