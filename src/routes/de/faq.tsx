import { createFileRoute } from "@tanstack/react-router";
import { DeSiteLayout } from "@/components/de/Layout";
import { DeFaqSection, DeCtaFinal } from "@/components/de/sections";
import { dePaths } from "@/lib/locale/de/paths";

export const Route = createFileRoute("/de/faq")({
  head: () => ({
    meta: [
      { title: "Häufige Fragen | AiDEX G7 Glukose-Sensor" },
      {
        name: "description",
        content:
          "Antworten zum AiDEX G7 Glukose-Sensor: Sensor-Dauer, kontinuierliches Monitoring, App auf Deutsch, Versand, Garantie und Pläne.",
      },
      { property: "og:title", content: "Häufige Fragen zum AiDEX G7 Sensor" },
      {
        property: "og:description",
        content:
          "Erfahren Sie, wie das kontinuierliche Glukose-Monitoring mit AiDEX G7 funktioniert.",
      },
      { property: "og:url", content: dePaths.faq },
    ],
    links: [{ rel: "canonical", href: dePaths.faq }],
  }),
  component: () => (
    <DeSiteLayout>
      <DeFaqSection />
      <DeCtaFinal />
    </DeSiteLayout>
  ),
});
