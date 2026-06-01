"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Flame, X } from "@phosphor-icons/react";
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
  const [phase, setPhase] = useState<"idle" | "ready" | "converge" | "closing">("idle");
  const [open, setOpen] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const headerFlameRef = useRef<HTMLSpanElement>(null);

  const [flamePositions, setFlamePositions] = useState<{ x: number; y: number }[]>([]);
  const [flameExpandedPositions, setFlameExpandedPositions] = useState<{ x: number; y: number }[]>([]);
  const [circleCenter, setCircleCenter] = useState({ x: 0, y: 0 });
  const [headerFlamePos, setHeaderFlamePos] = useState({ x: 0, y: 0 });
  const [headerCount, setHeaderCount] = useState(6);

  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 50);
    return () => clearTimeout(t);
  }, []);

  function handleClose() {
    if (phase !== "ready") return;

    const rootRect = rootRef.current!.getBoundingClientRect();
    const circleRect = circleRef.current!.getBoundingClientRect();
    const headerRect = headerFlameRef.current!.getBoundingClientRect();
    const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const circleRPx = CIRCLE_R * remPx;
    const iconHalf = ICON_SIZE_PX.md / 2;

    const cx = circleRect.left + circleRect.width / 2 - rootRect.left;
    const cy = circleRect.top + circleRect.height / 2 - rootRect.top;

    const rads = DOT_ANGLES.map(angle => (angle - 90) * Math.PI / 180);
    const positions = rads.map(rad => ({
      x: cx + circleRPx * Math.cos(rad),
      y: cy + circleRPx * Math.sin(rad) - iconHalf,
    }));
    setFlamePositions(positions);

    const OVERSHOOT_R = 40; // px outward overshoot for the expand bounce
    setFlameExpandedPositions(
      rads.map((rad, i) => ({
        x: positions[i].x + OVERSHOOT_R * Math.cos(rad),
        y: positions[i].y + OVERSHOOT_R * Math.sin(rad),
      }))
    );

    setCircleCenter({ x: cx - iconHalf, y: cy - iconHalf });
    setHeaderFlamePos({
      x: headerRect.left + headerRect.width / 2 - rootRect.left - iconHalf,
      y: headerRect.top + headerRect.height / 2 - rootRect.top - iconHalf,
    });

    setPhase("converge");
    // Combined pop+shoot starts once converge flames have disappeared (~500ms for expand+bounce+shrink)
    setTimeout(() => setPhase("closing"), 500);
    // Container closes when the shoot begins: 500ms + (0.40 * 950ms) = 880ms
    setTimeout(() => setOpen(false), 880);
  }

  const isClosing = phase === "converge" || phase === "closing";

  return (
    <div ref={rootRef} className="relative flex h-full flex-col bg-surface-page-default">
      <Header flameRef={headerFlameRef} streakCount={headerCount} />
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

      {/* Overlay flame layer — outside AnimatePresence, unaffected by sheet slide */}
      {isClosing && flamePositions.length > 0 && (
        <div className="pointer-events-none absolute inset-0 z-20">
          {phase === "converge" && flameExpandedPositions.length > 0 && DOT_ANGLES.map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: 0, left: 0 }}
              initial={{ x: flamePositions[i].x, y: flamePositions[i].y, scale: 1, opacity: 1 }}
              animate={{
                x: [flamePositions[i].x, flameExpandedPositions[i].x, circleCenter.x],
                y: [flamePositions[i].y, flameExpandedPositions[i].y, circleCenter.y],
                scale: [1, 1.25, 0],
                opacity: [1, 1, 0],
              }}
              transition={{
                x: { duration: 0.50, times: [0, 0.30, 1], ease: ["easeOut", "easeInOut"] },
                y: { duration: 0.50, times: [0, 0.30, 1], ease: ["easeOut", "easeInOut"] },
                scale: { duration: 0.50, times: [0, 0.30, 1], ease: ["easeOut", "easeIn"] },
                opacity: { duration: 0.14, ease: "linear", delay: 0.36 },
              }}
            >
              <Flame size={ICON_SIZE_PX.md} weight={ICON_WEIGHT_DEFAULT} style={{ color: "#D29790" }} aria-hidden />
            </motion.div>
          ))}
          {phase === "closing" && (() => {
            const sx = circleCenter.x;
            const sy = circleCenter.y;
            const ex = headerFlamePos.x;
            const ey = headerFlamePos.y;
            // Flame pops UP, bounces DOWN, then launches UP into the bezier arc.
            // shootStartT is when the bounce-up becomes the shoot.
            const shootStartT = 0.40;
            const by0 = sy - 10; // y at shoot start (slightly above center)
            const cpx = sx;
            const cpy = by0 - (by0 - ey) * 1.12; // overshoot past header for tight arch
            const N = 10;
            // Pre-shoot: pop up → bounce down → rebound up (shoot launch)
            const xKfs  = [sx,       sx,       sx,      sx];
            const yKfs  = [sy,  sy - 24,   sy - 2,    by0];
            const xyTimes = [0,     0.14,     0.30,  shootStartT];
            for (let k = 1; k <= N; k++) {
              const t = k / N;
              const u = 1 - t;
              xKfs.push(u * u * sx + 2 * u * t * cpx + t * t * ex);
              yKfs.push(u * u * by0 + 2 * u * t * cpy + t * t * ey);
              xyTimes.push(shootStartT + t * (1 - shootStartT));
            }
            // Scale mirrors the bounce: pops large → squishes → rebounds → shrinks to 0
            const scaleKfs  = [0,   3.4,   2.2,   2.8,  2.5,  1.5,  0.8, 1.05,  0];
            const scaleTimes = [0,  0.14,  0.28,  0.40, 0.46, 0.62, 0.78, 0.90, 1.0];
            return (
              <motion.div
                key="closing-flame"
                className="absolute"
                style={{ top: 0, left: 0 }}
                animate={{
                  x: xKfs,
                  y: yKfs,
                  scale: scaleKfs,
                  opacity: [1, 1, 1, 1, 1, 1, 1, 1, 0],
                }}
                transition={{
                  x: { duration: 0.95, times: xyTimes, ease: "linear" },
                  y: { duration: 0.95, times: xyTimes, ease: "linear" },
                  scale: { duration: 0.95, times: scaleTimes, ease: "easeOut" },
                  opacity: { duration: 0.95, times: scaleTimes, ease: "easeOut" },
                }}
                onAnimationComplete={() => setHeaderCount(7)}
              >
                <Flame size={32} weight={ICON_WEIGHT_DEFAULT} style={{ color: "#D29790" }} aria-hidden />
              </motion.div>
            );
          })()}
        </div>
      )}

      {/* Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 bg-surface-container-accent2"
            style={{ height: "60%", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", overflow: "visible" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <style>{`
              @keyframes streak-dot-sweep {
                from { transform: rotate(-90deg); }
                to   { transform: rotate(var(--dot-end)); }
              }
              @keyframes streak-icon-counter {
                from { transform: rotate(90deg); opacity: 0; }
                to   { transform: rotate(var(--dot-counter)); opacity: 1; }
              }
              @keyframes streak-seven-pop {
                0%   { transform: scale(0); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
              }
              @keyframes streak-seven-shrink {
                0%   { transform: scale(1); opacity: 1; }
                40%  { transform: scale(1.15); opacity: 1; }
                100% { transform: scale(0); opacity: 0; }
              }
              @keyframes streak-copy-rise {
                from { opacity: 0; transform: translateY(12px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* Close button */}
            <div className="flex justify-end px-[1rem] pt-[1rem]">
              <button
                type="button"
                aria-label="Close"
                onClick={handleClose}
                className="inline-flex text-text-accent2-complementary"
              >
                <X size={ICON_SIZE_PX.sm} weight={ICON_WEIGHT_DEFAULT} aria-hidden />
              </button>
            </div>

            {/* Circle composition */}
            <div className="flex justify-center pt-[2rem]">
              <div ref={circleRef} className="relative" style={{ width: "12rem", height: "12rem" }}>

                {/* CSS-animated flames — only during open; overlay takes over on close */}
                {phase === "ready" && DOT_ANGLES.map((angle, i) => {
                  const endRotate = angle - 90;
                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: 0,
                        height: 0,
                        transformOrigin: "0 0",
                        ["--dot-end" as string]: `${endRotate}deg`,
                        ["--dot-counter" as string]: `${-endRotate}deg`,
                        animation: `streak-dot-sweep 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 0.055}s both`,
                      }}
                    >
                      <Flame
                        aria-hidden
                        size={ICON_SIZE_PX.md}
                        weight={ICON_WEIGHT_DEFAULT}
                        className="absolute"
                        style={{
                          left: `${CIRCLE_R}rem`,
                          top: "-0.625rem",
                          color: "#D29790",
                          opacity: 0,
                          animation: `streak-icon-counter 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 0.055}s both`,
                        }}
                      />
                    </div>
                  );
                })}

                {/* "7" — pops in on open, bounces out on converge */}
                {phase !== "idle" && (
                  <span
                    className="absolute inset-0 flex items-center justify-center font-heading font-semibold text-text-accent2-heading"
                    style={{
                      fontSize: display2.size,
                      lineHeight: 1,
                      opacity: 0,
                      animation: phase === "converge"
                        ? "streak-seven-shrink 0.18s cubic-bezier(0.4,0,1,1) forwards"
                        : phase === "closing"
                          ? "none"
                          : "streak-seven-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.25s both",
                    }}
                  >
                    7
                  </span>
                )}

              </div>
            </div>

            {/* Text */}
            {phase !== "idle" && (
              <div className="flex flex-col items-center gap-[0.5rem] px-[2rem] pt-[1rem]">
                <p
                  className="font-heading font-semibold leading-snug text-text-accent2-heading text-center"
                  style={{
                    fontSize: heading4.size,
                    opacity: 0,
                    animation: "streak-copy-rise 0.55s cubic-bezier(0.25,0.1,0.25,1) 0.5s both",
                  }}
                >
                  Days Streak
                </p>
                <p
                  className="font-serif font-normal leading-snug text-text-accent2-body text-center"
                  style={{
                    fontSize: bodyBig.size,
                    opacity: 0,
                    animation: "streak-copy-rise 0.55s cubic-bezier(0.25,0.1,0.25,1) 0.65s both",
                  }}
                >
                  Keep going to become a great storyteller.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
