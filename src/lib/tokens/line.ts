import { AMBER_SHADES } from "@/lib/colors/amber";
import { CHARCOAL_SHADES } from "@/lib/colors/charcoal";
import { OXBLOOD_INK_SHADES } from "@/lib/colors/oxblood-ink";

const charcoal500 = CHARCOAL_SHADES.find((s) => s.shade === 500)!;
const charcoal600 = CHARCOAL_SHADES.find((s) => s.shade === 600)!;
const oxbloodInk600 = OXBLOOD_INK_SHADES.find((s) => s.shade === 600)!;
const amber800 = AMBER_SHADES.find((s) => s.shade === 800)!;

export const LINE_FIELD_ENABLED = {
  path: "line/field/enabled",
  palette: "charcoal",
  shade: 600,
  hex: charcoal600.hex,
  paletteClass: "charcoal-600",
  tailwindClass: "border-line-field-enabled",
  swatchClass: "bg-charcoal-600",
  themeColor: "line-field-enabled",
} as const;

export const LINE_FIELD_DISABLED = {
  path: "line/field/disabled",
  palette: "charcoal",
  shade: 500,
  hex: charcoal500.hex,
  paletteClass: "charcoal-500",
  tailwindClass: "border-line-field-disabled",
  swatchClass: "bg-charcoal-500",
  themeColor: "line-field-disabled",
} as const;

export const LINE_FIELD_ACTIVE = {
  path: "line/field/active",
  palette: "oxblood-ink",
  shade: 600,
  hex: oxbloodInk600.hex,
  paletteClass: "oxblood-ink-600",
  tailwindClass: "border-line-field-active",
  swatchClass: "bg-oxblood-ink-600",
  themeColor: "line-field-active",
} as const;

export const LINE_FIELD_WARNING = {
  path: "line/field/warning",
  palette: "amber",
  shade: 800,
  hex: amber800.hex,
  paletteClass: "amber-800",
  tailwindClass: "border-line-field-warning",
  swatchClass: "bg-amber-800",
  themeColor: "line-field-warning",
} as const;

/** Semantic line field tokens under `line/field/[variant]`. */
export const LINE_FIELD_TOKENS = [
  LINE_FIELD_ENABLED,
  LINE_FIELD_DISABLED,
  LINE_FIELD_ACTIVE,
  LINE_FIELD_WARNING,
] as const;

/** All semantic line color tokens. */
export const LINE_TOKENS = [...LINE_FIELD_TOKENS] as const;
