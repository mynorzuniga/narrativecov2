"use client";

import { useState, type ReactNode } from "react";
import { OverlayContainerContext } from "@/components/overlay-container-context";

/** Logical viewport — phone preview (390×750). Design-system preview only. */
export const PHONE_PREVIEW_WIDTH_PX = 390;
export const PHONE_PREVIEW_HEIGHT_PX = 750;

type PhonePreviewFrameProps = {
  children: ReactNode;
};

export function PhonePreviewFrame({ children }: PhonePreviewFrameProps) {
  const [overlayRoot, setOverlayRoot] = useState<HTMLDivElement | null>(null);

  return (
    <OverlayContainerContext.Provider value={overlayRoot}>
      <div
        className="mx-auto overflow-hidden rounded-[2rem] border-[0.5rem] border-zinc-800 bg-surface-page-default shadow-lg"
        style={{
          width: PHONE_PREVIEW_WIDTH_PX,
          height: PHONE_PREVIEW_HEIGHT_PX,
        }}
      >
        <div
          ref={setOverlayRoot}
          className="relative flex h-full flex-col overflow-hidden"
        >
          <div className="relative z-10 flex h-full min-h-0 flex-col">{children}</div>
        </div>
      </div>
    </OverlayContainerContext.Provider>
  );
}
