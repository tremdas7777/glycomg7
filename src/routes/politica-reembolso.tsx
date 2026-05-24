import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/politica-reembolso")({
  head: () => ({
    meta: [
      { title: "Política de Reembolso | Glycom" },
      { name: "description", content: "Condições de troca e reembolso dos produtos Glycom." },
      { property: "og:title", content: "Política de Reembolso" },
      { property: "og:description", content: "Direito de arrependimento e reembolso Glycom." },
      { property: "og:url", content: "/politica-reembolso" },
    ],
    links: [{ rel: "canonical", href: "/politica-reembolso" }],
  }),
  component: () => (
    <PolicyPage title="Política de Reembolso" intro="Garantia conforme o Código de Defesa do Consumidor.">
      <h2>Direito de arrependimento</h2>
      <p>Você tem até 7 dias após o recebimento do produto para solicitar reembolso, conforme art. 49 do CDC.</p>
      <h2>Como solicitar</h2>
      <p>Entre em contato pelo email contato@glycom.com.br com o número do pedido.</p>
      <h2>Prazo de reembolso</h2>
      <p>O reembolso é processado em até 7 dias úteis após o recebimento do produto em nosso centro de distribuição.</p>
    </PolicyPage>
  ),
});
