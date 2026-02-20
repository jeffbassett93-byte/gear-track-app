import { InspectionSheetClient } from "./InspectionSheetClient";

export function generateStaticParams() {
  return [
    { id: "harness" },
    { id: "rope" },
    { id: "karabiner" },
    { id: "descender" },
    { id: "ascender" },
    { id: "helmet" },
    { id: "lanyard" },
    { id: "pulley" },
  ];
}

export default async function InspectionSheetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InspectionSheetClient id={id} />;
}
