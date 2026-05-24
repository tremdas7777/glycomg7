import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | Glycom" },
      { name: "description", content: "Fale com a equipe Glycom. Suporte dedicado, atendimento humano." },
      { property: "og:title", content: "Contato Glycom" },
      { property: "og:description", content: "Fale com a equipe Glycom." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="py-16 md:py-28">
        <div className="container-edge grid lg:grid-cols-2 gap-16">
          <div>
            <div className="chip mb-5">Contato</div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              Estamos aqui para ajudar.
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Nossa equipe responde em até 24 horas em dias úteis.
            </p>
            <ul className="mt-10 space-y-6">
              <li className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><Mail className="w-5 h-5" /></span>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">contato@glycom.com.br</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><MessageCircle className="w-5 h-5" /></span>
                <div>
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-sm text-muted-foreground">+55 (11) 90000-0000</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><MapPin className="w-5 h-5" /></span>
                <div>
                  <div className="font-medium">Endereço</div>
                  <div className="text-sm text-muted-foreground">São Paulo, SP — Brasil</div>
                </div>
              </li>
            </ul>
          </div>

          <form className="rounded-3xl border border-border p-8 bg-surface space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Mensagem enviada!"); }}>
            <div>
              <label className="text-sm font-medium">Nome</label>
              <input required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium">Mensagem</label>
              <textarea required rows={5} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button className="btn-primary w-full">Enviar mensagem</button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
