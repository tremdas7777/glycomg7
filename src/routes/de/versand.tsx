import { createFileRoute } from "@tanstack/react-router";
import { DePolicyPage } from "@/components/de/PolicyPage";
import { dePaths } from "@/lib/locale/de/paths";

export const Route = createFileRoute("/de/versand")({
  head: () => ({
    meta: [
      { title: "Versandrichtlinie | AiDEX" },
      {
        name: "description",
        content: "Erfahren Sie, wie der Versand der AiDEX G7 Sensoren funktioniert.",
      },
      { property: "og:title", content: "Versandrichtlinie" },
      {
        property: "og:description",
        content: "Versand in ganz Deutschland mit Sendungsverfolgung.",
      },
      { property: "og:url", content: dePaths.shipping },
    ],
    links: [{ rel: "canonical", href: dePaths.shipping }],
  }),
  component: () => (
    <DePolicyPage
      title="Versandrichtlinie"
      intro="Wir versenden in ganz Deutschland mit Sendungsverfolgung."
    >
      <h2>Versandzeit</h2>
      <p>Bestellungen werden innerhalb von 1 Werktag nach Zahlungsbestätigung bearbeitet.</p>
      <h2>Lieferzeit</h2>
      <p>
        Die durchschnittliche Lieferzeit beträgt 3 bis 7 Werktage und kann je nach Region variieren.
      </p>
      <h2>Sendungsverfolgung</h2>
      <p>
        Sie erhalten den Sendungsverfolgungscode per E-Mail, sobald die Bestellung versendet wurde.
      </p>
      <h2>Versandkosten</h2>
      <p>
        Alle aktuellen Pläne in unserem Shop beinhalten kostenlosen Versand in ganz Deutschland. Der
        Preis ist im Kit-Preis enthalten — es fallen keine zusätzlichen Liefergebühren beim Checkout
        an.
      </p>
    </DePolicyPage>
  ),
});
