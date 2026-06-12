import { createFileRoute } from "@tanstack/react-router";
import { UkPolicyPage } from "@/components/uk/PolicyPage";
import { ukBrand } from "@/lib/locale/uk/brand";
import { ukPaths } from "@/lib/locale/uk/paths";

export const Route = createFileRoute("/uk/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy | AiDEX" },
      { name: "description", content: "How AiDEX protects your personal and health data." },
      { property: "og:title", content: "Privacy" },
      { property: "og:description", content: "Privacy at AiDEX." },
      { property: "og:url", content: ukPaths.privacy },
    ],
    links: [{ rel: "canonical", href: ukPaths.privacy }],
  }),
  component: () => (
    <UkPolicyPage
      title="Privacy"
      intro="AiDEX respects and protects your data in accordance with UK GDPR."
    >
      <h2>Data collected</h2>
      <p>
        We only collect data required for order processing, delivery, and support.
      </p>
      <h2>Use of data</h2>
      <ul>
        <li>Order and payment processing</li>
        <li>Product delivery and transactional communication</li>
        <li>Customer support</li>
      </ul>
      <h2>Security</h2>
      <p>
        We use encryption, SSL, and certified providers to protect your information.
      </p>
      <h2>Your rights</h2>
      <p>
        You can request access, correction, or deletion of your data by emailing {ukBrand.email}.
      </p>
    </UkPolicyPage>
  ),
});
