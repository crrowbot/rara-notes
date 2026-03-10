const checkpoints = [
  "Next 16 app router shell is in place.",
  "Tailwind CSS 4 and shared design tokens mirror the static baseline.",
  "Static export settings are configured for GitHub Pages-style hosting."
];

const upcoming = [
  "Wire notes/index.json into a typed loader.",
  "Extract the hero, sidebar, and note cards into React components.",
  "Retire the legacy static entrypoint after export output matches the current page."
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="background-grid" aria-hidden="true" />
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="surface flex flex-col gap-4 rounded-full px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-accent">RAR-10 migration scaffold</p>
            <h1 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-balance">
              Next.js and Tailwind are now part of the repo baseline.
            </h1>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-black/8 bg-white/75 px-4 py-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_0_6px_rgba(59,130,246,0.12)]" />
            Phase 1 only: tooling scaffold, not data migration.
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)]">
          <section className="surface rounded-[32px] px-7 py-8 sm:px-10 sm:py-10">
            <p className="eyebrow text-accent">Framework alignment</p>
            <h2 className="mt-3 max-w-[10ch] text-5xl font-semibold leading-none tracking-[-0.07em] text-balance sm:text-7xl">
              Build the shell before moving the content.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              This placeholder page mirrors the current visual direction while the repo
              transitions from a single static document to the same stack family used by
              tape.systems. The notes feed stays untouched until the React data bridge lands.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="pill">Next 16</span>
              <span className="pill">React 19</span>
              <span className="pill">TypeScript</span>
              <span className="pill">Tailwind CSS 4</span>
            </div>
          </section>

          <aside className="surface grid content-start gap-5 rounded-[32px] px-6 py-7">
            <div>
              <p className="eyebrow text-accent">Status</p>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.05em]">Phase 1</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The repository can now host the Next export path alongside the existing static
                entrypoint.
              </p>
            </div>
            <div className="border-t border-black/8 pt-5">
              <p className="eyebrow text-muted-foreground">Source of truth</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                `notes/index.json` remains unchanged until the typed loader is introduced.
              </p>
            </div>
          </aside>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)]">
          <aside className="grid gap-4">
            <div className="panel-card">
              <p className="eyebrow text-accent">This commit</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Adds the framework, config, fonts, and global styling foundation without
                rewriting note rendering yet.
              </p>
            </div>
            <div className="panel-card">
              <p className="eyebrow text-accent">Legacy path</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                `index.html` is intentionally still present so the migration can continue in small,
                reversible steps.
              </p>
            </div>
          </aside>

          <section className="grid gap-4">
            <article className="surface rounded-[24px] px-6 py-6">
              <p className="eyebrow text-accent">Verification targets</p>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
                {checkpoints.map((item) => (
                  <li key={item} className="rounded-2xl border border-black/8 bg-white/70 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="surface rounded-[24px] px-6 py-6">
              <p className="eyebrow text-accent">Next cut line</p>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
                {upcoming.map((item) => (
                  <li key={item} className="rounded-2xl border border-black/8 bg-white/70 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}
