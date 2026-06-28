import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MxSiteLayout } from "@/components/mx/Layout";
import { MxFaqSection, MxCtaFinal, MxProductUsageSection } from "@/components/mx/sections";
import { MxBundleSelector } from "@/components/mx/BundleSelector";
import {
  mxBundles,
  getMxBundle,
  mxn,
  mxBundleDurationLabel,
  mxBundleMonitoringLabel,
  mxBundleTotalDaysLabel,
  MX_SENSOR_DAYS,
  type MxBundleId,
} from "@/lib/locale/mx/bundles";
import { mxBrand } from "@/lib/locale/mx/brand";
import { useState } from "react";
import {
  mxProductGallery,
  mxProductHeroImage,
  mxProductKitImage,
} from "@/lib/locale/mx/product-images";
import { mxPaths } from "@/lib/locale/mx/paths";
import { bundleIdFromSearch, planSearchSchema } from "@/lib/plan-search";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Droplets,
  Clock,
  Smartphone,
  Bell,
  Activity,
  Bluetooth,
} from "lucide-react";
import { StoreImage } from "@/components/site/StoreImage";
import { trackCheckoutClick } from "@/lib/analytics";
import { isMxCheckoutConfigured } from "@/lib/locale/mx/shopify";

const entryPrice = mxBundles[0].price;

export const Route = createFileRoute("/mx/producto")({
  validateSearch: planSearchSchema,
  head: () => ({
    meta: [
      { title: "AiDEX G7 — Sensor de glucosa y planes CGM | AiDEX" },
      {
        name: "description",
        content: `Compra el sensor de glucosa AiDEX G7 para monitoreo continuo en tiempo real. Planes de 1, 2 o 3 meses, kit mínimo con 2 sensores (${MX_SENSOR_DAYS} días cada uno), app en español y envío gratis a México.`,
      },
      { property: "og:title", content: "AiDEX G7 — Sensor de glucosa y planes CGM" },
      {
        property: "og:description",
        content: `Sensor CGM AiDEX G7 para glucosa 24h en tu celular. Desde ${mxn(entryPrice)} · kit con 2 sensores para 1 mes.`,
      },
      { property: "og:url", content: mxPaths.product },
      { property: "og:image", content: mxProductHeroImage },
    ],
    links: [{ rel: "canonical", href: mxPaths.product }],
  }),
  component: Page,
});

const baseFeatures = [
  { Icon: Activity, label: "Monitoreo continuo 24h en tiempo real" },
  { Icon: Bell, label: "Alertas inteligentes de hipo e hiperglucemia" },
  { Icon: Smartphone, label: "App en español · iOS y Android" },
  { Icon: Droplets, label: "Resistente al agua · baño y actividades acuáticas" },
] as const;

const gallery = mxProductGallery;

function Page() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/mx/producto" });
  const initialId = bundleIdFromSearch(search) as MxBundleId;
  const [selected, setSelected] = useState<MxBundleId>(initialId);
  const [activeImg, setActiveImg] = useState(0);
  const bundle = getMxBundle(selected);
  const active = gallery[activeImg];
  const features = [...baseFeatures, { Icon: Clock, label: mxBundleMonitoringLabel(bundle) }];

  const onSelect = (id: MxBundleId) => {
    setSelected(id);
    navigate({ search: { plano: id }, replace: true });
  };

  return (
    <MxSiteLayout>
      <ProductStructuredData />
      <section className="pt-0 pb-20 md:pb-28">
        <div className="container-edge grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
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

          <div className="lg:col-span-5">
            <span className="mb-6 block text-3xl font-extrabold uppercase leading-none tracking-[0.12em] text-[var(--primary)] md:text-4xl">
              {mxBrand.productName}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-balance">
              Sensor <span className="italic">continuo de glucosa.</span>
            </h1>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/10 px-4 py-2 text-sm font-medium text-[var(--primary)]">
              <Bluetooth className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              <span>No necesitas transmisor — se conecta directo al celular por Bluetooth</span>
            </div>
            <p className="mt-5 text-[var(--ink)]/70 leading-relaxed text-[15px]">
              Tecnología clínica para el monitoreo continuo de glucosa. Cada sensor dura {MX_SENSOR_DAYS} días — el kit mínimo incluye {mxBrand.sensorsPerMonth} sensores para 1 mes completo. Elige el plan de 1, 2 o 3 meses. Datos en tiempo real en tu celular, sin pinchazos de rutina, sin escanear.
            </p>

            <div className="mt-10">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ink)]/60">
                  Elige tu plan
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/40">
                  3 planes
                </span>
              </div>
              <MxBundleSelector selected={selected} onSelect={onSelect} />
            </div>

            <div className="mt-8 border-t border-[rgba(13,13,13,0.1)] pt-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/50">
                    {bundle.name}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/40 mt-1">
                    {mxBundleDurationLabel(bundle)}
                  </div>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="font-display text-5xl md:text-6xl leading-none">
                      {mxn(bundle.price)}
                    </span>
                    {bundle.compareAtPrice && (
                      <span className="text-sm text-[var(--ink)]/40 line-through">
                        {mxn(bundle.compareAtPrice)}
                      </span>
                    )}
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
              className="mt-6 flex items-center justify-center gap-2 w-full text-center bg-[var(--primary)] text-white py-5 text-xs font-bold uppercase tracking-[0.22em] rounded-xl hover:opacity-90 transition-all duration-300 hover:tracking-[0.26em]"
            >
              Comprar ahora
            </a>

            {!isMxCheckoutConfigured() && (
              <p className="mt-3 text-xs text-[var(--ink)]/50 text-center">
                Los enlaces de pago estarán disponibles muy pronto.
              </p>
            )}

            <div className="mt-6 grid grid-cols-3 gap-2">
              <Trust Icon={Truck} title="Envío" sub="gratis" />
              <Trust Icon={ShieldCheck} title="Compra" sub="segura" />
              <Trust Icon={RotateCcw} title="14 días" sub="devolución" />
            </div>

            <ul className="mt-8">
              {features.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-4 border-b border-[rgba(13,13,13,0.06)] py-4 text-sm"
                >
                  <Icon className="w-4 h-4 text-[var(--primary)] shrink-0" strokeWidth={1.5} />
                  <span className="text-[var(--ink)]/80">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-[rgba(13,13,13,0.08)] py-24 md:py-32">
        <div className="container-edge">
          <div className="flex items-baseline gap-4 md:gap-6 mb-16">
            <span className="font-display italic text-4xl md:text-6xl text-[var(--ink)]/80">
              01 —
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-balance">Especificaciones técnicas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(13,13,13,0.08)] border border-[rgba(13,13,13,0.08)] rounded-xl overflow-hidden">
            <Spec k="Monitoreo total" v={mxBundleTotalDaysLabel(bundle)} />
            <Spec k="Grado de protección" v="IP68 · resistente al agua" />
            <Spec k="Duración por sensor" v={`${MX_SENSOR_DAYS} días por sensor`} />
            <Spec k="Precisión (MARD)" v="8.66%" />
            <Spec k="Tiempo de activación" v="1 hora" />
            <Spec k="Conectividad" v="Bluetooth 5.0" />
            <Spec k="Intervalo de lectura" v="Cada 1 minuto" />
            <Spec k="Aplicación" v="Sin dolor · brazo" />
            <Spec k="Calibración" v="Sin calibración" />
            <Spec k="Compatibilidad" v="iOS y Android" />
            <Spec k="Garantía" v="14 días + soporte" />
          </div>
        </div>
      </section>

      <MxProductUsageSection />

      <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.08)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <StoreImage
              src={mxProductKitImage}
              alt="Contenido AiDEX G7 — sensor, aplicador, parche adhesivo y guías"
              variant="section-content"
              bg="#ffffff"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-6">
            <div className="flex items-baseline gap-4 md:gap-6 mb-12">
              <span className="font-display italic text-4xl md:text-6xl text-[var(--ink)]/80">
                02 —
              </span>
              <h2 className="font-display text-4xl md:text-6xl">En tu pedido</h2>
            </div>
            <ul className="space-y-5">
              {[
                [
                  `${bundle.sensors}× sensor AiDEX G7`,
                  `${mxBundleTotalDaysLabel(bundle)} de monitoreo · ${MX_SENSOR_DAYS} días por sensor`,
                ],
                [`${bundle.sensors}× aplicador de un solo uso`, "Aplicación sin dolor en segundos"],
                ["1× guía de inicio rápido", "En español, con imágenes paso a paso"],
                ["Acceso a la app AiDEX", "iOS · Android · en español"],
              ].map(([t, s]) => (
                <li
                  key={t}
                  className="flex items-start gap-5 border-b border-[rgba(13,13,13,0.06)] pb-5"
                >
                  <span className="text-[var(--primary)] font-display text-2xl leading-none mt-1">
                    +
                  </span>
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

      <MxFaqSection limit={8} />
      <MxCtaFinal />
    </MxSiteLayout>
  );
}

function ProductStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: mxBrand.productName,
    image: mxProductHeroImage,
    description:
      "Sensor de glucosa AiDEX G7 para monitoreo continuo en tiempo real con app en español, alertas inteligentes y planes de 1 a 3 meses.",
    brand: {
      "@type": "Brand",
      name: "AiDEX",
    },
    offers: mxBundles.map((bundle) => ({
      "@type": "Offer",
      name: bundle.name,
      price: bundle.price,
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
      url: bundle.checkoutUrl,
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

function Trust({ Icon, title, sub }: { Icon: typeof Truck; title: string; sub: string }) {
  return (
    <div className="store-card border border-[rgba(13,13,13,0.1)] p-4 flex flex-col items-center text-center gap-1.5">
      <Icon className="w-4 h-4 text-[var(--ink)]/70" strokeWidth={1.5} />
      <div className="text-[10px] uppercase tracking-[0.18em] font-bold leading-tight">{title}</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/50 leading-tight">
        {sub}
      </div>
    </div>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-white p-6 md:p-8">
      <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--ink)]/40">
        {k}
      </div>
      <div className="mt-3 font-display text-2xl md:text-3xl leading-tight">{v}</div>
    </div>
  );
}
