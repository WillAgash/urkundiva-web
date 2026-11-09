import Link from "next/link";

const leistungen = [
  { href: "/handelsregisterauszuege", label: "Handelsregisterauszüge" },
  { href: "/beglaubigungen", label: "Beglaubigungen" },
  { href: "/apostillen", label: "Apostillen" },
  { href: "/uebersetzungen", label: "Übersetzungen" },
];

const rechtliches = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutzerklärung" },
  { href: "/agb", label: "AGB" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1160px] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="flex max-w-xs flex-col gap-3">
            <span className="font-heading text-lg font-semibold text-ink-strong">
              Urkundiva
            </span>
            <p className="text-[14px] leading-relaxed text-ink-soft">
              Wir beschaffen und vermitteln Handelsregisterauszüge,
              Beglaubigungen, Apostillen und beglaubigte Übersetzungen. Wir
              sind selbst keine Behörde.
            </p>
          </div>

          <div className="flex gap-10 sm:gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-semibold uppercase tracking-wide text-ink-strong">
                Leistungen
              </span>
              {leistungen.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[14px] text-ink-soft transition-colors hover:text-ink-strong"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-semibold uppercase tracking-wide text-ink-strong">
                Rechtliches
              </span>
              {rechtliches.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[14px] text-ink-soft transition-colors hover:text-ink-strong"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="text-[14px] text-ink-soft transition-colors hover:text-ink-strong"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-[13px] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; 2026 Urkundiva</span>
          <span>Eine GbR von [Name Gesellschafter 1] &amp; [Name Gesellschafter 2]</span>
        </div>
      </div>
    </footer>
  );
}
