import { createFileRoute } from "@tanstack/react-router";
import { MxPolicyPage } from "@/components/mx/PolicyPage";
import { mxBrand } from "@/lib/locale/mx/brand";
import { mxPaths } from "@/lib/locale/mx/paths";

export const Route = createFileRoute("/mx/privacidad")({
  head: () => ({
    meta: [
      { title: "Privacidad | AiDEX" },
      { name: "description", content: "Cómo AiDEX protege tus datos personales y de salud." },
      { property: "og:title", content: "Privacidad" },
      { property: "og:description", content: "Privacidad en AiDEX." },
      { property: "og:url", content: mxPaths.privacy },
    ],
    links: [{ rel: "canonical", href: mxPaths.privacy }],
  }),
  component: () => (
    <MxPolicyPage
      title="Privacidad"
      intro="AiDEX respeta y protege tus datos conforme a la Ley Federal de Protección de Datos Personales en México."
    >
      <h2>Datos que recolectamos</h2>
      <p>
        Solo recolectamos los datos necesarios para el procesamiento del pedido, la entrega y el soporte.
      </p>
      <h2>Uso de los datos</h2>
      <ul>
        <li>Procesamiento de pedidos y pagos</li>
        <li>Envío del producto y comunicación transaccional</li>
        <li>Atención al cliente</li>
      </ul>
      <h2>Seguridad</h2>
      <p>
        Usamos cifrado, SSL y proveedores certificados para proteger tu información.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a {mxBrand.email}.
      </p>
    </MxPolicyPage>
  ),
});
