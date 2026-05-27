import { PhonePreviewFrame } from "@/components/design-system/phone-preview-frame";
import { Preview2Content } from "@/components/preview-2-content";

export default function Preview2Page() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <main className="relative mx-auto flex min-h-full max-w-screen-2xl flex-col px-6 py-16 sm:px-10 sm:py-20">
        <div className="flex flex-1 items-center justify-center">
          <PhonePreviewFrame>
            <Preview2Content />
          </PhonePreviewFrame>
        </div>
      </main>
    </div>
  );
}
