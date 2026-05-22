"use client";

import { useState } from "react";
import { ColorTab } from "@/components/design-system/color-tab";
import { ComponentsTab } from "@/components/design-system/components-tab";
import { SizingTab } from "@/components/design-system/sizing-tab";
import { TokensTab } from "@/components/design-system/tokens-tab";
import { TypographyTab } from "@/components/design-system/typography-tab";

const TABS = [
  { id: "color", label: "Color" },
  { id: "typography", label: "Typography" },
  { id: "sizing", label: "Sizing" },
  { id: "tokens", label: "Tokens" },
  { id: "components", label: "Components" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function DesignSystemTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("color");

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Design system sections"
        className="flex gap-1 border-b border-zinc-200"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={[
                "px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-b-2 border-foreground text-foreground -mb-px"
                  : "text-zinc-500 hover:text-foreground",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {TABS.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          className="py-8"
        >
          {tab.id === "color" && activeTab === "color" && <ColorTab />}
          {tab.id === "typography" && activeTab === "typography" && <TypographyTab />}
          {tab.id === "sizing" && activeTab === "sizing" && <SizingTab />}
          {tab.id === "tokens" && activeTab === "tokens" && <TokensTab />}
          {tab.id === "components" && activeTab === "components" && <ComponentsTab />}
        </div>
      ))}
    </div>
  );
}
