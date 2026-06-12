import { createFileRoute } from "@tanstack/react-router";
import { UkSiteLayout } from "@/components/uk/Layout";
import { UkFaqSection, UkCtaFinal } from "@/components/uk/sections";
import { ukPaths } from "@/lib/locale/uk/paths";

export const Route = createFileRoute("/uk/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | AiDEX G7 glucose sensor" },
      {
        name: "description",
        content:
          "Answers about the AiDEX G7 glucose sensor: sensor duration, continuous monitoring, English app, delivery, warranty, and plans.",
      },
      { property: "og:title", content: "Frequently asked questions about AiDEX G7" },
      {
        property: "og:description",
        content: "Learn how continuous glucose monitoring works with AiDEX G7.",
      },
      { property: "og:url", content: ukPaths.faq },
    ],
    links: [{ rel: "canonical", href: ukPaths.faq }],
  }),
  component: () => (
    <UkSiteLayout>
      <UkFaqSection />
      <UkCtaFinal />
    </UkSiteLayout>
  ),
});
