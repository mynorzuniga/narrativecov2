"use client";

import { Bell, Flame, User, X } from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ICON_SIZE_PX, ICON_WEIGHT_DEFAULT } from "@/lib/icons/scale";
import { NotificationsPanel } from "@/components/notifications-panel";
import { BODY_STYLES } from "@/lib/typography/scale";

const bodyBig = BODY_STYLES.find((s) => s.id === "big")!;
const bodyStandard = BODY_STYLES.find((s) => s.id === "body")!;

const iconButtonClass =
  "inline-flex items-center justify-center text-text-default-heading";

type HeaderProps = {
  onBellClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  flameRef?: React.RefObject<HTMLSpanElement | null>;
  streakCount?: number;
};

export function Header({ onBellClick, flameRef, streakCount }: HeaderProps = {}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const displayCount = streakCount ?? 7;
  // Track whether the component has fully mounted so the initial render is static
  const mountedRef = useRef(false);
  useEffect(() => { mountedRef.current = true; }, []);
  const shouldAnimate = mountedRef.current;

  const handleBellClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onBellClick) {
      onBellClick(e);
    } else {
      setNotificationsOpen(true);
    }
  };

  return (
    <>
      <header className="grid h-[3rem] w-full grid-cols-[1fr_auto_1fr] items-center border-b border-text-default-complementary bg-surface-page-default px-[1rem]">
        <div className="flex items-center gap-[0.25rem]">
          <span ref={flameRef} className="inline-flex">
            <Flame
              size={ICON_SIZE_PX.sm}
              weight={ICON_WEIGHT_DEFAULT}
              className="text-text-default-accent"
              aria-hidden
            />
          </span>
          <motion.span
            key={displayCount}
            className="font-heading font-medium leading-none text-text-default-heading"
            style={{ fontSize: bodyStandard.size }}
            initial={shouldAnimate ? { scale: 0.3, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 480, damping: 10 }}
          >
            {displayCount}
          </motion.span>
        </div>

        <span
          className="text-center font-heading font-medium leading-none text-text-default-heading"
          style={{ fontSize: bodyBig.size }}
        >
          Narrative
          <span className="text-text-default-accent">Co</span>
        </span>

        <div className="flex items-center justify-end gap-[0.75rem]">
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={handleBellClick}
            className={iconButtonClass}
          >
            <span className="relative inline-flex">
              <Bell
                size={ICON_SIZE_PX.sm}
                weight={ICON_WEIGHT_DEFAULT}
                aria-hidden
              />
              <span
                className="absolute right-0 top-0 size-[0.5rem] translate-x-1/4 -translate-y-1/4 rounded-full bg-text-default-accent"
                aria-hidden
              />
            </span>
          </button>
          <button type="button" aria-label="Account" className={iconButtonClass}>
            <User
              size={ICON_SIZE_PX.sm}
              weight={ICON_WEIGHT_DEFAULT}
              aria-hidden
            />
          </button>
        </div>
      </header>

      <NotificationsPanel
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </>
  );
}
