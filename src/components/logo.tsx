import { ibmPlexMono } from "@/lib/typography/fonts";
import {
  BODY_STYLES,
  LOGO_DEFAULT_SIZE,
  type BodyStyle,
} from "@/lib/typography/scale";

const bodyBig = BODY_STYLES.find((s) => s.id === "big")!;
const bodyStandard = BODY_STYLES.find((s) => s.id === "body")!;
const bodySmall = BODY_STYLES.find((s) => s.id === "small")!;

const LOGO_FONT_SIZE: Record<BodyStyle["id"], string> = {
  big: bodyBig.size,
  body: bodyStandard.size,
  small: bodySmall.size,
};

type LogoProps = {
  size?: BodyStyle["id"];
};

export function Logo({ size }: LogoProps) {
  const fontSize = size !== undefined ? LOGO_FONT_SIZE[size] : LOGO_DEFAULT_SIZE;

  return (
    <span
      className={`${ibmPlexMono.className} mt-[12px] text-center font-medium leading-tight text-text-default-heading`}
      style={{ fontSize }}
    >
      <span className="text-text-default-accent">STORIES</span> ARE THE ANSWER
    </span>
  );
}
