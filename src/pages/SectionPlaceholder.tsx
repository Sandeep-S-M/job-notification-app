export function SectionPlaceholder({ title }: { title: string }) {
  return (
    <main className="jna-main" id="main">
      <header className="jna-context">
        <h1>{title}</h1>
        <p className="jna-context__sub">This section will be built in the next step.</p>
      </header>
    </main>
  );
}
