import { ChecklistClient } from "./ChecklistClient";

export function generateStaticParams() {
  return [
    { id: "return" },
    { id: "quarantine" },
    { id: "destruction" },
    { id: "pre-use" },
    { id: "acceptance" },
    { id: "detailed" },
  ];
}

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ChecklistClient id={id} />;
}
