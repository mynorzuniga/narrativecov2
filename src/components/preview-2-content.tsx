"use client";

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CtaButton } from "@/components/cta-button";
import { TextField } from "@/components/text-field";
import { ibmPlexMono } from "@/lib/typography/fonts";
import {
  BODY_STYLES,
  HEADING_STYLES,
  LOGO_DEFAULT_SIZE,
} from "@/lib/typography/scale";

const heading1 = HEADING_STYLES.find((s) => s.id === "h1")!;
const heading4 = HEADING_STYLES.find((s) => s.id === "h4")!;
const bodyBig = BODY_STYLES.find((s) => s.id === "big")!;

const fadeFromRightEase = [0.25, 0.1, 0.25, 1] as const;

const fadeFromRight = {
  hidden: { opacity: 0, x: 14 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: fadeFromRightEase, delay },
  }),
};

// Slower, more eased rise from below
const riseFromBelow = {
  hidden: { y: 120 },
  visible: {
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 22,
      mass: 1.2,
      delay: 0.48,
    },
  },
};

const entranceDelays = {
  headline: 0,
  body: 0.14,
  email: 0.28,
  phone: 0.38,
} as const;

// Liquid morph lasts 3s, then we fade back to page bg over 1.8s
const LIQUID_DURATION_MS = 3000;
const FADE_DELAY_MS = LIQUID_DURATION_MS; // start fade right as liquid fills

type AnimationState = "idle" | "animating" | "fading" | "done";

// Row height and gap for the 3 containers
const ROW_H = "3.5rem";
const ROW_GAP = "1rem";
// 3.5rem + 1rem at 16px/rem
const ROW_STEP_PX = 72;

function RowText({ n, label, enterDelay, fadeOut }: {
  n: string;
  label: string;
  enterDelay: number;
  fadeOut: boolean;
}) {
  return (
    <motion.div
      className="flex items-center gap-[0.625rem] px-[1rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={
        fadeOut
          ? { duration: 1.2, ease: [0.4, 0, 0.2, 1] as const }
          : { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const, delay: enterDelay }
      }
    >
      <span
        className="flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-full border font-serif font-medium text-text-accent1-heading"
        style={{
          fontSize: heading4.size,
          borderColor: "var(--color-text-accent1-complementary)",
          lineHeight: 1,
        }}
      >
        {n}
      </span>
      <span className="font-serif font-medium text-text-accent1-heading" style={{ fontSize: heading4.size }}>
        {label}
      </span>
    </motion.div>
  );
}

function Screen2({ done, onNext, onFusingComplete }: {
  done: boolean;
  onNext: () => void;
  onFusingComplete: (el: HTMLElement) => void;
}) {
  const [reversing, setReversing] = useState(false);
  const [fusingDone, setFusingDone] = useState(false);
  const [containerReady, setContainerReady] = useState(false);
  const row1Ref = useRef<HTMLDivElement>(null);

  // Start containers while heading/body are still fading in
  useEffect(() => {
    const t = setTimeout(() => setContainerReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleNext = () => {
    setReversing(true);
    onNext();
  };

  // After fusing animation finishes (~1s), fire the line-transition and remove rows 2 & 3
  useEffect(() => {
    if (!reversing) return;
    const t = setTimeout(() => {
      if (row1Ref.current) onFusingComplete(row1Ref.current);
      setFusingDone(true);
    }, 1050);
    return () => clearTimeout(t);
  }, [reversing, onFusingComplete]);

  // Entrance — exactly matches the original CSS cubic-bezier(0.34, 1.56, 0.64, 1)
  const enterSpring = (delay: number) => ({
    y: { duration: 1.1, ease: [0.34, 1.56, 0.64, 1] as const, delay },
    opacity: { duration: 0.05, delay },
  });

  // Exit — smooth ease, no elastic overshoot
  const exitEase = (delay: number) => ({
    y: { duration: 0.9, ease: [0.4, 0, 0.2, 1] as const, delay },
    opacity: { duration: 0.15, delay: delay + 0.75 },
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col px-0 pt-[2rem]">
      <motion.h1
        className="shrink-0 font-serif font-semibold leading-tight text-text-default-heading"
        style={{ fontSize: heading1.size }}
        variants={fadeFromRight}
        initial="hidden"
        animate={reversing ? { opacity: 0 } : "visible"}
        custom={entranceDelays.headline}
        transition={reversing ? { duration: 1.8, ease: [0.4, 0, 0.2, 1] as const } : {}}
      >
        <span className="text-text-default-accent">How your day</span> will look like
      </motion.h1>
      <motion.p
        className="mt-[1rem] shrink-0 font-serif font-normal leading-normal text-text-default-body"
        style={{ fontSize: bodyBig.size }}
        variants={fadeFromRight}
        initial="hidden"
        animate={reversing ? { opacity: 0 } : "visible"}
        custom={entranceDelays.body}
        transition={reversing ? { duration: 1.8, ease: [0.4, 0, 0.2, 1] as const, delay: 0.05 } : {}}
      >
        3 simple steps to build your momentum every day.
      </motion.p>

      <div
        className="mx-[-1rem] mt-[1.5rem] shrink-0 relative"
        style={{ height: `calc(${ROW_H} * 3 + ${ROW_GAP} * 2)` }}
      >
        {/* Row 1 — hidden once fusing is done (line transition takes over) */}
        <div ref={row1Ref} className="absolute inset-x-0 top-0" style={{ height: ROW_H, visibility: fusingDone ? "hidden" : "visible" }}>
          <motion.div
            className="absolute inset-0 bg-surface-container-accent1"
            initial={{ scaleX: 0 }}
            animate={containerReady ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.15, 1] as const }}
            style={{ transformOrigin: "left center" }}
          />
          {containerReady && (
            <div className="absolute inset-0 flex items-center" style={{ zIndex: 1 }}>
              <RowText n="1" label="Learn" enterDelay={2.85} fadeOut={reversing} />
            </div>
          )}
        </div>

        {/* Rows 2 & 3 — unmounted once fusing is done so they don't show behind the line */}
        {containerReady && !fusingDone && (
          <>
            {/* Row 2: drops to ROW_STEP_PX, returns to 0 on reverse */}
            <motion.div
              className="absolute inset-x-0 top-0 flex items-center bg-surface-container-accent1"
              style={{ height: ROW_H }}
              initial={{ opacity: 0, y: 0 }}
              animate={reversing
                ? { opacity: 0, y: 0 }
                : { opacity: 1, y: ROW_STEP_PX }
              }
              transition={reversing ? exitEase(0.1) : enterSpring(1.4)}
            >
              <RowText n="2" label="Encourage" enterDelay={3.0} fadeOut={reversing} />
            </motion.div>

            {/* Row 3: drops to 2×ROW_STEP_PX, returns to 0 on reverse (goes first) */}
            <motion.div
              className="absolute inset-x-0 top-0 flex items-center bg-surface-container-accent1"
              style={{ height: ROW_H }}
              initial={{ opacity: 0, y: 0 }}
              animate={reversing
                ? { opacity: 0, y: 0 }
                : { opacity: 1, y: ROW_STEP_PX * 2 }
              }
              transition={reversing ? exitEase(0) : enterSpring(1.65)}
            >
              <RowText n="3" label="Record" enterDelay={3.15} fadeOut={reversing} />
            </motion.div>
          </>
        )}
      </div>

      {/* "Next" button — enters from below, exits back down */}
      <div className="mt-auto shrink-0 pb-[1.5rem] pt-[1rem]">
        {done && (
          <motion.div
            className="relative z-30"
            initial={{ y: 120 }}
            animate={reversing ? { y: 120 } : { y: 0 }}
            transition={reversing
              ? { type: "spring" as const, stiffness: 20, damping: 14, mass: 3 }
              : { type: "spring" as const, stiffness: 90, damping: 22, mass: 1.2, delay: 3.8 }
            }
          >
            <CtaButton variant="primary" className="w-full" onClick={handleNext}>Next</CtaButton>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function Preview2Content() {
  const [animationState, setAnimationState] = useState<AnimationState>("idle");
  const [lineBottom, setLineBottom] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleStartClick = () => {
    if (animationState !== "idle") return;
    setAnimationState("animating");
  };

  const handleNext = () => {};

  const handleFusingComplete = useCallback((rowEl: HTMLElement) => {
    if (!rootRef.current) return;
    const rootRect = rootRef.current.getBoundingClientRect();
    const rowRect = rowEl.getBoundingClientRect();
    setLineBottom(rootRect.bottom - rowRect.bottom);
  }, []);

  useEffect(() => {
    if (animationState !== "animating") return;
    const timer = setTimeout(() => {
      setAnimationState("fading");
    }, LIQUID_DURATION_MS);
    return () => clearTimeout(timer);
  }, [animationState]);

  const isAnimating = animationState === "animating" || animationState === "fading" || animationState === "done";

  return (
    <div ref={rootRef} className="relative flex h-full min-h-0 flex-col overflow-hidden bg-surface-page-default px-[1rem]">
      <style>{`
        @keyframes preview2-cta-text-fade-out {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .preview2-cta-text-fade-out {
          animation: preview2-cta-text-fade-out 0.3s forwards;
        }

        @keyframes preview2-smooth-liquid {
          0%, 10% {
            bottom: 1.5rem;
            width: calc(100% - 2rem);
            height: 3rem;
            border-radius: 0.5rem;
            transform: translate3d(-50%, 0, 0) rotate(0deg) scale(1);
          }
          25% {
            bottom: 1.5rem;
            width: 3rem;
            height: 3rem;
            border-radius: 0.5rem;
            transform: translate3d(-50%, 0, 0) rotate(0deg) scale(1);
          }
          50% {
            bottom: 50%;
            width: 3rem;
            height: 3rem;
            border-radius: 0.5rem;
            transform: translate3d(-50%, 50%, 0) rotate(180deg) scale(1);
          }
          70% {
            bottom: 50%;
            width: 3rem;
            height: 3rem;
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            transform: translate3d(-50%, 50%, 0) rotate(360deg) scale(2);
          }
          100% {
            bottom: 50%;
            width: 3rem;
            height: 3rem;
            border-radius: 45%;
            transform: translate3d(-50%, 50%, 0) rotate(720deg) scale(40);
          }
        }

        .preview2-liquid-transition {
          position: absolute;
          left: 50%;
          background-color: var(--color-surface-cta-primary);
          animation: preview2-smooth-liquid 3s cubic-bezier(0.65, 0, 0.35, 1) forwards;
          z-index: 40;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform, width, border-radius, bottom;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        @keyframes p2-line-expansion {
          0%, 15% {
            width: 100%;
            height: 3.5rem;
            bottom: var(--row-bottom);
            border-radius: 0;
            transform: translate3d(-50%, 0, 0);
          }
          40% {
            width: 4px;
            height: 3.5rem;
            bottom: var(--row-bottom);
            border-radius: 2px;
            transform: translate3d(-50%, 0, 0);
          }
          70% {
            width: 4px;
            height: 100%;
            bottom: 0;
            border-radius: 0;
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            width: 100%;
            height: 100%;
            bottom: 0;
            border-radius: 0;
            transform: translate3d(-50%, 0, 0);
          }
        }
        .p2-line-transition {
          position: absolute;
          left: 50%;
          background-color: var(--color-surface-container-accent1);
          animation: p2-line-expansion 2.4s cubic-bezier(0.65, 0, 0.35, 1) forwards;
          z-index: 60;
          will-change: transform, width, height, bottom, border-radius;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Liquid blob — shown during animating phase */}
      {animationState === "animating" && (
        <div
          className="preview2-liquid-transition overflow-hidden pointer-events-none"
          aria-hidden
        >
          <span
            className="preview2-cta-text-fade-out whitespace-nowrap font-serif font-semibold text-text-cta-primary"
            style={{ fontSize: bodyBig.size }}
          >
            Start
          </span>
        </div>
      )}

      {/* Full-frame accent overlay — fades away to reveal next screen */}
      <AnimatePresence>
        {animationState === "fading" && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-50 bg-surface-container-accent1"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={() => setAnimationState("done")}
          />
        )}
      </AnimatePresence>

      {/* Logo — always visible */}
      <div className="relative z-10 flex shrink-0 justify-center pt-[1rem]">
        <span
          className={`${ibmPlexMono.className} text-center font-medium leading-tight`}
          style={{ fontSize: LOGO_DEFAULT_SIZE }}
        >
          <span className="text-text-default-heading">NARRATIVE</span>
          <span className="text-text-default-accent">CO</span>
        </span>
      </div>

      {/* Screen 1: stays visible under the liquid until it fully covers the frame */}
      {(animationState === "idle" || animationState === "animating") && (
        <>

          <div className="mt-[2rem] flex min-h-0 flex-1 flex-col">
            <motion.h1
              className="shrink-0 font-serif font-semibold leading-tight text-text-default-heading"
              style={{ fontSize: heading1.size }}
              variants={fadeFromRight}
              initial="hidden"
              animate="visible"
              custom={entranceDelays.headline}
            >
              Every great storyteller needs a{" "}
              <span className="text-text-default-accent">beginning</span>
            </motion.h1>

            <motion.p
              className="mt-[1rem] shrink-0 font-serif font-normal leading-normal text-text-default-body"
              style={{ fontSize: bodyBig.size }}
              variants={fadeFromRight}
              initial="hidden"
              animate="visible"
              custom={entranceDelays.body}
            >
              We just need the basic to start your story.
            </motion.p>

            <div className="mt-[1.25rem] shrink-0 space-y-[1rem]">
              <motion.div
                variants={fadeFromRight}
                initial="hidden"
                animate="visible"
                custom={entranceDelays.email}
              >
                <TextField label="Email" type="email" placeholder="Email" autoComplete="email" />
              </motion.div>
              <motion.div
                variants={fadeFromRight}
                initial="hidden"
                animate="visible"
                custom={entranceDelays.phone}
              >
                <TextField label="Phone" type="tel" placeholder="Phone" autoComplete="tel" />
              </motion.div>
            </div>

            <div className="mt-auto shrink-0 pb-[1.5rem] pt-[1.25rem]">
              {animationState === "idle" && (
                <motion.div
                  variants={riseFromBelow}
                  initial="hidden"
                  animate="visible"
                  className="relative z-30"
                >
                  <CtaButton variant="primary" className="w-full" onClick={handleStartClick}>
                    Start
                  </CtaButton>
                </motion.div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Screen 2: post-transition content (rendered underneath during fading) */}
      {(animationState === "fading" || animationState === "done") && (
        <Screen2 done={animationState === "done"} onNext={handleNext} onFusingComplete={handleFusingComplete} />
      )}

      {/* Line transition — Interaction 3 style, starts from row 1's measured position */}
      {lineBottom !== null && (
        <div
          className="p2-line-transition"
          style={{ bottom: lineBottom, height: ROW_H, "--row-bottom": `${lineBottom}px` } as CSSProperties}
        />
      )}

    </div>
  );
}
