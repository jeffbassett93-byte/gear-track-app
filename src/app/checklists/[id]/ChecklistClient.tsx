"use client";

import Link from "next/link";
import { ArrowLeft, Check, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

const checklistsData: Record<string, {
  title: string;
  description: string;
  items: {
    section: string;
    tasks: string[];
  }[];
}> = {
  return: {
    title: "Equipment Return Checklist",
    description: "Complete all steps when returning equipment to the warehouse",
    items: [
      {
        section: "Pre-Return Inspection",
        tasks: [
          "Performed visual inspection for obvious damage",
          "Performed tactile inspection for abnormalities",
          "Checked for contamination (chemicals, oils, dirt)",
          "Verified all components are present",
          "Noted any issues discovered during use",
        ],
      },
      {
        section: "Condition Assessment",
        tasks: [
          "Classified equipment condition (Good/Fair/Damaged/Contaminated)",
          "Documented any issues found",
        ],
      },
      {
        section: "Warehouse Receipt",
        tasks: [
          "Equipment ID verified against documentation",
          "Quantity of items confirmed",
          "Condition assessment reviewed by warehouse staff",
          "Receipt confirmation signed",
        ],
      },
      {
        section: "Post-Return",
        tasks: [
          "Equipment cleaned if necessary",
          "Stored in designated location",
          "System updated with return information",
        ],
      },
    ],
  },
  quarantine: {
    title: "Quarantine Checklist",
    description: "Complete all steps when quarantining equipment",
    items: [
      {
        section: "Immediate Actions",
        tasks: [
          "Stopped using equipment immediately",
          "Removed equipment from service area",
          "Secured equipment to prevent accidental use",
        ],
      },
      {
        section: "Tagging",
        tasks: [
          "Attached RED quarantine tag",
          "Written date of quarantine on tag",
          "Written reason for quarantine on tag",
          "Written name of person quarantining on tag",
        ],
      },
      {
        section: "System Update",
        tasks: [
          "Changed status to 'Quarantined' in system",
          "Recorded quarantine date",
          "Documented reason for quarantine",
          "Assigned investigation owner",
        ],
      },
      {
        section: "Storage",
        tasks: [
          "Transported to quarantine zone",
          "Stored in designated quarantine location",
          "Logged entry in quarantine zone inventory",
        ],
      },
    ],
  },
  destruction: {
    title: "Destruction Checklist",
    description: "NO EQUIPMENT SHALL BE DESTROYED ON SITE: All quarantined gear must be retured to Warehouse",
    items: [
      {
        section: "Authorization",
        tasks: [
          "Destruction request form completed",
          "Reason for destruction documented",
          "Admin approval obtained",
        ],
      },
      {
        section: "Pre-Destruction Documentation",
        tasks: [
          "Equipment ID verified against documentation",
          "Equipment details recorded (ID, serial, model)",
          "Register status updated to 'Pending Destruction'",
        ],
      },
      {
        section: "Physical Destruction",
        tasks: [
          "Equipment destroyed according to type-specific method",
          "Equipment rendered completely unusable",
          "Destruction verified as complete",
        ],
      },
      {
        section: "Post-Destruction",
        tasks: [
          "Destruction date and time recorded",
          "Destruction method documented",
          "Register status updated to 'Destroyed'",
          "Materials disposed of appropriately",
        ],
      },
    ],
  },
  "pre-use": {
    title: "Pre-Use Inspection Checklist",
    description: "Complete before each equipment use",
    items: [
      {
        section: "Visual Inspection",
        tasks: [
          "Checked for obvious damage",
          "Looked for fraying or wear",
          "Verified color coding status is current",
          "Checked for contamination",
          "Verified labels and markings are legible",
        ],
      },
      {
        section: "Tactile Inspection",
        tasks: [
          "Felt for abnormalities in material",
          "Checked for stiffness or unusual softness",
          "Verified structural integrity",
        ],
      },
      {
        section: "Function Check",
        tasks: [
          "Tested buckles and adjustments",
          "Verified karabiner gate function",
          "Checked rope grab operation",
          "Verified ascender/descender function",
          "Tested locking mechanisms",
        ],
      },
      {
        section: "Buddy Check",
        tasks: [
          "Partner verified inspection",
          "Both technicians satisfied with equipment condition",
        ],
      },
    ],
  },
  acceptance: {
    title: "Acceptance Check Checklist",
    description: "Complete when receiving new equipment",
    items: [
      {
        section: "Documentation Review",
        tasks: [
          "Manufacturer documentation received",
          "CE/EN certification verified",
          "Serial numbers match documentation",
          "Date of manufacture recorded",
        ],
      },
      {
        section: "Physical Inspection",
        tasks: [
          "Checked for shipping damage",
          "Verified all components present",
          "Labels intact and legible",
          "Function test passed",
        ],
      },
      {
        section: "Registration",
        tasks: [
          "Unique equipment ID assigned",
          "Equipment entered into tracking system",
          "Identification markings applied",
          "Initial inspection label applied",
        ],
      },
      {
        section: "Storage",
        tasks: [
          "Assigned to storage location",
          "Date of first use recorded",
          "Equipment ready for deployment",
        ],
      },
    ],
  },
  detailed: {
    title: "Detailed Inspection Checklist",
    description: "6-month comprehensive inspection checklist",
    items: [
      {
        section: "Preparation",
        tasks: [
          "Inspection tools gathered",
          "Equipment history reviewed",
          "Equipment cleaned thoroughly",
          "Adequate workspace prepared",
        ],
      },
      {
        section: "Harness Inspection",
        tasks: [
          "Full length webbing inspection completed",
          "Edge wear assessed",
          "UV damage evaluated",
          "Stitching integrity checked",
          "Buckle function tested",
          "Label verification completed",
        ],
      },
      {
        section: "Rope Inspection",
        tasks: [
          "Full length inspection completed",
          "Core exposure checked",
          "Diameter uniformity verified",
          "Flexibility tested",
          "End terminations inspected",
        ],
      },
      {
        section: "Hardware Inspection",
        tasks: [
          "Gate operation tested",
          "Locking mechanism checked",
          "Rope groove inspected",
          "Surface wear measured",
          "Corrosion assessed",
        ],
      },
      {
        section: "Documentation",
        tasks: [
          "Detailed inspection form completed",
          "All findings recorded",
          "Equipment register updated",
          "New inspection label applied with current period color",
          "Next inspection date scheduled",
        ],
      },
    ],
  },
};

interface ChecklistClientProps {
  id: string;
}

export function ChecklistClient({ id }: ChecklistClientProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`checklist-${id}`);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, [id]);

  const checklist = checklistsData[id];

  const toggleItem = (key: string) => {
    const newChecked = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newChecked);
    localStorage.setItem(`checklist-${id}`, JSON.stringify(newChecked));
  };

  const resetChecklist = () => {
    setCheckedItems({});
    localStorage.removeItem(`checklist-${id}`);
  };

  const totalItems = checklist
    ? checklist.items.reduce((acc, section) => acc + section.tasks.length, 0)
    : 0;
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  if (!isLoaded) {
    return (
      <div className="p-4 md:p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
        </div>
      </div>
    );
  }

  if (!checklist) {
    return (
      <div className="p-4 md:p-8">
        <p>Checklist not found</p>
        <Link href="/checklists" className="text-blue-600">
          Back to Checklists
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10">
      <Link
        href="/checklists"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Checklists
      </Link>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/70 text-xs uppercase tracking-[0.2em] text-gray-500">
          Checklist
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4 mt-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
              {checklist.title}
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">{checklist.description}</p>
          </div>
          <button
            onClick={resetChecklist}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white/80 rounded-full transition-colors border border-white/70"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="glass-card p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">
            {completedItems} of {totalItems} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              progress === 100 ? "bg-green-500" : "bg-blue-600"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <p className="text-sm text-green-600 font-medium mt-2">
            ✓ Checklist complete!
          </p>
        )}
      </div>

      <div className="space-y-6">
        {checklist.items.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="glass-card overflow-hidden"
          >
            <div className="glass-card-header px-6 py-4">
              <h2 className="font-semibold text-gray-900">{section.section}</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {section.tasks.map((task, taskIndex) => {
                  const key = `${sectionIndex}-${taskIndex}`;
                  const isChecked = checkedItems[key] || false;
                  return (
                    <li key={taskIndex}>
                      <button
                        onClick={() => toggleItem(key)}
                        className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                          isChecked
                            ? "bg-green-50 hover:bg-green-100"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isChecked
                              ? "bg-green-500 border-green-500"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isChecked && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            isChecked
                              ? "text-green-700 line-through"
                              : "text-gray-700"
                          }`}
                        >
                          {task}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
