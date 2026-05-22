<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design system

Before any UI work:

1. Read [`design.md`](./design.md) for rules, semantics, and usage.
2. Read `src/lib/*` and `src/app/globals.css` for **canonical token values**.
3. **Product color UI:** semantic tokens only (`src/lib/tokens/*`, `bg-surface-*`, `text-text-*`) — never root palette classes (`bg-cream-100`, `text-charcoal-800`, etc.).
4. **Icons:** Phosphor only (`@phosphor-icons/react`); sizes from `src/lib/icons/scale.ts`.

Do not invent tokens or styles. See `.cursor/rules/design-system.mdc`.
