import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { UkHeader } from "./Header";
import { UkFooter } from "./Footer";
import { UkAnnouncementBar } from "./AnnouncementBar";

export function UkSiteLayout({ children }: { children: ReactNode }) {
  const chromeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = "en-GB";
  }, []);

  useEffect(() => {
    const el = chromeRef.current;
    if (!el) return;

    const update = () => {
      document.documentElement.style.setProperty("--site-chrome-h", `${el.offsetHeight}px`);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div ref={chromeRef} className="fixed top-0 inset-x-0 z-50 flex flex-col">
        <UkAnnouncementBar />
        <UkHeader />
      </div>
      <main className="flex-1" style={{ paddingTop: "var(--site-chrome-h, 7rem)" }}>
        {children}
      </main>
      <UkFooter />
    </div>
  );
}
