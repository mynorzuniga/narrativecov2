"use client";

import { type CSSProperties, useEffect, useState } from "react";
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

function RowText({ n, label, delay }: { n: string; label: string; delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-[0.625rem] px-[1rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const, delay }}
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
      <span
        className="font-serif font-medium text-text-accent1-heading"
        style={{ fontSize: heading4.size }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// cubic-bezier that naturally overshoots — gives the elastic feel
const DROP_CSS = `
  @keyframes p2-row-drop {
    0%   { opacity: 1; transform: translateY(0); }
    100% { opacity: 1; transform: translateY(var(--row-y)); }
  }
  .p2-row-drop {
    opacity: 0;
    animation: p2-row-drop 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: var(--row-delay, 0s);
  }
`;

function Screen2({ done }: { done: boolean }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-0 pt-[2rem]">
      <style>{DROP_CSS}</style>

      <h1
        className="shrink-0 font-serif font-semibold leading-tight text-text-default-heading"
        style={{ fontSize: heading1.size }}
      >
        <span className="text-text-default-accent">How your day</span> will look like
      </h1>
      <p
        className="mt-[1rem] shrink-0 font-serif font-normal leading-normal text-text-default-body"
        style={{ fontSize: bodyBig.size }}
      >
        3 simple steps to build your momentum every day.
      </p>

      {/*
        Rows wrapper — relative + fixed height so absolute children have a coordinate space.
        All 3 rows start at top:0. Rows 2 & 3 are invisible (opacity:0) until their
        animation delay fires, then they drop from row 1's position to their own slot.
      */}
      <div
        className="mx-[-1rem] mt-[1.5rem] shrink-0 relative"
        style={{ height: `calc(${ROW_H} * 3 + ${ROW_GAP} * 2)` }}
      >
        {/* Row 1 — background scales left→right; text is a separate layer above it */}
        <div className="absolute inset-x-0 top-0" style={{ height: ROW_H }}>
          <motion.div
            className="absolute inset-0 bg-surface-container-accent1"
            initial={{ scaleX: 0 }}
            animate={done ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.15, 1] as const }}
            style={{ transformOrigin: "left center" }}
          />
          {done && (
            <div className="absolute inset-0 flex items-center" style={{ zIndex: 1 }}>
              <RowText n="1" label="Learn" delay={2.9} />
            </div>
          )}
        </div>

        {/* Rows 2 & 3 — only mount when done; start at top:0 (row 1's slot) and drop */}
        {done && (
          <>
            <div
              className="p2-row-drop absolute inset-x-0 top-0 flex items-center bg-surface-container-accent1"
              style={{
                height: ROW_H,
                "--row-y": `calc(${ROW_H} + ${ROW_GAP})`,
                "--row-delay": "1.4s",
              } as CSSProperties}
            >
              <RowText n="2" label="Encourage" delay={3.05} />
            </div>
            <div
              className="p2-row-drop absolute inset-x-0 top-0 flex items-center bg-surface-container-accent1"
              style={{
                height: ROW_H,
                "--row-y": `calc((${ROW_H} + ${ROW_GAP}) * 2)`,
                "--row-delay": "1.65s",
              } as CSSProperties}
            >
              <RowText n="3" label="Record" delay={3.2} />
            </div>
          </>
        )}
      </div>

      {/* "Next" button — rises from below just like the Start button on Screen 1 */}
      {done && (
        <motion.div
          className="mt-auto pb-[1.5rem] pt-[1rem]"
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring" as const,
            stiffness: 90,
            damping: 22,
            mass: 1.2,
            delay: 3.8,
          }}
        >
          <CtaButton variant="primary" className="w-full">Next</CtaButton>
        </motion.div>
      )}
    </div>
  );
}

export function Preview2Content() {
  const [animationState, setAnimationState] = useState<AnimationState>("idle");

  const handleStartClick = () => {
    if (animationState !== "idle") return;
    setAnimationState("animating");
  };

  useEffect(() => {
    if (animationState !== "animating") return;
    const timer = setTimeout(() => {
      setAnimationState("fading");
    }, LIQUID_DURATION_MS);
    return () => clearTimeout(timer);
  }, [animationState]);

  const isAnimating = animationState === "animating" || animationState === "fading" || animationState === "done";

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-surface-page-default px-[1rem]">
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
        <Screen2 done={animationState === "done"} />
      )}
    </div>
  );
}
