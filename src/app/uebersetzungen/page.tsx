import type { Metadata } from "next";
import Link from "next/link";
import { InfoCard, PrimaryCta, ServiceIntro } from "@/components/ui";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Beglaubigte Übersetzung anfragen | Urkundiva",
  description:
    "Beglaubigte Übersetzungen durch vereidigte Übersetzer, aktuell für Englisch und Französisch. Original und Übersetzung werden gemeinsam versendet.",
};

export default function Uebersetzungen() {
  return (
    <Reveal>
      <section className="mx-auto flex max-w-[760px] flex-col gap-10 px-5 py-16 sm:px-8 sm:py-20">
        <ServiceIntro title="Beglaubigte Übersetzung anfragen">
          Durch vereidigte Übersetzer, aktuell für Englisch und Französisch.
          Original und Übersetzung werden gemeinsam versendet — auf Wunsch
          inklusive Apostille-Seite auf der Übersetzerbestätigung.
        </ServiceIntro>

        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
          <span className="whitespace-nowrap font-heading text-[22px] font-semibold text-ink-strong">
            ab 32 €
          </span>
          <span className="text-[13px] text-ink-soft">je Seite</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <h2 className="text-[19px]">Andere Sprachen</h2>
          <p className="text-[15px] text-ink-soft">
            Für Sprachen außerhalb unseres Standardangebots suchen wir einen
            vereidigten Übersetzer und melden uns mit einem individuellen
            Angebot, bevor Kosten entstehen.
          </p>
        </div>

        <InfoCard>
          Benötigt die Empfängerstelle die Übersetzung zusätzlich mit{" "}
          <Link href="/apostillen" className="font-semibold text-ink-strong hover:text-navy-dark">
            Apostille
          </Link>
          ? Sagen Sie es uns bei der Anfrage, wir holen sie gemeinsam mit der
          Übersetzung ein.
        </InfoCard>

        <div>
          <PrimaryCta href="/dokumentenservice-anfragen">
            Dokumentenservice anfragen
          </PrimaryCta>
        </div>
      </section>
    </Reveal>
  );
}
