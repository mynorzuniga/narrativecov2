"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import {
  Art2StackAnimation,
  art2DisplayHeight,
} from "@/components/art2-stack-animation";

const ART2_IMAGE_WIDTH = 1792;
const ART2_IMAGE_HEIGHT = 2400;

const artPopSpring = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
  mass: 0.85,
};

const man3ShiftEase = {
  duration: 0.55,
  ease: "easeInOut" as const,
};

const MAN3_SHIFT_X_PX = 40;

type SwapImage = "man2" | "man3";

const SWAP_IMAGE_SRC: Record<SwapImage, string> = {
  man2: "/art2/man2.jpg",
  man3: "/art2/man3.jpg",
};

type PreviewArtCompositionProps = {
  displayWidthPx: number;
  phase: "live" | "man2";
  springConfig?: ComponentProps<typeof Art2StackAnimation>["springConfig"];
  layerDelays?: ComponentProps<typeof Art2StackAnimation>["layerDelays"];
  /** During pull transition — disable multiply so blend target stays stable. */
  isPulling?: boolean;
  onMan3ShiftComplete?: () => void;
};

function ArtImagePop({
  src,
  onPopComplete,
}: {
  src: string;
  onPopComplete?: () => void;
}) {
  return (
    <motion.div
      className="absolute inset-0 mix-blend-multiply"
      style={{ transformOrigin: "center center" }}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={artPopSpring}
      onAnimationComplete={onPopComplete}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        width={ART2_IMAGE_WIDTH}
        height={ART2_IMAGE_HEIGHT}
        className="pointer-events-none h-full w-full object-fill"
        draggable={false}
      />
    </motion.div>
  );
}

function Man3Sequence({
  src,
  isPulling = false,
  onShiftComplete,
}: {
  src: string;
  isPulling?: boolean;
  onShiftComplete?: () => void;
}) {
  const [step, setStep] = useState<"pop" | "shift">("pop");

  return (
    <motion.div
      className={`absolute inset-0 ${isPulling ? "" : "mix-blend-multiply"}`}
      style={{ transformOrigin: "center center" }}
      initial={{ opacity: 0, scale: 0.88, x: 0 }}
      animate={
        step === "pop"
          ? { opacity: 1, scale: 1, x: 0 }
          : { opacity: 1, scale: 1, x: MAN3_SHIFT_X_PX }
      }
      transition={step === "pop" ? artPopSpring : man3ShiftEase}
      onAnimationComplete={() => {
        if (step === "pop") {
          setStep("shift");
        } else {
          onShiftComplete?.();
        }
      }}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        width={ART2_IMAGE_WIDTH}
        height={ART2_IMAGE_HEIGHT}
        className="pointer-events-none h-full w-full object-fill"
        draggable={false}
      />
    </motion.div>
  );
}

export function PreviewArtComposition({
  displayWidthPx,
  phase,
  springConfig,
  layerDelays,
  isPulling = false,
  onMan3ShiftComplete,
}: PreviewArtCompositionProps) {
  const displayHeightPx = art2DisplayHeight(displayWidthPx);
  const [swapImage, setSwapImage] = useState<SwapImage>("man2");

  useEffect(() => {
    if (phase === "man2") {
      setSwapImage("man2");
    }
  }, [phase]);

  if (phase === "live") {
    return (
      <Art2StackAnimation
        embedded
        displayWidthPx={displayWidthPx}
        springConfig={springConfig}
        layerDelays={layerDelays}
      />
    );
  }

  return (
    <div className="flex justify-center">
      <div
        className={`relative isolate overflow-visible ${isPulling ? "bg-transparent" : "bg-surface-page-default"}`}
        style={{ width: displayWidthPx, height: displayHeightPx }}
      >
        {swapImage === "man2" ? (
          <ArtImagePop
            key="man2"
            src={SWAP_IMAGE_SRC.man2}
            onPopComplete={() => setSwapImage("man3")}
          />
        ) : (
          <Man3Sequence
            key="man3"
            src={SWAP_IMAGE_SRC.man3}
            isPulling={isPulling}
            onShiftComplete={onMan3ShiftComplete}
          />
        )}
      </div>
    </div>
  );
}
