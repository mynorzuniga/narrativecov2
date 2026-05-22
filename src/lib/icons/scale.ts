/** Icon sizes in px — aligned to sizing scale (`1rem` = 16px). */
export const ICON_SIZE_PX = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

/** Default Phosphor weight for product UI. */
export const ICON_WEIGHT_DEFAULT = "regular" as const;

export type IconSize = keyof typeof ICON_SIZE_PX;
export type IconWeight =
  | "thin"
  | "light"
  | "regular"
  | "bold"
  | "fill"
  | "duotone";
