import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { FaqSection, CtaFinal, ProductUsageSection } from "@/components/site/sections";
import { BundleSelector } from "@/components/site/BundleSelector";
import {
  bundles,
  getBundle,
  brl,
  bundleDurationLabel,
  bundleMonitoringLabel,
  bundleTotalDaysLabel,
  SENSOR_DAYS,
  type BundleId,
} from "@/lib/bundles";
import { brand } from "@/lib/brand";
import { useState } from "react";
import { productGallery, productHeroImage, productKitImage } from "@/lib/product-images";
import { bundleIdFromSearch, planSearchSchema } from "@/lib/plan-search";
import { ShieldCheck, Truck, RotateCcw, Droplets, Clock, Smartphone, Bell, Activity } from "lucide-react";
import { StoreImage } from "@/components/site/StoreImage";
import { trackCheckoutClick } from "@/lib/analytics";

const entryPrice = bundles[0].price;

export const Route = createFileRoute("/produto")({
  validateSearch: planSearchSchema,
  head: () => ({
    meta: [
      { title: "AiDEX G7 — Sensor de Glicose e Planos CGM | AiDEX" },
      {
        name: "description",
        content: `Compre AiDEX G7, sensor de glicose para monitoramento contínuo em tempo real. Planos de 1, 2 ou 3 meses, kit mínimo de 2 sensores (${SENSOR_DAYS} dias cada), app em português e frete grátis.`,
      },
      { property: "og:title", content: "AiDEX G7 — Sensor de Glicose e Planos CGM" },
      {
        property: "og:description",
        content: `Sensor CGM AiDEX G7 para acompanhar glicose 24h no celular. A partir de ${brl(entryPrice)} · kit com 2 sensores para 1 mês.`,
      },
      { property: "og:url", content: "/produto" },
      { property: "og:image", content: productHeroImage },
    ],
    links: [{ rel: "canonical", href: "/produto" }],
  }),
  component: Page,
});

const baseFeatures = [
  { Icon: Activity, label: "Monitoramento contínuo 24h em tempo real" },
  { Icon: Bell, label: "Alertas inteligentes de hipo e hiperglicemia" },
  { Icon: Smartphone, label: "App em português · iOS e Android" },
  { Icon: Droplets, label: "Resistente à água · banho e atividades aquáticas" },
] as const;

const gallery = productGallery;

function Page() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/produto" });
  const initialId = bundleIdFromSearch(search);
  const [selected, setSelected] = useState<BundleId>(initialId);
  const [activeImg, setActiveImg] = useState(0);
  const bundle = getBundle(selected);
  const active = gallery[activeImg];
  const features = [
    ...baseFeatures,
    { Icon: Clock, label: bundleMonitoringLabel(bundle) },
  ];

  const onSelect = (id: BundleId) => {
    setSelected(id);
    navigate({ search: { plano: id }, replace: true });
  };

  return (
    <SiteLayout>
      <ProductStructuredData />
      {/* ============ HERO PRODUCT ============ */}
      <section className="pt-0 pb-20 md:pb-28">
        <div className="container-edge grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="lg:col-span-7 lg:sticky lg:top-[calc(var(--site-chrome-h,5.5rem)+0.75rem)]">
            <StoreImage
              key={activeImg}
              src={active.src}
              alt={active.alt}
              variant="product-hero"
              bg={active.bg}
              loading="eager"
            />
            <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]/50">
              {gallery[activeImg].caption}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {gallery.map((g, i) => (
                <button
                  key={g.caption}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={g.caption}
                  aria-current={activeImg === i}
                  className={`shrink-0 h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-xl transition-opacity ${
                    activeImg === i ? "opacity-100" : "opacity-50 hover:opacity-75"
                  }`}
                >
                  <StoreImage
                    src={g.src}
                    alt=""
                    variant="product-thumb"
                    bg={g.bg}
                    loading="lazy"
                    frameClassName="h-full w-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:col-span-5">
            <span className="eyebrow text-[var(--primary)] block mb-4">{brand.productName}</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-balance">
              Sensor de <span className="italic">glicose contínuo.</span>
            </h1>
            <p className="mt-5 text-[var(--ink)]/70 leading-relaxed text-[15px]">
              Tecnologia clínica de monitoramento contínuo de glicose. Cada sensor dura {SENSOR_DAYS} dias — o kit
              mínimo traz {brand.sensorsPerMonth} sensores para 1 mês completo. Escolha o plano de 1, 2 ou 3 meses
              conforme sua necessidade. Dados em tempo real no celular, sem picadas de rotina, sem escaneamento.
            </p>

            {/* Bundle selector */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ink)]/60">
                  Escolha seu plano
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/40">
                  3 planos
                </span>
              </div>
              <BundleSelector selected={selected} onSelect={onSelect} />
            </div>

            {/* Summary */}
            <div className="mt-8 border-t border-[rgba(13,13,13,0.1)] pt-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/50">
                    {bundle.name}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/40 mt-1">
                    {bundleDurationLabel(bundle)}
                  </div>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="font-display text-5xl md:text-6xl leading-none">
                      {brl(bundle.price)}
                    </span>
                    {bundle.compareAtPrice && (
                      <span className="text-sm text-[var(--ink)]/40 line-through">
                        {brl(bundle.compareAtPrice)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[var(--ink)]/60 mt-2">
                    ou {bundle.installment}
                  </div>
                </div>
              </div>
            </div>

            <a
              href={bundle.checkoutUrl}
              onClick={() =>
                trackCheckoutClick({
                  source: "product_buy_box",
                  bundleId: bundle.id,
                  bundleName: bundle.name,
                  value: bundle.price,
                })
              }
              className="mt-6 flex items-center justify-center gap-2 w-full text-center bg-[var(--primary)] text-white py-5 text-xs font-bold uppercase tracking-[0.22em] rounded-xl hover:opacity-90 transition-all duration-300 hover:tracking-[0.26em] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Comprar Agora
            </a>

            {/* Trust strip */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              <Trust Icon={Truck} title="Frete grátis" sub="Brasil" />
              <Trust Icon={ShieldCheck} title="Compra" sub="100% segura" />
              <Trust Icon={RotateCcw} title="7 dias" sub="garantia" />
            </div>

            {/* Features */}
            <ul className="mt-8">
              {features.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-4 border-b border-[rgba(13,13,13,0.06)] py-4 text-sm">
                  <Icon className="w-4 h-4 text-[var(--primary)] shrink-0" strokeWidth={1.5} />
                  <span className="text-[var(--ink)]/80">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ SPECS ============ */}
      <section className="bg-white border-t border-[rgba(13,13,13,0.08)] py-24 md:py-32">
        <div className="container-edge">
          <div className="flex items-baseline gap-4 md:gap-6 mb-16">
            <span className="font-display italic text-4xl md:text-6xl text-[var(--ink)]/80">01 —</span>
            <h2 className="font-display text-4xl md:text-6xl text-balance">Especificações técnicas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(13,13,13,0.08)] border border-[rgba(13,13,13,0.08)] rounded-xl overflow-hidden">
            <Spec k="Monitoramento total" v={bundleTotalDaysLabel(bundle)} />
            <Spec k="Resistência" v="IP68 · à prova d'água" />
            <Spec k="Duração por sensor" v={`${SENSOR_DAYS} dias cada`} />
            <Spec k="Precisão (MARD)" v="8,66%" />
            <Spec k="Aquecimento" v="1 hora" />
            <Spec k="Conectividade" v="Bluetooth 5.0" />
            <Spec k="Leitura" v="A cada 1 minuto" />
            <Spec k="Aplicação" v="Indolor · braço" />
            <Spec k="Calibração" v="Zero calibração" />
            <Spec k="Compatibilidade" v="iOS e Android" />
            <Spec k="Garantia" v="7 dias + suporte" />
          </div>
        </div>
      </section>

      <ProductUsageSection />

      {/* ============ IN THE BOX ============ */}
      <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.08)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <StoreImage
              src={productKitImage}
              alt="Conteúdo AiDEX G7 — sensor, aplicador, adesivo e guias"
              variant="section-content"
              bg="#ffffff"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-6">
            <div className="flex items-baseline gap-4 md:gap-6 mb-12">
              <span className="font-display italic text-4xl md:text-6xl text-[var(--ink)]/80">02 —</span>
              <h2 className="font-display text-4xl md:text-6xl">No seu pedido</h2>
            </div>
            <ul className="space-y-5">
              {[
                [`${bundle.sensors}× Sensor AiDEX G7`, `${bundleTotalDaysLabel(bundle)} de monitoramento · ${SENSOR_DAYS} dias por sensor`],
                [`${bundle.sensors}× Aplicador descartável`, "Aplicação indolor em segundos"],
                ["1× Guia rápido", "Em português, com passo a passo ilustrado"],
                ["Acesso ao App AiDEX", "iOS · Android · em português brasileiro"],
              ].map(([t, s]) => (
                <li key={t} className="flex items-start gap-5 border-b border-[rgba(13,13,13,0.06)] pb-5">
                  <span className="text-[var(--primary)] font-display text-2xl leading-none mt-1">+</span>
                  <div>
                    <div className="text-base font-medium">{t}</div>
                    <div className="text-sm text-[var(--ink)]/55 mt-1">{s}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FaqSection limit={8} />
      <CtaFinal />
    </SiteLayout>
  );
}

function ProductStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: brand.productName,
    image: productHeroImage,
    description:
      "Sensor de glicose AiDEX G7 para monitoramento contínuo em tempo real, com app em português, alertas inteligentes e planos de 1 a 3 meses.",
    brand: {
      "@type": "Brand",
      name: "AiDEX",
    },
    offers: bundles.map((bundle) => ({
      "@type": "Offer",
      name: bundle.name,
      price: bundle.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: bundle.checkoutUrl,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function Trust({ Icon, title, sub }: { Icon: typeof Truck; title: string; sub: string }) {
  return (
    <div className="store-card border border-[rgba(13,13,13,0.1)] p-4 flex flex-col items-center text-center gap-1.5">
      <Icon className="w-4 h-4 text-[var(--ink)]/70" strokeWidth={1.5} />
      <div className="text-[10px] uppercase tracking-[0.18em] font-bold leading-tight">{title}</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/50 leading-tight">{sub}</div>
    </div>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-white p-6 md:p-8">
      <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--ink)]/40">{k}</div>
      <div className="mt-3 font-display text-2xl md:text-3xl leading-tight">{v}</div>
    </div>
  );
}
