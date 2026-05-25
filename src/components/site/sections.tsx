import { Link } from "@tanstack/react-router";
import { brand } from "@/lib/brand";
import {
  bundles as bundleData,
  brl as fmt,
  bundleDurationLabel,
  FREE_SHIPPING_LABEL,
  SENSOR_DAYS,
  SENSORS_PER_MONTH,
} from "@/lib/bundles";
import { homeImages } from "@/lib/product-images";
import { StoreImage } from "@/components/site/StoreImage";

const { bannerWide, heroSensor, appIphone, lifestyleRunning, lifestyleFood } = homeImages;

/* ---------- Editorial immersive banner ---------- */
export function EditorialBanner() {
  return (
    <section className="relative w-full">
      <div className="relative w-full">
        <StoreImage
          srcMobile={bannerWide.mobile}
          srcDesktop={bannerWide.desktop}
          alt="AiDEX X — resistente à água, no seu dia a dia"
          variant="section-banner"
          bg={brand.colors.primaryDeep}
          loading="lazy"
        />
      </div>
      <div className="container-edge py-10 md:py-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <span className="eyebrow text-[var(--ink)]/60">
          Planos de 1 a 3 meses · 2 sensores por mês · {brand.sensorDays} dias por sensor · IP68
        </span>
        <div className="flex items-center gap-4">
          <span className="rule" />
          <Link
            to="/produto"
            className="text-xs font-bold uppercase tracking-[0.18em] hover:text-[var(--primary)] transition-colors"
          >
            Conhecer o sensor
          </Link>
        </div>
      </div>
    </section>
  );
}


/* ---------- Hero — 8/4 editorial split, oversized serif ---------- */
export function Hero() {
  return (
    <section className="pt-28 sm:pt-32 md:pt-44 lg:pt-48 pb-16 md:pb-28">
      <div className="container-edge">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-8 fade-up">
            <span className="eyebrow text-[var(--primary)] mb-5 sm:mb-6 block">
              {brand.tagline}
            </span>
            <h1 className="font-display text-[2.75rem] sm:text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight text-balance">
              Monitoramento <br />contínuo de <br />
              <span className="italic">glicose.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-2 fade-up" style={{ animationDelay: "120ms" }}>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--ink)]/70 mb-8 sm:mb-10 max-w-sm">
              Tecnologia clínica de ponta agora disponível para sua rotina. Dados em tempo real, sem interrupções.
            </p>
            <div className="flex items-center gap-6">
              <span className="rule" />
              <a href="#tecnologia" className="text-xs font-bold uppercase tracking-[0.18em] hover:text-[var(--primary)] transition-colors">
                Ver como funciona
              </a>
            </div>
            <div className="mt-12 hidden lg:block">
              <StoreImage
                srcMobile={heroSensor.mobile}
                srcDesktop={heroSensor.desktop}
                alt="Sensor AiDEX X"
                variant="section-content"
                bg={brand.colors.surfaceTint}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Hero figure on mobile/tablet — full image, no cropping */}
        <div className="lg:hidden mt-12 sm:mt-16">
          <StoreImage
            srcMobile={heroSensor.mobile}
            srcDesktop={heroSensor.desktop}
            alt="AiDEX X no braço"
            variant="section-content"
            bg={brand.colors.surfaceTint}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Section header (numbered editorial) ---------- */
function NumberedHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 md:gap-6 mb-16 md:mb-24">
      <span className="font-display italic text-4xl md:text-6xl text-[var(--ink)]/80">{number} —</span>
      <h2 className="font-display text-4xl md:text-6xl text-balance">{title}</h2>
    </div>
  );
}

/* ---------- 01 — A Jornada Clínica (How it works) ---------- */
const steps = [
  { n: "01", title: "Aplicação Indolor", text: "Sensor discreto aplicado na parte posterior do braço com tecnologia de micro-filamento." },
  { n: "02", title: "Sincronização", text: "Conexão Bluetooth instantânea com o seu smartphone via aplicativo proprietário AiDEX." },
  { n: "03", title: "Leitura Real", text: "Visualização imediata dos níveis de glicose a cada minuto, sem necessidade de picadas." },
  { n: "04", title: "Bio-Insights", text: "Relatórios detalhados sobre como alimentação e exercícios impactam sua biologia única." },
];

export function HowItWorks() {
  return (
    <section id="tecnologia" className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge">
        <NumberedHeader number="01" title="A Jornada Clínica" />
        <div className="grid md:grid-cols-4 gap-10 md:gap-12">
          {steps.map((s) => (
            <div key={s.n} className="group">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)]/30 group-hover:text-[var(--primary)] transition-colors">
                Passo {s.n}
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

/* ---------- 02 — Inteligência Médica (App / Benefits split) ---------- */
const intel = [
  "Gráficos Glicêmicos Preditivos",
  "Alertas de Hipo e Hiperglicemia",
  "Time in Range e Tendências",
  "Compartilhamento com Profissionais",
  "Integração com Apple Health",
];

export function AppSplit() {
  return (
    <section id="ciencia" className="bg-white py-24 md:py-32">
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
          <NumberedHeader number="02" title="Inteligência Médica" />
          <p className="font-display italic text-xl md:text-2xl text-[var(--ink)]/80 mb-12 leading-snug max-w-md">
            "O monitoramento contínuo transforma dados abstratos em decisões concretas para sua longevidade."
          </p>
          <ul>
            {intel.map((t) => (
              <li key={t} className="flex items-start gap-4 border-b border-[rgba(13,13,13,0.06)] py-6">
                <span className="text-[var(--primary)] font-bold leading-none mt-0.5">+</span>
                <span className="text-xs md:text-sm uppercase tracking-[0.18em] font-semibold">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 03 — Comparison editorial table ---------- */
const compRows = [
  ["Monitoramento contínuo 24h", true, false],
  ["Dados em tempo real", true, false],
  ["Alertas inteligentes", true, false],
  ["Sem escaneamento constante", true, false],
  ["Tendências glicêmicas", true, false],
  ["App completo em português", true, false],
] as const;

export function Comparison() {
  return (
    <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge">
        <NumberedHeader number="03" title="AiDEX vs Tradicional" />
        <div className="border border-[rgba(13,13,13,0.1)] rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)]/40 py-5 border-b border-[rgba(13,13,13,0.1)]">
            <div>Recurso</div>
            <div className="text-center px-4 md:px-0">AiDEX X</div>
            <div className="text-center px-4 md:px-0">Tradicional</div>
          </div>
          {compRows.map(([f, a, b], i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_auto] md:grid-cols-3 py-6 border-b border-[rgba(13,13,13,0.06)] text-sm md:text-base items-center">
              <div className="font-medium">{f}</div>
              <div className="text-center px-4 md:px-0">
                {a ? <span className="text-[var(--primary)] font-bold">+</span> : <span className="text-[var(--ink)]/30">—</span>}
              </div>
              <div className="text-center px-4 md:px-0">
                {b ? <span className="text-[var(--primary)] font-bold">+</span> : <span className="text-[var(--ink)]/30">—</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 — Investimento em Saúde (Plans) ---------- */
export function Plans() {
  return (
    <section id="planos" className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge">
        <NumberedHeader number="04" title="Investimento em Saúde" />
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
                <div className={`absolute top-0 right-0 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.1em] rounded-bl-xl ${
                  p.featured ? "bg-white text-[var(--primary)]" : "bg-[var(--primary)] text-white"
                }`}>
                  {p.badge}
                </div>
              )}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] mb-12">{p.name}</h3>
                <p className="font-display text-5xl md:text-6xl mb-4">{fmt(p.price)}</p>
                <p className="text-[10px] uppercase tracking-[0.18em] opacity-70 mb-3">
                  {bundleDurationLabel(p)}
                </p>
                <p className="text-xs opacity-70 mb-2">{p.dailyCostLabel}</p>
                <p className="text-xs opacity-70 mb-12">
                  {p.monitoringDays} dias de monitoramento contínuo
                </p>
              </div>
              <a
                href={p.checkoutUrl}
                className={`w-full block text-center py-4 text-xs font-bold uppercase tracking-[0.18em] rounded-xl transition-colors ${
                  p.featured
                    ? "bg-white text-[var(--primary)] hover:bg-[var(--paper)]"
                    : "border border-[rgba(13,13,13,0.2)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)]"
                }`}
              >
                Comprar Agora
              </a>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------- 05 — Editorial lifestyle / testimonial ---------- */
export function EditorialQuote() {
  return (
    <section className="bg-white py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 w-full">
          <StoreImage
            srcMobile={lifestyleRunning.mobile}
            srcDesktop={lifestyleRunning.desktop}
            alt="Atleta usando AiDEX"
            variant="section-full"
            loading="lazy"
          />
        </div>
        <div className="lg:col-span-5">
          <span className="eyebrow text-[var(--ink)]/40">Relato de uso</span>
          <blockquote className="font-display text-3xl md:text-5xl leading-tight mt-6 text-balance">
            "Agora consigo acompanhar minha <span className="italic">glicose em tempo real</span> de forma muito mais prática."
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <span className="rule" />
            <div>
              <div className="text-sm font-semibold">Marina S.</div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--ink)]/50">Atleta amadora</div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4">
            <Testimonial img={lifestyleFood.desktop} name="Rafael C." role="Engenheiro" quote="App intuitivo, os alertas ajudam no dia a dia." />
            <Testimonial img={lifestyleRunning.desktop} name="Letícia M." role="Nutricionista" quote="Entendi como alimentação impacta minha glicose." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonial({ img, name, role, quote }: { img: string; name: string; role: string; quote: string }) {
  return (
    <figure className="border-t border-[rgba(13,13,13,0.1)] pt-5">
      <img src={img} alt="" className="store-image w-12 h-12 object-contain grayscale" loading="lazy" />
      <blockquote className="mt-4 text-sm leading-snug font-medium">"{quote}"</blockquote>
      <figcaption className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/60">
        {name} · {role}
      </figcaption>
    </figure>
  );
}

/* ---------- 06 — FAQ ---------- */
const [plan1m, plan2m, plan3m] = bundleData;

export const faqItems = [
  { q: "O que é um CGM?", a: "CGM (Continuous Glucose Monitor) é um sistema de monitoramento contínuo que mede sua glicose em tempo real, 24 horas por dia." },
  { q: "Como funciona o AiDEX X CGM?", a: "O sensor é aplicado na pele e envia automaticamente as leituras de glicose ao aplicativo via Bluetooth, sem necessidade de escaneamento." },
  { q: "Precisa escanear?", a: "Não. As leituras são enviadas continuamente, sem necessidade de aproximar o celular do sensor." },
  {
    q: "Quanto tempo dura cada sensor?",
    a: `Cada sensor AiDEX X CGM permanece ativo por até ${SENSOR_DAYS} dias. No kit vêm sensor, aplicador descartável e adesivo — prontos para aplicar.`,
  },
  {
    q: "Por que o kit mínimo tem 2 sensores?",
    a: `Como cada sensor dura ${SENSOR_DAYS} dias, são necessários ${SENSORS_PER_MONTH} sensores para completar 1 mês (${brand.monitoringDaysPerMonth} dias) de monitoramento sem interrupção. Por isso não vendemos kit com apenas 1 sensor.`,
  },
  {
    q: "Qual a diferença entre os planos?",
    a: `Oferecemos 3 planos de monitoramento: 1 mês (${plan1m.sensors} sensores, ${plan1m.monitoringDays} dias) por ${fmt(plan1m.price)}; 2 meses (${plan2m.sensors} sensores, ${plan2m.monitoringDays} dias) por ${fmt(plan2m.price)} — mais vendido; e 3 meses (${plan3m.sensors} sensores, ${plan3m.monitoringDays} dias) por ${fmt(plan3m.price)}, com a melhor economia por sensor.`,
  },
  { q: "O aplicativo funciona em português?", a: "Sim. O aplicativo é totalmente em português brasileiro e disponível para iOS e Android." },
  { q: "Como acompanho minha glicose?", a: "Pelo aplicativo AiDEX você visualiza gráficos em tempo real, tendências, alertas e relatórios completos." },
  { q: "O sensor é confortável?", a: "Sim. O design discreto e leve permite uso confortável durante todas as atividades diárias." },
  { q: "Posso tomar banho usando o sensor?", a: "Sim. O sensor é resistente à água (IP68) e pode ser usado durante banho e atividades aquáticas." },
  { q: "Como funciona o envio?", a: `${FREE_SHIPPING_LABEL} com rastreamento para todo o Brasil. Detalhes em nossa política de envio.` },
  { q: "Em quanto tempo recebo?", a: "O prazo médio é de 3 a 7 dias úteis após confirmação do pagamento." },
  { q: "O aplicativo possui alertas?", a: "Sim. Você recebe alertas personalizados para hipo e hiperglicemia em tempo real." },
  { q: "Posso compartilhar os dados?", a: "Sim. Você pode compartilhar seus dados com familiares e profissionais de saúde de forma segura." },
];

export function FaqSection({ limit }: { limit?: number }) {
  const items = limit ? faqItems.slice(0, limit) : faqItems;
  return (
    <section className="py-24 md:py-32 border-t border-[rgba(13,13,13,0.1)]">
      <div className="container-edge max-w-4xl">
        <NumberedHeader number="05" title="Perguntas frequentes" />
        <div className="border-t border-[rgba(13,13,13,0.1)]">
          {items.map((item, i) => (
            <details key={i} className="group border-b border-[rgba(13,13,13,0.08)] py-6">
              <summary className="flex justify-between items-center cursor-pointer list-none gap-8">
                <span className="text-sm md:text-base font-medium uppercase tracking-tight">{item.q}</span>
                <span className="text-2xl font-light text-[var(--ink)]/50 group-hover:text-[var(--primary)] transition-colors leading-none">+</span>
              </summary>
              <p className="mt-4 text-sm text-[var(--ink)]/60 leading-relaxed max-w-2xl">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
export function CtaFinal() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-8 text-center bg-[var(--primary)] text-white">
      <div className="container-edge">
        <h2 className="font-display text-5xl md:text-7xl lg:text-9xl mb-12 italic text-balance">
          Comece sua análise.
        </h2>
        <p className="max-w-md mx-auto text-white/80 mb-12 text-sm md:text-base leading-relaxed">
          Tenha mais controle, praticidade e acompanhamento em tempo real com AiDEX X CGM.
        </p>
        <Link
          to="/produto"
          className="inline-block bg-white text-[var(--primary)] px-10 md:px-12 py-5 md:py-6 text-xs md:text-sm font-bold uppercase tracking-[0.2em] rounded-xl hover:scale-[1.02] transition-transform"
        >
          Comprar Agora
        </Link>

      </div>
    </section>
  );
}
