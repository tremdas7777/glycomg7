import { createFileRoute } from "@tanstack/react-router";
import { DeSiteLayout } from "@/components/de/Layout";
import { deHomeImages } from "@/lib/locale/de/product-images";
import { StoreImage } from "@/components/site/StoreImage";
import { deBrand } from "@/lib/locale/de/brand";
import { dePaths } from "@/lib/locale/de/paths";

export const Route = createFileRoute("/de/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über AiDEX | Healthtech für kontinuierliches Monitoring" },
      {
        name: "description",
        content:
          "AiDEX ist eine Healthtech für kontinuierliches Glukose-Monitoring mit intelligenter Technologie.",
      },
      { property: "og:title", content: "Über AiDEX" },
      {
        property: "og:description",
        content: "Healthtech für kontinuierliches Glukose-Monitoring.",
      },
      { property: "og:url", content: dePaths.about },
    ],
    links: [{ rel: "canonical", href: dePaths.about }],
  }),
  component: Page,
});

function Page() {
  return (
    <DeSiteLayout>
      <section className="pt-32 md:pt-44 pb-20">
        <div className="container-edge grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="eyebrow text-[var(--primary)] block mb-6">Über uns</span>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-balance">
              Medizintechnik <span className="italic">zugänglich.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-4">
            <p className="text-lg text-[var(--ink)]/70 leading-relaxed">
              Healthtech für kontinuierliches Glukose-Monitoring — Premium-Design, intelligente
              Technologie, menschliche Erfahrung.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(13,13,13,0.1)]">
        <div className="container-edge py-16">
          <StoreImage
            srcMobile={deHomeImages.lifestyleRunning.mobile}
            srcDesktop={deHomeImages.lifestyleRunning.desktop}
            alt="AiDEX Lifestyle"
            variant="section-banner"
            bg={deBrand.colors.surfaceTint}
            loading="lazy"
          />
        </div>
      </section>

      <section className="py-24 border-t border-[rgba(13,13,13,0.1)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-display italic text-5xl text-[var(--ink)]/80">01 —</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4">Mission</h2>
          </div>
          <p className="lg:col-span-8 text-lg text-[var(--ink)]/70 leading-relaxed">
            Medizintechnik auf höchstem Niveau für Millionen Menschen zugänglich machen — mit einer
            einfachen, präzisen und kontinuierlichen Glukose-Überwachung.
          </p>
        </div>
      </section>

      <section className="py-24 border-t border-[rgba(13,13,13,0.1)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-display italic text-5xl text-[var(--ink)]/80">02 —</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4">Werte</h2>
          </div>
          <p className="lg:col-span-8 text-lg text-[var(--ink)]/70 leading-relaxed">
            Präzision, Transparenz, nutzerzentriertes Design und Verantwortung für die Gesundheit
            jedes Menschen, der AiDEX vertraut.
          </p>
        </div>
      </section>
    </DeSiteLayout>
  );
}
