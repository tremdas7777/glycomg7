import { Link } from "@tanstack/react-router";
import { mxBrand } from "@/lib/locale/mx/brand";
import {
  mxBundles as bundleData,
  mxn as fmt,
  mxBundleDurationLabel,
  MX_FREE_DELIVERY_LABEL,
  MX_SENSOR_DAYS,
  MX_SENSORS_PER_MONTH,
} from "@/lib/locale/mx/bundles";
import { mxHomeImages } from "@/lib/locale/mx/product-images";
import { mxPaths } from "@/lib/locale/mx/paths";
import { StoreImage } from "@/components/site/StoreImage";
import { trackCheckoutClick } from "@/lib/analytics";
export { MxProductUsageSection } from "@/components/mx/UsageSection";

const { appIphone, lifestyleRunning } = mxHomeImages;

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
    title: "Compra segura",
    text: "Checkout externo con entorno protegido para tu pedido.",
  },
  {
    title: "Envío gratis",
    text: "Envío con seguimiento a todo México sin costo adicional.",
  },
  {
    title: "Devolución 14 días",
    text: "Tienes los derechos del consumidor conforme a la ley mexicana.",
  },
  {
    title: "Soporte personal",
    text: "Te ayudamos a elegir tu plan, rastrear tu pedido y usar el sensor.",
  },
] as const;

export function MxTrustProofSection() {
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
  "Quieres dar seguimiento a los picos y caídas de glucosa durante el día.",
  "Quieres reducir los pinchazos de rutina y tener más comodidad.",
  "Quieres entender cómo la comida, el ejercicio y el sueño afectan tu glucosa.",
  "Necesitas alertas e historial para hablar con tu profesional de salud.",
] as const;

export function MxIdealForSection() {
  return (
    <section className="bg-[var(--paper)] py-20 md:py-28">
      <div className="container-edge grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <span className="eyebrow text-[var(--primary)]">Para quién es</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl leading-tight text-balance">
            Más claridad para quien quiere cuidar su glucosa de cerca.
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
            AiDEX G7 apoya el monitoreo de glucosa pero no sustituye el consejo médico individual.
          </p>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01",
    title: "Aplica en segundos",
    text: "Sensor discreto en el brazo con aplicador de un solo uso y configuración inicial simple.",
  },
  {
    n: "02",
    title: "Conéctalo a la app",
    text: "Sincronización por Bluetooth con la app en español para uso diario en tu celular.",
  },
  {
    n: "03",
    title: "Ve tendencias 24h",
    text: "Sigue lecturas, picos, caídas y patrones sin necesidad de escanear constantemente.",
  },
  {
    n: "04",
    title: "Decide con datos",
    text: "Reportes y alertas te ayudan a entender comida, movimiento, sueño y momentos clave.",
  },
];

export function MxHowItWorks() {
  return (
    <section id="technology" className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge">
        <NumberedHeader number="01" title="El camino clínico" />
        <div className="grid md:grid-cols-4 gap-10 md:gap-12">
          {steps.map((s) => (
            <div key={s.n} className="group">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)]/30 group-hover:text-[var(--primary)] transition-colors">
                Paso {s.n}
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

const intel = [
  "Alertas de hipo e hiperglucemia",
  "Gráficas de tendencias de glucosa",
  "Reportes AGP y monitoreo diario",
  "Compartir datos con familia y profesionales de salud",
  "Datos organizados para una rutina más informada",
];

export function MxAppSplit() {
  return (
    <section id="science" className="bg-white py-24 md:py-32">
      <div className="container-edge grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="order-2 lg:order-1 w-full">
          <StoreImage
            srcMobile={appIphone.mobile}
            srcDesktop={appIphone.desktop}
            alt="App AiDEX"
            variant="section-full"
            bg="#ffffff"
            loading="lazy"
          />
        </div>
        <div className="order-1 lg:order-2">
          <NumberedHeader number="02" title="Inteligencia médica" />
          <p className="font-display italic text-xl md:text-2xl text-[var(--ink)]/80 mb-12 leading-snug max-w-md">
            "El monitoreo continuo convierte lecturas aisladas en una imagen clara de tu rutina de glucosa."
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
  ["Monitoreo 24h", true, false],
  ["Alertas en tu celular", true, false],
  ["Tendencias y reportes", true, false],
  ["Sin pinchazos de rutina", true, false],
  ["Sin escaneo constante", true, false],
  ["Historial organizado en la app", true, false],
] as const;

export function MxComparison() {
  return (
    <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge">
        <NumberedHeader number="03" title="AiDEX G7 vs glucometría tradicional" />
        <p className="mb-10 max-w-2xl text-sm md:text-base leading-relaxed text-[var(--ink)]/65">
          La glucometría tradicional muestra un solo momento. AiDEX G7 te ayuda a ver el movimiento de tu glucosa durante el día — con alertas, gráficas e historial para entender mejor tu rutina.
        </p>
        <div className="border border-[rgba(13,13,13,0.1)] rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)]/40 py-5 border-b border-[rgba(13,13,13,0.1)]">
            <div>Característica</div>
            <div className="text-center px-4 md:px-0">AiDEX G7</div>
            <div className="text-center px-4 md:px-0">Tradicional</div>
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

export function MxPlans() {
  return (
    <section id="plans" className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge">
        <NumberedHeader number="04" title="Invierte en tu salud" />
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
                  {mxBundleDurationLabel(p)}
                </p>
                <p className="text-xs opacity-70 mb-2">{p.dailyCostLabel}</p>
                <p className="text-xs opacity-70 mb-12">
                  {p.monitoringDays} días de monitoreo continuo
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
                Comprar ahora
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MxEditorialQuote() {
  return (
    <section className="bg-white py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 w-full">
          <StoreImage
            srcMobile={lifestyleRunning.mobile}
            srcDesktop={lifestyleRunning.desktop}
            alt="Atleta con AiDEX"
            variant="section-full"
            loading="lazy"
          />
        </div>
        <div className="lg:col-span-5">
          <span className="eyebrow text-[var(--ink)]/40">Experiencia de usuario</span>
          <blockquote className="font-display text-3xl md:text-5xl leading-tight mt-6 text-balance">
            "Ahora veo patrones que antes no notaba. Las alertas y gráficas hacen mi día a día mucho más claro."
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <span className="rule" />
            <div>
              <div className="text-sm font-semibold">Ana M.</div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--ink)]/50">
                Día a día y entrenamiento
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4">
            <MxTestimonial
              name="Tomás K."
              role="Rutina laboral"
              quote="Veo cuándo sube mi glucosa después de comer y ajusto mis hábitos de forma más consciente."
            />
            <MxTestimonial
              name="Laura S."
              role="Monitoreo personal"
              quote="La app facilita entender tendencias y compartir información en las consultas médicas."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MxTestimonial({ name, role, quote }: { name: string; role: string; quote: string }) {
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

export const mxFaqItems = [
  {
    q: "¿Qué es un CGM?",
    a: "CGM (Continuous Glucose Monitor) es un sistema de monitoreo continuo que mide tu glucosa en tiempo real, 24 horas al día.",
  },
  {
    q: "¿Cómo funciona AiDEX G7?",
    a: "El sensor se aplica en la piel y envía lecturas de glucosa automáticamente por Bluetooth a la app — sin necesidad de escanear.",
  },
  {
    q: "¿Tengo que escanear?",
    a: "No. Las lecturas se transmiten de forma continua sin acercar el celular al sensor.",
  },
  {
    q: "¿Cuánto dura cada sensor?",
    a: `Cada sensor AiDEX G7 funciona hasta ${MX_SENSOR_DAYS} días. El kit incluye el sensor, aplicador de un solo uso y parche adhesivo.`,
  },
  {
    q: "¿Por qué el kit mínimo trae 2 sensores?",
    a: `Como cada sensor dura ${MX_SENSOR_DAYS} días, se necesitan ${MX_SENSORS_PER_MONTH} sensores para 1 mes (${mxBrand.monitoringDaysPerMonth} días) de monitoreo continuo. Por eso no vendemos kits con un solo sensor.`,
  },
  {
    q: "¿Cuál es la diferencia entre los planes?",
    a: `Ofrecemos 3 planes de monitoreo: 1 mes (${plan1m.sensors} sensores, ${plan1m.monitoringDays} días) por ${fmt(plan1m.price)}; 2 meses (${plan2m.sensors} sensores, ${plan2m.monitoringDays} días) por ${fmt(plan2m.price)} — el más vendido; y 3 meses (${plan3m.sensors} sensores, ${plan3m.monitoringDays} días) por ${fmt(plan3m.price)} con el mayor ahorro por sensor.`,
  },
  {
    q: "¿La app está en español?",
    a: "Sí. La app está completamente disponible en español para iOS y Android.",
  },
  {
    q: "¿Cómo doy seguimiento a mi glucosa?",
    a: "En la app AiDEX puedes ver gráficas en tiempo real, tendencias, alertas y reportes completos.",
  },
  {
    q: "¿El sensor es cómodo?",
    a: "Sí. Su diseño discreto y ligero permite usarlo cómodamente durante todas tus actividades diarias.",
  },
  {
    q: "¿Puedo bañarme con el sensor?",
    a: "Sí. El sensor es resistente al agua (IP68) y puede usarse al bañarte y durante actividades acuáticas.",
  },
  {
    q: "¿Cómo funciona el envío?",
    a: `${MX_FREE_DELIVERY_LABEL} con seguimiento. Detalles en nuestra política de envíos.`,
  },
  {
    q: "¿Cuánto tarda el envío?",
    a: "El tiempo promedio de entrega es de 3 a 7 días hábiles después de confirmar el pago.",
  },
  {
    q: "¿La app tiene alertas?",
    a: "Sí. Recibes alertas personalizadas de hipo e hiperglucemia en tiempo real.",
  },
  {
    q: "¿Puedo compartir mis datos?",
    a: "Sí. Puedes compartir tus datos de forma segura con familia y profesionales de salud.",
  },
];

export function MxFaqSection({ limit }: { limit?: number }) {
  const items = limit ? mxFaqItems.slice(0, limit) : mxFaqItems;
  return (
    <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge max-w-4xl">
        <NumberedHeader number="05" title="Preguntas frecuentes" />
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

export function MxCtaFinal() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-8 text-center bg-[var(--primary)] text-white">
      <div className="container-edge">
        <h2 className="font-display text-5xl md:text-7xl lg:text-9xl mb-12 italic text-balance">
          Elige tu plan.
        </h2>
        <p className="max-w-md mx-auto text-white/80 mb-12 text-sm md:text-base leading-relaxed">
          Comienza con 1 mes de monitoreo o ahorra con los planes de 2 y 3 meses. Todos incluyen sensores, app en español, envío gratis a México y pago seguro.
        </p>
        <Link
          to={mxPaths.product}
          className="inline-block bg-white text-[var(--primary)] px-10 md:px-12 py-5 md:py-6 text-xs md:text-sm font-bold uppercase tracking-[0.2em] rounded-xl hover:scale-[1.02] transition-transform"
        >
          Comprar ahora
        </Link>
      </div>
    </section>
  );
}
