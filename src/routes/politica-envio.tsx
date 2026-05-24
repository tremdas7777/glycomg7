import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/politica-envio")({
  head: () => ({
    meta: [
      { title: "Política de Envio | AiDEX" },
      { name: "description", content: "Saiba como funciona o envio dos sensores AiDEX X CGM." },
      { property: "og:title", content: "Política de Envio" },
      { property: "og:description", content: "Envio para todo o Brasil com rastreamento." },
      { property: "og:url", content: "/politica-envio" },
    ],
    links: [{ rel: "canonical", href: "/politica-envio" }],
  }),
  component: () => (
    <PolicyPage title="Política de Envio" intro="Enviamos para todo o Brasil com rastreamento.">
      <h2>Prazo de envio</h2>
      <p>Os pedidos são processados em até 1 dia útil após confirmação do pagamento.</p>
      <h2>Prazo de entrega</h2>
      <p>O prazo médio é de 3 a 7 dias úteis, podendo variar de acordo com a região.</p>
      <h2>Rastreamento</h2>
      <p>Você recebe o código de rastreio por email assim que o pedido for despachado.</p>
      <h2>Frete</h2>
      <p>Calculado no checkout de acordo com o CEP de entrega. Em campanhas promocionais, frete grátis pode ser aplicado.</p>
    </PolicyPage>
  ),
});
