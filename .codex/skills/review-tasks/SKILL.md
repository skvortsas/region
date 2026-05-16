---
name: review-tasks
description: Review a completed task from TASKS.md for production readiness. The user supplies a task ID (e.g. "3.A", "3B", "1.2"); read the matching task in TASKS.md, audit the actual implementation against its acceptance criteria, and return a 5-line review plus a confidence level (1-10). If confidence < 9, also return a TBD plan listing what must change before the task is production-ready.
---

# review-tasks

You have been invoked to audit a single task from `TASKS.md` against its actual implementation in the repo. The user will name a task identifier in chat (e.g. `3.A`, `3B`, `1.2`, `2.5`). Normalize variants like `3B` ↔ `3.A` ↔ `3.b` to the canonical form used in TASKS.md.

## Model & execution

Use **high reasoning effort** for this skill — the audit is short but every observation must be specific. This is a read-only review; do not delegate, do not spawn subprocesses, and do not edit files.

## Workflow

1. **Read the task.** Open `/Users/stasyan/region/TASKS.md`. Locate the heading matching the requested ID (e.g. `**3.A — components/sections/Header.tsx**`). If not found, list nearby task IDs and stop.

2. **Read the referenced docs only as needed.** TASKS.md points at `docs/DESIGN.md`, `docs/SEO.md`, `docs/DEPLOYMENT.md`, and Figma node IDs. Only open the doc sections the task explicitly references. Do not read the whole design system.

3. **Audit the implementation.** Read the actual files the task was supposed to produce. Verify each bullet from the task description: file exists, props/variants match, env vars wired, accessibility/SEO requirements applied, Figma node IDs referenced in comments where useful, Cache Components conventions followed (`'use cache'`, no `revalidate`). Use Read/Grep — do not run the dev server.

4. **Cross-check conventions** from `AGENTS.md`: Montserrat font, `next/image` with explicit dims, no inline styles, Metadata API, semantic HTML, mobile-first.

5. **Score and report.** Output exactly the format below — no preamble, no headers beyond what's shown.

## Output format

```
Task <ID> — <one-line task name>

<5 lines of feedback. Each line is one concrete observation: what works, what's missing, what's wrong. Reference file:line where useful. No filler.>

Confidence: <N>/10
```

If `N < 9`, append:

```

TBD plan:
- <step 1: concrete file edit or check>
- <step 2: ...>
- <step 3: ...>
```

Keep the TBD plan to the minimum set of changes that would push confidence to 9+. Each bullet must be actionable (a file to edit, a check to run, an asset to export) — not a vague "improve X".

## Confidence rubric

- **10** — Pixel-accurate to Figma, all acceptance criteria met, no TODOs, production-ready.
- **9** — Functionally complete, minor polish items only (e.g. one missing alt text).
- **7–8** — Works but has gaps: missing responsive variant, placeholder asset, one prop unwired.
- **5–6** — Core feature present but multiple acceptance bullets unmet, or wrong caching/font/image patterns.
- **1–4** — Task is incomplete or substantially diverges from spec.

## Rules

- **Do not edit any files.** This skill is read-only review.
- **Do not** re-implement or "fix as you go." If something is broken, that goes in the TBD plan.
- **Do not** restate the task description back. The feedback must be about the implementation as it stands.
- Keep feedback **exactly 5 lines**. Be terse; one observation per line.
