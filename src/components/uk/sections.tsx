import { Link } from "@tanstack/react-router";
import { ukBrand } from "@/lib/locale/uk/brand";
import {
  ukBundles as bundleData,
  gbp as fmt,
  ukBundleDurationLabel,
  UK_FREE_DELIVERY_LABEL,
  UK_SENSOR_DAYS,
  UK_SENSORS_PER_MONTH,
} from "@/lib/locale/uk/bundles";
import { ukHomeImages } from "@/lib/locale/uk/product-images";
import { ukPaths } from "@/lib/locale/uk/paths";
import { StoreImage } from "@/components/site/StoreImage";
import { trackCheckoutClick } from "@/lib/analytics";
import useApplication from "@/assets/uk/aidex-use-application.webp";
import useFaq from "@/assets/uk/aidex-use-faq.webp";
import usePlacement from "@/assets/uk/aidex-use-placement.webp";
import useCare from "@/assets/uk/aidex-use-care.webp";

const { appIphone, lifestyleRunning } = ukHomeImages;

function NumberedHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 md:gap-6 mb-16 md:mb-24">
      <span className="font-display italic text-4xl md:text-6xl text-[var(--ink)]/80">
        {number} —
      </span>
      <h2 className="font-display text-4xl md:text-6xl text-balance">{title}</h2>
    </div>
  );
}

const trustItems = [
  {
    title: "Secure purchase",
    text: "External checkout via Shopify with a protected environment for your order.",
  },
  {
    title: "Free delivery",
    text: "Tracked shipping across the United Kingdom at no extra cost.",
  },
  {
    title: "14-day returns",
    text: "You have statutory consumer rights under UK law.",
  },
  {
    title: "Personal support",
    text: "Help choosing a plan, tracking your order, and using the sensor.",
  },
] as const;

export function UkTrustProofSection() {
  return (
    <section className="border-y border-[rgba(13,13,13,0.08)] bg-white py-12 md:py-16">
      <div className="container-edge">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[rgba(13,13,13,0.08)] bg-[rgba(13,13,13,0.08)] md:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.title} className="bg-white p-6 md:p-7">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                {item.title}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/65">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const idealFor = [
  "You want to track glucose spikes and drops throughout the day.",
  "You want fewer routine finger pricks and more comfort.",
  "You want to understand how food, exercise, and sleep affect glucose.",
  "You need alerts and history for conversations with healthcare professionals.",
] as const;

export function UkIdealForSection() {
  return (
    <section className="bg-[var(--paper)] py-20 md:py-28">
      <div className="container-edge grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <span className="eyebrow text-[var(--primary)]">Who it's for</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl leading-tight text-balance">
            More clarity for anyone who wants to keep a close eye on glucose.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[rgba(13,13,13,0.08)] bg-[rgba(13,13,13,0.08)] sm:grid-cols-2">
            {idealFor.map((item, index) => (
              <div key={item} className="bg-white p-7">
                <span className="font-display text-4xl italic text-[var(--primary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-sm md:text-base leading-relaxed text-[var(--ink)]/75">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-[var(--ink)]/45">
            AiDEX G7 supports glucose monitoring but does not replace individual medical advice.
          </p>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01",
    title: "Apply in seconds",
    text: "Discreet upper-arm sensor with single-use applicator and simple first-time setup.",
  },
  {
    n: "02",
    title: "Connect to the app",
    text: "Bluetooth sync with the English app for everyday use on your phone.",
  },
  {
    n: "03",
    title: "See 24h trends",
    text: "Track readings, peaks, drops, and patterns without constant scanning.",
  },
  {
    n: "04",
    title: "Decide with data",
    text: "Reports and alerts help you understand food, movement, sleep, and key moments.",
  },
];

export function UkHowItWorks() {
  return (
    <section id="technology" className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge">
        <NumberedHeader number="01" title="The clinical path" />
        <div className="grid md:grid-cols-4 gap-10 md:gap-12">
          {steps.map((s) => (
            <div key={s.n} className="group">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)]/30 group-hover:text-[var(--primary)] transition-colors">
                Step {s.n}
              </span>
              <h3 className="text-lg md:text-xl font-medium mt-4 mb-4">{s.title}</h3>
              <p className="text-sm text-[var(--ink)]/60 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const usageGuides = [
  { src: useApplication, alt: "Apply the AiDEX G7 sensor in four steps", title: "Application" },
  {
    src: usePlacement,
    alt: "Recommended placement sites for the AiDEX G7 sensor",
    title: "Placement",
  },
  { src: useFaq, alt: "Common questions about using AiDEX G7", title: "Questions" },
  { src: useCare, alt: "Care tips while wearing AiDEX G7", title: "Care" },
] as const;

export function UkProductUsageSection() {
  return (
    <section
      id="usage"
      className="bg-white py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]"
    >
      <div className="container-edge">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <span className="eyebrow text-[var(--primary)]">Product usage</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl leading-tight text-balance">
            Simple application, app pairing, and everyday care.
          </h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-[var(--ink)]/65">
            The visual guide was translated into English and aligned with AiDEX branding — for easy
            application, pairing, and care throughout monitoring.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {usageGuides.map((guide) => (
            <figure
              key={guide.title}
              className="overflow-hidden rounded-2xl border border-[rgba(13,13,13,0.08)] bg-[var(--paper)]"
            >
              <img
                src={guide.src}
                alt={guide.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain"
              />
              <figcaption className="border-t border-[rgba(13,13,13,0.08)] bg-white px-5 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ink)]/50">
                {guide.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const intel = [
  "Hypo and hyperglycaemia alerts",
  "Glucose trend charts",
  "AGP reports and daily monitoring",
  "Data sharing with family and healthcare professionals",
  "Organised data for a more informed routine",
];

export function UkAppSplit() {
  return (
    <section id="science" className="bg-white py-24 md:py-32">
      <div className="container-edge grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="order-2 lg:order-1 w-full">
          <StoreImage
            srcMobile={appIphone.mobile}
            srcDesktop={appIphone.desktop}
            alt="AiDEX app"
            variant="section-full"
            bg="#ffffff"
            loading="lazy"
          />
        </div>
        <div className="order-1 lg:order-2">
          <NumberedHeader number="02" title="Medical intelligence" />
          <p className="font-display italic text-xl md:text-2xl text-[var(--ink)]/80 mb-12 leading-snug max-w-md">
            "Continuous monitoring turns single readings into a clear picture of your glucose
            routine."
          </p>
          <ul>
            {intel.map((t) => (
              <li
                key={t}
                className="flex items-start gap-4 border-b border-[rgba(13,13,13,0.06)] py-6"
              >
                <span className="text-[var(--primary)] font-bold leading-none mt-0.5">+</span>
                <span className="text-xs md:text-sm uppercase tracking-[0.18em] font-semibold">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const compRows = [
  ["24h monitoring", true, false],
  ["Alerts on your phone", true, false],
  ["Trends and reports", true, false],
  ["No routine finger pricks", true, false],
  ["No constant scanning", true, false],
  ["Organised app history", true, false],
] as const;

export function UkComparison() {
  return (
    <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge">
        <NumberedHeader number="03" title="AiDEX G7 vs traditional testing" />
        <p className="mb-10 max-w-2xl text-sm md:text-base leading-relaxed text-[var(--ink)]/65">
          Traditional testing shows a single moment. AiDEX G7 helps you see glucose movement
          throughout the day — with alerts, charts, and history for a better understanding of your
          routine.
        </p>
        <div className="border border-[rgba(13,13,13,0.1)] rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)]/40 py-5 border-b border-[rgba(13,13,13,0.1)]">
            <div>Feature</div>
            <div className="text-center px-4 md:px-0">AiDEX G7</div>
            <div className="text-center px-4 md:px-0">Traditional</div>
          </div>
          {compRows.map(([f, a, b], i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_auto] md:grid-cols-3 py-6 border-b border-[rgba(13,13,13,0.06)] text-sm md:text-base items-center"
            >
              <div className="font-medium">{f}</div>
              <div className="text-center px-4 md:px-0">
                {a ? (
                  <span className="text-[var(--primary)] font-bold">+</span>
                ) : (
                  <span className="text-[var(--ink)]/30">—</span>
                )}
              </div>
              <div className="text-center px-4 md:px-0">
                {b ? (
                  <span className="text-[var(--primary)] font-bold">+</span>
                ) : (
                  <span className="text-[var(--ink)]/30">—</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UkPlans() {
  return (
    <section id="plans" className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge">
        <NumberedHeader number="04" title="Invest in your health" />
        <div className="grid md:grid-cols-3 gap-px bg-[rgba(13,13,13,0.08)] border border-[rgba(13,13,13,0.08)] rounded-xl overflow-hidden">
          {bundleData.map((p) => (
            <div
              key={p.id}
              className={`flex flex-col justify-between p-10 md:p-12 transition-all group relative ${
                p.featured
                  ? "bg-[var(--primary)] text-white overflow-hidden shadow-[0_20px_60px_-20px_rgba(101,163,13,0.45)]"
                  : "bg-white hover:bg-[var(--paper)]"
              }`}
            >
              {p.badge && (
                <div
                  className={`absolute top-0 right-0 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.1em] rounded-bl-xl ${
                    p.featured ? "bg-white text-[var(--primary)]" : "bg-[var(--primary)] text-white"
                  }`}
                >
                  {p.badge}
                </div>
              )}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] mb-12">{p.name}</h3>
                <p className="font-display text-5xl md:text-6xl mb-4">{fmt(p.price)}</p>
                <p className="text-[10px] uppercase tracking-[0.18em] opacity-70 mb-3">
                  {ukBundleDurationLabel(p)}
                </p>
                <p className="text-xs opacity-70 mb-2">{p.dailyCostLabel}</p>
                <p className="text-xs opacity-70 mb-12">
                  {p.monitoringDays} days continuous monitoring
                </p>
              </div>
              <a
                href={p.checkoutUrl}
                onClick={() =>
                  trackCheckoutClick({
                    source: "home_plans",
                    bundleId: p.id,
                    bundleName: p.name,
                    value: p.price,
                  })
                }
                className={`w-full block text-center py-4 text-xs font-bold uppercase tracking-[0.18em] rounded-xl transition-colors ${
                  p.featured
                    ? "bg-white text-[var(--primary)] hover:bg-[var(--paper)]"
                    : "border border-[rgba(13,13,13,0.2)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)]"
                }`}
              >
                Buy now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UkEditorialQuote() {
  return (
    <section className="bg-white py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 w-full">
          <StoreImage
            srcMobile={lifestyleRunning.mobile}
            srcDesktop={lifestyleRunning.desktop}
            alt="Athlete with AiDEX"
            variant="section-full"
            loading="lazy"
          />
        </div>
        <div className="lg:col-span-5">
          <span className="eyebrow text-[var(--ink)]/40">User experience</span>
          <blockquote className="font-display text-3xl md:text-5xl leading-tight mt-6 text-balance">
            "I can now see patterns I missed before. Alerts and charts make everyday life much
            clearer."
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <span className="rule" />
            <div>
              <div className="text-sm font-semibold">Anna M.</div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--ink)]/50">
                Daily life and training
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4">
            <UkTestimonial
              name="Thomas K."
              role="Work routine"
              quote="I see when glucose rises after meals and can adjust my habits more consciously."
            />
            <UkTestimonial
              name="Laura S."
              role="Personal monitoring"
              quote="The app makes it easier to understand trends and share information at medical appointments."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function UkTestimonial({ name, role, quote }: { name: string; role: string; quote: string }) {
  return (
    <figure className="border-t border-[rgba(13,13,13,0.1)] pt-5">
      <blockquote className="text-sm leading-snug font-medium">"{quote}"</blockquote>
      <figcaption className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/60">
        {name} · {role}
      </figcaption>
    </figure>
  );
}

const [plan1m, plan2m, plan3m] = bundleData;

export const ukFaqItems = [
  {
    q: "What is a CGM?",
    a: "CGM (Continuous Glucose Monitor) is a system for continuous monitoring that measures your glucose in real time, 24 hours a day.",
  },
  {
    q: "How does AiDEX G7 work?",
    a: "The sensor is applied to the skin and sends glucose readings automatically via Bluetooth to the app — no scanning required.",
  },
  {
    q: "Do I need to scan?",
    a: "No. Readings are transmitted continuously without holding your phone to the sensor.",
  },
  {
    q: "How long does each sensor last?",
    a: `Each AiDEX G7 sensor stays active for up to ${UK_SENSOR_DAYS} days. The kit includes the sensor, single-use applicator, and adhesive patch.`,
  },
  {
    q: "Why does the minimum kit have 2 sensors?",
    a: `As each sensor lasts ${UK_SENSOR_DAYS} days, ${UK_SENSORS_PER_MONTH} sensors are needed for 1 month (${ukBrand.monitoringDaysPerMonth} days) of continuous monitoring. That is why we do not sell a kit with only 1 sensor.`,
  },
  {
    q: "What is the difference between the plans?",
    a: `We offer 3 monitoring plans: 1 month (${plan1m.sensors} sensors, ${plan1m.monitoringDays} days) for ${fmt(plan1m.price)}; 2 months (${plan2m.sensors} sensors, ${plan2m.monitoringDays} days) for ${fmt(plan2m.price)} — bestseller; and 3 months (${plan3m.sensors} sensors, ${plan3m.monitoringDays} days) for ${fmt(plan3m.price)} with the best saving per sensor.`,
  },
  {
    q: "Is the app in English?",
    a: "Yes. The app is fully available in English for iOS and Android.",
  },
  {
    q: "How do I track my glucose?",
    a: "In the AiDEX app you see real-time charts, trends, alerts, and full reports.",
  },
  {
    q: "Is the sensor comfortable?",
    a: "Yes. The discreet, lightweight design allows comfortable wear during all daily activities.",
  },
  {
    q: "Can I shower with the sensor?",
    a: "Yes. The sensor is waterproof (IP68) and can be worn while showering and during water activities.",
  },
  {
    q: "How does delivery work?",
    a: `${UK_FREE_DELIVERY_LABEL} with tracking. Details in our delivery policy.`,
  },
  {
    q: "How long does delivery take?",
    a: "Average delivery time is 3 to 7 working days after payment confirmation.",
  },
  {
    q: "Does the app have alerts?",
    a: "Yes. You receive personalised hypo and hyperglycaemia alerts in real time.",
  },
  {
    q: "Can I share data?",
    a: "Yes. You can securely share your data with family and healthcare professionals.",
  },
];

export function UkFaqSection({ limit }: { limit?: number }) {
  const items = limit ? ukFaqItems.slice(0, limit) : ukFaqItems;
  return (
    <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge max-w-4xl">
        <NumberedHeader number="05" title="Frequently asked questions" />
        <div className="border-t border-[rgba(13,13,13,0.1)]">
          {items.map((item, i) => (
            <details key={i} className="group border-b border-[rgba(13,13,13,0.08)] py-6">
              <summary className="flex justify-between items-center cursor-pointer list-none gap-8">
                <span className="text-sm md:text-base font-medium uppercase tracking-tight">
                  {item.q}
                </span>
                <span className="text-2xl font-light text-[var(--ink)]/50 group-hover:text-[var(--primary)] transition-colors leading-none">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm text-[var(--ink)]/60 leading-relaxed max-w-2xl">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UkCtaFinal() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-8 text-center bg-[var(--primary)] text-white">
      <div className="container-edge">
        <h2 className="font-display text-5xl md:text-7xl lg:text-9xl mb-12 italic text-balance">
          Choose your plan.
        </h2>
        <p className="max-w-md mx-auto text-white/80 mb-12 text-sm md:text-base leading-relaxed">
          Start with 1 month of monitoring or save with the 2- and 3-month plans. All include
          sensors, English app, free UK delivery, and secure checkout.
        </p>
        <Link
          to={ukPaths.product}
          className="inline-block bg-white text-[var(--primary)] px-10 md:px-12 py-5 md:py-6 text-xs md:text-sm font-bold uppercase tracking-[0.2em] rounded-xl hover:scale-[1.02] transition-transform"
        >
          Buy now
        </Link>
      </div>
    </section>
  );
}
