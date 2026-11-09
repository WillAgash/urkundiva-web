import Link from "next/link";
import Image from "next/image";

const leistungen = [
  { href: "/handelsregisterauszuege", label: "Handelsregisterauszüge" },
  { href: "/beglaubigungen", label: "Beglaubigungen" },
  { href: "/apostillen", label: "Apostillen" },
  { href: "/uebersetzungen", label: "Übersetzungen" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border/70 bg-surface/85 shadow-[0_1px_0_rgba(11,31,98,0.03)] backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1160px] items-center justify-between gap-6 px-5 sm:h-21 sm:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Urkundiva Dokumentenservice"
            width={1903}
            height={515}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className="text-[15px] text-ink-soft transition-colors hover:text-ink-strong"
          >
            Start
          </Link>

          <div className="group relative">
            <button className="flex items-center gap-1.5 text-[15px] text-ink-soft transition-colors hover:text-ink-strong">
              Leistungen
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-px"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="invisible absolute left-0 top-full flex w-64 flex-col gap-1 rounded-xl border border-border bg-surface p-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100">
              {leistungen.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-[14.5px] text-ink-soft transition-colors hover:bg-bg-alt hover:text-ink-strong"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/kontakt"
            className="text-[15px] text-ink-soft transition-colors hover:text-ink-strong"
          >
            Kontakt
          </Link>
        </nav>

        <Link
          href="/dokumentenservice-anfragen"
          className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-[14px] font-semibold text-on-navy shadow-[0_1px_2px_rgba(8,23,71,0.15),0_10px_18px_-10px_rgba(8,23,71,0.5)] transition-all hover:-translate-y-0.5 hover:bg-navy-dark sm:text-[15px]"
        >
          <span className="hidden sm:inline">Dokumentenservice anfragen</span>
          <span className="sm:hidden">Anfragen</span>
        </Link>
      </div>
    </header>
  );
}
