import { createFileRoute } from "@tanstack/react-router";
import { UkSiteLayout } from "@/components/uk/Layout";
import { useEffect } from "react";
import { getUkBundle } from "@/lib/locale/uk/bundles";
import { bundleIdFromSearch, planSearchSchema } from "@/lib/plan-search";
import { trackCheckoutClick } from "@/lib/analytics";
import { ukPaths } from "@/lib/locale/uk/paths";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/uk/checkout")({
  validateSearch: planSearchSchema,
  head: () => ({
    meta: [
      { title: "Secure checkout | AiDEX" },
      { name: "description", content: "Complete your AiDEX purchase securely." },
      { property: "og:url", content: ukPaths.checkout },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: ukPaths.checkout }],
  }),
  component: Page,
});

function Page() {
  const search = Route.useSearch();
  const bundleId = bundleIdFromSearch(search);
  const bundle = getUkBundle(bundleId);
  const checkoutReady = bundle.checkoutUrl.startsWith("http");

  useEffect(() => {
    if (checkoutReady) {
      window.location.replace(bundle.checkoutUrl);
    }
  }, [bundle.checkoutUrl, checkoutReady]);

  return (
    <UkSiteLayout>
      <section className="pt-28 md:pt-36 pb-24">
        <div className="container-edge max-w-lg">
          <span className="eyebrow text-[var(--primary)]">Secure payment</span>
          <h1 className="font-display text-4xl md:text-5xl mt-4 mb-6">
            {checkoutReady ? "Redirecting…" : "Checkout being prepared"}
          </h1>
          <p className="text-[var(--ink)]/70 leading-relaxed mb-8">
            {checkoutReady
              ? `You will be redirected to the external Shopify checkout for the ${bundle.name} plan.`
              : `UK checkout for the ${bundle.name} plan will be enabled shortly. We will notify you once payment links are available.`}
          </p>
          {checkoutReady ? (
            <>
              <div className="flex items-center gap-3 text-[var(--ink)]/60">
                <Loader2 className="w-5 h-5 animate-spin text-[var(--primary)]" />
                <span className="text-sm">Opening Shopify checkout…</span>
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
                Go to payment
              </a>
            </>
          ) : (
            <a
              href={ukPaths.product}
              className="inline-block bg-[var(--primary)] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-colors"
            >
              Back to product
            </a>
          )}
        </div>
      </section>
    </UkSiteLayout>
  );
}
