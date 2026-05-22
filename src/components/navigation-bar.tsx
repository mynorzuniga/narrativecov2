"use client";

import { BookOpen, House } from "@phosphor-icons/react";
import { useState } from "react";
import { ICON_SIZE_PX, ICON_WEIGHT_DEFAULT } from "@/lib/icons/scale";
import { BODY_STYLES } from "@/lib/typography/scale";

const bodyBig = BODY_STYLES.find((s) => s.id === "big")!;

const sections = [
  { id: "home" as const, label: "Home", Icon: House },
  { id: "learn" as const, label: "Learn", Icon: BookOpen },
] as const;

type NavSection = (typeof sections)[number]["id"];

export function NavigationBar() {
  const [active, setActive] = useState<NavSection>("home");

  return (
    <nav
      className="flex h-[3.5rem] w-full border-t border-text-default-complementary bg-surface-container-default"
      aria-label="Main navigation"
    >
      {sections.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            aria-current={isActive ? "page" : undefined}
            onClick={() => setActive(id)}
            className={[
              "flex flex-1 items-center justify-center gap-[0.25rem] font-serif font-medium leading-none transition-colors",
              isActive
                ? "bg-surface-container-success text-text-success-heading"
                : "text-text-default-heading",
            ].join(" ")}
            style={{ fontSize: bodyBig.size }}
          >
            <Icon
              size={ICON_SIZE_PX.md}
              weight={ICON_WEIGHT_DEFAULT}
              aria-hidden
            />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
