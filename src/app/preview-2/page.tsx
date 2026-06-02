"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { CtaButton } from "@/components/cta-button";
import { Bell, Flame, X } from "@phosphor-icons/react";
import { PhonePreviewFrame } from "@/components/design-system/phone-preview-frame";
import { Preview2Content } from "@/components/preview-2-content";
import { Header } from "@/components/header";
import { NavigationBar } from "@/components/navigation-bar";
import { BODY_STYLES, DISPLAY_STYLES, HEADING_STYLES } from "@/lib/typography/scale";
import { ICON_SIZE_PX, ICON_WEIGHT_DEFAULT } from "@/lib/icons/scale";

const bodyStandard = BODY_STYLES.find((s) => s.id === "body")!;
const bodyBig = BODY_STYLES.find((s) => s.id === "big")!;
const heading3 = HEADING_STYLES.find((s) => s.id === "h3")!;
const heading4 = HEADING_STYLES.find((s) => s.id === "h4")!;
const display1 = DISPLAY_STYLES.find((s) => s.id === "display1")!;
const display2 = DISPLAY_STYLES.find((s) => s.id === "display2")!;

// 8 dot angles (clockwise from top), offset 22.5° so none sit at cardinal points
const DOT_ANGLES = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
const CIRCLE_R = 4; // rem

type Scenario = "onboarding" | "open-close" | "points" | "points2" | "swipe";

const scenarios: { id: Scenario; label: string }[] = [
  { id: "onboarding", label: "Onboarding" },
  { id: "open-close", label: "Open-Close" },
  { id: "points", label: "Points" },
  { id: "points2", label: "Points 2" },
  { id: "swipe", label: "Swipe" },
];

const mockNotifications = [
  { id: "1", title: "Daily streak reminder", body: "You are on a 7-day streak. Open today's chapter to keep it going." },
  { id: "2", title: "New lesson available", body: "\u201cThe Art of Narrative\u201d has a new section ready for you." },
  { id: "3", title: "Progress milestone", body: "You completed 80% of this week\u2019s course material. Nice work." },
] as const;

const CARD_START_X = 300;
const CARD_START_Y = 650;
const CARD_START_ROT = 15;

// Stack from bottom (z-20) to top (z-27). Top card (100) is lightest and arrives last.
const CARD_STACK = [
  { color: "#891616", lag: 0.00 },  // oxblood-800 — main, moves first
  { color: "#97332d", lag: 0.08 },  // oxblood-700
  { color: "#a54a42", lag: 0.14 },  // oxblood-600
  { color: "#b26057", lag: 0.19 },  // oxblood-500
  { color: "#c17971", lag: 0.23 },  // oxblood-400
  { color: "#d29790", lag: 0.26 },  // oxblood-300
  { color: "#e4b9b4", lag: 0.28 },  // oxblood-200
  { color: "#f6ddd9", lag: 0.30 },  // oxblood-100 — lightest, arrives last
];

function SwipeContent() {
  const swipeContainerRef = useRef<HTMLDivElement>(null);
  const swipeButtonRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragX = useMotionValue(0);
  const dragMaxRef = useRef(1);

  const setCardTransform = (el: HTMLDivElement, p: number) => {
    if (p >= 1) {
      el.style.transform = "";
      el.style.borderRadius = "0px";
    } else {
      el.style.transform = `translate(${CARD_START_X * (1 - p)}px, ${CARD_START_Y * (1 - p)}px) rotate(${CARD_START_ROT * (1 - p)}deg)`;
      el.style.borderRadius = "32px";
    }
  };

  const handleDragStart = () => {
    const c = swipeContainerRef.current?.getBoundingClientRect();
    const b = swipeButtonRef.current?.getBoundingClientRect();
    if (c && b) dragMaxRef.current = Math.max(1, c.width - b.width);
  };

  const handleDrag = () => {
    const p = dragX.get() / dragMaxRef.current;
    CARD_STACK.forEach(({ lag }, i) => {
      const el = cardRefs.current[i];
      if (el) setCardTransform(el, Math.max(0, p - lag));
    });
  };

  const handleDragEnd = () => {
    const p = dragX.get() / dragMaxRef.current;
    const completed = p >= 0.85;

    if (completed) {
      // Snap all cards into place — each slightly staggered with a spring overshoot
      CARD_STACK.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        setTimeout(() => {
          el.style.transition = "transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1), border-radius 0.2s ease";
          setCardTransform(el, 1);
          setTimeout(() => { el.style.transition = ""; }, 500);
        }, i * 25);
      });
      animate(dragX, dragMaxRef.current, { duration: 0 });
    } else {
      // Snap all cards back to start
      CARD_STACK.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        el.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.3s ease";
        setCardTransform(el, 0);
        setTimeout(() => { el.style.transition = ""; }, 450);
      });
      animate(dragX, 0, { duration: 0 });
    }
  };

  return (
    <div className="flex h-full flex-col px-[1rem] pt-[1rem]">
      {/* Card stack — positioned relative to phone frame inner div */}
      {CARD_STACK.map(({ color, lag: _lag }, i) => (
        <div
          key={i}
          ref={(el) => { cardRefs.current[i] = el; }}
          className="absolute inset-0"
          style={{
            backgroundColor: color,
            zIndex: 20 + i,
            transform: `translate(${CARD_START_X}px, ${CARD_START_Y}px) rotate(${CARD_START_ROT}deg)`,
            borderRadius: 32,
          }}
        />
      ))}
      {/* Logo */}
      <div className="flex shrink-0 justify-center">
        <span className="text-center font-heading font-medium leading-none" style={{ fontSize: bodyBig.size }}>
          <span style={{ color: "#312c2c" }}>Narrative</span>
          <span style={{ color: "#891616" }}>Co</span>
        </span>
      </div>

      <h1
        className="mt-[4rem] shrink-0 font-heading font-semibold leading-snug"
        style={{ fontSize: display2.size, color: "#312c2c" }}
      >
        Start Your{" "}
        <span style={{ color: "#891616" }}>Journey</span>
      </h1>

      <p
        className="mt-[1rem] shrink-0 font-serif font-normal leading-snug"
        style={{ fontSize: bodyBig.size, color: "#686363" }}
      >
        You are a couple of steps away from getting better at telling stories. Let&apos;s start this journey together.
      </p>

      <div className="relative z-30 mt-auto shrink-0 pb-[1.5rem] pt-[1.25rem]">
        <div
          ref={swipeContainerRef}
          className="overflow-hidden rounded-[0.75rem] border bg-surface-page-default p-[0.5rem]"
          style={{ borderColor: "var(--color-line-field-enabled)" }}
        >
          <motion.div
            ref={swipeButtonRef}
            drag="x"
            dragConstraints={swipeContainerRef}
            dragElastic={0}
            dragMomentum={false}
            style={{ x: dragX }}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            className="w-fit cursor-grab active:cursor-grabbing"
          >
            <CtaButton variant="primary" onClick={undefined}>
              Swipe
              <ArrowRight size={ICON_SIZE_PX.md} weight={ICON_WEIGHT_DEFAULT} aria-hidden className="ml-[0.5rem]" />
            </CtaButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

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

function Points2Content() {
  const [open, setOpen] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [p2Phase, setP2Phase] = useState<"idle" | "closing">("idle");
  const [p2TextExiting, setP2TextExiting] = useState(false);
  const [headerCount, setHeaderCount] = useState(6);

  const headerFlameRef = useRef<HTMLSpanElement>(null);
  const sevenRef = useRef<HTMLSpanElement>(null);
  // Inner float-div refs — [L-outer, L-mid, L-center, R-center, R-mid, R-outer]
  const fl0 = useRef<HTMLDivElement>(null);
  const fl1 = useRef<HTMLDivElement>(null);
  const fl2 = useRef<HTMLDivElement>(null);
  const fl3 = useRef<HTMLDivElement>(null);
  const fl4 = useRef<HTMLDivElement>(null);
  const fl5 = useRef<HTMLDivElement>(null);
  const flameRefs = [fl0, fl1, fl2, fl3, fl4, fl5];

  const runCloseAnimation = () => {
    // Measure all positions FIRST before any DOM changes
    const centerRect = sevenRef.current?.getBoundingClientRect();
    const headerRect = headerFlameRef.current?.getBoundingClientRect();
    if (!centerRect || !headerRect) return;

    const cx = centerRect.left + centerRect.width / 2;
    const cy = centerRect.top + centerRect.height / 2;
    const hx = headerRect.left + headerRect.width / 2;
    const hy = headerRect.top + headerRect.height / 2;

    // "7" — slow dramatic bounce-pop before shrinking
    const sevenEl = sevenRef.current;
    if (sevenEl) {
      sevenEl.style.animation = "none";
      sevenEl.animate(
        [
          { transform: "scale(1)",   opacity: "1" },
          { transform: "scale(1.4)", opacity: "1", offset: 0.4 },
          { transform: "scale(0)",   opacity: "0" },
        ],
        { duration: 520, easing: "ease-in-out", fill: "forwards" }
      );
    }

    // Flames: alternating inner→outer, each arcs to center then continues to header
    const order = [2, 3, 1, 4, 0, 5];

    const flameDuration = 680;
    const lastFlameDelay = 100 + (order.length - 1) * 90;


    // Drift the 900 text section down as soon as the first flame launches
    setTimeout(() => setP2TextExiting(true), 100);

    // Close container when the last flame is midway to the header
    setTimeout(() => setOpen(false), lastFlameDelay + flameDuration * 0.5);

    order.forEach((idx, step) => {
      const el = flameRefs[idx].current;
      if (!el) return;
      setTimeout(() => {
        const rect = el.getBoundingClientRect();
        const fx = rect.left + rect.width / 2;
        const fy = rect.top + rect.height / 2;

        const dhx = hx - fx;
        const dhy = hy - fy;
        const dcx = cx - fx;
        const dcy = cy - fy;

        // Quadratic bezier: center as control point for smooth one-arc motion
        const b = (t: number) => ({
          x: 2*(1-t)*t*dcx + t*t*dhx,
          y: 2*(1-t)*t*dcy + t*t*dhy,
        });
        const p30 = b(0.3);
        const p60 = b(0.6);
        const p85 = b(0.85);

        el.animate(
          [
            { transform: "translate(0, 0) scale(1)",                                         opacity: "1" },
            { transform: `translate(${p30.x}px, ${p30.y}px) scale(0.85)`,                   opacity: "1", offset: 0.3  },
            { transform: `translate(${p60.x}px, ${p60.y}px) scale(0.6)`,                    opacity: "1", offset: 0.6  },
            { transform: `translate(${p85.x}px, ${p85.y}px) scale(0.35)`,                   opacity: "1", offset: 0.85 },
            // Arrive at header: slight scale-up bounce then feed in
            { transform: `translate(${dhx}px, ${dhy}px) scale(0.5)`,                        opacity: "1", offset: 0.93 },
            { transform: `translate(${dhx}px, ${dhy}px) scale(0)`,                          opacity: "0" },
          ],
          { duration: flameDuration, easing: "ease-in", fill: "forwards" }
        );
      }, 100 + step * 90);
    });

    // When the last flame feeds into the header, flip 6 → 7
    setTimeout(() => setHeaderCount(7), lastFlameDelay + flameDuration * 0.93);
  };

  const handleClose = () => {
    if (p2Phase === "closing") return;
    setP2Phase("closing");
    // Use rAF to ensure React has committed the state (float animations set to "none")
    // before we read positions and start the WA animations
    requestAnimationFrame(() => requestAnimationFrame(() => runCloseAnimation()));
  };

  useEffect(() => {
    const t = setTimeout(() => setHasEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Drive flame flicker with sum-of-sines at irrational ratios so the waveform
  // never repeats or reverses — it continuously evolves forward.
  useEffect(() => {
    const PHI = 1.6180339887;
    const RT2 = 1.4142135623;
    const configs = [
      { id: "p2-ff",    baseX: 0.016, baseY: 0.044, ampX: 0.003, ampY: 0.010, phase: 0.0 },
      { id: "p2-ff-60", baseX: 0.016, baseY: 0.044, ampX: 0.002, ampY: 0.008, phase: 2.1 },
      { id: "p2-ff-30", baseX: 0.016, baseY: 0.044, ampX: 0.0015, ampY: 0.006, phase: 4.3 },
    ];

    let time = 0;
    let raf: number;

    const tick = () => {
      time += 0.012;
      configs.forEach(({ id, baseX, baseY, ampX, ampY, phase }) => {
        const turb = document.getElementById(id)?.querySelector("feTurbulence");
        if (!turb) return;
        const t = time + phase;
        const x = baseX + ampX * (Math.sin(t) + Math.sin(t * PHI) * 0.6 + Math.sin(t * RT2) * 0.35);
        const y = baseY + ampY * (Math.sin(t * PHI) + Math.sin(t * RT2) * 0.7 + Math.sin(t) * 0.45);
        turb.setAttribute("baseFrequency", `${Math.max(0.008, x).toFixed(4)} ${Math.max(0.02, y).toFixed(4)}`);
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative flex h-full flex-col bg-surface-page-default">
      <Header streakCount={headerCount} flameRef={headerFlameRef} />
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

      {/* Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 flex flex-col"
            style={{
              height: "46%",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
              overflow: "visible",
              background: "var(--color-oxblood-ink-800)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <style>{`
              @keyframes p2-seven-pop {
                0%   { transform: scale(0); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
              }
              @keyframes p2-flame-pop {
                0%   { transform: scale(0); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
              }
              @keyframes p2-flame-pop-60 {
                0%   { transform: scale(0); opacity: 0; }
                100% { transform: scale(1); opacity: 0.6; }
              }
              @keyframes p2-flame-pop-30 {
                0%   { transform: scale(0); opacity: 0; }
                100% { transform: scale(1); opacity: 0.3; }
              }
              @keyframes p2-copy-rise {
                from { opacity: 0; transform: translateY(12px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              @keyframes p2-float {
                0%, 100% { transform: translateY(0); }
                50%       { transform: translateY(-4px); }
              }
              @keyframes p2-ember {
                0%   { transform: translateY(0) scale(1);    opacity: 0; }
                18%  { opacity: 0.55; }
                100% { transform: translateY(-38px) scale(0.2); opacity: 0; }
              }
              @keyframes p2-ember-60 {
                0%   { transform: translateY(0) scale(1);    opacity: 0; }
                18%  { opacity: 0.45; }
                100% { transform: translateY(-38px) scale(0.2); opacity: 0; }
              }
              @keyframes p2-ember-30 {
                0%   { transform: translateY(0) scale(1);    opacity: 0; }
                18%  { opacity: 0.32; }
                100% { transform: translateY(-38px) scale(0.2); opacity: 0; }
              }
            `}</style>

            {/* Close button */}
            <div className="relative z-[20] flex justify-end px-[1rem] pt-[1rem]">
              <button
                type="button"
                aria-label="Close"
                onClick={handleClose}
                disabled={p2Phase === "closing"}
                className="inline-flex text-text-accent2-complementary"
              >
                <X size={ICON_SIZE_PX.sm} weight={ICON_WEIGHT_DEFAULT} aria-hidden />
              </button>
            </div>

            {/* SVG filter defs for flame flicker effect */}
            <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
              <defs>
                <filter id="p2-ff" x="-15%" y="-15%" width="130%" height="130%">
                  <feTurbulence type="turbulence" baseFrequency="0.016 0.044" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
                </filter>
                <filter id="p2-ff-60" x="-15%" y="-15%" width="130%" height="130%">
                  <feTurbulence type="turbulence" baseFrequency="0.016 0.044" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.1" xChannelSelector="R" yChannelSelector="G" />
                </filter>
                <filter id="p2-ff-30" x="-15%" y="-15%" width="130%" height="130%">
                  <feTurbulence type="turbulence" baseFrequency="0.016 0.044" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
            </svg>

            {/* Composition row */}
            <div className="flex items-center justify-center pt-[3rem] pb-[2.5rem]" style={{ height: "10rem", marginTop: "-1.25rem" }}>
              <div className="flex items-end gap-px">

                {hasEntered && (
                  <>
                    {/* Left flames — outermost (faint, lowest) → center (full, highest) */}
                    <div style={{ flexShrink: 0, transform: "translateY(18px)" }}>
                      <div ref={fl0} style={{ position: "relative", display: "inline-flex", animation: p2Phase === "closing" ? "none" : "p2-float 2.4s ease-in-out 0.7s infinite" }}>
                        <div style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#D29790", top: 4, left: "28%", animation: "p2-ember-30 2.2s ease-out 1.9s infinite backwards" }} />
                        <div style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#D29790", top: 3, left: "62%", animation: "p2-ember-30 2.2s ease-out 2.5s infinite backwards" }} />
                        <Flame aria-hidden size={28} weight={ICON_WEIGHT_DEFAULT}
                          style={{ color: "#D29790", opacity: 0, filter: "url(#p2-ff-30)", animation: "p2-flame-pop-30 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.82s both" }} />
                      </div>
                    </div>
                    <div style={{ flexShrink: 0, transform: "translateY(9px)" }}>
                      <div ref={fl1} style={{ position: "relative", display: "inline-flex", animation: p2Phase === "closing" ? "none" : "p2-float 2.4s ease-in-out 0.35s infinite" }}>
                        <div style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#D29790", top: 5, left: "26%", animation: "p2-ember-60 2s ease-out 1.65s infinite backwards" }} />
                        <div style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#D29790", top: 4, left: "64%", animation: "p2-ember-60 2s ease-out 2.2s infinite backwards" }} />
                        <Flame aria-hidden size={38} weight={ICON_WEIGHT_DEFAULT}
                          style={{ color: "#D29790", opacity: 0, filter: "url(#p2-ff-60)", animation: "p2-flame-pop-60 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.64s both" }} />
                      </div>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      <div ref={fl2} style={{ position: "relative", display: "inline-flex", animation: p2Phase === "closing" ? "none" : "p2-float 2.4s ease-in-out 0s infinite" }}>
                        <div style={{ position: "absolute", width: 4, height: 4, borderRadius: "50%", background: "#D29790", top: 7, left: "24%", animation: "p2-ember 1.9s ease-out 1.4s infinite backwards" }} />
                        <div style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#D29790", top: 5, left: "60%", animation: "p2-ember 1.9s ease-out 1.95s infinite backwards" }} />
                        <div style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#D29790", top: 9, left: "44%", animation: "p2-ember 1.9s ease-out 2.5s infinite backwards" }} />
                        <Flame aria-hidden size={52} weight={ICON_WEIGHT_DEFAULT}
                          style={{ color: "#D29790", opacity: 0, filter: "url(#p2-ff)", animation: "p2-flame-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.48s both" }} />
                      </div>
                    </div>

                    {/* "7" */}
                    <span
                      ref={sevenRef}
                      className="font-heading font-semibold text-text-accent2-heading"
                      style={{
                        fontSize: display1.size,
                        lineHeight: 1,
                        opacity: 0,
                        flexShrink: 0,
                        animation: "p2-seven-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.25s both",
                      }}
                    >
                      7
                    </span>

                    {/* Right flames — center (full, highest) → outermost (faint, lowest) */}
                    <div style={{ flexShrink: 0 }}>
                      <div ref={fl3} style={{ position: "relative", display: "inline-flex", animation: p2Phase === "closing" ? "none" : "p2-float 2.4s ease-in-out 0s infinite" }}>
                        <div style={{ position: "absolute", width: 4, height: 4, borderRadius: "50%", background: "#D29790", top: 7, left: "24%", animation: "p2-ember 1.9s ease-out 1.65s infinite backwards" }} />
                        <div style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#D29790", top: 5, left: "60%", animation: "p2-ember 1.9s ease-out 2.2s infinite backwards" }} />
                        <div style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#D29790", top: 9, left: "44%", animation: "p2-ember 1.9s ease-out 2.75s infinite backwards" }} />
                        <Flame aria-hidden size={52} weight={ICON_WEIGHT_DEFAULT}
                          style={{ color: "#D29790", opacity: 0, filter: "url(#p2-ff)", animation: "p2-flame-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.48s both" }} />
                      </div>
                    </div>
                    <div style={{ flexShrink: 0, transform: "translateY(9px)" }}>
                      <div ref={fl4} style={{ position: "relative", display: "inline-flex", animation: p2Phase === "closing" ? "none" : "p2-float 2.4s ease-in-out 0.35s infinite" }}>
                        <div style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#D29790", top: 5, left: "26%", animation: "p2-ember-60 2s ease-out 1.85s infinite backwards" }} />
                        <div style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#D29790", top: 4, left: "64%", animation: "p2-ember-60 2s ease-out 2.4s infinite backwards" }} />
                        <Flame aria-hidden size={38} weight={ICON_WEIGHT_DEFAULT}
                          style={{ color: "#D29790", opacity: 0, filter: "url(#p2-ff-60)", animation: "p2-flame-pop-60 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.64s both" }} />
                      </div>
                    </div>
                    <div style={{ flexShrink: 0, transform: "translateY(18px)" }}>
                      <div ref={fl5} style={{ position: "relative", display: "inline-flex", animation: p2Phase === "closing" ? "none" : "p2-float 2.4s ease-in-out 0.7s infinite" }}>
                        <div style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#D29790", top: 4, left: "28%", animation: "p2-ember-30 2.2s ease-out 2.1s infinite backwards" }} />
                        <div style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#D29790", top: 3, left: "62%", animation: "p2-ember-30 2.2s ease-out 2.7s infinite backwards" }} />
                        <Flame aria-hidden size={28} weight={ICON_WEIGHT_DEFAULT}
                          style={{ color: "#D29790", opacity: 0, filter: "url(#p2-ff-30)", animation: "p2-flame-pop-30 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.82s both" }} />
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>

            {/* 900 text section — slides in separately */}
            <div className="flex-1 overflow-hidden">
              <motion.div
                className="h-full flex flex-col justify-center"
                style={{ background: "var(--color-oxblood-ink-900)", borderTopLeftRadius: "3rem", borderTopRightRadius: "3rem" }}
                initial={{ y: "100%" }}
                animate={{ y: p2TextExiting ? "20%" : 0 }}
                exit={{ y: "110%", transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
                transition={
                  p2TextExiting
                    ? { duration: 1.1, ease: [0.2, 0, 0.6, 1] }
                    : { duration: 0.55, delay: 0.28, ease: [0.4, 0, 0.2, 1] }
                }
              >
                {hasEntered && (
                  <motion.div
                    className="flex flex-col items-center gap-[0.5rem] px-[2rem] pt-[1.25rem] pb-[2rem]"
                    animate={{ y: p2TextExiting ? "30%" : 0 }}
                    transition={
                      p2TextExiting
                        ? { duration: 1.25, delay: 0.07, ease: [0.2, 0, 0.6, 1] }
                        : { duration: 0 }
                    }
                  >
                    <p
                      className="font-heading font-semibold leading-snug text-text-accent2-heading text-center"
                      style={{
                        fontSize: heading3.size,
                        opacity: 0,
                        animation: "p2-copy-rise 0.55s cubic-bezier(0.25,0.1,0.25,1) 0.6s both",
                      }}
                    >
                      Days Streak
                    </p>
                    <p
                      className="font-serif font-normal leading-snug text-text-accent2-body text-center"
                      style={{
                        fontSize: bodyBig.size,
                        opacity: 0,
                        animation: "p2-copy-rise 0.55s cubic-bezier(0.25,0.1,0.25,1) 0.75s both",
                      }}
                    >
                      Keep going to become a great storyteller.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <NavigationBar />
    </div>
  );
}

export default function Preview2Page() {
  const [scenario, setScenario] = useState<Scenario>("points");
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="min-h-full bg-background text-foreground">
      <main className="relative mx-auto flex min-h-full max-w-screen-2xl flex-col px-6 py-16 sm:px-10 sm:py-20">
        <div className="flex flex-1 items-center justify-center gap-[3rem]">

          {/* Left sidebar */}
          <nav className="flex w-[9rem] shrink-0 flex-col gap-[0.25rem]">
            {scenarios.filter(({ id }) => id !== "swipe").map(({ id, label }) => {
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
              {scenario === "onboarding" ? <Preview2Content /> : scenario === "open-close" ? <OpenCloseContent /> : scenario === "swipe" ? <SwipeContent /> : scenario === "points" ? <PointsContent /> : <Points2Content />}
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
