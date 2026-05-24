import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Package, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/rastreio")({
  head: () => ({
    meta: [
      { title: "Rastrear Pedido | Glycom" },
      { name: "description", content: "Acompanhe a entrega do seu pedido Glycom." },
      { property: "og:title", content: "Rastrear Pedido" },
      { property: "og:description", content: "Acompanhe a entrega do seu pedido." },
      { property: "og:url", content: "/rastreio" },
    ],
    links: [{ rel: "canonical", href: "/rastreio" }],
  }),
  component: Page,
});

function Page() {
  const [code, setCode] = useState("");
  const [searched, setSearched] = useState(false);
  return (
    <SiteLayout>
      <section className="py-16 md:py-28">
        <div className="container-edge max-w-2xl">
          <div className="chip mb-5">Rastreio</div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Acompanhe o seu pedido.
          </h1>
          <p className="mt-5 text-muted-foreground">
            Informe o código de rastreio enviado por email.
          </p>
          <form
            className="mt-8 flex gap-3"
            onSubmit={(e) => { e.preventDefault(); setSearched(true); }}
          >
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ex: GLY123456789BR"
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="btn-primary"><Search className="w-4 h-4" /> Rastrear</button>
          </form>

          {searched && (
            <div className="mt-10 rounded-3xl border border-border bg-surface p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><Package className="w-5 h-5" /></span>
                <div>
                  <div className="font-medium">Pedido em trânsito</div>
                  <div className="text-xs text-muted-foreground">Atualizado há 2h</div>
                </div>
              </div>
              <ol className="border-l border-border pl-5 space-y-5 text-sm">
                <li><span className="font-medium">Despachado</span> — Centro de distribuição SP</li>
                <li><span className="font-medium">Em trânsito</span> — A caminho da sua cidade</li>
                <li className="text-muted-foreground">Saiu para entrega</li>
                <li className="text-muted-foreground">Entregue</li>
              </ol>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
