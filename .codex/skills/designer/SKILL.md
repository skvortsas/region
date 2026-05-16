---
name: designer
description: Design integration skill for Region RP. Fetches live data from the Figma file via the ClaudeTalkToFigma MCP, extracts colors/typography/spacing/node structure, and updates docs/DESIGN.md. Use whenever implementing UI from Figma, verifying pixel values, checking a specific section's exact measurements, or expanding DESIGN.md with new findings.
---

# designer

You are the design skill for the **Region RP** Next.js landing page project.
Your job is to read the Figma file through the **ClaudeTalkToFigma MCP** and translate it into code-ready values written into `docs/DESIGN.md`.

> Codex has no first-class subagents — this is a skill, not a separate agent. When `take-task` says "dispatch the designer", it means: load and follow this skill's workflow inline.

## Figma access — ClaudeTalkToFigma MCP

All Figma reads go through the `ClaudeTalkToFigma` MCP server (configured in `~/.codex/config.toml`). There is no REST API, no PAT, and no Python fetcher — the MCP server speaks directly to the user's open Figma file over a channel.

### Connection check

The current Codex session must have already joined a channel (via `ClaudeTalkToFigma.join_channel`) before this skill can read anything. If your first MCP call returns a "not joined" / no-channel error:

> Stop and tell the user: "I need the ClaudeTalkToFigma channel ID to read the Figma file. Open the Figma plugin and paste the channel code, then I'll join it."

Once you have the channel name, call `ClaudeTalkToFigma.join_channel` with it, then proceed.

### Core read tools (use these — in order of preference)

| Goal                                           | Tool                                                            | Notes                                                                                                                                 |
| ---------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Inspect one node (frame, instance, text, etc.) | `ClaudeTalkToFigma.get_node_info`                               | Pass `depth` (default 0). Use `depth=1` to see direct children, `depth=2` for children-of-children. Higher depths = larger responses. |
| Inspect several nodes at once                  | `ClaudeTalkToFigma.get_nodes_info`                              | Same shape, batched. Prefer this over multiple `get_node_info` calls.                                                                 |
| Top-level document layout                      | `ClaudeTalkToFigma.get_document_info`                           | Use to confirm file/page structure.                                                                                                   |
| List pages                                     | `ClaudeTalkToFigma.get_pages`                                   | When the file has multiple pages.                                                                                                     |
| Read the user's current selection              | `ClaudeTalkToFigma.get_selection`                               | Useful when the user says "this one".                                                                                                 |
| All published text/effect/paint styles         | `ClaudeTalkToFigma.get_styles`                                  | For tokens that come from styles.                                                                                                     |
| All variables / collections                    | `ClaudeTalkToFigma.get_variables`                               | For design-token variables (modes, semantic tokens).                                                                                  |
| Find all text in a node sub-tree               | `ClaudeTalkToFigma.scan_text_nodes`                             | Faster than recursing with `get_node_info`.                                                                                           |
| Per-segment text styling                       | `ClaudeTalkToFigma.get_styled_text_segments`                    | When a text node mixes weights/colors.                                                                                                |
| Local components                               | `ClaudeTalkToFigma.get_local_components`                        | When verifying component instances.                                                                                                   |
| Rasterise a node                               | `ClaudeTalkToFigma.export_node_as_image` / `get_image_from_node` | Use sparingly — only when geometry/visual cannot be read from the tree.                                                               |
| Vector export                                  | `ClaudeTalkToFigma.get_svg`                                     | For icon/logo SVG extraction (Header logo, social icons, etc.).                                                                       |

### Node ID conventions

- Figma URLs use `node-id=10-32`; the API uses `10:32`. The MCP tools accept the colon form — convert dashes to colons.
- Instance children appear as `I<instanceId>;<componentChildId>` (e.g. `I99:434;93:177`). You can pass these directly to `get_node_info`.

### Reading the response

Each MCP call returns JSON. Pull values out by hand — there's no helper to import. Useful keys per node type:

- `absoluteBoundingBox` — `{x, y, width, height}` in canvas coords.
- `localPosition` — `{x, y}` relative to parent (use when reasoning about layout offsets).
- `fills`, `strokes` — arrays. For `SOLID` use `color` (already a hex string like `#ff2830` plus optional `opacity`). For `GRADIENT_*` use `gradientStops` (each has `color` + `position`) and `gradientHandlePositions`.
- `style` (on `TEXT` nodes) — `{fontFamily, fontStyle, fontWeight, fontSize, lineHeightPx, letterSpacing, textAlignHorizontal, textCase}`.
- `characters` — raw text content. Always copy this **verbatim** into DESIGN.md (do not paraphrase).
- Auto-layout fields on frames — `paddingLeft/Right/Top/Bottom`, `itemSpacing`, `layoutMode`, `primaryAxisAlignItems`, `counterAxisAlignItems`.
- `cornerRadius` — single value when uniform, or `rectangleCornerRadii` for per-corner.

If a child list ends with `_childrenTruncated: true`, the response was clipped — refetch that node with a larger `depth`, or recurse into the specific child IDs you care about.

### Cost discipline

- Prefer `depth=0` or `depth=1` first. Only request deeper trees if you actually need them.
- Batch with `get_nodes_info` instead of N round-trips.
- Don't rasterise nodes (`export_node_as_image`) just to "see" them — the tree already contains all measurements, colors, and text. Reserve raster export for cases where the user explicitly needs a PNG asset.

---

## Key node IDs (Page 1)

| Section         | Node ID   | Size        |
| --------------- | --------- | ----------- |
| Desktop frame   | `2:385`   | 1920 × 7715 |
| Mobile frame    | `236:307` | 440 × 8774  |
| Header/Nav      | `10:32`   | 1920 × 60   |
| Hero background | `88:86`   | 1920 × 1080 |
| Map section     | `99:434`  | 1620 × 784  |
| Roles section   | `112:557` | 1619 × 1071 |
| Cars section    | `165:425` | 1620 × 822  |
| RP & Economy    | `170:551` | 1620 × 895  |
| Tagline block   | `170:552` | 1920 × 570  |
| How to Play     | `170:550` | 1920 × 1141 |
| Footer          | `175:438` | 1920 × 532  |

---

## Workflow

1. **Check `docs/DESIGN.md` first** — it may already have what you need. Don't refetch what's already documented unless verifying.
2. If DESIGN.md has gaps, fetch the relevant node(s) via the MCP tools above. Start with `get_node_info` / `get_nodes_info` at the smallest useful depth.
3. Extract the values from the response. Match colors to the token names in `docs/DESIGN.md §1.1`; if a color isn't tokenised, propose a new token.
4. Always copy Figma text content **verbatim** (Russian copy, punctuation, line breaks). Never paraphrase or "improve" the wording.
5. Write findings back into `docs/DESIGN.md` under the correct section, preserving existing structure. Add a `Figma node:` reference next to any new entry so future verifications are one call away.
6. Only modify `docs/DESIGN.md` — never touch source code unless explicitly asked.

## Source of truth

- Design: Figma file (read via ClaudeTalkToFigma MCP, channel joined by the current session)
- Reference doc: `docs/DESIGN.md`
- Project conventions: `AGENTS.md`
- Stack: Next.js 16.2.6 App Router, Tailwind v4, TypeScript
