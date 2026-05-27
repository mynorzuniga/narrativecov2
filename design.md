# NarrativeCo Design System

## Authority model

| Layer | Role | Who may use it |
|-------|------|----------------|
| **Palette (root)** | `src/lib/colors/*.ts`, `--color-{palette}-{shade}` in `globals.css` | Token definitions in `src/lib/tokens/*` only — **not** product UI |
| **Semantic** | `src/lib/tokens/surface.ts`, `src/lib/tokens/line.ts`, `src/lib/tokens/text.ts`, `--color-surface-*`, `--color-line-*`, `--color-text-*` | **All product UI** — mandatory |
| **Rules** | `design.md` (this file) | Agents and humans |

**Before UI work:** read this file, then read the relevant token source files for exact values.

**On conflict:** treat code as the runtime truth. If the design intentionally changed, update `src/lib/*` and `globals.css` first, then update this file’s rules/semantics if needed. Do not duplicate hex tables here—they drift.

---

## Agent rules (mandatory)

1. Read **`design.md`** and the **`src/lib/`** sources listed below before writing or changing UI.
2. **Do not invent** colors, font sizes, font families, font weights, spacing, shadows, radii, or component APIs.
3. **Do not substitute** “close enough” values (`zinc-500`, `text-lg`, default Tailwind palettes, Inter, Roboto, etc.).
4. **Do not add** dark mode, palettes, or type styles unless token files and this doc are updated first.
5. **Product color UI must use semantic tokens only** — see § Semantic tokens (strict) below. Never apply root palette utilities in product code.
6. **Import** from `src/lib/tokens/*` (and other `src/lib/*` scales) in TypeScript; use semantic Tailwind classes from `globals.css` `@theme`.
7. If a semantic token or component is missing, **stop and ask** — do not improvise and do not fall back to palette classes.
8. **Light mode only** (`color-scheme: light`).
9. **Icons:** Phosphor only (`@phosphor-icons/react`) — see § Icons.

---

## Foundations

Defined in code where noted; semantics here.

| Rule | Value | Source |
|------|--------|--------|
| Base rem | `1rem = 16px` | `src/lib/sizing/scale.ts` → `REM_BASE_PX` |
| Spacing step | `0.25rem` (4px) | `SIZE_INCREMENT_REM` |
| Theme mode | Light only | `src/app/globals.css`, `layout.tsx` |
| Page background | `bg-background` | `globals.css` → `#ffffff` |
| Page text | `text-foreground` | `globals.css` → `#171717` |
| UI chrome (labels, tabs) | `font-sans` (Geist) | `layout.tsx` |
| Product typography | `font-serif` (EB Garamond) | `layout.tsx`, `globals.css` |
| Logo | `font-logo` (IBM Plex Mono) | `src/lib/typography/fonts.ts`, `globals.css` |

---

## Colors

### Quick reference

| Palette | Tailwind prefix | Shades | Base shade ★ | Token file |
|---------|-----------------|--------|--------------|------------|
| Oxblood Ink | `oxblood-ink-{n}` | 50–950 (step 50) | **800** | `src/lib/colors/oxblood-ink.ts` |
| Charcoal | `charcoal-{n}` | 50–950 (step 50) | **800** | `src/lib/colors/charcoal.ts` |
| Amber | `amber-{n}` | 50–950 (step 50) | **800** | `src/lib/colors/amber.ts` |
| Cream | `cream-{n}` | **100, 200, 300 only** | **100** | `src/lib/colors/cream.ts` |

Exact hex values: **`{PALETTE}_SHADES`** and **`{PALETTE}_COLOR`** exports in each file. Tailwind theme: `--color-{palette}-{shade}` in `src/app/globals.css`. These are **root** colors — they exist so semantic tokens can resolve; they are not for direct use in product UI.

### Palette rules (root layer)

- Only the four palettes above exist.
- Cream has no 50, 400, 500, etc. — do not use undefined `cream-*` shades.
- Base shade ★ is the brand anchor (800 for full scales, 100 for Cream).
- **Do not** use `{palette}-{shade}` Tailwind classes (`bg-charcoal-800`, `text-oxblood-ink-100`, `border-amber-200`, etc.) in product components, pages, or layouts.
- **Do not** hardcode hex from palette files in product UI — use semantic tokens from `src/lib/tokens/*`.

### Semantic tokens (strict)

**Mandatory for all product UI.** Every background, text, and border color in product code must map to a defined semantic path in `src/lib/tokens/surface.ts`, `src/lib/tokens/line.ts`, or `src/lib/tokens/text.ts`.

| Do | Don't |
|----|--------|
| `bg-surface-page-default` | `bg-cream-100` |
| `bg-surface-container-accent1` | `bg-oxblood-ink-800` |
| `border-line-field-enabled` | `border-charcoal-600` |
| `text-text-default-body` | `text-charcoal-600` |
| `text-text-accent2-heading` | `text-cream-100` |
| Import `SURFACE_*` / `LINE_*` / `TEXT_*` from `@/lib/tokens/*` when logic needs hex or path | Import `CHARCOAL_SHADES` or use palette classes in components |

**Tailwind pattern:** semantic theme keys use the `surface-*`, `line-*`, and `text-*` prefixes registered in `globals.css` (e.g. `bg-surface-cta-primary`, `border-line-field-active`, `text-text-warning-body`). The `paletteClass` column in tables below is **documentation only** — it shows which root shade a semantic token resolves to, not an allowed product class.

**Allowed exceptions (not product UI):**

- `src/lib/tokens/*` — may reference `src/lib/colors/*` to define mappings.
- `src/app/globals.css` — wires semantic tokens to root `--color-{palette}-{shade}`.
- `src/components/design-system/color-tab.tsx` and `color-palette.tsx` — palette documentation viewer only.
- Design system token viewer (`tokens-color-subtab.tsx`) — may display `paletteClass` and `hex` for reference.

**Missing semantic token:** add the path in `src/lib/tokens/*`, register `--color-*` in `globals.css`, update this doc — never ship product UI with a root palette class as a shortcut.

```tsx
// Product UI — semantic only
<main className="bg-surface-page-default">
  <h1 className="text-text-default-heading">...</h1>
  <p className="text-text-default-body">...</p>
  <button className="bg-surface-cta-primary text-text-cta-primary">...</button>
</main>
```

```ts
import { SURFACE_PAGE_DEFAULT } from "@/lib/tokens/surface";
import { TEXT_DEFAULT_TOKENS } from "@/lib/tokens/text";
```

### Semantic color reference

#### Surface

**Source:** `src/lib/tokens/surface.ts` → `SURFACE_TOKENS`.

| Path | Palette reference | Tailwind (product) |
|------|-------------------|-------------------|
| `surface/page/default` | `cream-100` | `bg-surface-page-default` |

**Container** (`surface/container/[variant]`):

| Path | Palette reference | Tailwind (product) |
|------|-------------------|-------------------|
| `surface/container/default` | `cream-100` | `bg-surface-container-default` |
| `surface/container/accent1` | `oxblood-ink-800` | `bg-surface-container-accent1` |
| `surface/container/accent2` | `charcoal-800` | `bg-surface-container-accent2` |
| `surface/container/disabled` | `charcoal-200` | `bg-surface-container-disabled` |
| `surface/container/warning` | `amber-50` | `bg-surface-container-warning` |
| `surface/container/success` | `oxblood-ink-600` | `bg-surface-container-success` |

**CTA** (`surface/cta/[variant]`):

| Path | Palette reference | Tailwind (product) |
|------|-------------------|-------------------|
| `surface/cta/primary` | `oxblood-ink-800` | `bg-surface-cta-primary` |
| `surface/cta/secondary` | `charcoal-800` | `bg-surface-cta-secondary` |
| `surface/cta/tertiary` | `cream-200` | `bg-surface-cta-tertiary` |

**Field** (`surface/field/[variant]`):

| Path | Palette reference | Tailwind (product) |
|------|-------------------|-------------------|
| `surface/field/enabled` | `cream-100` | `bg-surface-field-enabled` |
| `surface/field/disabled` | `charcoal-200` | `bg-surface-field-disabled` |

#### Line

**Source:** `src/lib/tokens/line.ts` → `LINE_TOKENS`.

**Field** (`line/field/[variant]`):

| Path | Palette reference | Tailwind (product) |
|------|-------------------|-------------------|
| `line/field/enabled` | `charcoal-600` | `border-line-field-enabled` |
| `line/field/disabled` | `charcoal-500` | `border-line-field-disabled` |
| `line/field/active` | `oxblood-ink-600` | `border-line-field-active` |
| `line/field/warning` | `amber-800` | `border-line-field-warning` |

#### Text

**Source:** `src/lib/tokens/text.ts` → `TEXT_DEFAULT_TOKENS`, `TEXT_ACCENT1_TOKENS`, `TEXT_ACCENT2_TOKENS`, `TEXT_DISABLED_TOKENS`, `TEXT_WARNING_TOKENS`, `TEXT_SUCCESS_TOKENS`, `TEXT_CTA_TOKENS`, `TEXT_FIELD_TOKENS`.

**Default** (`text/default/[variant]`):

| Path | Palette reference | Tailwind (product) |
|------|-------------------|-------------------|
| `text/default/heading` | `charcoal-800` | `text-text-default-heading` |
| `text/default/subheading` | `charcoal-700` | `text-text-default-subheading` |
| `text/default/body` | `charcoal-600` | `text-text-default-body` |
| `text/default/complementary` | `charcoal-400` | `text-text-default-complementary` |
| `text/default/accent` | `oxblood-ink-800` | `text-text-default-accent` |

**Accent 1** (`text/accent1/[variant]`):

| Path | Palette reference | Tailwind (product) |
|------|-------------------|-------------------|
| `text/accent1/heading` | `cream-100` | `text-text-accent1-heading` |
| `text/accent1/subheading` | `charcoal-50` | `text-text-accent1-subheading` |
| `text/accent1/body` | `charcoal-100` | `text-text-accent1-body` |
| `text/accent1/complementary` | `charcoal-300` | `text-text-accent1-complementary` |
| `text/accent1/accent` | `oxblood-ink-200` | `text-text-accent1-accent` |

**Accent 2** (`text/accent2/[variant]`):

| Path | Palette reference | Tailwind (product) |
|------|-------------------|-------------------|
| `text/accent2/heading` | `cream-100` | `text-text-accent2-heading` |
| `text/accent2/subheading` | `oxblood-ink-50` | `text-text-accent2-subheading` |
| `text/accent2/body` | `oxblood-ink-100` | `text-text-accent2-body` |
| `text/accent2/complementary` | `oxblood-ink-300` | `text-text-accent2-complementary` |
| `text/accent2/accent` | `cream-100` | `text-text-accent2-accent` |

**Disabled** (`text/disabled/[variant]`):

| Path | Palette reference | Tailwind (product) |
|------|-------------------|-------------------|
| `text/disabled/default` | `charcoal-600` | `text-text-disabled-default` |

**Warning** (`text/warning/[variant]`):

| Path | Palette reference | Tailwind (product) |
|------|-------------------|-------------------|
| `text/warning/heading` | `amber-900` | `text-text-warning-heading` |
| `text/warning/body` | `amber-800` | `text-text-warning-body` |

**Success** (`text/success/[variant]`):

| Path | Palette reference | Tailwind (product) |
|------|-------------------|-------------------|
| `text/success/heading` | `cream-100` | `text-text-success-heading` |
| `text/success/body` | `oxblood-ink-100` | `text-text-success-body` |

**CTA** (`text/cta/[variant]`):

| Path | Palette reference | Tailwind (product) |
|------|-------------------|-------------------|
| `text/cta/primary` | `cream-100` | `text-text-cta-primary` |
| `text/cta/secondary` | `charcoal-50` | `text-text-cta-secondary` |
| `text/cta/tertiary` | `charcoal-800` | `text-text-cta-tertiary` |

**Field** (`text/field/[variant]`):

| Path | Palette reference | Tailwind (product) |
|------|-------------------|-------------------|
| `text/field/default` | `charcoal-800` | `text-text-field-default` |
| `text/field/placeholder` | `charcoal-500` | `text-text-field-placeholder` |
| `text/field/disabled` | `charcoal-500` | `text-text-field-disabled` |

---

## Sizing

**Source:** `src/lib/sizing/scale.ts` → `SIZING_SCALE`, `REM_BASE_PX`, `SIZE_MIN_REM`, `SIZE_MAX_REM`, `SIZE_INCREMENT_REM`.

### Rules

- **Range:** `0.25rem`–`5rem` inclusive, step **`0.25rem`** only.
- **Formula:** `px = rem × 16`.
- Use arbitrary utilities with values from `SIZING_SCALE`, e.g. `p-[1rem]`, `gap-[0.75rem]`, `w-[2.5rem]`.
- Do **not** use Tailwind’s default spacing scale (`p-4`, `gap-6`, `m-8`, etc.).

```ts
import { SIZING_SCALE } from "@/lib/sizing/scale";
```

---

## Typography

**Source:** `src/lib/typography/scale.ts` → `DISPLAY_STYLES`, `HEADING_STYLES`, `BODY_STYLES`, `FONT_WEIGHTS`, `TYPOGRAPHY_FONT`.

### Styles (names and sizes — see file for exact `size` strings)

| Category | Styles |
|----------|--------|
| Display | Display 1 (`6rem`), Display 2 (`5rem`) |
| Headings | Heading 1, Heading 2, Heading 3, Heading 4 |
| Body | Big, Body Standard, Small |

Display sizes are larger than Heading 1 (`3rem`). **Display 2** matches the Learn screen headline in Components → navigation.

### Weights (only these)

| Label | Value | Class |
|-------|-------|--------|
| Regular | 400 | `font-normal` |
| Medium | 500 | `font-medium` |
| SemiBold | 600 | `font-semibold` |

### Usage

Read `size` from `DISPLAY_STYLES`, `HEADING_STYLES`, or `BODY_STYLES`; use `font-serif` + inline `fontSize` from the scale + weight class.

```tsx
// Display 2, SemiBold — size from DISPLAY_STYLES in scale.ts
<h1 className="font-serif text-[5rem] font-semibold leading-tight">...</h1>

// Heading 1, SemiBold — size from HEADING_STYLES in scale.ts
<h1 className="font-serif text-[3rem] font-semibold leading-tight">...</h1>

// Body Standard, Regular
<p className="font-serif text-[1rem] font-normal leading-normal">...</p>
```

```ts
import { DISPLAY_STYLES, HEADING_STYLES, BODY_STYLES, FONT_WEIGHTS } from "@/lib/typography/scale";
```

### Invalid

- `text-sm`, `text-base`, `text-xl`, `text-2xl`, etc.
- `font-bold` (700), `font-light` (300), or any weight ∉ {400, 500, 600}
- `font-sans` on product body/headings
- Any product font family other than EB Garamond — except `Logo`, which uses `ibmPlexMono.className` (IBM Plex Mono)

---

## Icons

**Package:** `@phosphor-icons/react` — the only icon library for this project.

**Sizes:** `src/lib/icons/scale.ts` → `ICON_SIZE_PX` (`sm` 16px, `md` 20px, `lg` 24px). Use these values for the `size` prop; do not invent arbitrary pixel sizes.

**Weight:** default **`regular`** (`ICON_WEIGHT_DEFAULT`). Use other weights (`bold`, `fill`, `duotone`, etc.) only when the design calls for it.

### Usage

```tsx
import { House, CaretRight } from "@phosphor-icons/react";
import { ICON_SIZE_PX, ICON_WEIGHT_DEFAULT } from "@/lib/icons/scale";

<House
  size={ICON_SIZE_PX.md}
  weight={ICON_WEIGHT_DEFAULT}
  className="text-text-default-body"
  aria-hidden
/>

// Interactive control — add an accessible name on the button/link, not only on the icon
<button type="button" aria-label="Open menu">
  <List size={ICON_SIZE_PX.md} weight={ICON_WEIGHT_DEFAULT} aria-hidden />
</button>
```

### Rules

- Import icons by name from `@phosphor-icons/react` — do not add Lucide, Heroicons, React Icons, inline SVG icon sets, or emoji as UI icons.
- Color icons with **semantic text tokens** (`text-text-*`) via `className`; do not use root palette classes.
- Decorative icons: `aria-hidden`. Meaningful standalone icons: parent must have `aria-label` or visible text.
- Prefer `weight="regular"` for product UI; `fill` / `bold` for emphasis only when specified.

### Invalid

- Other icon libraries or custom SVG icon components (except non-icon graphics outside the icon system).
- Hardcoded `size={18}` or other sizes not in `ICON_SIZE_PX` without updating the scale first.
- Root palette classes on icon color (e.g. `text-charcoal-800`).

---

## CSS theme (`src/app/globals.css`)

Registers Tailwind colors from token files.

| Token | Usage |
|-------|--------|
| `font-sans` | Geist — UI chrome |
| `font-mono` | Geist Mono |
| `font-serif` | EB Garamond — product type |
| `font-logo` | IBM Plex Mono — `Logo` only (`ibmPlexMono.className`; `font-logo` token is reference-only) |
| `{palette}-{shade}` | **Root only** — wired by semantic tokens; not for product UI |
| `background` / `foreground` | Legacy layout defaults; prefer semantic `surface-*` / `text-*` for product |
| **Semantic** (`surface-*`, `line-*`, `text-*`) | **Required** for all product color UI |
| `surface-page-default` | Page surface (`surface/page/default` → cream-100) |
| `surface-container-default` | Container default (`surface/container/default` → cream-100) |
| `surface-container-accent1` | Container accent 1 (`surface/container/accent1` → oxblood-ink-800) |
| `surface-container-accent2` | Container accent 2 (`surface/container/accent2` → charcoal-800) |
| `surface-container-disabled` | Container disabled (`surface/container/disabled` → charcoal-200) |
| `surface-container-warning` | Container warning (`surface/container/warning` → amber-50) |
| `surface-container-success` | Container success (`surface/container/success` → oxblood-ink-600) |
| `surface-cta-*` | CTA surfaces (`surface/cta/[variant]`) |
| `surface-field-enabled` | Field enabled (`surface/field/enabled` → cream-100) |
| `surface-field-disabled` | Field disabled (`surface/field/disabled` → charcoal-200) |
| `line-field-enabled` | Field line enabled (`line/field/enabled` → charcoal-600) |
| `line-field-disabled` | Field line disabled (`line/field/disabled` → charcoal-500) |
| `line-field-active` | Field line active (`line/field/active` → oxblood-ink-600) |
| `line-field-warning` | Field line warning (`line/field/warning` → amber-800) |
| `text-default-*` | Default text roles (`text/default/[variant]`) |
| `text-accent1-*` | Accent 1 text roles (`text/accent1/[variant]`) |
| `text-accent2-*` | Accent 2 text roles (`text/accent2/[variant]`) |
| `text-disabled-default` | Disabled text (`text/disabled/default` → charcoal-600) |
| `text-warning-*` | Warning text roles (`text/warning/[variant]`) |
| `text-success-*` | Success text roles (`text/success/[variant]`) |
| `text-cta-*` | CTA text roles (`text/cta/[variant]`) |
| `text-field-default` | Field text default (`text/field/default` → charcoal-800) |
| `text-field-placeholder` | Field placeholder (`text/field/placeholder` → charcoal-500) |
| `text-field-disabled` | Field text disabled (`text/field/disabled` → charcoal-500) |

---

## Components

### Design system documentation (not product UI)

| Component | Path | Purpose |
|-----------|------|---------|
| `DesignSystemTabs` | `src/components/design-system/design-system-tabs.tsx` | Top-level tabs: Color, Typography, Sizing, Tokens, Components |
| `ColorTab` | `src/components/design-system/color-tab.tsx` | Root palette viewer |
| `ColorPalette` | `src/components/design-system/color-palette.tsx` | Single-palette shade grid |
| `TypographyTab` | `src/components/design-system/typography-tab.tsx` | Type scale reference |
| `SizingTab` | `src/components/design-system/sizing-tab.tsx` | Spacing scale reference |
| `TokensTab` | `src/components/design-system/tokens-tab.tsx` | Semantic token browser (subtabs) |
| `TokensColorSubtab` | `src/components/design-system/tokens-color-subtab.tsx` | Surface, line, and text semantic tokens |
| `ComponentsTab` | `src/components/design-system/components-tab.tsx` | Product component previews (subtabs) |
| `NavigationSubtab` | `src/components/design-system/navigation-subtab.tsx` | Previews: Header, NavigationBar, Art1StackAnimation, Art2StackAnimation, phone frame |
| `CtaSubtab` | `src/components/design-system/cta-subtab.tsx` | Previews: primary, secondary, tertiary `CtaButton` |
| `FieldsSubtab` | `src/components/design-system/fields-subtab.tsx` | Field previews, ready-to-use fields, phone frame |
| `PhonePreviewFrame` | `src/components/design-system/phone-preview-frame.tsx` | 390×750px device frame; provides overlay portal root |

**ComponentsTab subtabs:** `navigation`, `cta`, `fields`.

### Product components

| Component | Path | Purpose |
|-----------|------|---------|
| `Header` | `src/components/header.tsx` | App header: brand center, streak count left, notifications and account right |
| `Logo` | `src/components/logo.tsx` | Centered brand mark: “STORIES ARE THE ANSWER” |
| `NavigationBar` | `src/components/navigation-bar.tsx` | Bottom nav: Home and Learn with selected-state styling |
| `NotificationsPanel` | `src/components/notifications-panel.tsx` | Slide-over notifications menu from header bell |
| `LearnStorySequence` | `src/components/learn-story-sequence.tsx` | Learn screen headline word reveal + art stack loop |
| `FieldsPreviewContent` | `src/components/fields-preview-content.tsx` | Fields phone preview: sign-in headline, username/password, login CTA |
| `PreviewContent` | `src/components/preview-content.tsx` | `/preview` phone content: logo, headline + art row, Start CTA |
| `Preview2Content` | `src/components/preview-2-content.tsx` | `/preview-2` phone content: centered NARRATIVECO mark |
| `PreviewArtComposition` | `src/components/preview-art-composition.tsx` | Preview art phases: live stack, `man2` → `man3` scale pop |
| `Art1StackAnimation` | `src/components/art1-stack-animation.tsx` | Layered art1 multiply-blend spring reveal |
| `Art2StackAnimation` | `src/components/art2-stack-animation.tsx` | Layered art2 multiply-blend spring reveal |
| `CtaButton` | `src/components/cta-button.tsx` | Primary, secondary, and tertiary call-to-action buttons |
| `TextField` | `src/components/text-field.tsx` | Text input with optional label and complementary text |
| `SearchField` | `src/components/search-field.tsx` | Search input with leading magnifying glass icon |
| `PasswordField` | `src/components/password-field.tsx` | Password input with visibility toggle (eye icon) |

### Supporting infrastructure

| Component | Path | Purpose |
|-----------|------|---------|
| `OverlayContainerContext` | `src/components/overlay-container-context.tsx` | Optional portal target for overlays inside `PhonePreviewFrame` |

---

### `Header`

- Height `3rem`; background `bg-surface-page-default`; horizontal padding `px-[1rem]`; bottom border `1px` `border-text-default-complementary`.
- **Center:** “Narrative” + “Co” — Body Big (`1.25rem`), `font-medium`, `font-serif`; “Narrative” `text-text-default-heading`, “Co” `text-text-default-accent`.
- **Left:** `Flame` icon (`ICON_SIZE_PX.sm`, `text-text-default-accent`) + count “7” — Body Standard (`1rem`), `font-medium`, `text-text-default-heading`, `gap-[0.25rem]`.
- **Right:** `Bell` (with `text-text-default-accent` notification dot, `0.5rem`) opens `NotificationsPanel`; `User` icon button (`aria-label` on buttons; icons `aria-hidden`); spacing `gap-[0.75rem]` between controls.

### `Logo`

- **Mark:** “STORIES ARE THE ANSWER” — default `1.125rem` (`LOGO_DEFAULT_SIZE` in `src/lib/typography/scale.ts`); optional prop `size` (`big` | `body` | `small`) from `BODY_STYLES`. **`ibmPlexMono.className`** from `next/font/google` (required for correct IBM Plex Mono — do not use `font-logo` alone). `font-medium`, `leading-tight`, `text-center`, `mt-[12px]`. “STORIES” `text-text-default-accent`; remainder `text-text-default-heading`.

### `NotificationsPanel`

- Opened from header bell; portaled to `document.body`, or to the phone preview frame when `Header` is inside `PhonePreviewFrame` (via `OverlayContainerContext`).
- **Backdrop:** fills portal target, `bg-text-default-heading/20`; click or `Escape` closes.
- **Panel:** full height, `w-[80%]`, slides in from the right (`framer-motion`, 300ms ease); `bg-surface-page-default`.
- **Header row:** “Notifications” — Heading 4 (`1.5rem`), `font-semibold`, `font-serif`, `text-text-default-heading`; close `X` icon — `text-text-default-complementary`, `ICON_SIZE_PX.md`.
- **List:** mock notification items; titles `text-text-default-heading`, body copy `text-text-default-body`; dividers `divide-text-default-complementary`.

### `NavigationBar`

- Height `3.5rem`; background `bg-surface-container-default`; top border `1px` `border-text-default-complementary`; two equal-width sections: **Home**, **Learn**.
- **Icons:** `House` (Home), `BookOpen` (Learn); `ICON_SIZE_PX.md`, `ICON_WEIGHT_DEFAULT`.
- **Default (unselected):** icon and label `text-text-default-heading`; Body Big (`1.25rem`), `font-medium`, `font-serif`; `gap-[0.25rem]` between icon and label.
- **Selected:** `bg-surface-container-success`; icon and label `text-text-success-heading`; `aria-current="page"` on the active control.

### `LearnStorySequence`

- Used in the phone preview between `Header` and `NavigationBar`.
- **Headline:** “Learn to Tell Your Story” — Display 2 (`5rem`), `font-semibold`, `font-serif`, `leading-tight`, inline word flow; “Your” / “Story” use `text-text-default-accent`; words appear in order (`320ms`/word, spring fade-in per word).
- **Pause:** `700ms` after headline completes before art starts.
- **Art:** `Art2StackAnimation` (`embedded`, `420px` wide, `128px` below content bottom, man entry `240px` via `entryOffsets`) anchored to the bottom (overlaps headline slightly).
- **Loop:** after art sequence completes, hold `2s`, then reset headline + art and repeat.

### `Art1StackAnimation`

- Layers `art1/man` → `bubble1` → `bubble2`; each layer uses `mix-blend-multiply` inside an `isolate` stack on `bg-surface-page-default` (animate `top` + `opacity` only — transforms break blend). Spring in from below (`man` `160px`, bubbles `96px`); stagger `0s` / `0.55s` / `1.1s`.
- **Props:** `displayWidthPx` (default `280`), `embedded` (no outer padding/bg), `static` (all layers at rest, no animation), `transparentStack` (no opaque stack plate — layers blend with page; use for decorative backgrounds), `entryOffsets` (per-layer entry `top` override), `onSequenceComplete` (fires after last layer; animated only).

### `Art2StackAnimation`

- Layers `art2/man` → `bubble1` → `bubble2`; each layer uses `mix-blend-multiply` inside an `isolate` stack on `bg-surface-page-default`. **Man:** spring in from below (`160px` default, overridable via `entryOffsets`) with `top` + `opacity`. **Bubbles:** pop in with `scale` (`0.88`→`1`) + `opacity` (no vertical slide); snappier bubble spring (stiffness `200`, damping `20`, mass `0.85`). Stagger `0s` / `0.38s` / `0.72s`.
- **Props:** `displayWidthPx` (default `280`), `embedded`, `static`, `transparentStack`, `entryOffsets` (man slide entry only), `springConfig` (man slide spring), `layerDelays` (per-layer stagger override), `onSequenceComplete`.

### `CtaButton`

- **Props:** `variant` (`primary` | `secondary` | `tertiary`), `children` (label), optional `className` (e.g. `w-full`).
- Height `3rem`; horizontal padding `px-[1rem]`; corner radius `0.5rem`.
- **Type:** Body Big (`1.25rem`), `font-semibold`, `font-serif`.
- **Primary:** `bg-surface-cta-primary`, `text-text-cta-primary`.
- **Secondary:** `bg-surface-cta-secondary`, `text-text-cta-secondary`.
- **Tertiary:** `bg-surface-cta-tertiary`, `text-text-cta-tertiary`.
- **Hover:** absolute `bg-text-default-heading/10` overlay on background only (charcoal-800 at 10%); text color unchanged.

### `TextField`

- **Props:** `label?`, `complementary?`, `trailing?` (slot beside input row), `leadingAdornment?`, `trailingAdornment?`, `error?`, plus standard `<input>` props except `className`.
- **Enabled input:** height `3rem`; horizontal padding `px-[1rem]`; corner radius `0.5rem`; `border-line-field-enabled`; `bg-surface-field-enabled`; Body Standard (`1rem`), `font-normal`, `font-serif`; value text `text-text-field-default`; placeholder `placeholder:text-text-field-placeholder`.
- **Active (focused):** border `border-line-field-active` (default state only).
- **Error:** filled value; border `border-line-field-warning`; `Warning` icon (`ICON_SIZE_PX.md`) inside input on the right (`right-[1rem]`, `text-line-field-warning`); input `pr-[2.5rem]`; `aria-invalid`.
- **Disabled:** `disabled` prop; same dimensions; `bg-surface-field-disabled`, `border-line-field-disabled`, value and placeholder `text-text-field-disabled`; not focusable; no error icon.
- **Label (optional):** Body Small (`0.75rem`), `font-normal`, `font-serif`, `text-text-field-default`; `0.25rem` below label / above input (`mb-[0.25rem]`).
- **Complementary (optional):** Body Small (`0.75rem`), `font-normal`, `font-serif`, `text-text-field-default`; `0.25rem` above complementary / below input (`mt-[0.25rem]`).
- **Preview toggles** (Fields subtab only): checkboxes above the preview container; show/hide label and complementary on all field examples; default both on.

### `SearchField`

- Wraps `TextField` with `type="search"`.
- **Leading icon:** `MagnifyingGlass` (`ICON_SIZE_PX.md`, `ICON_WEIGHT_DEFAULT`), `text-text-field-default`, `left-[1rem]`; input `pl-[2.5rem]`.
- Inherits enabled, active, disabled, and error styling from `TextField`.

### `PasswordField`

- Wraps `TextField`; toggles `type` between `password` and `text`.
- **Trailing control:** button with `Eye` / `EyeSlash` (`ICON_SIZE_PX.md`, `ICON_WEIGHT_DEFAULT`), `text-text-field-default`, `right-[1rem]`; input `pr-[2.5rem]`; `aria-label` on button.
- Inherits enabled, active, disabled, and error styling from `TextField`.

### `FieldsPreviewContent`

- Phone content for Components → fields preview; no `Header` or `NavigationBar` — centered `Logo` at top (`pt-[1rem]`), sign-in content (`mt-[calc(3rem+2.5rem)]` below logo).
- **Headline:** “Start Your Journey” — Display 2 (`5rem`), `font-semibold`, `font-serif`; “Start” `text-text-default-accent`, remainder `text-text-default-heading`.
- **Fields:** `TextField` (label “Username”) and `PasswordField` (label “Password”); no complementary text; full-width primary `CtaButton` (“Login”) and secondary `CtaButton` (“Signup”, `className="w-full"`) below.

### `PreviewContent`

- Phone content for `/preview`; no `Header` or `NavigationBar` — centered `Logo` at top (`pt-[1rem]`), headline + art + CTA block vertically centered in remaining space.
- **Headline row:** relative container — `Art2StackAnimation` (`embedded`, `240px` wide, multiply blend with stack plate, `z-0`, absolute top-right of headline block, `translate-x-[20px] -translate-y-[120px]`) behind headline; “Start” / “Your” / “Journey” (one word per line, left-aligned), Display 2 (`5rem`), `font-semibold`, `font-serif`, `leading-none`, `text-text-default-heading`, `z-10`.
- **Body copy:** below headline (`mt-[1rem]`, full width) — Body Big (`1.25rem`), `font-normal`, `font-serif`, `leading-normal`, `text-text-default-body`: “You are a couple of steps a way from getting better at telling stories. Let's start this journey together.”
- **CTA:** full-width primary `CtaButton` (“Start”), `mt-[1.25rem]` below body copy. Click slides headline, body, and CTA off-screen to the left (`x` `-105%`, `opacity` `0`, `0.55s`, `easeInOut`); logo stays. In parallel, art **animates from its resting top-right position** (`x` `20px`, `y` `-120px`, `scale` `1`) to center (`scale` `1.55` with subtle spring bounce: stiffness `110`, damping `15`; `x`/`y` use `0.55s` `easeInOut`), final position **40px above** measured vertical center. When focus motion completes, `PreviewArtComposition` switches from the full stack to `/art2/man2.jpg` with a scale pop (`0.88`→`1`, opacity `0`→`1`; spring stiffness `200`, damping `20`, mass `0.85`); when `man2` settles, it switches to `/art2/man3.jpg` with the same pop; when `man3` settles, it shifts **40px right** (`0.55s`, `easeInOut`). Then **pull transition** (`0.65s`, `easeInOut`): `man3` exits left off-frame while a full-bleed page (`bg-surface-container-accent1`) slides in from the right in the same motion (`man3` `z-30`, panel `z-10`); logo hidden during pull. On complete, content is the accent page only.
- **Entrance:** headline, body copy, and CTA fade in with subtle upward motion (`opacity` 0→1, `y` `6px`→0, slow spring: stiffness `62`, damping `26`, mass `1.85`); body delayed `0.32s`, CTA `0.6s`. Art uses slower preview spring (stiffness `70`, mass `1.7`) on man; bubble stagger `0s` / `0.55s` / `1.05s` with scale pop.

### `Preview2Content`

- Phone content for `/preview-2`; no `Header` or `NavigationBar` — full-bleed `bg-surface-page-default`, horizontal padding `px-[1rem]`, inside `PhonePreviewFrame`.
- **Brand mark:** “NARRATIVECO” centered at top (`pt-[1rem]`) — default logo size (`LOGO_DEFAULT_SIZE`, `1.125rem`); **`ibmPlexMono.className`**; `font-medium`, `leading-tight`, `text-center`. “NARRATIVE” `text-text-default-heading`; “CO” `text-text-default-accent`.
- **Headline** (`mt-[2rem]` below mark): “Every great storyteller needs a beginning” — Heading 1 (`3rem`), `font-semibold`, `font-serif`, `leading-tight`; body `text-text-default-heading`, word “beginning” `text-text-default-accent`.
- **Body** (`mt-[1rem]` below headline): “We just need the basic to start your story.” — Body Big (`1.25rem`), `font-normal`, `font-serif`, `leading-normal`, `text-text-default-body`.
- **Fields** (`mt-[1.25rem]`, `space-y-[1rem]`): `TextField` with label “Email” (`type="email"`); `TextField` with label “Phone” (`type="tel"`).
- **CTA** (pinned to bottom via `mt-auto`, `pb-[1.5rem]`, `pt-[1.25rem]`): full-width primary `CtaButton` (“Start”).
- **Entrance** (on mount): headline, body, and fields fade in with subtle right-to-left motion (`opacity` 0→1, `x` `14px`→0, `0.55s` ease; delays `0` / `0.14s` / `0.28s` / `0.38s` for headline, body, email, phone). CTA enters from below the frame (`y` `120px`→0, no opacity change; spring stiffness `320`, damping `30`, mass `0.85`, delay `0.48s` — subtle bounce).
- **Start interaction** (Interaction 1–style liquid transition): primary `CtaButton` click swaps to a `3rem` square blob at the CTA position (`bg-surface-cta-primary`, `0.5rem` radius) — **no** full-width bar phase. Then `3s` morph (`cubic-bezier(0.65, 0, 0.35, 1)`): keyframes `0%`/`25%` hold square at `bottom: 1.5rem` → `50%` rise to center (`bottom: 50%`, rotate `180deg`) → `70%` / `100%` organic expand. Liquid is `position: absolute` on the **full phone content root**. Label “Start” fades out on the blob (`text-text-cta-primary`, Body Big). Liquid remains on screen after animation completes; no overlay copy or reset control.

### `PreviewArtComposition`

- Preview-only art renderer for `/preview`. **Phases:** `live` (`Art2StackAnimation`), `man2` (swap sequence: `/art2/man2.jpg` scale pop → `/art2/man3.jpg` scale pop → `man3` shifts `40px` right with ease, multiply blend). Calls `onMan3ShiftComplete` after the right shift. Same stack plate dimensions as `Art2StackAnimation`.

### `OverlayContainerContext`

- React context holding an `HTMLElement | null` portal root.
- `PhonePreviewFrame` sets the ref; `NotificationsPanel` uses `useOverlayContainer()` to portal inside the frame when present.

When adding more: implement with **semantic** color tokens from `src/lib/tokens/*` (and sizing/typography scales from `src/lib/*`); register in the product components table and add a spec subsection below. Do not use root palette classes.

---

## File index

| Domain | Canonical values | Rules & usage |
|--------|------------------|---------------|
| Colors | `src/lib/colors/*.ts`, `globals.css` `@theme` | This doc § Colors |
| Semantic surface | `src/lib/tokens/surface.ts`, `globals.css` `@theme` | This doc § Colors → Semantic color tokens |
| Semantic line | `src/lib/tokens/line.ts`, `globals.css` `@theme` | This doc § Colors → Semantic color tokens |
| Semantic text | `src/lib/tokens/text.ts`, `globals.css` `@theme` | This doc § Colors → Semantic color tokens |
| Sizing | `src/lib/sizing/scale.ts` | This doc § Sizing |
| Typography | `src/lib/typography/scale.ts`, `layout.tsx` fonts | This doc § Typography |
| Icons | `src/lib/icons/scale.ts`, `@phosphor-icons/react` | This doc § Icons |
| Agent enforcement | — | `.cursor/rules/design-system.mdc` |

---

## Extending the system

1. Add or update exports in `src/lib/*` and `globals.css`.
2. Update the design system UI under `src/components/design-system/` if tokens are user-visible.
3. Update **this file** (quick reference, rules, components) — not a full hex dump.
4. Add a changelog entry below.

---

## Changelog

- **Hybrid doc model:** token values in code only; `design.md` holds rules, semantics, and pointers.
- Initial system: Oxblood Ink, Charcoal, Amber, Cream; sizing 0.25–5rem; EB Garamond typography; light mode only.
- Semantic surface: `surface/page/default`; `surface/container/*` variants (see `src/lib/tokens/surface.ts`).
- Semantic text: `text/default/*`, `text/accent1/*`, `text/accent2/*`, `text/disabled/default`, `text/warning/*`, `text/success/*`, `text/cta/*`, `text/field/*` (see `src/lib/tokens/text.ts`).
- Semantic surface CTA: `surface/cta/*` (see `src/lib/tokens/surface.ts`).
- Semantic surface field: `surface/field/*` (see `src/lib/tokens/surface.ts`).
- Semantic line field: `line/field/*` (see `src/lib/tokens/line.ts`).
- **Strict semantic-only color rule** for product UI: no root `{palette}-{shade}` classes; palette column in docs is reference-only.
- **Phosphor Icons** (`@phosphor-icons/react`); sizes in `src/lib/icons/scale.ts`.
- **Header**, **NavigationBar**, **NotificationsPanel**, **LearnStorySequence**, **Art1StackAnimation**, and **Art2StackAnimation** — documented in Components → navigation.
- **CtaButton** — documented in Components → cta.
- **TextField**, **SearchField**, **PasswordField** — documented in Components → fields.
- **OverlayContainerContext** — portal target for contained overlays in phone preview.
