import { createFileRoute } from "@tanstack/react-router";
import { DeSiteLayout } from "@/components/de/Layout";
import { DeHeroBanner } from "@/components/de/HeroBanner";
import {
  DeHowItWorks,
  DeAppSplit,
  DeComparison,
  DePlans,
  DeTrustProofSection,
  DeIdealForSection,
  DeProductUsageSection,
  DeEditorialQuote,
  DeFaqSection,
  DeCtaFinal,
} from "@/components/de/sections";
import { dePaths } from "@/lib/locale/de/paths";

export const Route = createFileRoute("/de/")({
  head: () => ({
    meta: [
      { title: "AiDEX G7 | Glukose-Sensor ohne Routine-Stiche" },
      {
        name: "description",
        content:
          "AiDEX G7 Glukose-Sensor mit kontinuierlichem Monitoring, Echtzeit-Alarmen und App auf Deutsch. Pläne von 1 bis 3 Monaten mit Mindest-Kit von 2 Sensoren.",
      },
      { property: "og:title", content: "AiDEX G7 | Glukose-Sensor ohne Routine-Stiche" },
      {
        property: "og:description",
        content:
          "AiDEX G7 CGM für Echtzeit-Glukose am Handy, ohne ständiges Scannen und mit kostenlosem Versand in ganz Deutschland.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: dePaths.home },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: dePaths.home }],
  }),
  component: DeIndex,
});

function DeIndex() {
  return (
    <DeSiteLayout>
      <DeHeroBanner />
      <DeSeoIntro />
      <DeTrustProofSection />
      <DeIdealForSection />
      <DeHowItWorks />
      <DeProductUsageSection />
      <DeAppSplit />
      <DeComparison />
      <DePlans />
      <DeEditorialQuote />
      <DeFaqSection limit={6} />
      <DeCtaFinal />
    </DeSiteLayout>
  );
}

function DeSeoIntro() {
  return (
    <section className="border-b border-[rgba(13,13,13,0.08)] bg-white py-12 md:py-16">
      <div className="container-edge max-w-4xl">
        <p className="eyebrow text-[var(--primary)] mb-4">AiDEX G7 CGM-Sensor</p>
        <h2 className="font-display text-3xl md:text-5xl leading-tight text-balance">
          Kontinuierliches Glukose-Monitoring in Echtzeit, direkt auf Ihrem Handy.
        </h2>
        <p className="mt-5 text-sm md:text-base leading-relaxed text-[var(--ink)]/70">
          Der AiDEX G7 ist ein Glukose-Sensor für alle, die glicämische Trends 24 Stunden am Tag
          verfolgen möchten — mit intelligenten Alarmen, App auf Deutsch und ohne Routine-Stiche.
          Wählen Sie Pläne von 1, 2 oder 3 Monaten mit genügend Sensoren für kontinuierliches
          Monitoring.
        </p>
      </div>
    </section>
  );
}
