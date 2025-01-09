import { ReactNode } from "react";

export default function Subheader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-md">{title}</h2>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  );
}
