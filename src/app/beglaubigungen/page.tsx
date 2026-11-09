import type { Metadata } from "next";
import Link from "next/link";
import { InfoCard, PrimaryCta, ServiceIntro } from "@/components/ui";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Amtliche Beglaubigung organisieren | Urkundiva",
  description:
    "Wir stellen den Antrag beim zuständigen Registergericht für elektronisch signierte oder im Original beglaubigte Dokumente — die Beglaubigung selbst nimmt ausschließlich die zuständige Stelle vor.",
};

export default function Beglaubigungen() {
  return (
    <Reveal>
      <section className="mx-auto flex max-w-[760px] flex-col gap-10 px-5 py-16 sm:px-8 sm:py-20">
        <ServiceIntro title="Amtliche Beglaubigung organisieren">
          Für Register- oder andere amtliche Dokumente, die eine Behörde,
          ein Gericht oder eine Stelle im Ausland im Original oder mit
          elektronischer Signatur verlangt. Wir stellen den Antrag beim
          zuständigen Registergericht — die Beglaubigung selbst nimmt
          ausschließlich die zuständige Stelle vor.
        </ServiceIntro>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-surface p-7 shadow-[0_1px_2px_rgba(11,31,98,0.03)]">
            <h2 className="text-[18px]">Elektronisch signiertes PDF</h2>
            <p className="text-[15px] text-ink-soft">
              Gültig durch die elektronische Signatur. Wir leiten die Datei
              unverändert weiter — Ausdrucken oder Einscannen zerstört die
              Signatur.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-surface p-7 shadow-[0_1px_2px_rgba(11,31,98,0.03)]">
            <h2 className="text-[18px]">Papier-Original mit Siegel</h2>
            <p className="text-[15px] text-ink-soft">
              Original mit Siegel und Unterschrift, versendet mit
              Sendungsverfolgung — nötig, wenn zusätzlich eine{" "}
              <Link href="/apostillen" className="font-semibold text-ink-strong hover:text-navy-dark">
                Apostille
              </Link>{" "}
              oder eine{" "}
              <Link href="/uebersetzungen" className="font-semibold text-ink-strong hover:text-navy-dark">
                beglaubigte Übersetzung
              </Link>{" "}
              aufs Original folgt.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
          <span className="whitespace-nowrap font-heading text-[22px] font-semibold text-ink-strong">
            ab 35 €
          </span>
          <span className="text-[13px] text-ink-soft">
            zzgl. Amtsgebühr (Durchlaufposten) — Bearbeitungsdauer abhängig
            vom zuständigen Registergericht
          </span>
        </div>

        <InfoCard>
          Wir sind selbst keine Behörde und stellen keine amtlichen
          Beglaubigungen aus — wir übernehmen die Beantragung und Abwicklung
          für Sie.
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
