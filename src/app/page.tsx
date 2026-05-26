import { DesignSystemTabs } from "@/components/design-system/design-system-tabs";

export default function Home() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <main className="mx-auto w-full max-w-screen-2xl px-6 py-16 sm:px-10 sm:py-20">
        <header className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            DevSavan - NarrativeCo
          </h1>
        </header>

        <DesignSystemTabs />
      </main>
    </div>
  );
}
