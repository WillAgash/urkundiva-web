import type { Metadata } from "next";
import Link from "next/link";
import { InfoCard, PrimaryCta, PriceCard, ServiceIntro } from "@/components/ui";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Handelsregisterauszug beschaffen | Urkundiva",
  description:
    "Wir beschaffen Ihren Handelsregisterauszug beim zuständigen Registergericht — als einfachen, unbeglaubigten Auszug oder amtlich beglaubigt für Behörden, Gerichte und die Verwendung im Ausland.",
};

export default function Handelsregisterauszuege() {
  return (
    <Reveal>
      <section className="mx-auto flex max-w-[760px] flex-col gap-10 px-5 py-16 sm:px-8 sm:py-20">
        <ServiceIntro title="Handelsregisterauszug beschaffen">
          Für Banken, Ausschreibungen, Geschäftspartner oder die eigenen
          Unterlagen: Wir beschaffen Ihren Handelsregisterauszug beim
          zuständigen Registergericht — als einfachen, unbeglaubigten Auszug
          oder amtlich beglaubigt für Behörden, Gerichte und die Verwendung
          im Ausland.
        </ServiceIntro>

        <div className="flex flex-col gap-5">
          <PriceCard
            title="Einfacher Handelsregisterauszug"
            description="Aktueller, chronologischer oder historischer Abdruck als PDF — ohne Beglaubigung, meist am selben Werktag."
            price="ab 15 €"
            priceNote="zzgl. 0,00 € Amtsgebühr"
          />
          <PriceCard
            title="Amtlich beglaubigter Auszug"
            description="Elektronisch signiertes PDF oder Papier-Original mit Siegel — für Behörden, Gerichte, Ausschreibungen und die Verwendung im Ausland."
            price="ab 35 €"
            priceNote="zzgl. Amtsgebühr (Durchlaufposten)"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <h2 className="text-[19px]">Welchen Registerstand brauche ich?</h2>
          <p className="text-[15px] text-ink-soft">
            Der aktuelle Abdruck zeigt den heutigen Stand — der Standardfall
            für Banken und Ausschreibungen. Der chronologische Abdruck
            listet alle Änderungen in zeitlicher Reihenfolge. Der historische
            Abdruck enthält zusätzlich bereits gelöschte und überholte
            Einträge, etwa frühere Geschäftsführer. Nicht sicher, welche
            Variante die Gegenseite verlangt? Wir prüfen Ihre Angaben vor dem
            Antrag und fragen im Zweifel nach, bevor Kosten entstehen.
          </p>
        </div>

        <InfoCard>
          Für die Verwendung im Ausland kommt in der Regel eine{" "}
          <Link href="/apostillen" className="font-semibold text-ink-strong hover:text-navy-dark">
            Apostille
          </Link>{" "}
          und, falls die Empfängerstelle es verlangt, eine{" "}
          <Link href="/uebersetzungen" className="font-semibold text-ink-strong hover:text-navy-dark">
            beglaubigte Übersetzung
          </Link>{" "}
          hinzu.
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
