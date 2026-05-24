import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Plans, FaqSection, CtaFinal } from "@/components/site/sections";
import heroSensor from "@/assets/hero-sensor.jpg";
import appIphone from "@/assets/app-iphone.jpg";

export const Route = createFileRoute("/produto")({
  head: () => ({
    meta: [
      { title: "Glycom G7 CGM — Sensor de Glicose | Glycom" },
      { name: "description", content: "Sensor Glycom G7 CGM para monitoramento contínuo de glicose. Aplicativo completo, alertas inteligentes e dados em tempo real." },
      { property: "og:title", content: "Glycom G7 CGM — Sensor de Glicose" },
      { property: "og:description", content: "Monitoramento contínuo de glicose 24h." },
      { property: "og:url", content: "/produto" },
    ],
    links: [{ rel: "canonical", href: "/produto" }],
  }),
  component: Page,
});

const features = [
  "Monitoramento contínuo 24h em tempo real",
  "Alertas inteligentes de hipo e hiperglicemia",
  "Aplicativo em português (iOS e Android)",
  "Resistente à água — uso durante banho",
  "Até 15 dias de uso por sensor",
];

function Page() {
  return (
    <SiteLayout>
      <section className="pt-32 md:pt-44 pb-20 md:pb-28">
        <div className="container-edge grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 grid grid-cols-4 gap-2">
            <div className="col-span-4 aspect-square bg-white">
              <img src={heroSensor} alt="Glycom G7 CGM" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 aspect-square bg-white">
              <img src={appIphone} alt="App Glycom" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="col-span-2 aspect-square bg-white">
              <img src={heroSensor} alt="Sensor" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <span className="eyebrow text-[var(--primary)] block mb-6">Glycom G7</span>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight text-balance">
              Sensor de <span className="italic">glicose contínuo.</span>
            </h1>
            <p className="mt-6 text-[var(--ink)]/70 leading-relaxed">
              Sistema de monitoramento contínuo de glicose. Tecnologia clínica disponível para a sua rotina.
            </p>

            <div className="mt-10 border-y border-[rgba(13,13,13,0.1)] py-8">
              <div className="eyebrow text-[var(--ink)]/40 mb-2">A partir de</div>
              <div className="flex items-baseline gap-4">
                <span className="font-display text-6xl">R$397</span>
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--ink)]/50">12x de R$39,12</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-8 block w-full text-center bg-[var(--ink)] text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--primary)] transition-colors"
            >
              Comprar Agora
            </Link>
            <a
              href="#planos"
              className="mt-3 block w-full text-center border border-[rgba(13,13,13,0.2)] py-5 text-xs font-bold uppercase tracking-[0.2em] hover:border-[var(--ink)] transition-colors"
            >
              Ver Planos
            </a>

            <ul className="mt-10">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-4 border-b border-[rgba(13,13,13,0.06)] py-4 text-sm">
                  <span className="text-[var(--primary)] font-bold">+</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-3 gap-4 text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/60">
              <div className="border border-[rgba(13,13,13,0.1)] p-4 text-center">Frete<br />rastreado</div>
              <div className="border border-[rgba(13,13,13,0.1)] p-4 text-center">Compra<br />segura</div>
              <div className="border border-[rgba(13,13,13,0.1)] p-4 text-center">7 dias<br />garantia</div>
            </div>
          </div>
        </div>
      </section>

      <Plans />
      <FaqSection limit={6} />
      <CtaFinal />
    </SiteLayout>
  );
}
