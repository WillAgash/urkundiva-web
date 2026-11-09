import type { Metadata } from "next";
import { InfoCard, LegalIntro, LegalSection } from "@/components/ui";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Impressum | Urkundiva",
  description: "Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).",
};

export default function Impressum() {
  return (
    <Reveal>
      <section className="mx-auto flex max-w-[760px] flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20">
        <LegalIntro title="Impressum" />

        <InfoCard>
          Dies ist ein gestalterischer Entwurf für ein noch nicht gegründetes
          Unternehmen. Alle Angaben sind Platzhalter und müssen vor dem
          Live-Betrieb durch einen Rechtsanwalt geprüft und durch die
          tatsächlichen Firmendaten ersetzt werden.
        </InfoCard>

        <LegalSection title="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)">
          <p>
            [Firmenname] GbR
            <br />
            [Straße Hausnummer]
            <br />
            [PLZ Ort]
            <br />
            Deutschland
          </p>
        </LegalSection>

        <LegalSection title="Vertreten durch">
          <p>
            Die Gesellschafter [Name Gesellschafter 1] und [Name
            Gesellschafter 2]
          </p>
        </LegalSection>

        <LegalSection title="Kontakt">
          <p>
            Telefon: [Telefonnummer]
            <br />
            E-Mail: [E-Mail-Adresse]
          </p>
        </LegalSection>

        <LegalSection title="Umsatzsteuer">
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr.,
            sofern vorhanden]
            <br />
            <span className="opacity-75">
              Alternativ, sofern Kleinunternehmerregelung genutzt wird:
              Hinweis gemäß § 19 UStG, dass keine Umsatzsteuer ausgewiesen
              wird.
            </span>
          </p>
        </LegalSection>

        <LegalSection title="Inhaltlich Verantwortlicher">
          <p>gemäß § 18 Abs. 2 MStV: [Name, Anschrift wie oben]</p>
        </LegalSection>

        <LegalSection title="Streitschlichtung">
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit: [Link zur OS-Plattform]. Zur
            Teilnahme an einem Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle sind wir nicht verpflichtet und
            grundsätzlich nicht bereit.
          </p>
        </LegalSection>

        <LegalSection title="Haftung für Inhalte und Links">
          <p>
            Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich. Für die Inhalte
            verlinkter externer Seiten übernehmen wir keine Gewähr; für den
            Inhalt der verlinkten Seiten ist ausschließlich deren Betreiber
            verantwortlich.
          </p>
        </LegalSection>
      </section>
    </Reveal>
  );
}
