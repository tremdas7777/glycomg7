import { createFileRoute } from "@tanstack/react-router";
import { DeSiteLayout } from "@/components/de/Layout";
import { useEffect } from "react";
import { getDeBundle } from "@/lib/locale/de/bundles";
import { bundleIdFromSearch, planSearchSchema } from "@/lib/plan-search";
import { trackCheckoutClick } from "@/lib/analytics";
import { isDeCheckoutConfigured } from "@/lib/locale/de/shopify";
import { dePaths } from "@/lib/locale/de/paths";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/de/checkout")({
  validateSearch: planSearchSchema,
  head: () => ({
    meta: [
      { title: "Sicherer Checkout | AiDEX" },
      { name: "description", content: "Schließen Sie Ihren AiDEX Kauf sicher ab." },
      { property: "og:url", content: dePaths.checkout },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: dePaths.checkout }],
  }),
  component: Page,
});

function Page() {
  const search = Route.useSearch();
  const bundleId = bundleIdFromSearch(search);
  const bundle = getDeBundle(bundleId);
  const checkoutReady = isDeCheckoutConfigured() && bundle.checkoutUrl.startsWith("http");

  useEffect(() => {
    if (checkoutReady) {
      window.location.replace(bundle.checkoutUrl);
    }
  }, [bundle.checkoutUrl, checkoutReady]);

  return (
    <DeSiteLayout>
      <section className="pt-28 md:pt-36 pb-24">
        <div className="container-edge max-w-lg">
          <span className="eyebrow text-[var(--primary)]">Sichere Zahlung</span>
          <h1 className="font-display text-4xl md:text-5xl mt-4 mb-6">
            {checkoutReady ? "Weiterleitung…" : "Checkout wird vorbereitet"}
          </h1>
          <p className="text-[var(--ink)]/70 leading-relaxed mb-8">
            {checkoutReady
              ? `Sie werden zum externen Shopify-Checkout für den Plan ${bundle.name} weitergeleitet.`
              : `Der deutsche Checkout für den Plan ${bundle.name} wird in Kürze aktiviert. Wir informieren Sie, sobald die Zahlungslinks verfügbar sind.`}
          </p>
          {checkoutReady ? (
            <>
              <div className="flex items-center gap-3 text-[var(--ink)]/60">
                <Loader2 className="w-5 h-5 animate-spin text-[var(--primary)]" />
                <span className="text-sm">Shopify-Checkout wird geöffnet…</span>
              </div>
              <a
                href={bundle.checkoutUrl}
                onClick={() =>
                  trackCheckoutClick({
                    source: "checkout_manual_link",
                    bundleId: bundle.id,
                    bundleName: bundle.name,
                    value: bundle.price,
                  })
                }
                className="mt-6 inline-block bg-[var(--primary)] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-colors"
              >
                Zur Zahlung
              </a>
            </>
          ) : (
            <a
              href={dePaths.product}
              className="inline-block bg-[var(--primary)] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-colors"
            >
              Zurück zum Produkt
            </a>
          )}
        </div>
      </section>
    </DeSiteLayout>
  );
}
