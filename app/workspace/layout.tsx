export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <h1>Workspace Layout</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}