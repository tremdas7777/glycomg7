import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { FaqSection, CtaFinal } from "@/components/site/sections";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Glycom G7 CGM" },
      { name: "description", content: "Tudo sobre o Glycom G7 CGM: como funciona, duração, app, envio e mais." },
      { property: "og:title", content: "Perguntas frequentes Glycom" },
      { property: "og:description", content: "Tire suas dúvidas sobre o Glycom G7 CGM." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: () => (
    <SiteLayout>
      <FaqSection />
      <CtaFinal />
    </SiteLayout>
  ),
});
