import { createFileRoute } from "@tanstack/react-router";
import { UkPolicyPage } from "@/components/uk/PolicyPage";
import { ukPaths } from "@/lib/locale/uk/paths";

export const Route = createFileRoute("/uk/shipping")({
  head: () => ({
    meta: [
      { title: "Delivery policy | AiDEX" },
      {
        name: "description",
        content: "Learn how delivery of AiDEX G7 sensors works.",
      },
      { property: "og:title", content: "Delivery policy" },
      {
        property: "og:description",
        content: "Delivery across the United Kingdom with tracking.",
      },
      { property: "og:url", content: ukPaths.shipping },
    ],
    links: [{ rel: "canonical", href: ukPaths.shipping }],
  }),
  component: () => (
    <UkPolicyPage
      title="Delivery policy"
      intro="We deliver across the United Kingdom with tracking."
    >
      <h2>Processing time</h2>
      <p>Orders are processed within 1 working day after payment confirmation.</p>
      <h2>Delivery time</h2>
      <p>
        Average delivery time is 3 to 7 working days and may vary by region.
      </p>
      <h2>Tracking</h2>
      <p>
        You will receive a tracking code by email once the order has been dispatched.
      </p>
      <h2>Delivery cost</h2>
      <p>
        All current plans in our shop include free delivery across the United Kingdom. The price is
        included in the kit price — no additional delivery fees at checkout.
      </p>
    </UkPolicyPage>
  ),
});
