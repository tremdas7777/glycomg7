import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { FaqSection, CtaFinal } from "@/components/site/sections";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | AiDEX G7" },
      { name: "description", content: "Tudo sobre o AiDEX G7: como funciona, duração, app, envio e mais." },
      { property: "og:title", content: "Perguntas frequentes AiDEX" },
      { property: "og:description", content: "Tire suas dúvidas sobre o AiDEX G7." },
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
