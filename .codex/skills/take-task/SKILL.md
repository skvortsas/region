---
name: take-task
description: Implement a single task from TASKS.md by ID. The user supplies a task identifier (e.g. "3B", "3.B", "1.2", "2.5"); locate the matching task in TASKS.md, read the referenced sections of docs/DESIGN.md, docs/SEO.md, and docs/DEPLOYMENT.md, optionally pull Figma context via the `designer` skill, then write the code to satisfy every bullet of the task. Marks the checkbox `- [x]` on completion.
---

# take-task

You have been invoked to implement a single task from `/Users/stasyan/region/TASKS.md`. The user will name a task identifier in chat (e.g. `3B`, `3.B`, `1.2`, `2.5`). Normalize variants like `3B` ↔ `3.B` ↔ `3.b` to the canonical form used in TASKS.md.

## Model & execution

Run the implementation inline on the current Codex model (Codex has no first-class subagents — there's no `Task` tool to delegate to). Use **high reasoning effort** for the planning step (parsing the task, deciding on file edits) and standard effort for the mechanical edits. The session orchestrates everything itself: parse the ID, locate the task, gather context, edit files, verify, tick the checkbox.

## Workflow

1. **Resolve the task.** Read `/Users/stasyan/region/TASKS.md`. Locate the heading matching the requested ID (e.g. `**3.A — components/sections/Header.tsx**`). If not found, list nearby IDs and stop. Extract the full task block (all bullets up to the next `---` or next task).

2. **Check phase order.** A task is only allowed to start when every checkbox in earlier phases is `- [x]`. If an earlier phase has unchecked items, stop and report which ones block this task. Within a phase, tasks separated by `---` may proceed in any order.

3. **Pull referenced context.** Open only the doc sections the task explicitly references:
   - `docs/DESIGN.md` for tokens, node IDs, mobile notes
   - `docs/SEO.md` for metadata, JSON-LD, sitemap/robots scaffolds
   - `docs/DEPLOYMENT.md` for caching, CI, redirects
   - `AGENTS.md` for global conventions (Montserrat, `next/image`, no inline styles, Cache Components)

4. **Get Figma context if needed.** When the task references a Figma node ID and `docs/DESIGN.md` does not already cover the exact values you need (colors, spacing, copy, asset paths), **load and follow the `designer` skill** with a specific question. Example: *"Fetch Figma node 88:86 and report: exact dimensions, background fill, child text nodes with content + font/size, and any export assets I should pull. Update docs/DESIGN.md if these values are missing."* Do not call `ClaudeTalkToFigma` tools directly from this skill — route through the `designer` skill so `docs/DESIGN.md` stays the single source of truth.

5. **Implement.** Edit/create the files the task requires. The edit pass must respect:
   - The full task block verbatim — every bullet is an acceptance criterion
   - File paths to create or edit (exactly as stated)
   - Exact token names from DESIGN.md (no hardcoded hex, no ad-hoc spacing)
   - Any Figma context returned by the designer skill
   - This is **Next.js 16.2.6 with Cache Components**. Read `node_modules/next/dist/docs/` before using unfamiliar APIs. No `export const revalidate`. Use `next/font/google` for Montserrat. All images via `next/image` with explicit `width`/`height`. No inline styles — Tailwind utility classes only.

6. **Verify.** Read each file you created/edited. Spot-check that:
   - Every bullet from the task is satisfied
   - Tokens come from `globals.css` / DESIGN.md, not hardcoded values
   - Client/server boundaries are correct (`'use client'` only where needed)
   - Imports resolve and TypeScript types are present
   - No `revalidate` exports, no old fetch cache patterns

7. **Tick the checkbox.** Edit `TASKS.md` and change the task's `- [ ]` to `- [x]`. Only do this if verification passed.

8. **Report.** One short paragraph: what was built, which files changed, any TODOs/placeholders left for the user (e.g. missing Figma assets, env vars to fill). If verification surfaced issues you could not fix, leave the checkbox unchecked and list the blockers.

## Rules

- **One task per invocation.** Do not chain into the next task even if it looks easy.
- **Do not invent acceptance criteria.** If a bullet is ambiguous, follow the `designer` skill or ask the user — do not guess.
- **Do not skip the `designer` skill** for Figma-specific values. DESIGN.md is the contract.
- **Do not bypass phase order.** Phase N is blocked until Phase N-1 is fully checked.
- **Do not commit.** Leave the working tree dirty for the user to review.
- **Do not edit unrelated files.** Stay inside the scope of the task block.
