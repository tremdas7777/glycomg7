import { Link } from "@tanstack/react-router";
import {
  Activity, BellRing, LineChart, Sparkles, ShieldCheck,
  Share2, Smartphone, Check, X, ArrowRight, Star, Zap,
} from "lucide-react";
import heroSensor from "@/assets/hero-sensor.jpg";
import appIphone from "@/assets/app-iphone.jpg";
import lifestyleRunning from "@/assets/lifestyle-running.jpg";
import lifestyleFood from "@/assets/lifestyle-food.jpg";

const heroBadges = [
  "Monitoramento 24h", "Sem escaneamento", "Alertas inteligentes",
  "App em português", "Dados em tempo real",
];

export function Hero() {
  return (
    <section className="hero-radial relative overflow-hidden">
      <div className="container-edge pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="fade-up">
            <div className="chip mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Tecnologia médica de nova geração
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance leading-[1.05]">
              Monitoramento contínuo de glicose em tempo real.
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Acompanhe sua glicose 24 horas por dia com tecnologia inteligente,
              alertas personalizados e monitoramento contínuo direto no seu celular.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/produto" className="btn-primary">
                Comprar Agora <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#como-funciona" className="btn-ghost">Ver Como Funciona</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {heroBadges.map((b) => (
                <span key={b} className="chip">{b}</span>
              ))}
            </div>
          </div>

          <div className="relative fade-up" style={{ animationDelay: "120ms" }}>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-surface shadow-[var(--shadow-elegant)]">
              <img
                src={heroSensor}
                alt="Sensor Glycom G7 CGM aplicado no braço"
                className="w-full h-full object-cover"
                width={1600}
                height={1200}
              />
            </div>
            <div className="hidden md:block absolute -bottom-10 -left-10 w-56 rounded-2xl overflow-hidden border border-border bg-card shadow-[var(--shadow-elegant)]">
              <img src={appIphone} alt="Aplicativo Glycom" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="hidden md:flex absolute -top-6 -right-6 items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 shadow-[var(--shadow-soft)]">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary grid place-items-center">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Glicose agora</div>
                <div className="text-base font-semibold">112 <span className="text-xs font-normal text-muted-foreground">mg/dL</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { icon: Activity, title: "Monitoramento contínuo", text: "Acompanhe sua glicose em tempo real 24 horas por dia." },
  { icon: BellRing, title: "Alertas inteligentes", text: "Receba alertas instantâneos de alta e baixa glicemia." },
  { icon: LineChart, title: "Dados em tempo real", text: "Visualize tendências e gráficos diretamente no aplicativo." },
  { icon: Zap, title: "Aplicação simples", text: "Sensor discreto, confortável e fácil de aplicar." },
  { icon: Sparkles, title: "Mais controle", text: "Entenda como alimentação e exercícios impactam sua glicose." },
  { icon: Share2, title: "Compartilhamento inteligente", text: "Compartilhe dados com familiares e profissionais de saúde." },
];

export function Benefits() {
  return (
    <section id="beneficios" className="py-20 md:py-32">
      <div className="container-edge">
        <div className="max-w-2xl mb-14">
          <div className="chip mb-5">Benefícios</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Tecnologia médica para o seu dia a dia.
          </h2>
        </div>
        <div className="grid gap-px bg-border rounded-3xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="bg-background p-8 hover:bg-surface transition-colors">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary grid place-items-center mb-5">
                <b.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", title: "Aplique o sensor", text: "Fixe o sensor na pele de forma simples e rápida." },
  { n: "02", title: "Conecte ao aplicativo", text: "Conecte o Glycom G7 CGM via Bluetooth." },
  { n: "03", title: "Monitore em tempo real", text: "Visualize leituras contínuas diretamente no celular." },
  { n: "04", title: "Receba alertas", text: "Receba notificações inteligentes em tempo real." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-32 soft-orange">
      <div className="container-edge">
        <div className="max-w-2xl mb-14">
          <div className="chip mb-5">Como funciona</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Quatro passos. Monitoramento contínuo.
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="bg-background rounded-2xl p-8 border border-border">
              <div className="text-sm font-mono text-primary mb-6">{s.n}</div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AppSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-edge grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="aspect-square rounded-3xl overflow-hidden bg-surface">
            <img src={appIphone} alt="App Glycom mostrando glicose" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="chip mb-5">
            <Smartphone className="w-3.5 h-3.5 text-primary" /> Aplicativo
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Controle inteligente na palma da sua mão.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-lg">
            Acompanhe tendências, receba alertas personalizados e visualize sua glicose
            em tempo real com uma experiência simples e intuitiva.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {["Gráficos glicêmicos contínuos","Tendências e Time in Range","Alertas e notificações inteligentes","Compartilhamento com familiares e médicos"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary grid place-items-center">
                  <Check className="w-3 h-3" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const rows = [
  { f: "Monitoramento contínuo 24h", g7: true, t: false },
  { f: "Dados em tempo real", g7: true, t: false },
  { f: "Alertas inteligentes", g7: true, t: false },
  { f: "Sem escaneamento constante", g7: true, t: false },
  { f: "Tendências glicêmicas", g7: true, t: false },
  { f: "Aplicativo completo em português", g7: true, t: false },
];

export function Comparison() {
  return (
    <section className="py-20 md:py-32 soft-orange">
      <div className="container-edge">
        <div className="max-w-2xl mb-14">
          <div className="chip mb-5">Comparativo</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Glycom G7 CGM vs sensores tradicionais.
          </h2>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border bg-background">
          <div className="grid grid-cols-3 text-sm font-medium bg-surface">
            <div className="p-5 text-muted-foreground">Recurso</div>
            <div className="p-5 text-center text-foreground">Glycom G7 CGM</div>
            <div className="p-5 text-center text-muted-foreground">Tradicional</div>
          </div>
          {rows.map((r, i) => (
            <div key={r.f} className={`grid grid-cols-3 text-sm ${i % 2 ? "bg-surface/40" : ""}`}>
              <div className="p-5">{r.f}</div>
              <div className="p-5 flex justify-center">
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground grid place-items-center">
                  <Check className="w-4 h-4" />
                </span>
              </div>
              <div className="p-5 flex justify-center">
                <span className="w-7 h-7 rounded-full bg-muted text-muted-foreground grid place-items-center">
                  <X className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const plans = [
  { name: "Kit 30 Dias", sensors: "2 Sensores Glycom G7 CGM", price: "R$397", text: "Monitoramento contínuo por 30 dias.", featured: false },
  { name: "Kit 60 Dias", sensors: "4 Sensores Glycom G7 CGM", price: "R$697", text: "Mais economia e monitoramento prolongado.", featured: true },
  { name: "Kit 90 Dias", sensors: "6 Sensores Glycom G7 CGM", price: "R$997", text: "Máxima economia para acompanhamento contínuo.", featured: false },
];

export function Plans() {
  return (
    <section id="planos" className="py-20 md:py-32">
      <div className="container-edge">
        <div className="max-w-2xl mb-14">
          <div className="chip mb-5">Planos</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Escolha o kit ideal para você.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-8 border transition-all ${
                p.featured
                  ? "bg-foreground text-background border-foreground shadow-[var(--shadow-elegant)] md:scale-[1.03]"
                  : "bg-background border-border hover:border-foreground/30"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 chip !bg-primary !text-primary-foreground !border-transparent">
                  MAIS VENDIDO
                </span>
              )}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className={`text-sm mt-1 ${p.featured ? "text-background/70" : "text-muted-foreground"}`}>{p.sensors}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
              </div>
              <p className={`mt-3 text-sm ${p.featured ? "text-background/80" : "text-muted-foreground"}`}>{p.text}</p>
              <Link
                to="/checkout"
                className={`mt-8 w-full ${p.featured ? "btn-primary" : "btn-ghost"}`}
              >
                Comprar Agora <ArrowRight className="w-4 h-4" />
              </Link>
              <ul className={`mt-6 space-y-2 text-sm ${p.featured ? "text-background/80" : "text-muted-foreground"}`}>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Frete rastreado</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Suporte dedicado</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> App completo incluso</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Marina S.", role: "Atleta amadora", img: lifestyleRunning, quote: "Agora consigo acompanhar minha glicose em tempo real de forma muito mais prática." },
  { name: "Rafael C.", role: "Engenheiro", img: lifestyleFood, quote: "O aplicativo é extremamente intuitivo e os alertas ajudam muito no dia a dia." },
  { name: "Letícia M.", role: "Nutricionista", img: lifestyleRunning, quote: "Consegui entender melhor como alimentação e exercícios impactam minha glicose." },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 soft-orange">
      <div className="container-edge">
        <div className="max-w-2xl mb-14">
          <div className="chip mb-5">Depoimentos</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Confiança de quem usa todos os dias.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="bg-background rounded-3xl p-8 border border-border">
              <div className="flex gap-0.5 text-primary mb-5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <blockquote className="text-lg leading-snug font-medium text-balance">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={t.img} alt="" className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export const faqItems = [
  { q: "O que é um CGM?", a: "CGM (Continuous Glucose Monitor) é um sistema de monitoramento contínuo que mede sua glicose em tempo real, 24 horas por dia." },
  { q: "Como funciona o Glycom G7 CGM?", a: "O sensor é aplicado na pele e envia automaticamente as leituras de glicose ao aplicativo via Bluetooth, sem necessidade de escaneamento." },
  { q: "Precisa escanear?", a: "Não. As leituras são enviadas continuamente, sem necessidade de aproximar o celular do sensor." },
  { q: "Quanto tempo dura cada sensor?", a: "Cada sensor Glycom G7 CGM dura até 15 dias de uso contínuo." },
  { q: "O aplicativo funciona em português?", a: "Sim. O aplicativo é totalmente em português brasileiro e disponível para iOS e Android." },
  { q: "Como acompanho minha glicose?", a: "Pelo aplicativo Glycom você visualiza gráficos em tempo real, tendências, alertas e relatórios completos." },
  { q: "O sensor é confortável?", a: "Sim. O design discreto e leve permite uso confortável durante todas as atividades diárias." },
  { q: "Posso tomar banho usando o sensor?", a: "Sim. O sensor é resistente à água e pode ser usado durante banho e atividades aquáticas." },
  { q: "Como funciona o envio?", a: "Enviamos para todo o Brasil com rastreamento. Detalhes em nossa política de envio." },
  { q: "Em quanto tempo recebo?", a: "O prazo médio é de 3 a 7 dias úteis após confirmação do pagamento." },
  { q: "O aplicativo possui alertas?", a: "Sim. Você recebe alertas personalizados para hipo e hiperglicemia em tempo real." },
  { q: "Posso compartilhar os dados?", a: "Sim. Você pode compartilhar seus dados com familiares e profissionais de saúde de forma segura." },
];

export function FaqSection({ limit }: { limit?: number }) {
  const items = limit ? faqItems.slice(0, limit) : faqItems;
  return (
    <section className="py-20 md:py-32">
      <div className="container-edge max-w-3xl">
        <div className="mb-14">
          <div className="chip mb-5">FAQ</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Perguntas frequentes.
          </h2>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {items.map((item, i) => (
            <details key={i} className="group py-5">
              <summary className="flex justify-between items-center cursor-pointer list-none gap-6">
                <span className="font-medium text-base">{item.q}</span>
                <span className="w-7 h-7 rounded-full border border-border grid place-items-center transition-transform group-open:rotate-45 shrink-0">
                  <span className="text-lg leading-none">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaFinal() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-edge">
        <div className="relative overflow-hidden rounded-[2rem] hero-radial border border-border p-10 md:p-20 text-center">
          <div className="chip mx-auto mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Tecnologia premium
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance max-w-3xl mx-auto leading-[1.05]">
            Tecnologia inteligente para monitoramento contínuo.
          </h2>
          <p className="mt-6 text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Tenha mais controle, praticidade e acompanhamento em tempo real com Glycom G7 CGM.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/produto" className="btn-primary">
              Comprar Agora <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
