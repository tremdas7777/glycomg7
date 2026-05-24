import type { ReactNode } from "react";
import { SiteLayout } from "./Layout";

export function PolicyPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <SiteLayout>
      <section className="py-16 md:py-28">
        <div className="container-edge max-w-3xl">
          <div className="chip mb-5">Políticas</div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance">{title}</h1>
          <p className="mt-5 text-muted-foreground leading-relaxed">{intro}</p>
          <div className="mt-12 space-y-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-muted-foreground [&_ul]:space-y-2">
            {children}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
