"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Art2StackAnimation } from "@/components/art2-stack-animation";
import { DISPLAY_STYLES } from "@/lib/typography/scale";

const HEADLINE_WORDS = [
  { text: "Learn", accent: false },
  { text: "to", accent: false },
  { text: "Tell", accent: false },
  { text: "Your", accent: true },
  { text: "Story", accent: true },
] as const;

const display2 = DISPLAY_STYLES.find((s) => s.id === "display2")!;

const WORD_INTERVAL_MS = 320;
const HEADLINE_TO_ART_DELAY_MS = 700;
const HOLD_AFTER_COMPLETE_MS = 2000;
const PHONE_ART_DISPLAY_WIDTH_PX = 420;
const PHONE_ART_BOTTOM_OFFSET_PX = 128;

type SequencePhase = "headline" | "art" | "hold";

export function LearnStorySequence() {
  const [phase, setPhase] = useState<SequencePhase>("headline");
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (phase !== "headline") return;

    if (visibleWordCount >= HEADLINE_WORDS.length) {
      const timeoutId = window.setTimeout(() => {
        setPhase("art");
      }, HEADLINE_TO_ART_DELAY_MS);

      return () => window.clearTimeout(timeoutId);
    }

    const delay = visibleWordCount === 0 ? 0 : WORD_INTERVAL_MS;

    const timeoutId = window.setTimeout(() => {
      setVisibleWordCount((count) => count + 1);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [phase, visibleWordCount]);

  useEffect(() => {
    if (phase !== "hold") return;

    const timeoutId = window.setTimeout(() => {
      setVisibleWordCount(0);
      setCycle((count) => count + 1);
      setPhase("headline");
    }, HOLD_AFTER_COMPLETE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase, cycle]);

  const showArt = phase === "art" || phase === "hold";

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-[1rem] pt-[0.75rem]">
      <h1
        className="relative z-10 shrink-0 font-serif font-semibold leading-tight text-text-default-heading"
        style={{ fontSize: display2.size }}
        aria-live="polite"
      >
        {HEADLINE_WORDS.map((word, index) =>
          index < visibleWordCount ? (
            <motion.span
              key={`${cycle}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className={
                word.accent ? "text-text-default-accent" : undefined
              }
            >
              {index > 0 ? " " : ""}
              {word.text}
            </motion.span>
          ) : null,
        )}
      </h1>

      {showArt ? (
        <div
          className="pointer-events-none absolute inset-x-0 z-0 flex justify-center"
          style={{ bottom: -PHONE_ART_BOTTOM_OFFSET_PX }}
        >
          <Art2StackAnimation
            key={cycle}
            embedded
            displayWidthPx={PHONE_ART_DISPLAY_WIDTH_PX}
            entryOffsets={{ man: 240 }}
            onSequenceComplete={() => setPhase("hold")}
          />
        </div>
      ) : null}
    </div>
  );
}
