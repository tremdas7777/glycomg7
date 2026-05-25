import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { HeroBanner } from "@/components/site/HeroBanner";
import {
  HowItWorks, AppSplit, Comparison, Plans,
  EditorialQuote, FaqSection, CtaFinal,
} from "@/components/site/sections";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AiDEX G7 | Monitoramento Contínuo de Glicose" },
      { name: "description", content: "Monitoramento contínuo de glicose com AiDEX G7. Planos de 1 a 3 meses, kit mínimo com 2 sensores (15 dias cada). Alertas em tempo real e app em português." },
      { property: "og:title", content: "AiDEX G7 | Monitoramento Contínuo de Glicose" },
      { property: "og:description", content: "Tecnologia inteligente, alertas personalizados e acompanhamento 24h direto no celular." },
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
      <HowItWorks />
      <AppSplit />

      <Comparison />
      <Plans />
      <EditorialQuote />
      <FaqSection limit={6} />
      <CtaFinal />
    </SiteLayout>
  );
}
