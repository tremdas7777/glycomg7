import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { homeImages } from "@/lib/product-images";
import { StoreImage } from "@/components/site/StoreImage";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a AiDEX | Healthtech de monitoramento contínuo" },
      { name: "description", content: "A AiDEX é uma healthtech dedicada ao monitoramento contínuo de glicose com tecnologia inteligente." },
      { property: "og:title", content: "Sobre a AiDEX" },
      { property: "og:description", content: "Healthtech dedicada ao monitoramento contínuo de glicose." },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="pt-32 md:pt-44 pb-20">
        <div className="container-edge grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="eyebrow text-[var(--primary)] block mb-6">Sobre</span>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-balance">
              Tecnologia médica <span className="italic">acessível.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-4">
            <p className="text-lg text-[var(--ink)]/70 leading-relaxed">
              Healthtech brasileira dedicada ao monitoramento contínuo de glicose — design premium, tecnologia inteligente, experiência humana.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(13,13,13,0.1)]">
        <div className="container-edge py-16">
          <StoreImage
            srcMobile={homeImages.lifestyleRunning.mobile}
            srcDesktop={homeImages.lifestyleRunning.desktop}
            alt="AiDEX lifestyle"
            variant="section-banner"
            bg={brand.colors.surfaceTint}
            loading="lazy"
          />
        </div>
      </section>

      <section className="py-24 border-t border-[rgba(13,13,13,0.1)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-display italic text-5xl text-[var(--ink)]/80">01 —</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4">Missão</h2>
          </div>
          <p className="lg:col-span-8 text-lg text-[var(--ink)]/70 leading-relaxed">
            Levar tecnologia médica de ponta para milhões de brasileiros, oferecendo uma experiência simples, precisa e contínua de acompanhamento da glicose.
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
            Precisão, transparência, design centrado no usuário e responsabilidade com a saúde de cada pessoa que confia na AiDEX.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
