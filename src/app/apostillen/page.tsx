import type { Metadata } from "next";
import Link from "next/link";
import { InfoCard, PrimaryCta, ServiceIntro } from "@/components/ui";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Apostille einholen lassen | Urkundiva",
  description:
    "Die Apostille bestätigt die Echtheit eines amtlichen Dokuments für die Verwendung in einem anderen Vertragsstaat des Haager Übereinkommens. Wir holen sie beim zuständigen Landgericht ein.",
};

export default function Apostillen() {
  return (
    <Reveal>
      <section className="mx-auto flex max-w-[760px] flex-col gap-10 px-5 py-16 sm:px-8 sm:py-20">
        <ServiceIntro title="Apostille einholen lassen">
          Die Apostille bestätigt die Echtheit eines amtlichen Dokuments für
          die Verwendung in einem anderen Vertragsstaat des Haager
          Übereinkommens. Sie wird vom zuständigen Landgericht erteilt und
          setzt das Papier-Original mit Siegel voraus.
        </ServiceIntro>

        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
          <span className="whitespace-nowrap font-heading text-[22px] font-semibold text-ink-strong">
            ab 45 €
          </span>
          <span className="text-[13px] text-ink-soft">
            zzgl. Gerichtsgebühr — Laufzeit ca. eine Woche zzgl. Postweg
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <h2 className="text-[19px]">Auf dem Original oder auf der Übersetzung</h2>
          <p className="text-[15px] text-ink-soft">
            Je nachdem, was die Empfängerstelle verlangt, holen wir die
            Apostille auf dem{" "}
            <Link href="/beglaubigungen" className="font-semibold text-ink-strong hover:text-navy-dark">
              beglaubigten Original
            </Link>{" "}
            oder auf der Bestätigung des vereidigten Übersetzers ein — für
            Dokumente mit{" "}
            <Link href="/uebersetzungen" className="font-semibold text-ink-strong hover:text-navy-dark">
              beglaubigter Übersetzung
            </Link>{" "}
            ist Letzteres oft der übliche Weg.
          </p>
        </div>

        <InfoCard>
          Für Länder außerhalb des Haager Übereinkommens ist keine Apostille,
          sondern eine Legalisation über Botschaft oder Konsulat nötig — das
          klären wir mit Ihnen, bevor Kosten entstehen. Nicht sicher, was Ihr
          Zielland verlangt? Sagen Sie es uns bei der Anfrage, wir prüfen es
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
