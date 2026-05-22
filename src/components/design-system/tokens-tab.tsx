"use client";

import { useState } from "react";
import { TokensColorSubtab } from "@/components/design-system/tokens-color-subtab";

const SUBTABS = [{ id: "tokens-color", label: "tokens-color" }] as const;

type SubtabId = (typeof SUBTABS)[number]["id"];

export function TokensTab() {
  const [activeSubtab, setActiveSubtab] = useState<SubtabId>("tokens-color");

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Semantic token sections"
        className="flex gap-1 border-b border-zinc-200"
      >
        {SUBTABS.map((subtab) => {
          const isActive = activeSubtab === subtab.id;
          return (
            <button
              key={subtab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`subpanel-${subtab.id}`}
              id={`subtab-${subtab.id}`}
              onClick={() => setActiveSubtab(subtab.id)}
              className={[
                "px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-b-2 border-foreground text-foreground -mb-px"
                  : "text-zinc-500 hover:text-foreground",
              ].join(" ")}
            >
              {subtab.label}
            </button>
          );
        })}
      </div>

      {SUBTABS.map((subtab) => (
        <div
          key={subtab.id}
          role="tabpanel"
          id={`subpanel-${subtab.id}`}
          aria-labelledby={`subtab-${subtab.id}`}
          hidden={activeSubtab !== subtab.id}
          className="py-8"
        >
          {subtab.id === "tokens-color" && activeSubtab === "tokens-color" && (
            <TokensColorSubtab />
          )}
        </div>
      ))}
    </div>
  );
}
