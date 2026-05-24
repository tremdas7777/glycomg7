import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { FaqSection, CtaFinal } from "@/components/site/sections";
import { BundleSelector } from "@/components/site/BundleSelector";
import { getBundle, brl, bundleDurationLabel, bundleMonitoringLabel, type BundleId } from "@/lib/bundles";
import { useState } from "react";
import { z } from "zod";
import { productGallery, productHeroImage, productKitImage } from "@/lib/product-images";
import { ShieldCheck, Truck, RotateCcw, Droplets, Clock, Smartphone, Bell, Activity } from "lucide-react";
import { PaymentMethods } from "@/components/site/PaymentMethods";

const searchSchema = z.object({
  kit: z.enum(["30", "60", "90"]).optional(),
});

export const Route = createFileRoute("/produto")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Glycom G7 CGM — Sensor de Glicose | Glycom" },
      { name: "description", content: "Sensor Glycom G7 CGM para monitoramento contínuo de glicose. Escolha entre Kit 30, 60 ou 90 dias. App em português, dados em tempo real." },
      { property: "og:title", content: "Glycom G7 CGM — Sensor de Glicose" },
      { property: "og:description", content: "Monitoramento contínuo de glicose 24h. Kits a partir de R$397." },
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
  const [selected, setSelected] = useState<BundleId>(search.kit ?? "60");
  const [activeImg, setActiveImg] = useState(0);
  const bundle = getBundle(selected);
  const features = [
    ...baseFeatures,
    { Icon: Clock, label: bundleMonitoringLabel(bundle) },
  ];

  const onSelect = (id: BundleId) => {
    setSelected(id);
    navigate({ search: { kit: id }, replace: true });
  };

  return (
    <SiteLayout>
      {/* ============ HERO PRODUCT ============ */}
      <section className="pt-4 md:pt-6 pb-20 md:pb-28">
        <div className="container-edge grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="lg:col-span-7 lg:sticky lg:top-[calc(var(--site-chrome-h,5.5rem)+0.75rem)]">
            <img
              src={gallery[activeImg].src}
              alt={gallery[activeImg].alt}
              className="store-image w-full h-auto transition-opacity duration-300"
              key={activeImg}
            />
            <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]/50">
              {gallery[activeImg].caption}
            </p>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {gallery.map((g, i) => (
                <button
                  key={g.src}
                  onClick={() => setActiveImg(i)}
                  className={`transition-all ${
                    activeImg === i
                      ? "ring-2 ring-[var(--ink)]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={g.caption}
                >
                  <img src={g.src} alt={g.alt} className="store-image w-full h-auto" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:col-span-5">
            <span className="eyebrow text-[var(--primary)] block mb-4">Glycom G7 · CGM</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-balance">
              Sensor de <span className="italic">glicose contínuo.</span>
            </h1>
            <p className="mt-5 text-[var(--ink)]/70 leading-relaxed text-[15px]">
              Tecnologia clínica de monitoramento contínuo. Dados em tempo real direto no seu celular, sem picadas, sem escaneamento.
            </p>

            {/* Bundle selector */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ink)]/60">
                  Escolha seu kit
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/40">
                  3 opções
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
                    {bundle.originalPrice && (
                      <span className="text-sm text-[var(--ink)]/40 line-through">
                        {brl(bundle.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[var(--ink)]/60 mt-2">
                    ou {bundle.installment}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate({ to: "/checkout", search: { kit: selected } })}
              className="mt-6 block w-full text-center bg-[var(--primary)] text-white py-5 text-xs font-bold uppercase tracking-[0.22em] rounded-xl hover:opacity-90 transition-all duration-300 hover:tracking-[0.26em]"
            >
              Comprar Agora
            </button>

            {/* Trust strip */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              <Trust Icon={Truck} title="Frete grátis" sub="Brasil" />
              <Trust Icon={ShieldCheck} title="Compra" sub="100% segura" />
              <Trust Icon={RotateCcw} title="7 dias" sub="garantia" />
            </div>

            <PaymentMethods className="mt-6" compact showTitle />

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
            <Spec k="Duração do kit" v={bundleDurationLabel(bundle)} />
            <Spec k="Resistência" v="IP28 · à prova d'água" />
            <Spec k="Conectividade" v="Bluetooth 5.0" />
            <Spec k="Leitura" v="A cada 1 minuto" />
            <Spec k="Aplicação" v="Indolor · braço" />
            <Spec k="Calibração" v="Zero calibração" />
            <Spec k="Compatibilidade" v="iOS e Android" />
            <Spec k="Garantia" v="7 dias + suporte" />
          </div>
        </div>
      </section>

      {/* ============ IN THE BOX ============ */}
      <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.08)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <img src={productKitImage} alt="Conteúdo do kit Glycom G7 — sensor, aplicador, adesivo e guias" className="store-image w-full h-auto" loading="lazy" />
          </div>
          <div className="lg:col-span-6">
            <div className="flex items-baseline gap-4 md:gap-6 mb-12">
              <span className="font-display italic text-4xl md:text-6xl text-[var(--ink)]/80">02 —</span>
              <h2 className="font-display text-4xl md:text-6xl">No seu kit</h2>
            </div>
            <ul className="space-y-5">
              {[
                [`${bundle.sensors}× Sensor Glycom G7 CGM`, `${bundle.days} dias de monitoramento · sensores de 15 dias`],
                [`${bundle.sensors}× Aplicador descartável`, "Aplicação indolor em segundos"],
                ["1× Guia rápido", "Em português, com passo a passo ilustrado"],
                ["Acesso ao App Glycom", "iOS · Android · em português brasileiro"],
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
