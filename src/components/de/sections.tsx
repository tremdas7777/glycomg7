import { Link } from "@tanstack/react-router";
import { deBrand } from "@/lib/locale/de/brand";
import {
  deBundles as bundleData,
  eur as fmt,
  deBundleDurationLabel,
  DE_FREE_SHIPPING_LABEL,
  DE_SENSOR_DAYS,
  DE_SENSORS_PER_MONTH,
} from "@/lib/locale/de/bundles";
import { deHomeImages } from "@/lib/locale/de/product-images";
import { dePaths } from "@/lib/locale/de/paths";
import { StoreImage } from "@/components/site/StoreImage";
import { trackCheckoutClick } from "@/lib/analytics";
import useApplication from "@/assets/de/aidex-use-application.webp";
import useFaq from "@/assets/de/aidex-use-faq.webp";
import usePlacement from "@/assets/de/aidex-use-placement.webp";
import useCare from "@/assets/de/aidex-use-care.webp";

const { bannerWide, heroSensor, appIphone, lifestyleRunning } = deHomeImages;

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
    title: "Sicherer Kauf",
    text: "Externer Checkout über Shopify mit geschützter Umgebung für Ihre Bestellung.",
  },
  {
    title: "Kostenloser Versand",
    text: "Versand mit Sendungsverfolgung in ganz Deutschland, ohne zusätzliche Kosten.",
  },
  {
    title: "14-Tage-Widerrufsrecht",
    text: "Sie haben das gesetzliche Widerrufsrecht gemäß deutschem Verbraucherschutz.",
  },
  {
    title: "Persönlicher Support",
    text: "Hilfe bei der Planwahl, Sendungsverfolgung und Fragen zur Sensor-Nutzung.",
  },
] as const;

export function DeTrustProofSection() {
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
  "Sie möchten Glukose-Spitzen und -Abfälle im Tagesverlauf verfolgen.",
  "Sie wünschen weniger Routine-Stiche und mehr Komfort.",
  "Sie möchten verstehen, wie Ernährung, Training und Schlaf die Glukose beeinflussen.",
  "Sie benötigen Alarme und Historie für Gespräche mit Fachpersonal.",
] as const;

export function DeIdealForSection() {
  return (
    <section className="bg-[var(--paper)] py-20 md:py-28">
      <div className="container-edge grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <span className="eyebrow text-[var(--primary)]">Für wen geeignet</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl leading-tight text-balance">
            Mehr Klarheit für alle, die ihre Glukose genau im Blick behalten möchten.
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
            Der AiDEX G7 unterstützt das Glukose-Monitoring, ersetzt aber keine individuelle
            ärztliche Beratung.
          </p>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01",
    title: "In Sekunden anbringen",
    text: "Diskreter Sensor für den Oberarm, mit Einweg-Applikator und einfacher Erstanwendung.",
  },
  {
    n: "02",
    title: "Mit der App verbinden",
    text: "Bluetooth-Synchronisation mit der App auf Deutsch für Ihren Alltag am Handy.",
  },
  {
    n: "03",
    title: "24h-Trends sehen",
    text: "Messwerte, Spitzen, Abfälle und Muster ohne ständiges Scannen verfolgen.",
  },
  {
    n: "04",
    title: "Mit Daten entscheiden",
    text: "Berichte und Alarme helfen, Ernährung, Bewegung, Schlaf und wichtige Momente zu verstehen.",
  },
];

export function DeHowItWorks() {
  return (
    <section id="technologie" className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge">
        <NumberedHeader number="01" title="Der klinische Weg" />
        <div className="grid md:grid-cols-4 gap-10 md:gap-12">
          {steps.map((s) => (
            <div key={s.n} className="group">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)]/30 group-hover:text-[var(--primary)] transition-colors">
                Schritt {s.n}
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
  { src: useApplication, alt: "AiDEX G7 Sensor in vier Schritten anbringen", title: "Anwendung" },
  {
    src: usePlacement,
    alt: "Empfohlene Stellen für den AiDEX G7 Sensor",
    title: "Anbringungsstellen",
  },
  { src: useFaq, alt: "Häufige Fragen zur Nutzung des AiDEX G7", title: "Fragen" },
  { src: useCare, alt: "Wichtige Pflegehinweise beim AiDEX G7", title: "Pflege" },
] as const;

export function DeProductUsageSection() {
  return (
    <section
      id="anwendung"
      className="bg-white py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]"
    >
      <div className="container-edge">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <span className="eyebrow text-[var(--primary)]">Produktanwendung</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl leading-tight text-balance">
            Einfache Anwendung, App-Verbindung und Pflege im Alltag.
          </h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-[var(--ink)]/65">
            Der visuelle Leitfaden wurde ins Deutsche übersetzt und an die AiDEX-Identität angepasst
            — für einfache Anbringung, Pairing und Pflege während des Monitorings.
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
  "Alarme bei Hypo- und Hyperglykämie",
  "Glukose-Trenddiagramme",
  "AGP-Berichte und tägliches Monitoring",
  "Datenfreigabe mit Angehörigen und Fachpersonal",
  "Organisierte Daten für einen bewussteren Alltag",
];

export function DeAppSplit() {
  return (
    <section id="wissenschaft" className="bg-white py-24 md:py-32">
      <div className="container-edge grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="order-2 lg:order-1 w-full">
          <StoreImage
            srcMobile={appIphone.mobile}
            srcDesktop={appIphone.desktop}
            alt="AiDEX App"
            variant="section-full"
            bg="#ffffff"
            loading="lazy"
          />
        </div>
        <div className="order-1 lg:order-2">
          <NumberedHeader number="02" title="Medizinische Intelligenz" />
          <p className="font-display italic text-xl md:text-2xl text-[var(--ink)]/80 mb-12 leading-snug max-w-md">
            „Kontinuierliches Monitoring verwandelt einzelne Messwerte in ein klares Bild Ihrer
            Glukose-Routine."
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
  ["24h-Überwachung", true, false],
  ["Alarme auf dem Handy", true, false],
  ["Trends und Berichte", true, false],
  ["Keine Routine-Stiche", true, false],
  ["Kein ständiges Scannen", true, false],
  ["Organisierte App-Historie", true, false],
] as const;

export function DeComparison() {
  return (
    <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge">
        <NumberedHeader number="03" title="AiDEX G7 vs. klassische Messung" />
        <p className="mb-10 max-w-2xl text-sm md:text-base leading-relaxed text-[var(--ink)]/65">
          Die klassische Messung zeigt einen einzelnen Moment. Der AiDEX G7 hilft, die
          Glukose-Bewegung über den Tag zu erkennen — mit Alarmen, Diagrammen und Historie für ein
          besseres Verständnis Ihrer Routine.
        </p>
        <div className="border border-[rgba(13,13,13,0.1)] rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)]/40 py-5 border-b border-[rgba(13,13,13,0.1)]">
            <div>Funktion</div>
            <div className="text-center px-4 md:px-0">AiDEX G7</div>
            <div className="text-center px-4 md:px-0">Klassisch</div>
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

export function DePlans() {
  return (
    <section id="plaene" className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge">
        <NumberedHeader number="04" title="Investition in Gesundheit" />
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
                  {deBundleDurationLabel(p)}
                </p>
                <p className="text-xs opacity-70 mb-2">{p.dailyCostLabel}</p>
                <p className="text-xs opacity-70 mb-12">
                  {p.monitoringDays} Tage kontinuierliches Monitoring
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
                Jetzt kaufen
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DeEditorialQuote() {
  return (
    <section className="bg-white py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 w-full">
          <StoreImage
            srcMobile={lifestyleRunning.mobile}
            srcDesktop={lifestyleRunning.desktop}
            alt="Sportler mit AiDEX"
            variant="section-full"
            loading="lazy"
          />
        </div>
        <div className="lg:col-span-5">
          <span className="eyebrow text-[var(--ink)]/40">Nutzungserfahrung</span>
          <blockquote className="font-display text-3xl md:text-5xl leading-tight mt-6 text-balance">
            „Ich erkenne jetzt Muster, die mir vorher entgangen sind. Alarme und Diagramme machen
            den Alltag viel klarer."
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <span className="rule" />
            <div>
              <div className="text-sm font-semibold">Anna M.</div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--ink)]/50">
                Alltag und Training
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4">
            <DeTestimonial
              name="Thomas K."
              role="Berufsalltag"
              quote="Ich sehe, wann die Glukose nach Mahlzeiten steigt, und kann meine Gewohnheiten bewusster anpassen."
            />
            <DeTestimonial
              name="Laura S."
              role="Persönliches Monitoring"
              quote="Die App erleichtert das Verstehen von Trends und das Teilen von Informationen beim Arztbesuch."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function DeTestimonial({ name, role, quote }: { name: string; role: string; quote: string }) {
  return (
    <figure className="border-t border-[rgba(13,13,13,0.1)] pt-5">
      <blockquote className="text-sm leading-snug font-medium">„{quote}"</blockquote>
      <figcaption className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/60">
        {name} · {role}
      </figcaption>
    </figure>
  );
}

const [plan1m, plan2m, plan3m] = bundleData;

export const deFaqItems = [
  {
    q: "Was ist ein CGM?",
    a: "CGM (Continuous Glucose Monitor) ist ein System für kontinuierliches Monitoring, das Ihre Glukose in Echtzeit, 24 Stunden am Tag misst.",
  },
  {
    q: "Wie funktioniert der AiDEX G7?",
    a: "Der Sensor wird auf der Haut angebracht und sendet Glukose-Messwerte automatisch per Bluetooth an die App — ohne Scannen.",
  },
  {
    q: "Muss ich scannen?",
    a: "Nein. Die Messwerte werden kontinuierlich übertragen, ohne das Handy an den Sensor zu halten.",
  },
  {
    q: "Wie lange hält jeder Sensor?",
    a: `Jeder AiDEX G7 Sensor bleibt bis zu ${DE_SENSOR_DAYS} Tage aktiv. Im Kit sind Sensor, Einweg-Applikator und Klebeband enthalten.`,
  },
  {
    q: "Warum hat das Mindest-Kit 2 Sensoren?",
    a: `Da jeder Sensor ${DE_SENSOR_DAYS} Tage hält, werden ${DE_SENSORS_PER_MONTH} Sensoren für 1 Monat (${deBrand.monitoringDaysPerMonth} Tage) kontinuierliches Monitoring benötigt. Deshalb verkaufen wir kein Kit mit nur 1 Sensor.`,
  },
  {
    q: "Was ist der Unterschied zwischen den Plänen?",
    a: `Wir bieten 3 Monitoring-Pläne: 1 Monat (${plan1m.sensors} Sensoren, ${plan1m.monitoringDays} Tage) für ${fmt(plan1m.price)}; 2 Monate (${plan2m.sensors} Sensoren, ${plan2m.monitoringDays} Tage) für ${fmt(plan2m.price)} — Bestseller; und 3 Monate (${plan3m.sensors} Sensoren, ${plan3m.monitoringDays} Tage) für ${fmt(plan3m.price)} mit der besten Ersparnis pro Sensor.`,
  },
  {
    q: "Ist die App auf Deutsch?",
    a: "Ja. Die App ist vollständig auf Deutsch verfügbar für iOS und Android.",
  },
  {
    q: "Wie verfolge ich meine Glukose?",
    a: "In der AiDEX App sehen Sie Echtzeit-Diagramme, Trends, Alarme und vollständige Berichte.",
  },
  {
    q: "Ist der Sensor bequem?",
    a: "Ja. Das diskrete, leichte Design ermöglicht komfortablen Tragekomfort bei allen täglichen Aktivitäten.",
  },
  {
    q: "Kann ich duschen mit dem Sensor?",
    a: "Ja. Der Sensor ist wasserdicht (IP68) und kann beim Duschen und bei Wasseraktivitäten getragen werden.",
  },
  {
    q: "Wie funktioniert der Versand?",
    a: `${DE_FREE_SHIPPING_LABEL} mit Sendungsverfolgung. Details in unserer Versandrichtlinie.`,
  },
  {
    q: "Wie lange dauert die Lieferung?",
    a: "Die durchschnittliche Lieferzeit beträgt 3 bis 7 Werktage nach Zahlungsbestätigung.",
  },
  {
    q: "Hat die App Alarme?",
    a: "Ja. Sie erhalten personalisierte Alarme bei Hypo- und Hyperglykämie in Echtzeit.",
  },
  {
    q: "Kann ich Daten teilen?",
    a: "Ja. Sie können Ihre Daten sicher mit Angehörigen und medizinischem Fachpersonal teilen.",
  },
];

export function DeFaqSection({ limit }: { limit?: number }) {
  const items = limit ? deFaqItems.slice(0, limit) : deFaqItems;
  return (
    <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge max-w-4xl">
        <NumberedHeader number="05" title="Häufige Fragen" />
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

export function DeCtaFinal() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-8 text-center bg-[var(--primary)] text-white">
      <div className="container-edge">
        <h2 className="font-display text-5xl md:text-7xl lg:text-9xl mb-12 italic text-balance">
          Wählen Sie Ihren Plan.
        </h2>
        <p className="max-w-md mx-auto text-white/80 mb-12 text-sm md:text-base leading-relaxed">
          Starten Sie mit 1 Monat Monitoring oder sparen Sie bei den 2- und 3-Monats-Plänen. Alle
          enthalten Sensoren, App auf Deutsch, kostenlosen Versand und sicheren Kauf.
        </p>
        <Link
          to={dePaths.product}
          className="inline-block bg-white text-[var(--primary)] px-10 md:px-12 py-5 md:py-6 text-xs md:text-sm font-bold uppercase tracking-[0.2em] rounded-xl hover:scale-[1.02] transition-transform"
        >
          Jetzt kaufen
        </Link>
      </div>
    </section>
  );
}
