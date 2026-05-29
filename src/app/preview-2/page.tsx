"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Flame, X } from "@phosphor-icons/react";

// Letter-fall animation for heading
const letterVariants = {
  hidden: { y: -28, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 18,
      delay: 0.35 + i * 0.04,
    },
  }),
};

// Subtle right-to-left fade (matches onboarding body)
const fadeFromRight = {
  hidden: { opacity: 0, x: 14 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const, delay },
  }),
};
import { PhonePreviewFrame } from "@/components/design-system/phone-preview-frame";
import { Preview2Content } from "@/components/preview-2-content";
import { Header } from "@/components/header";
import { NavigationBar } from "@/components/navigation-bar";
import { BODY_STYLES, HEADING_STYLES } from "@/lib/typography/scale";
import { ICON_SIZE_PX, ICON_WEIGHT_DEFAULT } from "@/lib/icons/scale";

const bodyStandard = BODY_STYLES.find((s) => s.id === "body")!;
const bodyBig = BODY_STYLES.find((s) => s.id === "big")!;
const heading1 = HEADING_STYLES.find((s) => s.id === "h1")!;
const heading4 = HEADING_STYLES.find((s) => s.id === "h4")!;

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
  const [open, setOpen] = useState(true);

  return (
    <div className="relative flex h-full flex-col bg-surface-page-default">
      <Header />
      <div className="min-h-0 flex-1" />
      {/* Charcoal overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[9]"
            style={{ backgroundColor: "var(--color-charcoal-800)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Paper bottom 2 — slides in from below, scale bounces on arrival */}
      <AnimatePresence>
        {open && (
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10"
          initial={{ y: "100%", scale: 1 }}
          animate={{ y: 0, scale: [1, 1.06, 1] }}
          exit={{ y: "100%" }}
          transition={{
            y: { type: "spring" as const, stiffness: 260, damping: 28 },
            scale: {
              duration: 0.8,
              times: [0, 0.6, 1],
              ease: ["easeIn", [0.34, 1.56, 0.64, 1]] as const,
            },
          }}
        >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/paper/paper bottom 2.png"
          alt=""
          aria-hidden
          className="w-full"
        />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col px-[1.5rem] pt-[3.5rem] pb-[1rem]">
          {/* Close button */}
          <div className="flex justify-end">
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="text-text-default-heading">
              <X size={20} weight={ICON_WEIGHT_DEFAULT} aria-hidden />
            </button>
          </div>

          {/* Heading — each letter falls into place */}
          <h2
            className="mt-[0.5rem] font-heading font-semibold leading-snug text-text-default-heading"
            style={{ fontSize: heading1.size }}
            aria-label="Going Strong!"
          >
            {"Going ".split("").map((char, i) => (
              <motion.span
                key={`g-${i}`}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char === " " ? "\u00a0" : char}
              </motion.span>
            ))}
            {"Strong!".split("").map((char, i) => (
              <motion.span
                key={`s-${i}`}
                custom={"Going ".length + i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block text-text-default-accent"
              >
                {char}
              </motion.span>
            ))}
          </h2>

          {/* Flame + streak number */}
          <motion.div
            className="mt-[0.75rem] flex items-center gap-[0.5rem]"
            variants={fadeFromRight}
            initial="hidden"
            animate="visible"
            custom={0.9}
          >
            <Flame size={48} weight="bold" className="text-text-default-accent" aria-hidden />
            <span
              className="font-heading font-semibold text-text-default-heading"
              style={{ fontSize: heading4.size }}
            >
              7 Days Streak
            </span>
          </motion.div>

          {/* Body copy */}
          <motion.p
            className="mt-[0.75rem] font-serif font-normal leading-snug text-text-default-body"
            style={{ fontSize: bodyBig.size }}
            variants={fadeFromRight}
            initial="hidden"
            animate="visible"
            custom={1.05}
          >
            Keep going and you will become a great storyteller.
          </motion.p>
        </div>
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
