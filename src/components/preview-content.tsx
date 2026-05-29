"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { PreviewArtComposition } from "@/components/preview-art-composition";
import { CtaButton } from "@/components/cta-button";
import { Logo } from "@/components/logo";
import { BODY_STYLES, DISPLAY_STYLES } from "@/lib/typography/scale";

const display2 = DISPLAY_STYLES.find((s) => s.id === "display2")!;
const bodyBig = BODY_STYLES.find((s) => s.id === "big")!;
const PREVIEW_ART_DISPLAY_WIDTH_PX = 240;
const PREVIEW_ART_FOCUS_SCALE = 1.55;

const HEADLINE_WORDS = ["Start", "Your", "Journey"] as const;

const ART_REST = { x: 20, y: -120, scale: 1 } as const;

const revealSpring = {
  type: "spring" as const,
  stiffness: 62,
  damping: 26,
  mass: 1.85,
};

const revealDelays = {
  headline: 0,
  body: 0.32,
  cta: 0.6,
} as const;

const previewArtSpring = {
  type: "spring" as const,
  stiffness: 70,
  damping: 22,
  mass: 1.7,
};

const previewArtLayerDelays = {
  man: 0,
  bubble1: 0.55,
  bubble2: 1.05,
} as const;

const exitEase = {
  duration: 0.55,
  ease: "easeInOut" as const,
};

/** Final focus sits 40px above measured vertical center. */
const PREVIEW_ART_FOCUS_Y_OFFSET_PX = -40;

const artFocusScaleSpring = {
  type: "spring" as const,
  stiffness: 110,
  damping: 15,
  mass: 1,
};

const artFocusTransition = {
  x: exitEase,
  y: exitEase,
  scale: artFocusScaleSpring,
};

const MAN3_SHIFT_X_PX = 40;

const pullEase = {
  duration: 0.65,
  ease: "easeInOut" as const,
};

const pullArtTransition = {
  x: pullEase,
  y: { duration: 0 },
  scale: { duration: 0 },
};

type ArtTransform = { x: number; y: number; scale: number };
type ArtSwapPhase = "live" | "man2";

function computeArtFocusTransform(
  container: DOMRect,
  art: DOMRect,
  rest: ArtTransform,
  targetScale: number,
): ArtTransform {
  const containerCenterX = container.left + container.width / 2;
  const containerCenterY = container.top + container.height / 2;
  const artCenterX = art.left + art.width / 2;
  const artCenterY = art.top + art.height / 2;

  return {
    x: rest.x + (containerCenterX - artCenterX),
    y: rest.y + (containerCenterY - artCenterY) + PREVIEW_ART_FOCUS_Y_OFFSET_PX,
    scale: targetScale,
  };
}

export function PreviewContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [artFocusTransform, setArtFocusTransform] = useState<ArtTransform | null>(
    null,
  );
  const [artSwapPhase, setArtSwapPhase] = useState<ArtSwapPhase>("live");
  const [pullActive, setPullActive] = useState(false);
  const [pullArtTarget, setPullArtTarget] = useState<ArtTransform | null>(null);
  const [accentPageVisible, setAccentPageVisible] = useState(false);

  const handleStartClick = () => {
    if (containerRef.current && artRef.current) {
      setArtFocusTransform(
        computeArtFocusTransform(
          containerRef.current.getBoundingClientRect(),
          artRef.current.getBoundingClientRect(),
          ART_REST,
          PREVIEW_ART_FOCUS_SCALE,
        ),
      );
    }
    setIsExiting(true);
  };

  const handleMan3ShiftComplete = () => {
    if (!containerRef.current || !artFocusTransform) {
      setPullActive(true);
      return;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const scaledArtWidth =
      PREVIEW_ART_DISPLAY_WIDTH_PX * PREVIEW_ART_FOCUS_SCALE;

    setPullArtTarget({
      x:
        artFocusTransform.x -
        containerWidth -
        scaledArtWidth -
        MAN3_SHIFT_X_PX,
      y: artFocusTransform.y,
      scale: artFocusTransform.scale,
    });
    setPullActive(true);
  };

  const handlePullComplete = () => {
    setAccentPageVisible(true);
  };

  if (accentPageVisible) {
    return (
      <div className="flex min-h-0 flex-1 flex-col bg-surface-container-accent1" />
    );
  }

  return (
    <div
      className={`relative flex min-h-0 flex-1 flex-col bg-surface-page-default px-[1rem] ${pullActive || !isExiting ? "overflow-hidden" : "overflow-visible"}`}
    >
      {pullActive && (
        <motion.div
          className="absolute inset-0 z-10 bg-surface-container-accent1"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={pullEase}
          onAnimationComplete={handlePullComplete}
        />
      )}

      {!pullActive && (
        <div className="flex shrink-0 justify-center pt-[1rem]">
          <Logo />
        </div>
      )}
      {pullActive && (
        <div aria-hidden className="invisible flex shrink-0 justify-center pt-[1rem]">
          <Logo />
        </div>
      )}

      <div
        ref={containerRef}
        className={`flex min-h-0 flex-1 flex-col justify-center ${pullActive ? "overflow-hidden" : isExiting ? "overflow-visible" : "overflow-hidden"}`}
      >
        <div className="relative w-full">
          <motion.div
            ref={artRef}
            aria-hidden
            className={`pointer-events-none absolute right-0 top-0 ${isExiting ? "z-30" : "z-0"}`}
            initial={ART_REST}
            animate={
              pullActive && pullArtTarget
                ? pullArtTarget
                : isExiting && artFocusTransform
                  ? artFocusTransform
                  : ART_REST
            }
            transition={
              pullActive
                ? pullArtTransition
                : isExiting
                  ? artFocusTransition
                  : { duration: 0 }
            }
            style={{ transformOrigin: "center center" }}
            onAnimationComplete={() => {
              if (isExiting && artFocusTransform && artSwapPhase === "live") {
                setArtSwapPhase("man2");
              }
            }}
          >
            <PreviewArtComposition
              displayWidthPx={PREVIEW_ART_DISPLAY_WIDTH_PX}
              phase={artSwapPhase}
              springConfig={previewArtSpring}
              layerDelays={previewArtLayerDelays}
              isPulling={pullActive}
              onMan3ShiftComplete={handleMan3ShiftComplete}
            />
          </motion.div>

          {!pullActive && (
            <motion.div
              className="relative z-10 flex flex-col"
              animate={
                isExiting ? { x: "-105%", opacity: 0 } : { x: 0, opacity: 1 }
              }
              transition={isExiting ? exitEase : { duration: 0 }}
            >
              <motion.h1
                className="min-w-0 font-heading font-semibold leading-none text-text-default-heading"
                style={{ fontSize: display2.size }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealSpring, delay: revealDelays.headline }}
              >
                {HEADLINE_WORDS.map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                className="mt-[1rem] w-full font-serif font-normal leading-normal text-text-default-body"
                style={{ fontSize: bodyBig.size }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealSpring, delay: revealDelays.body }}
              >
                You are a couple of steps a way from getting better at telling
                stories. Let&apos;s start this journey together.
              </motion.p>

              <motion.div
                className="mt-[1.25rem] shrink-0"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealSpring, delay: revealDelays.cta }}
              >
                <CtaButton
                  variant="primary"
                  className="w-full"
                  onClick={handleStartClick}
                  disabled={isExiting}
                >
                  Start
                </CtaButton>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
