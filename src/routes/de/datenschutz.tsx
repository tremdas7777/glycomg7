import { createFileRoute } from "@tanstack/react-router";
import { DePolicyPage } from "@/components/de/PolicyPage";
import { deBrand } from "@/lib/locale/de/brand";
import { dePaths } from "@/lib/locale/de/paths";

export const Route = createFileRoute("/de/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz | AiDEX" },
      { name: "description", content: "Wie AiDEX Ihre persönlichen und Gesundheitsdaten schützt." },
      { property: "og:title", content: "Datenschutz" },
      { property: "og:description", content: "Datenschutz bei AiDEX." },
      { property: "og:url", content: dePaths.privacy },
    ],
    links: [{ rel: "canonical", href: dePaths.privacy }],
  }),
  component: () => (
    <DePolicyPage
      title="Datenschutz"
      intro="AiDEX respektiert und schützt Ihre Daten gemäß der DSGVO."
    >
      <h2>Erhobene Daten</h2>
      <p>
        Wir erheben nur die Daten, die für die Bestellabwicklung, den Versand und den Support
        erforderlich sind.
      </p>
      <h2>Verwendung der Daten</h2>
      <ul>
        <li>Bestell- und Zahlungsabwicklung</li>
        <li>Produktversand und transaktionale Kommunikation</li>
        <li>Kundensupport</li>
      </ul>
      <h2>Sicherheit</h2>
      <p>
        Wir verwenden Verschlüsselung, SSL und zertifizierte Anbieter zum Schutz Ihrer
        Informationen.
      </p>
      <h2>Ihre Rechte</h2>
      <p>
        Sie können Auskunft, Berichtigung oder Löschung Ihrer Daten per E-Mail an {deBrand.email}{" "}
        anfordern.
      </p>
    </DePolicyPage>
  ),
});
