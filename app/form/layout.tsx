export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <h1>Form Layout</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}