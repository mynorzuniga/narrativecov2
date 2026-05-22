"use client";

import { X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useOverlayContainer } from "@/components/overlay-container-context";
import { ICON_SIZE_PX, ICON_WEIGHT_DEFAULT } from "@/lib/icons/scale";
import { BODY_STYLES, HEADING_STYLES } from "@/lib/typography/scale";

const heading4 = HEADING_STYLES.find((s) => s.id === "h4")!;
const bodyStandard = BODY_STYLES.find((s) => s.id === "body")!;

const mockNotifications = [
  {
    id: "1",
    title: "Daily streak reminder",
    body: "You are on a 7-day streak. Open today’s chapter to keep it going.",
  },
  {
    id: "2",
    title: "New lesson available",
    body: "“The Art of Narrative” has a new section ready for you.",
  },
  {
    id: "3",
    title: "Progress milestone",
    body: "You completed 80% of this week’s course material. Nice work.",
  },
] as const;

type NotificationsPanelProps = {
  open: boolean;
  onClose: () => void;
};

export function NotificationsPanel({ open, onClose }: NotificationsPanelProps) {
  const overlayRoot = useOverlayContainer();
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!portalReady || typeof document === "undefined") return null;

  const contained = overlayRoot !== null;
  const portalTarget = overlayRoot ?? document.body;
  const overlayPositionClass = contained ? "absolute" : "fixed";

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={`${overlayPositionClass} inset-0 z-50`}>
          <motion.button
            type="button"
            aria-label="Close notifications"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-text-default-heading/20"
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="notifications-panel-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-0 flex h-full w-[80%] flex-col bg-surface-page-default shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-text-default-complementary px-[1rem] py-[1rem]">
              <h2
                id="notifications-panel-title"
                className="font-serif font-semibold leading-tight text-text-default-heading"
                style={{ fontSize: heading4.size }}
              >
                Notifications
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close notifications"
                className="inline-flex text-text-default-complementary"
              >
                <X
                  size={ICON_SIZE_PX.md}
                  weight={ICON_WEIGHT_DEFAULT}
                  aria-hidden
                />
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto divide-y divide-text-default-complementary">
              {mockNotifications.map((notification) => (
                <li key={notification.id} className="px-[1rem] py-[1rem]">
                  <p
                    className="font-serif font-medium leading-snug text-text-default-heading"
                    style={{ fontSize: bodyStandard.size }}
                  >
                    {notification.title}
                  </p>
                  <p
                    className="mt-[0.25rem] font-serif font-normal leading-normal text-text-default-body"
                    style={{ fontSize: bodyStandard.size }}
                  >
                    {notification.body}
                  </p>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    portalTarget,
  );
}
