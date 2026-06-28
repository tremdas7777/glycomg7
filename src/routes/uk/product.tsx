import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UkSiteLayout } from "@/components/uk/Layout";
import { UkFaqSection, UkCtaFinal, UkProductUsageSection } from "@/components/uk/sections";
import { UkBundleSelector } from "@/components/uk/BundleSelector";
import {
  ukBundles,
  getUkBundle,
  gbp,
  ukBundleDurationLabel,
  ukBundleMonitoringLabel,
  ukBundleTotalDaysLabel,
  UK_SENSOR_DAYS,
  type UkBundleId,
} from "@/lib/locale/uk/bundles";
import { ukBrand } from "@/lib/locale/uk/brand";
import { useState } from "react";
import {
  ukProductGallery,
  ukProductHeroImage,
  ukProductKitImage,
} from "@/lib/locale/uk/product-images";
import { ukPaths } from "@/lib/locale/uk/paths";
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
import { isUkCheckoutConfigured } from "@/lib/locale/uk/shopify";

const entryPrice = ukBundles[0].price;

export const Route = createFileRoute("/uk/product")({
  validateSearch: planSearchSchema,
  head: () => ({
    meta: [
      { title: "AiDEX G7 — Glucose sensor and CGM plans | AiDEX" },
      {
        name: "description",
        content: `Buy the AiDEX G7 glucose sensor for continuous real-time monitoring. Plans of 1, 2, or 3 months, minimum kit with 2 sensors (${UK_SENSOR_DAYS} days per sensor), English app, and free UK delivery.`,
      },
      { property: "og:title", content: "AiDEX G7 — Glucose sensor and CGM plans" },
      {
        property: "og:description",
        content: `AiDEX G7 CGM sensor for 24h glucose on your phone. From ${gbp(entryPrice)} · kit with 2 sensors for 1 month.`,
      },
      { property: "og:url", content: ukPaths.product },
      { property: "og:image", content: ukProductHeroImage },
    ],
    links: [{ rel: "canonical", href: ukPaths.product }],
  }),
  component: Page,
});

const baseFeatures = [
  { Icon: Activity, label: "24h continuous real-time monitoring" },
  { Icon: Bell, label: "Smart hypo and hyperglycaemia alerts" },
  { Icon: Smartphone, label: "English app · iOS and Android" },
  { Icon: Droplets, label: "Waterproof · showering and water activities" },
] as const;

const gallery = ukProductGallery;

function Page() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/uk/product" });
  const initialId = bundleIdFromSearch(search) as UkBundleId;
  const [selected, setSelected] = useState<UkBundleId>(initialId);
  const [activeImg, setActiveImg] = useState(0);
  const bundle = getUkBundle(selected);
  const active = gallery[activeImg];
  const features = [...baseFeatures, { Icon: Clock, label: ukBundleMonitoringLabel(bundle) }];

  const onSelect = (id: UkBundleId) => {
    setSelected(id);
    navigate({ search: { plano: id }, replace: true });
  };

  return (
    <UkSiteLayout>
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
              {ukBrand.productName}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-balance">
              Continuous <span className="italic">glucose sensor.</span>
            </h1>
            <p className="mt-5 text-[var(--ink)]/70 leading-relaxed text-[15px]">
              Clinical technology for continuous glucose monitoring. Each sensor lasts {UK_SENSOR_DAYS}{" "}
              days — the minimum kit includes {ukBrand.sensorsPerMonth} sensors for 1 full month.
              Choose the 1-, 2-, or 3-month plan. Real-time data on your phone, no routine finger
              pricks, no scanning.
            </p>

            <div className="mt-10">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ink)]/60">
                  Choose your plan
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/40">
                  3 plans
                </span>
              </div>
              <UkBundleSelector selected={selected} onSelect={onSelect} />
            </div>

            <div className="mt-8 border-t border-[rgba(13,13,13,0.1)] pt-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/50">
                    {bundle.name}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/40 mt-1">
                    {ukBundleDurationLabel(bundle)}
                  </div>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="font-display text-5xl md:text-6xl leading-none">
                      {gbp(bundle.price)}
                    </span>
                    {bundle.compareAtPrice && (
                      <span className="text-sm text-[var(--ink)]/40 line-through">
                        {gbp(bundle.compareAtPrice)}
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
              Buy now
            </a>

            {!isUkCheckoutConfigured() && (
              <p className="mt-3 text-xs text-[var(--ink)]/50 text-center">
                Checkout links will be enabled shortly.
              </p>
            )}

            <div className="mt-6 grid grid-cols-3 gap-2">
              <Trust Icon={Truck} title="Free" sub="delivery" />
              <Trust Icon={ShieldCheck} title="Secure" sub="purchase" />
              <Trust Icon={RotateCcw} title="14 days" sub="returns" />
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
            <h2 className="font-display text-4xl md:text-6xl text-balance">Technical specifications</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(13,13,13,0.08)] border border-[rgba(13,13,13,0.08)] rounded-xl overflow-hidden">
            <Spec k="Total monitoring" v={ukBundleTotalDaysLabel(bundle)} />
            <Spec k="Protection rating" v="IP68 · waterproof" />
            <Spec k="Duration per sensor" v={`${UK_SENSOR_DAYS} days per sensor`} />
            <Spec k="Accuracy (MARD)" v="8.66%" />
            <Spec k="Warm-up time" v="1 hour" />
            <Spec k="Connectivity" v="Bluetooth 5.0" />
            <Spec k="Reading interval" v="Every 1 minute" />
            <Spec k="Application" v="Painless · upper arm" />
            <Spec k="Calibration" v="No calibration" />
            <Spec k="Compatibility" v="iOS and Android" />
            <Spec k="Warranty" v="14 days + support" />
          </div>
        </div>
      </section>

      <UkProductUsageSection />

      <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.08)]">
        <div className="container-edge grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <StoreImage
              src={ukProductKitImage}
              alt="AiDEX G7 contents — sensor, applicator, adhesive patch, and guides"
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
              <h2 className="font-display text-4xl md:text-6xl">In your order</h2>
            </div>
            <ul className="space-y-5">
              {[
                [
                  `${bundle.sensors}× AiDEX G7 sensor`,
                  `${ukBundleTotalDaysLabel(bundle)} monitoring · ${UK_SENSOR_DAYS} days per sensor`,
                ],
                [`${bundle.sensors}× single-use applicator`, "Painless application in seconds"],
                ["1× quick-start guide", "In English, with step-by-step images"],
                ["AiDEX app access", "iOS · Android · in English"],
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

      <UkFaqSection limit={8} />
      <UkCtaFinal />
    </UkSiteLayout>
  );
}

function ProductStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: ukBrand.productName,
    image: ukProductHeroImage,
    description:
      "AiDEX G7 glucose sensor for continuous real-time monitoring with English app, smart alerts, and plans from 1 to 3 months.",
    brand: {
      "@type": "Brand",
      name: "AiDEX",
    },
    offers: ukBundles.map((bundle) => ({
      "@type": "Offer",
      name: bundle.name,
      price: bundle.price,
      priceCurrency: "GBP",
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
