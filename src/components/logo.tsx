import { BODY_STYLES } from "@/lib/typography/scale";

const bodyBig = BODY_STYLES.find((s) => s.id === "big")!;

export function Logo() {
  return (
    <span
      className="font-serif font-medium leading-none text-text-default-heading"
      style={{ fontSize: bodyBig.size }}
    >
      Narrative
      <span className="text-text-default-accent">Co</span>
    </span>
  );
}
