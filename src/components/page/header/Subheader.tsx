import { ReactNode } from "react";

export default function Subheader({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-md">{children}</h2>;
}
