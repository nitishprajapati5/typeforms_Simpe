import { ChevronRight, FormInput } from "lucide-react";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen overflow-auto">
     
      <main>{children}</main>
    </div>
  );
}
