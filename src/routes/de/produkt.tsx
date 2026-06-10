import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DeSiteLayout } from "@/components/de/Layout";
import { DeFaqSection, DeCtaFinal, DeProductUsageSection } from "@/components/de/sections";
import { DeBundleSelector } from "@/components/de/BundleSelector";
import {
  deBundles,
  getDeBundle,
  eur,
  deBundleDurationLabel,
  deBundleMonitoringLabel,
  deBundleTotalDaysLabel,
  DE_SENSOR_DAYS,
  type DeBundleId,
} from "@/lib/locale/de/bundles";
import { deBrand } from "@/lib/locale/de/brand";
import { useState } from "react";
import {
  deProductGallery,
  deProductHeroImage,
  deProductKitImage,
} from "@/lib/locale/de/product-images";
import { dePaths } from "@/lib/locale/de/paths";
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
} from "lucide-react";
import { StoreImage } from "@/components/site/StoreImage";
import { trackCheckoutClick } from "@/lib/analytics";
import { isDeCheckoutConfigured } from "@/lib/locale/de/shopify";

const entryPrice = deBundles[0].price;

export const Route = createFileRoute("/de/produkt")({
  validateSearch: planSearchSchema,
  head: () => ({
    meta: [
      { title: "AiDEX G7 — Glukose-Sensor und CGM-Pläne | AiDEX" },
      {
        name: "description",
        content: `Kaufen Sie den AiDEX G7 Glukose-Sensor für kontinuierliches Echtzeit-Monitoring. Pläne von 1, 2 oder 3 Monaten, Mindest-Kit mit 2 Sensoren (${DE_SENSOR_DAYS} Tage je Sensor), App auf Deutsch und kostenloser Versand.`,
      },
      { property: "og:title", content: "AiDEX G7 — Glukose-Sensor und CGM-Pläne" },
      {
        property: "og:description",
        content: `AiDEX G7 CGM-Sensor für 24h Glukose am Handy. Ab ${eur(entryPrice)} · Kit mit 2 Sensoren für 1 Monat.`,
      },
      { property: "og:url", content: dePaths.product },
      { property: "og:image", content: deProductHeroImage },
    ],
    links: [{ rel: "canonical", href: dePaths.product }],
  }),
  component: Page,
});

const baseFeatures = [
  { Icon: Activity, label: "24h kontinuierliches Echtzeit-Monitoring" },
  { Icon: Bell, label: "Intelligente Hypo- und Hyperglykämie-Alarme" },
  { Icon: Smartphone, label: "App auf Deutsch · iOS und Android" },
  { Icon: Droplets, label: "Wasserdicht · Duschen und Wasseraktivitäten" },
] as const;

const gallery = deProductGallery;

function Page() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/de/produkt" });
  const initialId = bundleIdFromSearch(search) as DeBundleId;
  const [selected, setSelected] = useState<DeBundleId>(initialId);
  const [activeImg, setActiveImg] = useState(0);
  const bundle = getDeBundle(selected);
  const active = gallery[activeImg];
  const features = [...baseFeatures, { Icon: Clock, label: deBundleMonitoringLabel(bundle) }];

  const onSelect = (id: DeBundleId) => {
    setSelected(id);
    navigate({ search: { plano: id }, replace: true });
  };

  return (
    <DeSiteLayout>
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
              {deBrand.productName}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-balance">
              Kontinuierlicher <span className="italic">Glukose-Sensor.</span>
            </h1>
            <p className="mt-5 text-[var(--ink)]/70 leading-relaxed text-[15px]">
              Klinische Technologie für kontinuierliches Glukose-Monitoring. Jeder Sensor hält{" "}
              {DE_SENSOR_DAYS} Tage — das Mindest-Kit enthält {deBrand.sensorsPerMonth} Sensoren für
              1 vollen Monat. Wählen Sie den Plan von 1, 2 oder 3 Monaten. Echtzeit-Daten auf dem
              Handy, ohne Routine-Stiche, ohne Scannen.
            </p>

            <div className="mt-10">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ink)]/60">
                  Wählen Sie Ihren Plan
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/40">
                  3 Pläne
                </span>
              </div>
              <DeBundleSelector selected={selected} onSelect={onSelect} />
            </div>

            <div className="mt-8 border-t border-[rgba(13,13,13,0.1)] pt-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/50">
                    {bundle.name}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/40 mt-1">
                    {deBundleDurationLabel(bundle)}
                  </div>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="font-display text-5xl md:text-6xl leading-none">
                      {eur(bundle.price)}
                    </span>
                    {bundle.compareAtPrice && (
                      <span className="text-sm text-[var(--ink)]/40 line-through">
                        {eur(bundle.compareAtPrice)}
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
              Jetzt kaufen
            </a>

            {!isDeCheckoutConfigured() && (
              <p className="mt-3 text-xs text-[var(--ink)]/50 text-center">
                Checkout-Links werden in Kürze aktiviert.
              </p>
            )}

            <div className="mt-6 grid grid-cols-3 gap-2">
              <Trust Icon={Truck} title="Kostenloser" sub="Versand" />
              <Trust Icon={ShieldCheck} title="Sicherer" sub="Kauf" />
              <Trust Icon={RotateCcw} title="14 Tage" sub="Widerruf" />
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
            <h2 className="font-display text-4xl md:text-6xl text-balance">
              Technische Spezifikationen
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(13,13,13,0.08)] border border-[rgba(13,13,13,0.08)] rounded-xl overflow-hidden">
            <Spec k="Gesamt-Monitoring" v={deBundleTotalDaysLabel(bundle)} />
            <Spec k="Schutzklasse" v="IP68 · wasserdicht" />
            <Spec k="Dauer pro Sensor" v={`${DE_SENSOR_DAYS} Tage je Sensor`} />
            <Spec k="Genauigkeit (MARD)" v="8,66%" />
            <Spec k="Aufwärmzeit" v="1 Stunde" />
            <Spec k="Konnektivität" v="Bluetooth 5.0" />
            <Spec k="Messintervall" v="Alle 1 Minute" />
            <Spec k="Anbringung" v="Schmerzfrei · Oberarm" />
            <Spec k="Kalibrierung" v="Keine Kalibrierung" />
            <Spec k="Kompatibilität" v="iOS und Android" />
            <Spec k="Garantie" v="14 Tage + Support" />
          </div>
        </div>
      </section>

      <DeProductUsageSection />

      <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.08)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <StoreImage
              src={deProductKitImage}
              alt="AiDEX G7 Inhalt — Sensor, Applikator, Klebeband und Anleitungen"
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
              <h2 className="font-display text-4xl md:text-6xl">In Ihrer Bestellung</h2>
            </div>
            <ul className="space-y-5">
              {[
                [
                  `${bundle.sensors}× AiDEX G7 Sensor`,
                  `${deBundleTotalDaysLabel(bundle)} Monitoring · ${DE_SENSOR_DAYS} Tage pro Sensor`,
                ],
                [`${bundle.sensors}× Einweg-Applikator`, "Schmerzfreie Anbringung in Sekunden"],
                ["1× Schnellanleitung", "Auf Deutsch, mit Schritt-für-Schritt-Bildern"],
                ["Zugang zur AiDEX App", "iOS · Android · auf Deutsch"],
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

      <DeFaqSection limit={8} />
      <DeCtaFinal />
    </DeSiteLayout>
  );
}

function ProductStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: deBrand.productName,
    image: deProductHeroImage,
    description:
      "AiDEX G7 Glukose-Sensor für kontinuierliches Echtzeit-Monitoring mit App auf Deutsch, intelligenten Alarmen und Plänen von 1 bis 3 Monaten.",
    brand: {
      "@type": "Brand",
      name: "AiDEX",
    },
    offers: deBundles.map((bundle) => ({
      "@type": "Offer",
      name: bundle.name,
      price: bundle.price,
      priceCurrency: "EUR",
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
