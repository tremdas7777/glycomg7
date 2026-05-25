import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { HeroBanner } from "@/components/site/HeroBanner";
import {
  HowItWorks, AppSplit, Comparison, Plans, TrustProofSection, IdealForSection, ProductUsageSection,
  EditorialQuote, FaqSection, CtaFinal,
} from "@/components/site/sections";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AiDEX G7 | Sensor de Glicose Sem Picadas de Rotina" },
      {
        name: "description",
        content:
          "Sensor de glicose AiDEX G7 com monitoramento contínuo, alertas em tempo real e app em português. Planos de 1 a 3 meses com kit mínimo de 2 sensores.",
      },
      { property: "og:title", content: "AiDEX G7 | Sensor de Glicose Sem Picadas de Rotina" },
      {
        property: "og:description",
        content:
          "CGM AiDEX G7 para acompanhar glicose em tempo real no celular, sem escaneamento constante e com frete grátis para todo o Brasil.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <HeroBanner />
      <SeoIntro />
      <TrustProofSection />
      <IdealForSection />
      <HowItWorks />
      <ProductUsageSection />
      <AppSplit />

      <Comparison />
      <Plans />
      <EditorialQuote />
      <FaqSection limit={6} />
      <CtaFinal />
    </SiteLayout>
  );
}

function SeoIntro() {
  return (
    <section className="border-b border-[rgba(13,13,13,0.08)] bg-white py-12 md:py-16">
      <div className="container-edge max-w-4xl">
        <p className="eyebrow text-[var(--primary)] mb-4">Sensor CGM AiDEX G7</p>
        <h2 className="font-display text-3xl md:text-5xl leading-tight text-balance">
          Monitoramento contínuo de glicose em tempo real, direto no celular.
        </h2>
        <p className="mt-5 text-sm md:text-base leading-relaxed text-[var(--ink)]/70">
          O AiDEX G7 é um sensor de glicose para quem busca acompanhar tendências glicêmicas 24h por dia,
          com alertas inteligentes, app em português e uso sem picadas de rotina. Escolha planos de 1, 2 ou
          3 meses com sensores suficientes para monitoramento contínuo.
        </p>
      </div>
    </section>
  );
}
