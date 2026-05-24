import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Plans, CtaFinal, FaqSection } from "@/components/site/sections";
import heroSensor from "@/assets/hero-sensor.jpg";
import appIphone from "@/assets/app-iphone.jpg";
import { Check, ShieldCheck, Truck, RotateCcw, ArrowRight, Star } from "lucide-react";

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

function Page() {
  return (
    <SiteLayout>
      <section className="py-12 md:py-20">
        <div className="container-edge grid lg:grid-cols-2 gap-12 items-start">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-4 aspect-square rounded-3xl overflow-hidden bg-surface">
              <img src={heroSensor} alt="Glycom G7 CGM" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-surface">
              <img src={appIphone} alt="App" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-surface">
              <img src={heroSensor} alt="Sensor" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          <div>
            <span className="chip mb-4">Em estoque</span>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
              Glycom G7 CGM
            </h1>
            <p className="text-muted-foreground mt-2">Sistema de Monitoramento Contínuo de Glicose</p>
            <div className="flex items-center gap-2 mt-4 text-sm">
              <div className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-muted-foreground">4.9 (2.847 avaliações)</span>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-surface border border-border">
              <div className="text-sm text-muted-foreground">A partir de</div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl font-semibold">R$397</span>
                <span className="text-sm text-muted-foreground">12x de R$39,12</span>
              </div>
            </div>

            <Link to="/checkout" className="btn-primary w-full mt-6 !py-4 text-base">
              Comprar Agora <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#planos" className="btn-ghost w-full mt-3">Ver planos completos</a>

            <ul className="mt-8 grid grid-cols-1 gap-3 text-sm">
              {[
                "Monitoramento contínuo 24h em tempo real",
                "Alertas inteligentes de hipo e hiperglicemia",
                "Aplicativo em português (iOS e Android)",
                "Resistente à água — uso durante banho",
                "Até 15 dias de uso por sensor",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="w-5 h-5 mt-0.5 rounded-full bg-primary/10 text-primary grid place-items-center">
                    <Check className="w-3 h-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-3 mt-8 text-xs">
              <div className="rounded-xl border border-border p-3 text-center">
                <Truck className="w-4 h-4 mx-auto mb-1 text-primary" />
                Frete rastreado
              </div>
              <div className="rounded-xl border border-border p-3 text-center">
                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-primary" />
                Compra segura
              </div>
              <div className="rounded-xl border border-border p-3 text-center">
                <RotateCcw className="w-4 h-4 mx-auto mb-1 text-primary" />
                7 dias garantia
              </div>
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
