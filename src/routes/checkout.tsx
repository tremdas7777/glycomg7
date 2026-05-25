import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useEffect, useState } from "react";
import { getBundle } from "@/lib/bundles";
import { bundleIdFromSearch, planSearchSchema } from "@/lib/plan-search";
import { useShopifyVariants } from "@/hooks/useShopifyProduct";
import { useCartStore } from "@/stores/cartStore";
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
  const addToCart = useCartStore((s) => s.addItem);
  const [error, setError] = useState<string | null>(null);
  const [manualUrl, setManualUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading || !product) return;
    const variant = variantsByBundle[bundleId];
    if (!variant) {
      setError("Plano indisponível no momento.");
      return;
    }
    let cancelled = false;
    (async () => {
      await addToCart({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions ?? [],
      });
      if (cancelled) return;
      const url = useCartStore.getState().checkoutUrl;
      if (url) {
        setManualUrl(url);
        window.location.replace(url);
      } else {
        setError("Não foi possível iniciar o checkout. Tente novamente.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isLoading, product, variantsByBundle, bundleId, addToCart]);

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
              : `Preparando seu checkout Shopify para o plano ${bundle.name}.`}
          </p>
          {!error && (
            <div className="flex items-center gap-3 text-[var(--ink)]/60">
              <Loader2 className="w-5 h-5 animate-spin text-[var(--primary)]" />
              <span className="text-sm">Conectando ao Shopify…</span>
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
