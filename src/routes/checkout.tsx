import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useEffect } from "react";
import { z } from "zod";
import { getBundle } from "@/lib/bundles";

const searchSchema = z.object({
  kit: z.enum(["30", "60", "90"]).optional(),
});

export const Route = createFileRoute("/checkout")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Checkout Seguro | AiDEX" },
      { name: "description", content: "Finalize sua compra AiDEX com segurança." },
      { property: "og:url", content: "/checkout" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: Page,
});

function Page() {
  const search = Route.useSearch();
  const bundle = getBundle(search.kit);

  useEffect(() => {
    window.location.replace(bundle.checkoutUrl);
  }, [bundle.checkoutUrl]);

  return (
    <SiteLayout>
      <section className="pt-28 md:pt-36 pb-24">
        <div className="container-edge max-w-lg">
          <span className="eyebrow text-[var(--primary)]">Pagamento Seguro</span>
          <h1 className="font-display text-4xl md:text-5xl mt-4 mb-6">Redirecionando…</h1>
          <p className="text-[var(--ink)]/70 leading-relaxed mb-8">
            Você está sendo enviado para o checkout seguro do {bundle.name}.
          </p>
          <a
            href={bundle.checkoutUrl}
            className="inline-block bg-[var(--primary)] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-colors"
          >
            Ir para pagamento
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
