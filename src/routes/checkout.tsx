import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useEffect, useState } from "react";
import { getBundle } from "@/lib/bundles";
import { bundleIdFromSearch, planSearchSchema } from "@/lib/plan-search";
import { useShopifyVariants } from "@/hooks/useShopifyProduct";
import { buildExternalCheckoutUrl } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  validateSearch: planSearchSchema,
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
  const bundleId = bundleIdFromSearch(search);
  const bundle = getBundle(bundleId);
  const { product, variantsByBundle, isLoading } = useShopifyVariants();
  const [error, setError] = useState<string | null>(null);
  const [manualUrl, setManualUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading || !product) return;
    const variant = variantsByBundle[bundleId];
    if (!variant) {
      setError("Plano indisponível no momento.");
      return;
    }
    const url = buildExternalCheckoutUrl([{ variantId: variant.id, quantity: 1 }]);
    if (!url) {
      setError("Não foi possível iniciar o checkout. Tente novamente.");
      return;
    }
    setManualUrl(url);
    window.location.replace(url);
  }, [isLoading, product, variantsByBundle, bundleId]);

  return (
    <SiteLayout>
      <section className="pt-28 md:pt-36 pb-24">
        <div className="container-edge max-w-lg">
          <span className="eyebrow text-[var(--primary)]">Pagamento Seguro</span>
          <h1 className="font-display text-4xl md:text-5xl mt-4 mb-6">
            {error ? "Algo deu errado" : "Redirecionando…"}
          </h1>
          <p className="text-[var(--ink)]/70 leading-relaxed mb-8">
            {error
              ? error
              : `Abrindo o carrinho da Shopify para o app de checkout externo no plano ${bundle.name}.`}
          </p>
          {!error && (
            <div className="flex items-center gap-3 text-[var(--ink)]/60">
              <Loader2 className="w-5 h-5 animate-spin text-[var(--primary)]" />
              <span className="text-sm">Conectando ao carrinho da Shopify…</span>
            </div>
          )}
          {manualUrl && (
            <a
              href={manualUrl}
              className="mt-6 inline-block bg-[var(--primary)] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-colors"
            >
              Ir para pagamento
            </a>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
