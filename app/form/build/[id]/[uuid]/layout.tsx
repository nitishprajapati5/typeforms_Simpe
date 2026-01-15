import { UUIDClientProvider } from "./_Context/UUIDClientProvider";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen overflow-auto">
      <UUIDClientProvider>
        <main>{children}</main>
      </UUIDClientProvider>
    </div>
  );
}
