import { createFileRoute } from "@tanstack/react-router";
import { MxSiteLayout } from "@/components/mx/Layout";
import { mxHomeImages } from "@/lib/locale/mx/product-images";
import { StoreImage } from "@/components/site/StoreImage";
import { mxBrand } from "@/lib/locale/mx/brand";
import { mxPaths } from "@/lib/locale/mx/paths";

export const Route = createFileRoute("/mx/nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre AiDEX | Healthtech para monitoreo continuo" },
      {
        name: "description",
        content:
          "AiDEX es una empresa healthtech para el monitoreo continuo de glucosa con tecnología inteligente.",
      },
      { property: "og:title", content: "Sobre AiDEX" },
      {
        property: "og:description",
        content: "Healthtech para el monitoreo continuo de glucosa.",
      },
      { property: "og:url", content: mxPaths.about },
    ],
    links: [{ rel: "canonical", href: mxPaths.about }],
  }),
  component: Page,
});

function Page() {
  return (
    <MxSiteLayout>
      <section className="pt-32 md:pt-44 pb-20">
        <div className="container-edge grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="eyebrow text-[var(--primary)] block mb-6">Sobre nosotros</span>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-balance">
              Tecnología médica <span className="italic">al alcance de todos.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-4">
            <p className="text-lg text-[var(--ink)]/70 leading-relaxed">
              Healthtech para el monitoreo continuo de glucosa — diseño premium, tecnología inteligente, experiencia humana.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(13,13,13,0.1)]">
        <div className="container-edge py-16">
          <StoreImage
            srcMobile={mxHomeImages.lifestyleRunning.mobile}
            srcDesktop={mxHomeImages.lifestyleRunning.desktop}
            alt="Estilo de vida AiDEX"
            variant="section-banner"
            bg={mxBrand.colors.surfaceTint}
            loading="lazy"
          />
        </div>
      </section>

      <section className="py-24 border-t border-[rgba(13,13,13,0.1)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-display italic text-5xl text-[var(--ink)]/80">01 —</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4">Misión</h2>
          </div>
          <p className="lg:col-span-8 text-lg text-[var(--ink)]/70 leading-relaxed">
            Hacer accesible la tecnología médica del más alto nivel para millones de personas — con monitoreo de glucosa simple, preciso y continuo.
          </p>
        </div>
      </section>

      <section className="py-24 border-t border-[rgba(13,13,13,0.1)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-display italic text-5xl text-[var(--ink)]/80">02 —</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4">Valores</h2>
          </div>
          <p className="lg:col-span-8 text-lg text-[var(--ink)]/70 leading-relaxed">
            Precisión, transparencia, diseño centrado en el usuario y responsabilidad con la salud de todos los que confían en AiDEX.
          </p>
        </div>
      </section>
    </MxSiteLayout>
  );
}
