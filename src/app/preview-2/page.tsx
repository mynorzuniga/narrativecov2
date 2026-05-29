"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "@phosphor-icons/react";
import { PhonePreviewFrame } from "@/components/design-system/phone-preview-frame";
import { Preview2Content } from "@/components/preview-2-content";
import { Header } from "@/components/header";
import { NavigationBar } from "@/components/navigation-bar";
import { BODY_STYLES, DISPLAY_STYLES, HEADING_STYLES } from "@/lib/typography/scale";
import { ICON_SIZE_PX, ICON_WEIGHT_DEFAULT } from "@/lib/icons/scale";

const bodyStandard = BODY_STYLES.find((s) => s.id === "body")!;
const bodyBig = BODY_STYLES.find((s) => s.id === "big")!;
const heading4 = HEADING_STYLES.find((s) => s.id === "h4")!;
const display2 = DISPLAY_STYLES.find((s) => s.id === "display2")!;

// 8 dot angles (clockwise from top), offset 22.5° so none sit at cardinal points
const DOT_ANGLES = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
const CIRCLE_R = 4; // rem

type Scenario = "onboarding" | "open-close" | "points";

const scenarios: { id: Scenario; label: string }[] = [
  { id: "onboarding", label: "Onboarding" },
  { id: "open-close", label: "Open-Close" },
  { id: "points", label: "Points" },
];

const mockNotifications = [
  { id: "1", title: "Daily streak reminder", body: "You are on a 7-day streak. Open today's chapter to keep it going." },
  { id: "2", title: "New lesson available", body: "\u201cThe Art of Narrative\u201d has a new section ready for you." },
  { id: "3", title: "Progress milestone", body: "You completed 80% of this week\u2019s course material. Nice work." },
] as const;

function OpenCloseContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 195, y: 24 });

  const handleBellClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (containerRef.current) {
      const bell = e.currentTarget.getBoundingClientRect();
      const box = containerRef.current.getBoundingClientRect();
      setOrigin({
        x: Math.round(bell.left + bell.width / 2 - box.left),
        y: Math.round(bell.top + bell.height / 2 - box.top),
      });
    }
    setNotifOpen(true);
  };

  return (
    <div ref={containerRef} className="relative flex h-full flex-col bg-surface-page-default overflow-hidden">
      <Header onBellClick={handleBellClick} />
      <div className="min-h-0 flex-1" />
      <NavigationBar />

      {/* Circular reveal notifications */}
      <AnimatePresence>
        {notifOpen && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col bg-surface-container-accent2"
            initial={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }}
            animate={{ clipPath: `circle(200% at ${origin.x}px ${origin.y}px)` }}
            exit={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }}
            transition={{ clipPath: { duration: 0.85, ease: [0.4, 0, 0.2, 1] as const } }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-text-accent2-complementary/40 px-[1rem] py-[1rem]">
              <div className="flex items-center gap-[0.5rem]">
                <Bell size={ICON_SIZE_PX.md} weight={ICON_WEIGHT_DEFAULT} className="text-text-accent2-heading" aria-hidden />
                <h2
                  className="font-heading font-semibold leading-tight text-text-accent2-accent"
                  style={{ fontSize: heading4.size }}
                >
                  Notifications
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setNotifOpen(false)}
                aria-label="Close notifications"
                className="inline-flex text-text-accent2-complementary"
              >
                <X size={ICON_SIZE_PX.md} weight={ICON_WEIGHT_DEFAULT} aria-hidden />
              </button>
            </div>

            {/* Notification list */}
            <ul className="flex-1 divide-y divide-text-accent2-complementary/40 overflow-y-auto">
              {mockNotifications.map((n) => (
                <li key={n.id} className="px-[1rem] py-[1rem]">
                  <p
                    className="font-heading font-medium leading-snug text-text-accent2-heading"
                    style={{ fontSize: bodyStandard.size }}
                  >
                    {n.title}
                  </p>
                  <p
                    className="mt-[0.25rem] font-serif font-normal leading-normal text-text-accent2-body"
                    style={{ fontSize: bodyStandard.size }}
                  >
                    {n.body}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PointsContent() {
  const [phase, setPhase] = useState<"idle" | "ready" | "closing">("idle");
  const [open, setOpen] = useState(true);
  const [exitTarget, setExitTarget] = useState({ x: 0, y: 0 });
  // Position of circle center relative to the root div — used for the exit dots layer
  const [circleLayerPos, setCircleLayerPos] = useState({ x: 0, y: 0 });
  const flameRef = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 50);
    return () => clearTimeout(t);
  }, []);

  function handleClose() {
    if (phase !== "ready") return;
    if (flameRef.current && circleRef.current && rootRef.current) {
      const flame = flameRef.current.getBoundingClientRect();
      const circle = circleRef.current.getBoundingClientRect();
      const root = rootRef.current.getBoundingClientRect();
      const circleX = circle.left + circle.width / 2;
      const circleY = circle.top + circle.height / 2;
      const flameX = flame.left + flame.width / 2;
      const flameY = flame.top + flame.height / 2;
      // Circle center relative to root (for the exit dots layer position)
      setCircleLayerPos({ x: circleX - root.left, y: circleY - root.top });
      // Exit target relative to circle center, corrected for dot pivot offset at gather angle
      const GATHER_RAD = (-72 * Math.PI) / 180;
      const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const circleRPx = CIRCLE_R * remPx;
      setExitTarget({
        x: flameX - circleX - circleRPx * Math.cos(GATHER_RAD),
        y: flameY - circleY - circleRPx * Math.sin(GATHER_RAD),
      });
    }
    setPhase("closing");
    setTimeout(() => setOpen(false), 420);
  }

  return (
    <div ref={rootRef} className="relative flex h-full flex-col bg-surface-page-default">
      <Header flameRef={flameRef} />
      <div className="min-h-0 flex-1" />

      {/* Tap-outside overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute inset-0 z-[9]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Accent1 sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 bg-surface-container-accent1"
            style={{ height: "60%", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", overflow: "visible" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Close button */}
            <div className="flex justify-end px-[1rem] pt-[1rem]">
              <button
                type="button"
                aria-label="Close"
                onClick={handleClose}
                className="inline-flex text-text-accent1-complementary"
              >
                <X size={ICON_SIZE_PX.sm} weight={ICON_WEIGHT_DEFAULT} aria-hidden />
              </button>
            </div>

            {/* Circle composition */}
            <div className="flex justify-center pt-[2rem]">
              <div ref={circleRef} className="relative" style={{ width: "12rem", height: "12rem" }}>

                {/* Entry dots — hidden when closing (exit layer takes over) */}
                {phase !== "closing" && DOT_ANGLES.map((angle, i) => {
                  const endRotate = angle - 90;
                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{ left: "50%", top: "50%", width: 0, height: 0, transformOrigin: "0 0" }}
                      initial={{ rotate: -90 }}
                      animate={phase !== "idle" ? { rotate: endRotate } : {}}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const, delay: i * 0.055 }}
                    >
                      <motion.div
                        className="absolute rounded-full"
                        style={{ left: `${CIRCLE_R}rem`, top: "-0.4375rem", width: "0.875rem", height: "0.875rem", backgroundColor: "#D29790" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.01, delay: i * 0.055 }}
                      />
                    </motion.div>
                  );
                })}

                {/* "7" — pops in, fades out on close */}
                <motion.span
                  className="absolute inset-0 flex items-center justify-center font-heading font-semibold text-text-accent1-heading"
                  style={{ fontSize: display2.size, lineHeight: 1 }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={phase === "closing"
                    ? { scale: 0.6, opacity: 0 }
                    : phase === "ready" ? { scale: 1, opacity: 1 } : {}}
                  transition={phase === "closing"
                    ? { duration: 0.25, ease: [0.4, 0, 1, 1] }
                    : { type: "spring", stiffness: 380, damping: 14, delay: 0.25 }}
                >
                  7
                </motion.span>

              </div>
            </div>

            {/* Text below the circle */}
            <div className="flex flex-col items-center gap-[0.5rem] px-[2rem] pt-[1rem]">
              <motion.p
                className="font-heading font-semibold leading-snug text-text-accent1-heading text-center"
                style={{ fontSize: heading4.size }}
                initial={{ opacity: 0, y: 12 }}
                animate={phase === "closing" ? { opacity: 0, y: -8 } : phase === "ready" ? { opacity: 1, y: 0 } : {}}
                transition={phase === "closing" ? { duration: 0.2 } : { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
              >
                Days Streak
              </motion.p>
              <motion.p
                className="font-serif font-normal leading-snug text-text-accent1-body text-center"
                style={{ fontSize: bodyBig.size }}
                initial={{ opacity: 0, y: 12 }}
                animate={phase === "closing" ? { opacity: 0, y: -8 } : phase === "ready" ? { opacity: 1, y: 0 } : {}}
                transition={phase === "closing" ? { duration: 0.2, delay: 0.05 } : { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.65 }}
              >
                Keep going to become a great storyteller.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit dots layer — rendered outside the container so the container slide doesn't affect them */}
      {phase === "closing" && DOT_ANGLES.map((angle, i) => {
        const endRotate = angle - 90;
        const ri = DOT_ANGLES.length - 1 - i;
        const UNSWEEP_STAGGER = 0.07;
        const UNSWEEP_DUR = 0.42;
        const unsweepDelay = ri * UNSWEEP_STAGGER;
        const shootDelay = unsweepDelay + UNSWEEP_DUR - 0.08;
        return (
          <motion.div
            key={`exit-${i}`}
            className="pointer-events-none absolute z-20"
            style={{ left: circleLayerPos.x, top: circleLayerPos.y, width: 0, height: 0 }}
            animate={{ x: exitTarget.x, y: exitTarget.y, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.8, 1] as const, delay: shootDelay }}
          >
            <motion.div
              className="absolute"
              style={{ width: 0, height: 0, transformOrigin: "0 0" }}
              initial={{ rotate: endRotate }}
              animate={{ rotate: -72 }}
              transition={{ duration: UNSWEEP_DUR, ease: [0.4, 0, 0.2, 1] as const, delay: unsweepDelay }}
            >
              <div
                className="absolute rounded-full"
                style={{ left: `${CIRCLE_R}rem`, top: "-0.4375rem", width: "0.875rem", height: "0.875rem", backgroundColor: "#D29790" }}
              />
            </motion.div>
          </motion.div>
        );
      })}

      <NavigationBar />
    </div>
  );
}

export default function Preview2Page() {
  const [scenario, setScenario] = useState<Scenario>("onboarding");
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="min-h-full bg-background text-foreground">
      <main className="relative mx-auto flex min-h-full max-w-screen-2xl flex-col px-6 py-16 sm:px-10 sm:py-20">
        <div className="flex flex-1 items-center justify-center gap-[3rem]">

          {/* Left sidebar */}
          <nav className="flex w-[9rem] shrink-0 flex-col gap-[0.25rem]">
            {scenarios.map(({ id, label }) => {
              const isActive = scenario === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setScenario(id)}
                  className={[
                    "rounded-[0.5rem] px-[0.75rem] py-[0.5rem] text-left font-serif font-medium transition-colors",
                    isActive
                      ? "bg-surface-container-accent1 text-text-accent1-heading"
                      : "text-text-default-body hover:bg-surface-container-default",
                  ].join(" ")}
                  style={{ fontSize: bodyStandard.size }}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Phone frame */}
          <div className="flex items-center gap-[1.5rem]">
            <PhonePreviewFrame key={`${scenario}-${resetKey}`}>
              {scenario === "onboarding" ? <Preview2Content /> : scenario === "open-close" ? <OpenCloseContent /> : <PointsContent />}
            </PhonePreviewFrame>

            {/* Reset button — always visible */}
            <button
              type="button"
              onClick={() => setResetKey((k) => k + 1)}
              className="rounded-[0.5rem] border border-text-default-complementary px-[0.75rem] py-[0.5rem] font-serif font-medium text-text-default-body transition-colors hover:bg-surface-container-default"
              style={{ fontSize: bodyStandard.size }}
            >
              Reset
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
