import type { Metadata } from "next";
import { InfoCard, LegalIntro, LegalSection } from "@/components/ui";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Urkundiva",
  description:
    "Welche Daten wir verarbeiten, zu welchem Zweck und welche Rechte Sie haben.",
};

export default function Datenschutz() {
  return (
    <Reveal>
      <section className="mx-auto flex max-w-[760px] flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20">
        <LegalIntro title="Datenschutzerklärung" />

        <InfoCard>
          Entwurf für Gestaltungszwecke, kein rechtsverbindlicher Text. Vor
          dem Live-Betrieb ist eine individuelle, DSGVO-konforme
          Datenschutzerklärung durch einen Fachanwalt zu erstellen —
          insbesondere zu Auftragsverarbeitern und Speicherfristen.
        </InfoCard>

        <LegalSection title="1. Verantwortlicher">
          <p>
            [Firmenname] GbR
            <br />
            [Straße Hausnummer], [PLZ Ort]
            <br />
            E-Mail: [E-Mail-Adresse]
          </p>
        </LegalSection>

        <LegalSection title="2. Welche Daten wir verarbeiten">
          <p>Im Rahmen einer Bestellung erheben wir:</p>
          <ul>
            <li>Name, Firmierung, Anschrift und E-Mail-Adresse</li>
            <li>
              Angaben zum gewünschten Dokument (z. B. Registernummer,
              Zielland, Zielsprache)
            </li>
            <li>
              Zahlungsdaten — diese werden ausschließlich durch unseren
              Zahlungsdienstleister verarbeitet, nicht von uns gespeichert
            </li>
            <li>
              bei Kontaktaufnahme: die von Ihnen mitgeteilten Angaben im
              Kontaktformular
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Zwecke und Rechtsgrundlage">
          <p>
            Die Verarbeitung erfolgt zur Durchführung des Beschaffungs- bzw.
            Vermittlungsauftrags (Art. 6 Abs. 1 lit. b DSGVO) sowie zur
            Erfüllung rechtlicher Aufbewahrungspflichten (Art. 6 Abs. 1 lit.
            c DSGVO).
          </p>
        </LegalSection>

        <LegalSection title="4. Weitergabe an Auftragsverarbeiter und Partner">
          <p>
            Ihre Daten werden ausschließlich an vertraglich gebundene Partner
            mit Auftragsverarbeitungsvertrag (AVV) weitergegeben, soweit dies
            zur Auftragsabwicklung erforderlich ist:
          </p>
          <ul>
            <li>Zahlungsdienstleister zur Abwicklung der Zahlung</li>
            <li>
              Übersetzungspartner, wenn eine beglaubigte Übersetzung
              beauftragt wurde
            </li>
            <li>Hosting-Anbieter unserer Website und Bestellstrecke</li>
            <li>
              das zuständige Registergericht bzw. Landgericht, soweit für die
              Beauftragung erforderlich
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="5. Speicherdauer">
          <p>
            Wir speichern personenbezogene Daten nur so lange, wie es für die
            Vertragsabwicklung erforderlich ist oder gesetzliche
            Aufbewahrungsfristen (z. B. handels- und steuerrechtlich) dies
            vorschreiben. Danach werden die Daten gelöscht.
          </p>
        </LegalSection>

        <LegalSection title="6. Ihre Rechte">
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
            Widerspruch gegen die Verarbeitung. Zudem steht Ihnen ein
            Beschwerderecht bei der zuständigen Datenschutzaufsichtsbehörde
            zu.
          </p>
        </LegalSection>

        <LegalSection title="7. Cookies & Hosting">
          <p>
            Wir setzen nur technisch notwendige Cookies zum Betrieb der
            Bestellstrecke ein. Cookies für Statistik oder Marketing werden
            nur mit Ihrer ausdrücklichen Einwilligung gesetzt. [Angaben zum
            Hosting-Anbieter und ggf. eingesetzten Analysetools ergänzen.]
          </p>
        </LegalSection>

        <LegalSection title="8. Kontakt in Datenschutzfragen">
          <p>[E-Mail-Adresse für Datenschutzanfragen]</p>
        </LegalSection>
      </section>
    </Reveal>
  );
}
