import { createFileRoute } from "@tanstack/react-router";
import { MxSiteLayout } from "@/components/mx/Layout";
import { MxHeroBanner } from "@/components/mx/HeroBanner";
import {
  MxHowItWorks,
  MxAppSplit,
  MxComparison,
  MxPlans,
  MxTrustProofSection,
  MxIdealForSection,
  MxProductUsageSection,
  MxEditorialQuote,
  MxFaqSection,
  MxCtaFinal,
} from "@/components/mx/sections";
import { mxPaths } from "@/lib/locale/mx/paths";

export const Route = createFileRoute("/mx/")({
  head: () => ({
    meta: [
      { title: "AiDEX G7 | Sensor de glucosa sin pinchazos de rutina" },
      {
        name: "description",
        content:
          "Sensor de glucosa AiDEX G7 con monitoreo continuo, alertas en tiempo real y app en español. Planes de 1 a 3 meses con kit mínimo de 2 sensores.",
      },
      { property: "og:title", content: "AiDEX G7 | Sensor de glucosa sin pinchazos de rutina" },
      {
        property: "og:description",
        content:
          "CGM AiDEX G7 para ver tu glucosa en tiempo real en el celular, sin escaneo constante y con envío gratis a México.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: mxPaths.home },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: mxPaths.home }],
  }),
  component: MxIndex,
});

function MxIndex() {
  return (
    <MxSiteLayout>
      <MxHeroBanner />
      <MxSeoIntro />
      <MxTrustProofSection />
      <MxIdealForSection />
      <MxHowItWorks />
      <MxProductUsageSection />
      <MxAppSplit />
      <MxComparison />
      <MxPlans />
      <MxEditorialQuote />
      <MxFaqSection limit={6} />
      <MxCtaFinal />
    </MxSiteLayout>
  );
}

function MxSeoIntro() {
  return (
    <section className="border-b border-[rgba(13,13,13,0.08)] bg-white py-12 md:py-16">
      <div className="container-edge max-w-4xl">
        <p className="eyebrow text-[var(--primary)] mb-4">Sensor CGM AiDEX G7</p>
        <h2 className="font-display text-3xl md:text-5xl leading-tight text-balance">
          Monitoreo continuo de glucosa en tiempo real, directo en tu celular.
        </h2>
        <p className="mt-5 text-sm md:text-base leading-relaxed text-[var(--ink)]/70">
          AiDEX G7 es un sensor de glucosa para quien quiere seguir sus tendencias glucémicas 24 horas — con alertas inteligentes, app en español y sin pinchazos de rutina. Elige planes de 1, 2 o 3 meses con sensores suficientes para monitoreo continuo.
        </p>
      </div>
    </section>
  );
}
