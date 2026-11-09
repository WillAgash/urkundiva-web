import type { Metadata } from "next";
import { InfoCard, LegalIntro, LegalSection } from "@/components/ui";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "AGB | Urkundiva",
  description: "Allgemeine Geschäftsbedingungen für die Beauftragung des Dokumentenservice.",
};

export default function AGB() {
  return (
    <Reveal>
      <section className="mx-auto flex max-w-[760px] flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20">
        <LegalIntro title="Allgemeine Geschäftsbedingungen" />

        <InfoCard>
          Entwurf für Gestaltungszwecke, keine Rechtsberatung. Vor dem
          Live-Betrieb sind Leistungsbeschreibung, Widerrufsrecht und
          Haftungsregelung von einem Fachanwalt für Wettbewerbsrecht zu
          prüfen.
        </InfoCard>

        <LegalSection title="§ 1 Geltungsbereich und Vertragspartner">
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für alle über
            [Firmenname] GbR, [Anschrift], vertreten durch die Gesellschafter
            [Name Gesellschafter 1] und [Name Gesellschafter 2], geschlossenen
            Verträge zur Beschaffung und Vermittlung amtlicher Dokumente.
            Vertragspartner können sowohl Unternehmer als auch Verbraucher
            sein.
          </p>
        </LegalSection>

        <LegalSection title="§ 2 Leistungsbeschreibung">
          <p>
            Wir beschaffen und vermitteln für unsere Kunden
            Handelsregisterauszüge, amtliche Beglaubigungen, Apostillen sowie
            beglaubigte Übersetzungen. Wir sind selbst keine Behörde, stellen
            keine amtlichen Dokumente aus und ersetzen keine Rechtsberatung.
            Die Ausstellung erfolgt ausschließlich durch das jeweils
            zuständige Amt, Gericht bzw. den beauftragten vereidigten
            Übersetzer.
          </p>
        </LegalSection>

        <LegalSection title="§ 3 Vertragsschluss und Preise">
          <p>
            Der Vertrag kommt mit Abschluss der Bestellstrecke und
            Zahlungseingang zustande. Amtsgebühren, Gerichtsgebühren und
            Partnerhonorare sind durchlaufende Posten und werden in jedem
            Angebot und jeder Rechnung getrennt von unserer Servicegebühr
            ausgewiesen — auch wenn die Amtsgebühr 0,00 € beträgt.
          </p>
        </LegalSection>

        <LegalSection title="§ 4 Bearbeitungs- und Lieferzeiten">
          <p>
            Für einfache, unbeglaubigte Auszüge streben wir eine Bearbeitung
            am gleichen Werktag an (bei Eingang bis 16:00 Uhr, sonst am
            nächsten Werktag). Für Beglaubigungen, Apostillen und
            Übersetzungen hängt die Bearbeitungsdauer von der
            Bearbeitungsdauer des zuständigen Gerichts bzw.
            Übersetzungspartners ab; wir nennen hierzu einen erfahrungsgemäßen
            Richtwert. Eine verbindliche Zusage fester Bearbeitungszeiten ist
            ausgeschlossen.
          </p>
        </LegalSection>

        <LegalSection title="§ 5 Mitwirkungspflichten des Kunden">
          <p>
            Der Kunde ist verpflichtet, Firmierung, Sitz, Rechtsform und
            Registernummer sowie alle für die Beauftragung erforderlichen
            Angaben vollständig und zutreffend anzugeben. Verzögerungen
            aufgrund fehlerhafter oder unvollständiger Angaben gehen nicht zu
            unseren Lasten.
          </p>
        </LegalSection>

        <LegalSection title="§ 6 Widerrufsrecht für Verbraucher">
          <p>
            Verbrauchern steht grundsätzlich ein gesetzliches Widerrufsrecht
            zu. Stimmt der Kunde ausdrücklich zu, dass wir mit der Ausführung
            des Auftrags bereits vor Ablauf der Widerrufsfrist beginnen, und
            bestätigt er hierbei, dass er dadurch mit vollständiger
            Vertragserfüllung sein Widerrufsrecht verliert (§ 356 Abs. 4
            BGB), erlischt das Widerrufsrecht entsprechend. [Vollständige
            Widerrufsbelehrung nach anwaltlicher Prüfung ergänzen.]
          </p>
        </LegalSection>

        <LegalSection title="§ 7 Haftung">
          <p>
            Wir haften nur für Vorsatz und grobe Fahrlässigkeit sowie bei
            Verletzung wesentlicher Vertragspflichten nach Maßgabe der
            gesetzlichen Bestimmungen. Für Entscheidungen des zuständigen
            Amtes, Gerichts oder einer ausländischen Empfängerstelle — etwa
            die Nichtanerkennung eines Dokuments — übernehmen wir keine
            Haftung.
          </p>
        </LegalSection>

        <LegalSection title="§ 8 Schlussbestimmungen">
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland. Ist der Kunde
            Kaufmann, ist [Gerichtsstand] ausschließlicher Gerichtsstand.
            Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die
            Wirksamkeit der übrigen Bestimmungen unberührt.
          </p>
        </LegalSection>
      </section>
    </Reveal>
  );
}
