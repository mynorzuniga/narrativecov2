export const TYPOGRAPHY_FONT = "EB Garamond";

export const FONT_WEIGHTS = [
  { id: "regular", label: "Regular", weight: 400 },
  { id: "medium", label: "Medium", weight: 500 },
  { id: "semibold", label: "SemiBold", weight: 600 },
] as const;

export const DISPLAY_STYLES = [
  { id: "display1", label: "Display 1", size: "6rem" },
  { id: "display2", label: "Display 2", size: "5rem" },
] as const;

export const HEADING_STYLES = [
  { id: "h1", label: "Heading 1", size: "3rem" },
  { id: "h2", label: "Heading 2", size: "2.5rem" },
  { id: "h3", label: "Heading 3", size: "2rem" },
  { id: "h4", label: "Heading 4", size: "1.5rem" },
] as const;

export const BODY_STYLES = [
  { id: "big", label: "Big", size: "1.25rem" },
  { id: "body", label: "Body Standard", size: "1rem" },
  { id: "small", label: "Small", size: "0.75rem" },
] as const;

export type FontWeight = (typeof FONT_WEIGHTS)[number];
export type DisplayStyle = (typeof DISPLAY_STYLES)[number];
export type HeadingStyle = (typeof HEADING_STYLES)[number];
export type BodyStyle = (typeof BODY_STYLES)[number];
