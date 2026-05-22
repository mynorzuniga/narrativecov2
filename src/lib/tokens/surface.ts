import { AMBER_SHADES } from "@/lib/colors/amber";
import { CHARCOAL_COLOR, CHARCOAL_SHADES } from "@/lib/colors/charcoal";
import { CREAM_BASE_SHADE, CREAM_COLOR, CREAM_SHADES } from "@/lib/colors/cream";
import {
  OXBLOOD_INK_COLOR,
  OXBLOOD_INK_BASE_SHADE,
  OXBLOOD_INK_SHADES,
} from "@/lib/colors/oxblood-ink";

const charcoal200 = CHARCOAL_SHADES.find((s) => s.shade === 200)!;
const cream200 = CREAM_SHADES.find((s) => s.shade === 200)!;
const oxbloodInk600 = OXBLOOD_INK_SHADES.find((s) => s.shade === 600)!;
const amber50 = AMBER_SHADES.find((s) => s.shade === 50)!;

export const SURFACE_PAGE_DEFAULT = {
  path: "surface/page/default",
  palette: "cream",
  shade: CREAM_BASE_SHADE,
  hex: CREAM_COLOR,
  paletteClass: "cream-100",
  tailwindClass: "bg-cream-100",
  swatchClass: "bg-cream-100",
  themeColor: "surface-page-default",
} as const;

export const SURFACE_CONTAINER_DEFAULT = {
  path: "surface/container/default",
  palette: "cream",
  shade: CREAM_BASE_SHADE,
  hex: CREAM_COLOR,
  paletteClass: "cream-100",
  tailwindClass: "bg-cream-100",
  swatchClass: "bg-cream-100",
  themeColor: "surface-container-default",
} as const;

export const SURFACE_CONTAINER_ACCENT1 = {
  path: "surface/container/accent1",
  palette: "oxblood-ink",
  shade: OXBLOOD_INK_BASE_SHADE,
  hex: OXBLOOD_INK_COLOR,
  paletteClass: "oxblood-ink-800",
  tailwindClass: "bg-oxblood-ink-800",
  swatchClass: "bg-oxblood-ink-800",
  themeColor: "surface-container-accent1",
} as const;

export const SURFACE_CONTAINER_ACCENT2 = {
  path: "surface/container/accent2",
  palette: "charcoal",
  shade: 800,
  hex: CHARCOAL_COLOR,
  paletteClass: "charcoal-800",
  tailwindClass: "bg-charcoal-800",
  swatchClass: "bg-charcoal-800",
  themeColor: "surface-container-accent2",
} as const;

export const SURFACE_CONTAINER_DISABLED = {
  path: "surface/container/disabled",
  palette: "charcoal",
  shade: 200,
  hex: charcoal200.hex,
  paletteClass: "charcoal-200",
  tailwindClass: "bg-charcoal-200",
  swatchClass: "bg-charcoal-200",
  themeColor: "surface-container-disabled",
} as const;

export const SURFACE_CONTAINER_WARNING = {
  path: "surface/container/warning",
  palette: "amber",
  shade: 50,
  hex: amber50.hex,
  paletteClass: "amber-50",
  tailwindClass: "bg-amber-50",
  swatchClass: "bg-amber-50",
  themeColor: "surface-container-warning",
} as const;

export const SURFACE_CONTAINER_SUCCESS = {
  path: "surface/container/success",
  palette: "oxblood-ink",
  shade: 600,
  hex: oxbloodInk600.hex,
  paletteClass: "oxblood-ink-600",
  tailwindClass: "bg-oxblood-ink-600",
  swatchClass: "bg-oxblood-ink-600",
  themeColor: "surface-container-success",
} as const;

export const SURFACE_CTA_PRIMARY = {
  path: "surface/cta/primary",
  palette: "oxblood-ink",
  shade: OXBLOOD_INK_BASE_SHADE,
  hex: OXBLOOD_INK_COLOR,
  paletteClass: "oxblood-ink-800",
  tailwindClass: "bg-oxblood-ink-800",
  swatchClass: "bg-oxblood-ink-800",
  themeColor: "surface-cta-primary",
} as const;

export const SURFACE_CTA_SECONDARY = {
  path: "surface/cta/secondary",
  palette: "charcoal",
  shade: 800,
  hex: CHARCOAL_COLOR,
  paletteClass: "charcoal-800",
  tailwindClass: "bg-charcoal-800",
  swatchClass: "bg-charcoal-800",
  themeColor: "surface-cta-secondary",
} as const;

export const SURFACE_CTA_TERTIARY = {
  path: "surface/cta/tertiary",
  palette: "cream",
  shade: 200,
  hex: cream200.hex,
  paletteClass: "cream-200",
  tailwindClass: "bg-cream-200",
  swatchClass: "bg-cream-200",
  themeColor: "surface-cta-tertiary",
} as const;

export const SURFACE_FIELD_ENABLED = {
  path: "surface/field/enabled",
  palette: "cream",
  shade: CREAM_BASE_SHADE,
  hex: CREAM_COLOR,
  paletteClass: "cream-100",
  tailwindClass: "bg-surface-field-enabled",
  swatchClass: "bg-cream-100",
  themeColor: "surface-field-enabled",
} as const;

export const SURFACE_FIELD_DISABLED = {
  path: "surface/field/disabled",
  palette: "charcoal",
  shade: 200,
  hex: charcoal200.hex,
  paletteClass: "charcoal-200",
  tailwindClass: "bg-surface-field-disabled",
  swatchClass: "bg-charcoal-200",
  themeColor: "surface-field-disabled",
} as const;

export const SURFACE_PAGE_TOKENS = [SURFACE_PAGE_DEFAULT] as const;

/** Semantic surface container tokens under `surface/container/[variant]`. */
export const SURFACE_CONTAINER_TOKENS = [
  SURFACE_CONTAINER_DEFAULT,
  SURFACE_CONTAINER_ACCENT1,
  SURFACE_CONTAINER_ACCENT2,
  SURFACE_CONTAINER_DISABLED,
  SURFACE_CONTAINER_WARNING,
  SURFACE_CONTAINER_SUCCESS,
] as const;

/** Semantic surface CTA tokens under `surface/cta/[variant]`. */
export const SURFACE_CTA_TOKENS = [
  SURFACE_CTA_PRIMARY,
  SURFACE_CTA_SECONDARY,
  SURFACE_CTA_TERTIARY,
] as const;

/** Semantic surface field tokens under `surface/field/[variant]`. */
export const SURFACE_FIELD_TOKENS = [
  SURFACE_FIELD_ENABLED,
  SURFACE_FIELD_DISABLED,
] as const;

/** All semantic surface color tokens. */
export const SURFACE_TOKENS = [
  ...SURFACE_PAGE_TOKENS,
  ...SURFACE_CONTAINER_TOKENS,
  ...SURFACE_CTA_TOKENS,
  ...SURFACE_FIELD_TOKENS,
] as const;
