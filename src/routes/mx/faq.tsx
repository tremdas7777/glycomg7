import { createFileRoute } from "@tanstack/react-router";
import { MxSiteLayout } from "@/components/mx/Layout";
import { MxFaqSection, MxCtaFinal } from "@/components/mx/sections";
import { mxPaths } from "@/lib/locale/mx/paths";

export const Route = createFileRoute("/mx/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Sensor de glucosa AiDEX G7" },
      {
        name: "description",
        content:
          "Respuestas sobre el sensor de glucosa AiDEX G7: duración del sensor, monitoreo continuo, app en español, envíos, garantía y planes.",
      },
      { property: "og:title", content: "Preguntas frecuentes sobre AiDEX G7" },
      {
        property: "og:description",
        content: "Conoce cómo funciona el monitoreo continuo de glucosa con AiDEX G7.",
      },
      { property: "og:url", content: mxPaths.faq },
    ],
    links: [{ rel: "canonical", href: mxPaths.faq }],
  }),
  component: () => (
    <MxSiteLayout>
      <MxFaqSection />
      <MxCtaFinal />
    </MxSiteLayout>
  ),
});
