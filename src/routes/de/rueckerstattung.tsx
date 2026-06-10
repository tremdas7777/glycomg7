import { createFileRoute } from "@tanstack/react-router";
import { DePolicyPage } from "@/components/de/PolicyPage";
import { deBrand } from "@/lib/locale/de/brand";
import { dePaths } from "@/lib/locale/de/paths";

export const Route = createFileRoute("/de/rueckerstattung")({
  head: () => ({
    meta: [
      { title: "Rückerstattungsrichtlinie | AiDEX" },
      {
        name: "description",
        content: "Bedingungen für Umtausch und Rückerstattung von AiDEX Produkten.",
      },
      { property: "og:title", content: "Rückerstattungsrichtlinie" },
      { property: "og:description", content: "Widerrufsrecht und Rückerstattung bei AiDEX." },
      { property: "og:url", content: dePaths.refund },
    ],
    links: [{ rel: "canonical", href: dePaths.refund }],
  }),
  component: () => (
    <DePolicyPage
      title="Rückerstattungsrichtlinie"
      intro="Widerrufsrecht gemäß deutschem Verbraucherschutz."
    >
      <h2>Widerrufsrecht</h2>
      <p>
        Sie haben 14 Tage nach Erhalt des Produkts das Recht, den Kauf zu widerrufen, gemäß den
        gesetzlichen Bestimmungen.
      </p>
      <h2>So beantragen Sie eine Rückerstattung</h2>
      <p>Kontaktieren Sie uns per E-Mail an {deBrand.email} mit Ihrer Bestellnummer.</p>
      <h2>Rückerstattungsfrist</h2>
      <p>
        Die Rückerstattung wird innerhalb von 14 Tagen nach Erhalt des Produkts in unserem
        Verteilzentrum bearbeitet.
      </p>
    </DePolicyPage>
  ),
});
