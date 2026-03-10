# RAR-10 Migration Brief

This document captures the gap between the current `rara-notes` frontend and the stack used by [`bubbuild/tape.systems`](https://github.com/bubbuild/tape.systems), then proposes a phased migration path that keeps the existing notes feed stable while the framework changes land incrementally.

## Current baseline

`rara-notes` currently ships as a single static [`index.html`](../index.html) that fetches [`notes/index.json`](../notes/index.json) at runtime. There is no package manager, no build step, no framework runtime, no shared component layer, and no automated lint or type checks.

The visual language has already been refreshed to align more closely with `tape.systems`, but the implementation is still hand-authored HTML, CSS, and client-side JavaScript.

## Target stack snapshot

Based on the current `tape.systems` repository, the target frontend stack is:

| Area | `tape.systems` |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI runtime | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 via PostCSS |
| Design tokens | CSS variables in `app/globals.css` |
| Fonts | `next/font/google` with Inter and JetBrains Mono |
| Component layer | `components/` plus shadcn/ui config (`components.json`) |
| UI primitives | Radix UI, Lucide icons, class-variance-authority, tailwind-merge |
| Output mode | `next.config.mjs` uses `output: "export"` with GitHub Pages-safe base path handling |
| Tooling | `pnpm`, ESLint 9, TypeScript config, Next build/dev scripts |

## Gap analysis

| Area | Current `rara-notes` | Target direction | Migration impact |
| --- | --- | --- | --- |
| App shell | One static HTML document | Next app directory with layout and page modules | High: file structure and rendering model change |
| Data loading | Browser fetch to `notes/index.json` | Build-time or server-safe data module imported by React components | Medium: preserve JSON first, then wrap in a typed loader |
| Styling | Handwritten CSS inside `index.html` | Tailwind utility classes plus shared CSS variables | High: move styles into `app/globals.css` and components |
| Typography | Google Fonts `<link>` tags | `next/font` managed fonts | Low: direct mapping once Next exists |
| Components | Template literals in one file | Reusable React components in `components/` | High: extract note list, hero, sidebar, and metadata blocks |
| Design system | No package-managed primitives | shadcn-compatible structure with Radix/Lucide options | Medium: only needed where primitives add value |
| Quality gates | Manual browser/server checks only | `pnpm lint`, `pnpm build`, optional type checks/tests | Medium: tooling must exist before code migration |
| Deployment | Raw static hosting works today | Next static export still compatible with static hosting | Low: target repo already demonstrates the export path |

## Key migration constraints

1. The current `notes/index.json` feed should remain the source of truth until the Next scaffold is stable.
2. Visual alignment is already in place, so the next code changes should avoid redoing the design in parallel with framework bootstrapping.
3. Static hosting compatibility must be preserved. `tape.systems` solves this with `output: "export"` and conditional base path handling; `rara-notes` should follow the same direction.
4. The repo is intentionally small today. Introducing Next, TypeScript, Tailwind, and component tooling in one step is acceptable only if content loading remains simple and page scope stays narrow.

## Proposed phases

### Phase 0: completed baseline

- Keep the refreshed static page as the visual reference.
- Do not change the JSON schema or note content format in this phase.

### Phase 1: framework and tooling scaffold

- Add `package.json` with `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `@tailwindcss/postcss`, `eslint`, and `eslint-config-next`.
- Add `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `next.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, and `next-env.d.ts`.
- Mirror the core design tokens already used in the refreshed static page so the layout can be reimplemented without visual drift.
- Keep output configured for static export.

Exit criteria:
- `pnpm build` succeeds.
- The app renders a minimal Next page using the existing visual tokens.

### Phase 2: data bridge

- Introduce a small `lib/notes.ts` loader that reads or imports `notes/index.json`.
- Define a TypeScript note shape matching the existing JSON.
- Render notes through React props instead of in-page DOM templating.

Exit criteria:
- The Next page renders the same notes content now shown by the static page.
- No schema change is required for existing note entries.

### Phase 3: component extraction

- Break the page into focused components such as `Topbar`, `Hero`, `Sidebar`, `NotesList`, and `NoteCard`.
- Move reusable visual rules from the monolithic page into Tailwind classes and shared utilities.
- Introduce shadcn/Radix primitives only where they reduce custom code rather than inflate it.

Exit criteria:
- The page structure matches the current static experience with a maintainable component tree.
- Styling no longer depends on a large inline stylesheet.

### Phase 4: deployment and polish

- Remove the legacy static `index.html` once the Next export is the default entrypoint.
- Verify base path behavior, static assets, metadata, and font loading in the exported build.
- Add any lightweight QA scripts needed for future changes.

Exit criteria:
- Static hosting serves the exported Next app successfully.
- The old HTML entrypoint is no longer required.

## Recommended cut line for the next task

The next atomic task should implement Phase 1 only. That means bootstrapping Next/Tailwind/TypeScript and rendering a simple shell, but not yet migrating the full note rendering logic into components. Keeping that cut line prevents the scaffold commit from also becoming a content migration commit.

## Risks and mitigations

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Framework setup obscures regressions | Too many moving parts make visual mismatches harder to diagnose | Land Phase 1 with a minimal shell before moving data rendering |
| Tailwind conversion changes spacing/typography unintentionally | The refreshed static page is now the visual baseline | Reuse the same token values in `app/globals.css` first, then convert incrementally |
| Static hosting breaks after migration | Current site has no build complexity | Copy the export-oriented Next config pattern from `tape.systems` early |
| Over-adopting UI libraries | `tape.systems` includes a broad component/tooling set that `rara-notes` may not need immediately | Treat shadcn/Radix as optional primitives, not mandatory scope for the first scaffold |
