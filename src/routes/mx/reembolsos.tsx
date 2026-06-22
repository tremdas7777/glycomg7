import { createFileRoute } from "@tanstack/react-router";
import { MxPolicyPage } from "@/components/mx/PolicyPage";
import { mxBrand } from "@/lib/locale/mx/brand";
import { mxPaths } from "@/lib/locale/mx/paths";

export const Route = createFileRoute("/mx/reembolsos")({
  head: () => ({
    meta: [
      { title: "Política de reembolso | AiDEX" },
      {
        name: "description",
        content: "Condiciones para cambios y reembolsos de productos AiDEX.",
      },
      { property: "og:title", content: "Política de reembolso" },
      { property: "og:description", content: "Devoluciones y reembolsos en AiDEX." },
      { property: "og:url", content: mxPaths.refund },
    ],
    links: [{ rel: "canonical", href: mxPaths.refund }],
  }),
  component: () => (
    <MxPolicyPage
      title="Política de reembolso"
      intro="Derechos del consumidor conforme a la legislación mexicana (PROFECO)."
    >
      <h2>Derecho a cancelar</h2>
      <p>
        Tienes 14 días después de recibir el producto para cancelar tu compra, conforme a la protección legal del consumidor.
      </p>
      <h2>Cómo solicitar un reembolso</h2>
      <p>Contáctanos por email a {mxBrand.email} con tu número de pedido.</p>
      <h2>Plazo de reembolso</h2>
      <p>
        Los reembolsos se procesan en un plazo de 14 días tras recibir el producto en nuestro centro de distribución.
      </p>
    </MxPolicyPage>
  ),
});
