import { createFileRoute } from "@tanstack/react-router";
import { UkSiteLayout } from "@/components/uk/Layout";
import { UkHeroBanner } from "@/components/uk/HeroBanner";
import {
  UkHowItWorks,
  UkAppSplit,
  UkComparison,
  UkPlans,
  UkTrustProofSection,
  UkIdealForSection,
  UkProductUsageSection,
  UkEditorialQuote,
  UkFaqSection,
  UkCtaFinal,
} from "@/components/uk/sections";
import { ukPaths } from "@/lib/locale/uk/paths";

export const Route = createFileRoute("/uk/")({
  head: () => ({
    meta: [
      { title: "AiDEX G7 | Glucose sensor without routine finger pricks" },
      {
        name: "description",
        content:
          "AiDEX G7 glucose sensor with continuous monitoring, real-time alerts, and English app. Plans from 1 to 3 months with a minimum kit of 2 sensors.",
      },
      { property: "og:title", content: "AiDEX G7 | Glucose sensor without routine finger pricks" },
      {
        property: "og:description",
        content:
          "AiDEX G7 CGM for real-time glucose on your phone, without constant scanning and with free delivery across the UK.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: ukPaths.home },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: ukPaths.home }],
  }),
  component: UkIndex,
});

function UkIndex() {
  return (
    <UkSiteLayout>
      <UkHeroBanner />
      <UkSeoIntro />
      <UkTrustProofSection />
      <UkIdealForSection />
      <UkHowItWorks />
      <UkProductUsageSection />
      <UkAppSplit />
      <UkComparison />
      <UkPlans />
      <UkEditorialQuote />
      <UkFaqSection limit={6} />
      <UkCtaFinal />
    </UkSiteLayout>
  );
}

function UkSeoIntro() {
  return (
    <section className="border-b border-[rgba(13,13,13,0.08)] bg-white py-12 md:py-16">
      <div className="container-edge max-w-4xl">
        <p className="eyebrow text-[var(--primary)] mb-4">AiDEX G7 CGM sensor</p>
        <h2 className="font-display text-3xl md:text-5xl leading-tight text-balance">
          Continuous glucose monitoring in real time, straight on your phone.
        </h2>
        <p className="mt-5 text-sm md:text-base leading-relaxed text-[var(--ink)]/70">
          AiDEX G7 is a glucose sensor for anyone who wants to track glycaemic trends 24 hours a
          day — with smart alerts, English app, and no routine finger pricks. Choose plans of 1, 2,
          or 3 months with enough sensors for continuous monitoring.
        </p>
      </div>
    </section>
  );
}
