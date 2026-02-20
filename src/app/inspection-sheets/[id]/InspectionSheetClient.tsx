"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Check, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

const inspectionData: Record<string, {
  title: string;
  description: string;
  petzlUrl: string;
  sections: {
    title: string;
    items: string[];
  }[];
}> = {
  harness: {
    title: "Harness Inspection",
    description: "Full body harness and sit harness inspection criteria based on Petzl guidelines",
    petzlUrl: "https://www.petzl.com/US/en/Professional/Harnesses",
    sections: [
      {
        title: "Webbing Inspection",
        items: [
          "Check entire length of all webbing for cuts, abrasion, or fraying",
          "Look for chemical damage (discoloration, stiffness, softening)",
          "Check for UV damage (fading, brittleness)",
          "Verify no heat damage (melting, glazing, hardening)",
          "Inspect for contamination (oil, paint, chemicals)",
        ],
      },
      {
        title: "Stitching Inspection",
        items: [
          "Check all stitching for broken, cut, or worn threads",
          "Verify stitching is not pulled or loose",
          "Look for abrasion damage to stitched areas",
          "Ensure no stitching has been modified",
        ],
      },
      {
        title: "Hardware Inspection",
        items: [
          "Check buckles for proper function and engagement",
          "Verify adjustment buckles slide freely",
          "Inspect metal components for corrosion or damage",
          "Check attachment points for wear or deformation",
          "Verify all rivets are secure",
        ],
      },
      {
        title: "Label Inspection",
        items: [
          "Verify CE marking is present and legible",
          "Check serial number is readable",
          "Confirm manufacture date is visible",
          "Verify inspection label is current",
        ],
      },
      {
        title: "Function Test",
        items: [
          "Test all buckle engagement and release",
          "Verify adjustments work smoothly",
          "Check leg loops adjust properly",
          "Confirm waist belt adjusts correctly",
        ],
      },
    ],
  },
  rope: {
    title: "Rope Inspection",
    description: "Static and dynamic rope inspection criteria based on Petzl guidelines",
    petzlUrl: "https://www.petzl.com/US/en/Professional/Ropes",
    sections: [
      {
        title: "Visual Inspection",
        items: [
          "Inspect entire length of rope sheath for cuts or abrasion",
          "Look for flat spots indicating core damage",
          "Check for glazing or fusion from friction/heat",
          "Look for discoloration indicating chemical damage",
          "Check for UV damage (fading, brittleness)",
        ],
      },
      {
        title: "Tactile Inspection",
        items: [
          "Feel entire length for lumps or soft spots",
          "Check for inconsistent diameter",
          "Feel for core bunching or displacement",
          "Check for stiffness or unusual softness",
        ],
      },
      {
        title: "Sheath Inspection",
        items: [
          "Check for sheath slippage over core",
          "Look for picks or pulled yarns",
          "Verify sheath is not separating from core",
          "Check for contamination embedded in sheath",
        ],
      },
      {
        title: "End Terminations",
        items: [
          "Inspect sewn terminations for damage",
          "Check splices for integrity",
          "Verify end markers are present",
          "Check for fraying at rope ends",
        ],
      },
      {
        title: "Label Inspection",
        items: [
          "Verify CE marking is present",
          "Check serial number is readable",
          "Confirm manufacture date is visible",
          "Verify rope type and length markings",
        ],
      },
    ],
  },
  karabiner: {
    title: "Karabiner Inspection",
    description: "Connector and karabiner inspection criteria based on Petzl guidelines",
    petzlUrl: "https://www.petzl.com/US/en/Professional/Connectors",
    sections: [
      {
        title: "Body Inspection",
        items: [
          "Check for cracks, especially at stress points",
          "Look for deep scratches or gouges",
          "Check for deformation or bending",
          "Inspect for corrosion or pitting",
          "Verify no sharp edges that could damage rope",
        ],
      },
      {
        title: "Gate Inspection",
        items: [
          "Check gate opens and closes smoothly",
          "Verify gate spring returns gate to closed position",
          "Look for wear on gate hinge",
          "Check gate closes completely and aligns properly",
        ],
      },
      {
        title: "Locking Mechanism",
        items: [
          "Test locking mechanism engages properly",
          "Verify lock releases smoothly",
          "Check for wear on locking sleeve/mechanism",
          "Confirm gate cannot open when locked",
        ],
      },
      {
        title: "Rope Bearing Surface",
        items: [
          "Check for excessive wear on rope groove",
          "Look for sharp edges from wear",
          "Verify smooth surface for rope contact",
          "Measure wear if gauge available",
        ],
      },
      {
        title: "Markings",
        items: [
          "Verify CE marking is present and legible",
          "Check serial number is readable",
          "Confirm strength ratings are visible",
          "Verify inspection label is current",
        ],
      },
    ],
  },
  descender: {
    title: "Descender Inspection",
    description: "Descender and belay device inspection criteria based on Petzl guidelines",
    petzlUrl: "https://www.petzl.com/US/en/Professional/Descenders",
    sections: [
      {
        title: "Body Inspection",
        items: [
          "Check for cracks in body or side plates",
          "Look for deformation or bending",
          "Inspect for corrosion or damage",
          "Verify all components are present",
        ],
      },
      {
        title: "Moving Parts",
        items: [
          "Check cam or friction mechanism operates smoothly",
          "Verify handle moves freely",
          "Test panic function (if equipped)",
          "Check anti-panic mechanism engages properly",
        ],
      },
      {
        title: "Rope Path",
        items: [
          "Inspect rope bearing surfaces for wear",
          "Check for sharp edges or burrs",
          "Verify rope feeds smoothly through device",
          "Check for debris in rope path",
        ],
      },
      {
        title: "Connection Point",
        items: [
          "Inspect attachment hole for wear",
          "Check for elongation of connection point",
          "Verify no sharp edges",
          "Check captive bar (if equipped)",
        ],
      },
      {
        title: "Function Test",
        items: [
          "Test descent control function",
          "Verify lock-off function works",
          "Check handle returns to neutral",
          "Test with appropriate rope diameter",
        ],
      },
    ],
  },
  ascender: {
    title: "Ascender Inspection",
    description: "Rope clamp and ascender inspection criteria based on Petzl guidelines",
    petzlUrl: "https://www.petzl.com/US/en/Professional/Ascenders",
    sections: [
      {
        title: "Body Inspection",
        items: [
          "Check for cracks in body or frame",
          "Look for deformation or bending",
          "Inspect for corrosion or damage",
          "Verify all components are present",
        ],
      },
      {
        title: "Cam/Toothed Mechanism",
        items: [
          "Check teeth are sharp and undamaged",
          "Verify cam pivots freely",
          "Check spring returns cam properly",
          "Inspect cam for wear or damage",
        ],
      },
      {
        title: "Safety Catch",
        items: [
          "Verify safety catch operates correctly",
          "Check catch prevents accidental opening",
          "Test catch engagement and release",
          "Inspect for wear or damage",
        ],
      },
      {
        title: "Rope Path",
        items: [
          "Check rope channel for wear",
          "Verify rope feeds smoothly",
          "Check for debris or contamination",
          "Inspect rope bearing surfaces",
        ],
      },
      {
        title: "Function Test",
        items: [
          "Test grip on appropriate rope",
          "Verify device slides up rope freely",
          "Check device locks under load",
          "Test release under tension",
        ],
      },
    ],
  },
  helmet: {
    title: "Helmet Inspection",
    description: "Safety helmet inspection criteria based on Petzl guidelines",
    petzlUrl: "https://www.petzl.com/US/en/Professional/Helmets",
    sections: [
      {
        title: "Shell Inspection",
        items: [
          "Check for cracks, dents, or holes",
          "Look for deep scratches or gouges",
          "Check for UV damage (fading, chalking)",
          "Inspect for chemical damage",
          "Verify no modifications have been made",
        ],
      },
      {
        title: "Suspension System",
        items: [
          "Check headband for damage or wear",
          "Verify adjustment mechanism works",
          "Inspect cradle straps for damage",
          "Check foam padding condition",
        ],
      },
      {
        title: "Chin Strap",
        items: [
          "Inspect strap for cuts or fraying",
          "Check buckle operates correctly",
          "Verify adjustment works properly",
          "Check stitching integrity",
        ],
      },
      {
        title: "Ventilation",
        items: [
          "Check vents are not blocked",
          "Verify vent covers operate (if equipped)",
          "Inspect vent edges for damage",
        ],
      },
      {
        title: "Accessories",
        items: [
          "Check headlamp clips are secure",
          "Verify visor attachment (if equipped)",
          "Inspect ear protection mounts (if equipped)",
          "Check all accessory attachments",
        ],
      },
    ],
  },
  lanyard: {
    title: "Lanyard Inspection",
    description: "Lanyard and energy absorber inspection criteria based on Petzl guidelines",
    petzlUrl: "https://www.petzl.com/US/en/Professional/Lanyards-and-energy-absorbers",
    sections: [
      {
        title: "Webbing/Rope Inspection",
        items: [
          "Check entire length for cuts or abrasion",
          "Look for chemical damage or discoloration",
          "Check for UV damage",
          "Inspect for heat damage",
          "Verify no contamination",
        ],
      },
      {
        title: "Energy Absorber",
        items: [
          "Check absorber pack is intact and sealed",
          "Verify no deployment has occurred",
          "Look for damage to absorber housing",
          "Check indicator tape (if equipped)",
        ],
      },
      {
        title: "Connectors",
        items: [
          "Inspect all karabiners per karabiner checklist",
          "Check scaffold hooks for proper function",
          "Verify all connectors close and lock properly",
          "Inspect connection points to lanyard",
        ],
      },
      {
        title: "Stitching",
        items: [
          "Check all stitching for damage",
          "Verify no pulled or broken threads",
          "Inspect termination stitching",
          "Check adjuster stitching (if equipped)",
        ],
      },
      {
        title: "Adjuster (if equipped)",
        items: [
          "Test adjuster operates smoothly",
          "Verify adjuster locks under load",
          "Check for wear on adjustment mechanism",
          "Inspect rope/webbing at adjuster",
        ],
      },
    ],
  },
  pulley: {
    title: "Pulley Inspection",
    description: "Pulley and hauling device inspection criteria based on Petzl guidelines",
    petzlUrl: "https://www.petzl.com/US/en/Professional/Pulleys",
    sections: [
      {
        title: "Side Plates",
        items: [
          "Check for cracks or damage",
          "Look for deformation",
          "Inspect for corrosion",
          "Verify plates are secure",
        ],
      },
      {
        title: "Sheave (Wheel)",
        items: [
          "Check sheave rotates freely",
          "Inspect rope groove for wear",
          "Look for flat spots or damage",
          "Verify bearings are smooth",
        ],
      },
      {
        title: "Axle",
        items: [
          "Check axle is secure",
          "Look for wear or damage",
          "Verify axle is not bent",
          "Check for corrosion",
        ],
      },
      {
        title: "Connection Point",
        items: [
          "Inspect attachment hole for wear",
          "Check for elongation",
          "Verify no sharp edges",
          "Check swivel function (if equipped)",
        ],
      },
      {
        title: "Rope Capture (if equipped)",
        items: [
          "Check cam teeth are sharp",
          "Verify cam pivots freely",
          "Test rope capture function",
          "Check release mechanism",
        ],
      },
    ],
  },
};

interface InspectionSheetClientProps {
  id: string;
}

export function InspectionSheetClient({ id }: InspectionSheetClientProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`inspection-${id}`);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, [id]);

  const inspection = inspectionData[id];

  const toggleItem = (key: string) => {
    const newChecked = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newChecked);
    localStorage.setItem(`inspection-${id}`, JSON.stringify(newChecked));
  };

  const resetChecklist = () => {
    setCheckedItems({});
    localStorage.removeItem(`inspection-${id}`);
  };

  const totalItems = inspection
    ? inspection.sections.reduce((acc, section) => acc + section.items.length, 0)
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

  if (!inspection) {
    return (
      <div className="p-4 md:p-8">
        <p>Inspection sheet not found</p>
        <Link href="/inspection-sheets" className="text-blue-600">
          Back to Inspection Sheets
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10">
      <Link
        href="/inspection-sheets"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Inspection Sheets
      </Link>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/70 text-xs uppercase tracking-[0.2em] text-gray-500">
          Inspection Sheet
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4 mt-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
              {inspection.title}
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">{inspection.description}</p>
          </div>
          <div className="flex gap-2">
            <a
              href={inspection.petzlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-colors shadow-lg shadow-orange-500/20"
            >
              <ExternalLink className="w-4 h-4" />
              Petzl Docs
            </a>
            <button
              onClick={resetChecklist}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white/80 rounded-full transition-colors border border-white/70"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Inspection Progress</span>
          <span className="text-sm text-gray-500">
            {completedItems} of {totalItems} checked
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
            ✓ Inspection complete!
          </p>
        )}
      </div>

      <div className="space-y-6">
        {inspection.sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="glass-card overflow-hidden"
          >
            <div className="glass-card-header px-6 py-4">
              <h2 className="font-semibold text-gray-900">{section.title}</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => {
                  const key = `${sectionIndex}-${itemIndex}`;
                  const isChecked = checkedItems[key] || false;
                  return (
                    <li key={itemIndex}>
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
                          {item}
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

      <div className="mt-8 glass-card p-6 border border-orange-200/60">
        <div className="flex items-start gap-3">
          <ExternalLink className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-orange-900">Official Documentation</h3>
            <p className="text-sm text-orange-700 mt-1">
              This checklist is based on Petzl inspection guidelines. Always refer to the
              official manufacturer documentation for complete inspection requirements and
              retirement criteria.
            </p>
            <a
              href={inspection.petzlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              View Official Petzl Documentation
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
