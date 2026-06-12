import { createFileRoute } from "@tanstack/react-router";
import { UkPolicyPage } from "@/components/uk/PolicyPage";
import { ukBrand } from "@/lib/locale/uk/brand";
import { ukPaths } from "@/lib/locale/uk/paths";

export const Route = createFileRoute("/uk/refund")({
  head: () => ({
    meta: [
      { title: "Refund policy | AiDEX" },
      {
        name: "description",
        content: "Terms for exchanges and refunds of AiDEX products.",
      },
      { property: "og:title", content: "Refund policy" },
      { property: "og:description", content: "Returns and refunds at AiDEX." },
      { property: "og:url", content: ukPaths.refund },
    ],
    links: [{ rel: "canonical", href: ukPaths.refund }],
  }),
  component: () => (
    <UkPolicyPage
      title="Refund policy"
      intro="Consumer rights under UK law."
    >
      <h2>Right to cancel</h2>
      <p>
        You have 14 days after receiving the product to cancel your purchase, in accordance with
        statutory consumer protection.
      </p>
      <h2>How to request a refund</h2>
      <p>Contact us by email at {ukBrand.email} with your order number.</p>
      <h2>Refund timeline</h2>
      <p>
        Refunds are processed within 14 days of receiving the product at our distribution centre.
      </p>
    </UkPolicyPage>
  ),
});
