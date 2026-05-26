import { PageNavLinks } from "@/components/design-system/page-nav-links";
import { PhonePreviewFrame } from "@/components/design-system/phone-preview-frame";
import { PreviewContent } from "@/components/preview-content";

export default function PreviewPage() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <main className="relative mx-auto flex min-h-full max-w-screen-2xl flex-col px-6 py-16 sm:px-10 sm:py-20">
        <div className="mb-8 flex justify-end">
          <PageNavLinks />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <PhonePreviewFrame>
            <PreviewContent />
          </PhonePreviewFrame>
        </div>
      </main>
    </div>
  );
}
