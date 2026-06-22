import { createFileRoute } from "@tanstack/react-router";
import { MxPolicyPage } from "@/components/mx/PolicyPage";
import { mxPaths } from "@/lib/locale/mx/paths";

export const Route = createFileRoute("/mx/envios")({
  head: () => ({
    meta: [
      { title: "Política de envíos | AiDEX" },
      {
        name: "description",
        content: "Conoce cómo funciona el envío de los sensores AiDEX G7.",
      },
      { property: "og:title", content: "Política de envíos" },
      {
        property: "og:description",
        content: "Envío con seguimiento a todo México.",
      },
      { property: "og:url", content: mxPaths.shipping },
    ],
    links: [{ rel: "canonical", href: mxPaths.shipping }],
  }),
  component: () => (
    <MxPolicyPage
      title="Política de envíos"
      intro="Enviamos a todo México con seguimiento."
    >
      <h2>Tiempo de procesamiento</h2>
      <p>Los pedidos se procesan en 1 día hábil tras la confirmación del pago.</p>
      <h2>Tiempo de entrega</h2>
      <p>
        El tiempo promedio de entrega es de 3 a 7 días hábiles y puede variar según la región.
      </p>
      <h2>Seguimiento</h2>
      <p>
        Recibirás un número de guía por email una vez enviado el pedido.
      </p>
      <h2>Costo de envío</h2>
      <p>
        Todos los planes actuales de nuestra tienda incluyen envío gratis a todo México. El costo está incluido en el precio del kit — sin cargos adicionales en el checkout.
      </p>
    </MxPolicyPage>
  ),
});
