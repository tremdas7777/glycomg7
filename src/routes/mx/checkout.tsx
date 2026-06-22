import { createFileRoute } from "@tanstack/react-router";
import { MxSiteLayout } from "@/components/mx/Layout";
import { useEffect } from "react";
import { getMxBundle } from "@/lib/locale/mx/bundles";
import { bundleIdFromSearch, planSearchSchema } from "@/lib/plan-search";
import { trackCheckoutClick } from "@/lib/analytics";
import { mxPaths } from "@/lib/locale/mx/paths";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/mx/checkout")({
  validateSearch: planSearchSchema,
  head: () => ({
    meta: [
      { title: "Pago seguro | AiDEX" },
      { name: "description", content: "Completa tu compra de AiDEX de forma segura." },
      { property: "og:url", content: mxPaths.checkout },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: mxPaths.checkout }],
  }),
  component: Page,
});

function Page() {
  const search = Route.useSearch();
  const bundleId = bundleIdFromSearch(search);
  const bundle = getMxBundle(bundleId);
  const checkoutReady = bundle.checkoutUrl.startsWith("http");

  useEffect(() => {
    if (checkoutReady) {
      window.location.replace(bundle.checkoutUrl);
    }
  }, [bundle.checkoutUrl, checkoutReady]);

  return (
    <MxSiteLayout>
      <section className="pt-28 md:pt-36 pb-24">
        <div className="container-edge max-w-lg">
          <span className="eyebrow text-[var(--primary)]">Pago seguro</span>
          <h1 className="font-display text-4xl md:text-5xl mt-4 mb-6">
            {checkoutReady ? "Redirigiendo…" : "Checkout en preparación"}
          </h1>
          <p className="text-[var(--ink)]/70 leading-relaxed mb-8">
            {checkoutReady
              ? `Serás redirigido al checkout externo para el plan ${bundle.name}.`
              : `El checkout para México del plan ${bundle.name} estará disponible muy pronto. Te avisaremos cuando los enlaces de pago estén activos.`}
          </p>
          {checkoutReady ? (
            <>
              <div className="flex items-center gap-3 text-[var(--ink)]/60">
                <Loader2 className="w-5 h-5 animate-spin text-[var(--primary)]" />
                <span className="text-sm">Abriendo checkout…</span>
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
                Ir al pago
              </a>
            </>
          ) : (
            <a
              href={mxPaths.product}
              className="inline-block bg-[var(--primary)] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-colors"
            >
              Volver al producto
            </a>
          )}
        </div>
      </section>
    </MxSiteLayout>
  );
}
