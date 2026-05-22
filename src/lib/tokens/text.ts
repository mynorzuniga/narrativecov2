import { AMBER_COLOR, AMBER_SHADES } from "@/lib/colors/amber";
import { CHARCOAL_COLOR, CHARCOAL_SHADES } from "@/lib/colors/charcoal";
import { CREAM_BASE_SHADE, CREAM_COLOR } from "@/lib/colors/cream";
import {
  OXBLOOD_INK_COLOR,
  OXBLOOD_INK_BASE_SHADE,
  OXBLOOD_INK_SHADES,
} from "@/lib/colors/oxblood-ink";

type ShadeEntry = { shade: number; hex: string };

function shadeEntry(
  shades: readonly ShadeEntry[],
  shade: number,
): ShadeEntry {
  const entry = shades.find((s) => s.shade === shade);
  if (!entry) throw new Error(`Shade ${shade} not found`);
  return entry;
}

function textToken(
  group: string,
  variant: string,
  palette: string,
  shade: number,
  hex: string,
) {
  const paletteClass = `${palette}-${shade}`;
  return {
    path: `text/${group}/${variant}`,
    palette,
    shade,
    hex,
    paletteClass,
    tailwindClass: `text-${paletteClass}`,
    swatchClass: `bg-${paletteClass}`,
    themeColor: `text-${group}-${variant}`,
  } as const;
}

function textTokenFromShades(
  group: string,
  variant: string,
  palette: string,
  shade: number,
  shades: readonly ShadeEntry[],
) {
  const { hex } = shadeEntry(shades, shade);
  return textToken(group, variant, palette, shade, hex);
}

/** `text/default/[variant]` */
export const TEXT_DEFAULT_TOKENS = [
  textTokenFromShades("default", "heading", "charcoal", 800, CHARCOAL_SHADES),
  textTokenFromShades("default", "subheading", "charcoal", 700, CHARCOAL_SHADES),
  textTokenFromShades("default", "body", "charcoal", 600, CHARCOAL_SHADES),
  textTokenFromShades("default", "complementary", "charcoal", 400, CHARCOAL_SHADES),
  textToken(
    "default",
    "accent",
    "oxblood-ink",
    OXBLOOD_INK_BASE_SHADE,
    OXBLOOD_INK_COLOR,
  ),
] as const;

/** `text/accent1/[variant]` */
export const TEXT_ACCENT1_TOKENS = [
  textToken("accent1", "heading", "cream", CREAM_BASE_SHADE, CREAM_COLOR),
  textTokenFromShades("accent1", "subheading", "charcoal", 50, CHARCOAL_SHADES),
  textTokenFromShades("accent1", "body", "charcoal", 100, CHARCOAL_SHADES),
  textTokenFromShades("accent1", "complementary", "charcoal", 300, CHARCOAL_SHADES),
  textTokenFromShades("accent1", "accent", "oxblood-ink", 200, OXBLOOD_INK_SHADES),
] as const;

/** `text/accent2/[variant]` */
export const TEXT_ACCENT2_TOKENS = [
  textToken("accent2", "heading", "cream", CREAM_BASE_SHADE, CREAM_COLOR),
  textTokenFromShades("accent2", "subheading", "oxblood-ink", 50, OXBLOOD_INK_SHADES),
  textTokenFromShades("accent2", "body", "oxblood-ink", 100, OXBLOOD_INK_SHADES),
  textTokenFromShades("accent2", "complementary", "oxblood-ink", 300, OXBLOOD_INK_SHADES),
  textToken("accent2", "accent", "cream", CREAM_BASE_SHADE, CREAM_COLOR),
] as const;

/** `text/disabled/[variant]` */
export const TEXT_DISABLED_TOKENS = [
  textTokenFromShades("disabled", "default", "charcoal", 600, CHARCOAL_SHADES),
] as const;

/** `text/warning/[variant]` */
export const TEXT_WARNING_TOKENS = [
  textTokenFromShades("warning", "heading", "amber", 900, AMBER_SHADES),
  textToken("warning", "body", "amber", 800, AMBER_COLOR),
] as const;

/** `text/success/[variant]` */
export const TEXT_SUCCESS_TOKENS = [
  textToken("success", "heading", "cream", CREAM_BASE_SHADE, CREAM_COLOR),
  textTokenFromShades("success", "body", "oxblood-ink", 100, OXBLOOD_INK_SHADES),
] as const;

/** `text/cta/[variant]` */
export const TEXT_CTA_TOKENS = [
  textToken("cta", "primary", "cream", CREAM_BASE_SHADE, CREAM_COLOR),
  textTokenFromShades("cta", "secondary", "charcoal", 50, CHARCOAL_SHADES),
  textToken("cta", "tertiary", "charcoal", 800, CHARCOAL_COLOR),
] as const;

/** `text/field/[variant]` */
export const TEXT_FIELD_TOKENS = [
  textTokenFromShades("field", "default", "charcoal", 800, CHARCOAL_SHADES),
  textTokenFromShades("field", "placeholder", "charcoal", 500, CHARCOAL_SHADES),
  textTokenFromShades("field", "disabled", "charcoal", 500, CHARCOAL_SHADES),
] as const;

export const TEXT_TOKENS = [
  ...TEXT_DEFAULT_TOKENS,
  ...TEXT_ACCENT1_TOKENS,
  ...TEXT_ACCENT2_TOKENS,
  ...TEXT_DISABLED_TOKENS,
  ...TEXT_WARNING_TOKENS,
  ...TEXT_SUCCESS_TOKENS,
  ...TEXT_CTA_TOKENS,
  ...TEXT_FIELD_TOKENS,
] as const;
