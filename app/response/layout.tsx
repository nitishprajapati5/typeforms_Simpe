export default function ResponseLayout({
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
