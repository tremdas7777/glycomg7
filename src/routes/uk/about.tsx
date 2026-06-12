import { createFileRoute } from "@tanstack/react-router";
import { UkSiteLayout } from "@/components/uk/Layout";
import { ukHomeImages } from "@/lib/locale/uk/product-images";
import { StoreImage } from "@/components/site/StoreImage";
import { ukBrand } from "@/lib/locale/uk/brand";
import { ukPaths } from "@/lib/locale/uk/paths";

export const Route = createFileRoute("/uk/about")({
  head: () => ({
    meta: [
      { title: "About AiDEX | Healthtech for continuous monitoring" },
      {
        name: "description",
        content:
          "AiDEX is a healthtech company for continuous glucose monitoring with intelligent technology.",
      },
      { property: "og:title", content: "About AiDEX" },
      {
        property: "og:description",
        content: "Healthtech for continuous glucose monitoring.",
      },
      { property: "og:url", content: ukPaths.about },
    ],
    links: [{ rel: "canonical", href: ukPaths.about }],
  }),
  component: Page,
});

function Page() {
  return (
    <UkSiteLayout>
      <section className="pt-32 md:pt-44 pb-20">
        <div className="container-edge grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="eyebrow text-[var(--primary)] block mb-6">About us</span>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-balance">
              Medical technology <span className="italic">made accessible.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-4">
            <p className="text-lg text-[var(--ink)]/70 leading-relaxed">
              Healthtech for continuous glucose monitoring — premium design, intelligent technology,
              human experience.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(13,13,13,0.1)]">
        <div className="container-edge py-16">
          <StoreImage
            srcMobile={ukHomeImages.lifestyleRunning.mobile}
            srcDesktop={ukHomeImages.lifestyleRunning.desktop}
            alt="AiDEX lifestyle"
            variant="section-banner"
            bg={ukBrand.colors.surfaceTint}
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
            Making medical technology at the highest level accessible to millions — with simple,
            precise, and continuous glucose monitoring.
          </p>
        </div>
      </section>

      <section className="py-24 border-t border-[rgba(13,13,13,0.1)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-display italic text-5xl text-[var(--ink)]/80">02 —</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4">Values</h2>
          </div>
          <p className="lg:col-span-8 text-lg text-[var(--ink)]/70 leading-relaxed">
            Precision, transparency, user-centred design, and responsibility for the health of
            everyone who trusts AiDEX.
          </p>
        </div>
      </section>
    </UkSiteLayout>
  );
}
