import Link from "next/link";
import Reveal from "@/components/Reveal";

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Eyebrow({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "gold";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] ${
        tone === "gold" ? "text-gold-light" : "text-ink-strong"
      }`}
    >
      <span
        className={`h-px w-5 ${tone === "gold" ? "bg-gold-light" : "bg-gold"}`}
      />
      {children}
    </span>
  );
}

const services = [
  {
    href: "/handelsregisterauszuege",
    title: "Einfacher Handelsregisterauszug",
    description:
      "Aktueller, chronologischer oder historischer Abdruck als PDF — für Banken, Behörden oder die eigenen Unterlagen.",
    price: "ab 15 €",
    priceNote: "zzgl. 0,00 € Amtsgebühr",
    extra: "Zusage: gleicher Werktag bei Bestellung bis 16:00 Uhr",
  },
  {
    href: "/beglaubigungen",
    title: "Amtlich beglaubigter Auszug",
    description:
      "Elektronisch signiertes PDF oder Papier-Original mit Siegel — für die Verwendung im In- und Ausland.",
    price: "ab 35 €",
    priceNote: "zzgl. Amtsgebühr (Durchlaufposten)",
    extra: "Bearbeitungsdauer abhängig vom zuständigen Registergericht",
  },
  {
    href: "/uebersetzungen",
    title: "Beglaubigte Übersetzung",
    description:
      "Durch vereidigte Übersetzer, aktuell Englisch und Französisch. Auf Wunsch inklusive Apostille-Seite.",
    price: "ab 32 €",
    priceNote: "je Seite",
    extra: "Original und Übersetzung werden gemeinsam versendet",
  },
  {
    href: "/apostillen",
    title: "Apostille",
    description:
      "Für die Verwendung in Vertragsstaaten des Haager Übereinkommens — auf dem Original oder der Übersetzerbestätigung.",
    price: "ab 45 €",
    priceNote: "zzgl. Gerichtsgebühr",
    extra: "Laufzeit ca. eine Woche zzgl. Postweg",
  },
];

const steps = [
  {
    n: "01",
    title: "Bedarf beschreiben",
    text: "Sie sagen uns, wofür Sie das Dokument brauchen — wir schlagen die passende Variante vor.",
  },
  {
    n: "02",
    title: "Angaben prüfen",
    text: "Firmierung, Sitz, Registernummer, Zielland. Bei Unklarheiten fragen wir nach, bevor wir beantragen.",
  },
  {
    n: "03",
    title: "Bezahlen & bestätigen",
    text: "Amtsgebühr und Servicegebühr transparent getrennt ausgewiesen.",
  },
  {
    n: "04",
    title: "Wir beschaffen & liefern",
    text: "Per E-Mail informiert über jeden Bearbeitungsschritt, bis zum Versand.",
  },
];

const audiences = [
  {
    title: "Unternehmen",
    text: "Für Ausschreibungen, Bankauskünfte und Geschäfte im Ausland — inklusive Apostille und Übersetzung, wenn der Empfänger sie verlangt.",
  },
  {
    title: "Steuerberater & Notare",
    text: "Ein zuverlässiger Beschaffungsservice, den Sie Ihren Mandanten empfehlen können, ohne selbst Amtswege zu übernehmen.",
  },
  {
    title: "Privatpersonen",
    text: "Wenn eine ausländische Stelle einen beglaubigten Auszug, eine Apostille oder eine beglaubigte Übersetzung verlangt.",
  },
];

const trustPoints = [
  {
    bold: "Amtsgebühr und Servicegebühr",
    rest: "immer getrennt ausgewiesen — auch bei 0,00 € Amtsgebühr.",
  },
  {
    bold: "Realistische Bearbeitungszeiten",
    rest: "statt leerer Versprechen — abhängig von der Bearbeitungsdauer des zuständigen Gerichts.",
  },
  {
    bold: "Wir beantragen für Sie",
    rest: ", nicht als Behörde — und ersetzen keine Rechtsberatung.",
  },
  {
    bold: "Kundendaten",
    rest: "gehen ausschließlich an vertraglich gebundene Partner mit Auftragsverarbeitungsvertrag.",
  },
];

const faqs = [
  {
    q: "Was ist der Unterschied zwischen aktuellem, chronologischem und historischem Abdruck?",
    a: "Der aktuelle Abdruck zeigt den heutigen Stand. Der chronologische Abdruck listet alle Änderungen in zeitlicher Reihenfolge. Der historische Abdruck enthält zusätzlich bereits gelöschte und überholte Einträge, etwa frühere Geschäftsführer.",
  },
  {
    q: "Was ist eine Apostille und wann brauche ich sie?",
    a: "Die Apostille bestätigt die Echtheit eines amtlichen Dokuments für die Verwendung in einem anderen Vertragsstaat des Haager Übereinkommens. Sie wird vom zuständigen Landgericht erteilt und setzt das Papier-Original voraus. Für Länder außerhalb des Haager Übereinkommens ist stattdessen eine Legalisation nötig.",
  },
  {
    q: "Wie lange dauert die Bearbeitung?",
    a: "Ein einfacher Auszug ist in der Regel am selben Werktag fertig. Beglaubigungen und Apostillen hängen von der Bearbeitungsdauer des zuständigen Gerichts ab — wir nennen Ihnen vorab einen realistischen Richtwert und informieren Sie aktiv bei absehbaren Verzögerungen.",
  },
  {
    q: "Seid ihr eine Behörde?",
    a: "Nein. Wir beschaffen und vermitteln amtliche Dokumente für Sie — die eigentliche Ausstellung erfolgt ausschließlich durch das zuständige Amt oder Gericht.",
  },
  {
    q: "Welche Angaben brauchen Sie von mir?",
    a: "Firmierung, Sitz, Rechtsform und möglichst die HRB- oder HRA-Nummer. Bei Auslandsbezug zusätzlich das Zielland und wofür das Dokument dort gebraucht wird. Je vollständiger die Angaben, desto schneller geht es: Eine Rückfrage verzögert die Bearbeitung um rund zwei Werktage, ein falsch beantragter Auszug um die volle Laufzeit plus eine zweite Gebühr.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-gold/25 via-gold/5 to-transparent blur-3xl" />
        <div className="relative mx-auto flex max-w-[1160px] flex-col items-center gap-10 px-5 pt-16 pb-12 sm:px-8 lg:flex-row lg:items-center lg:gap-14 lg:pt-24">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-[13px] text-ink-soft shadow-[0_1px_2px_rgba(11,31,98,0.04)] backdrop-blur">
              <CheckIcon className="text-gold" />
              Amtsgebühr &amp; Servicegebühr immer getrennt ausgewiesen
            </span>

            <h1 className="text-[34px] leading-[1.1] sm:text-[44px] lg:text-[50px]">
              Wichtige Dokumente.
              <br />
              Sorgfältig begleitet.
            </h1>

            <p className="text-[14.5px] italic text-ink-soft">
              Große Sorgfalt. Kein großes Drama.
            </p>

            <p className="max-w-[52ch] text-[17px] text-ink-soft sm:text-[18px]">
              Ob Handelsregisterauszug, Beglaubigung, Apostille oder
              Übersetzung: Urkundiva unterstützt Sie bei der Beschaffung und
              Abwicklung Ihrer Unterlagen. Für private Anliegen und
              geschäftliche Vorhaben – mit verständlichen Abläufen und einem
              klaren Blick auf den nächsten Schritt.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1.5">
              <Link
                href="/dokumentenservice-anfragen"
                className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-[15px] font-semibold text-on-navy shadow-[0_1px_2px_rgba(8,23,71,0.15),0_14px_28px_-14px_rgba(8,23,71,0.55)] transition-all hover:-translate-y-0.5 hover:bg-navy-dark hover:shadow-[0_1px_2px_rgba(8,23,71,0.2),0_18px_32px_-14px_rgba(8,23,71,0.6)]"
              >
                Dokumentenservice anfragen
                <ArrowRightIcon />
              </Link>
              <a
                href="#leistungen"
                className="inline-flex items-center gap-1.5 px-1.5 py-3.5 text-[15px] font-semibold text-ink-strong transition-colors hover:text-navy-dark"
              >
                Leistungen und Ablauf ansehen →
              </a>
            </div>

            <div className="mt-1 flex flex-wrap gap-6 border-t border-border/70 pt-3.5">
              <div className="flex items-center gap-2 text-[14px] text-ink-soft">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M12 7v5l3.2 2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                Einfacher Auszug meist am selben Werktag
              </div>
              <div className="flex items-center gap-2 text-[14px] text-ink-soft">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3l7 3.2v5.3c0 4.6-3 8.4-7 9.5-4-1.1-7-4.9-7-9.5V6.2L12 3z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
                Wir beschaffen und vermitteln — wir sind keine Behörde
              </div>
            </div>
          </div>

          <div className="hidden min-w-[320px] flex-1 justify-center lg:flex">
            <svg
              width="380"
              height="400"
              viewBox="0 0 420 440"
              fill="none"
              className="drop-shadow-[0_30px_40px_rgba(11,31,98,0.14)]"
            >
              <ellipse cx="210" cy="410" rx="150" ry="16" className="fill-ink/5" />
              <g transform="rotate(-4 190 210)">
                <rect
                  x="80"
                  y="60"
                  width="220"
                  height="300"
                  rx="14"
                  className="fill-surface stroke-border"
                  strokeWidth="1.5"
                />
                <rect x="106" y="104" width="150" height="9" rx="4" className="fill-bg-alt" />
                <rect x="106" y="128" width="120" height="9" rx="4" className="fill-bg-alt" />
                <rect x="106" y="160" width="150" height="7" rx="3.5" className="fill-border" />
                <rect x="106" y="178" width="150" height="7" rx="3.5" className="fill-border" />
                <rect x="106" y="196" width="98" height="7" rx="3.5" className="fill-border" />
                <rect x="106" y="224" width="150" height="7" rx="3.5" className="fill-border" />
                <rect x="106" y="242" width="150" height="7" rx="3.5" className="fill-border" />
                <rect x="106" y="260" width="110" height="7" rx="3.5" className="fill-border" />
              </g>
              <g transform="translate(246 246)">
                <defs>
                  <radialGradient id="sealGradient" cx="35%" cy="30%" r="75%">
                    <stop offset="0%" stopColor="#15316f" />
                    <stop offset="100%" stopColor="#081747" />
                  </radialGradient>
                </defs>
                <circle cx="0" cy="0" r="80" fill="url(#sealGradient)" />
                <circle
                  cx="0"
                  cy="0"
                  r="80"
                  fill="none"
                  className="stroke-gold-light"
                  strokeWidth="1.5"
                  strokeDasharray="1.5 7"
                />
                <circle cx="0" cy="0" r="61" fill="none" className="stroke-gold" strokeWidth="1.2" />
                <path
                  d="M-18 2l12 12 26-28"
                  className="stroke-gold-light"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border/70 bg-bg-alt/70 py-6">
        <div className="mx-auto flex max-w-[1160px] flex-wrap gap-6 px-5 text-[14px] text-ink-soft sm:px-8">
          <div className="flex items-center gap-2">
            <CheckIcon className="text-ink-strong" />
            Elektronisch signierte Dokumente unverändert weitergeleitet
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="text-ink-strong" />
            Vereidigte Übersetzungspartner je Sprache
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="text-ink-strong" />
            Kundendaten nur an vertraglich gebundene Partner
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <Reveal>
        <section id="leistungen" className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mb-12 flex max-w-[620px] flex-col gap-3.5">
            <Eyebrow>Leistungen</Eyebrow>
            <h2 className="text-[27px] sm:text-[33px]">
              Vier Bausteine, einzeln oder im Paket kombinierbar
            </h2>
            <p className="text-[16px] text-ink-soft">
              Jede Leistung weist die amtliche Gebühr und unsere Servicegebühr
              getrennt aus — auch wenn die Amtsgebühr null Euro beträgt.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.href}
                className="group flex flex-col gap-3.5 rounded-2xl border border-border/80 bg-surface p-7 shadow-[0_1px_2px_rgba(11,31,98,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-[0_24px_40px_-20px_rgba(11,31,98,0.18)]"
              >
                <h3 className="text-[19px]">{s.title}</h3>
                <p className="text-[15px] text-ink-soft">{s.description}</p>
                <div className="flex items-baseline gap-1.5 pt-1.5">
                  <span className="font-heading text-[23px] font-semibold text-ink-strong">
                    {s.price}
                  </span>
                  <span className="text-[13px] text-ink-soft">{s.priceNote}</span>
                </div>
                <span className="text-[13px] font-medium text-ink-soft">{s.extra}</span>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-ink-strong transition-colors group-hover:text-navy-dark"
                >
                  Mehr erfahren
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-3.5 rounded-2xl border border-border/80 bg-surface p-6 shadow-[0_1px_2px_rgba(11,31,98,0.03)]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="mt-0.5 shrink-0 text-gold"
            >
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 8v5M12 16.2v.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <p className="text-[14.5px] text-ink-soft">
              <strong className="text-ink-strong">Auf Anfrage:</strong>{" "}
              Gesellschafterlisten, Jahresabschlüsse und weitere hinterlegte
              Registerdokumente — gegen Vorkasse und ohne feste Terminzusage,
              da sie nicht immer elektronisch abrufbar sind. Ebenso die
              Legalisation über Botschaft oder Konsulat für Länder außerhalb
              des Haager Übereinkommens. Dokumente, die Sie selbst mitbringen,
              bearbeiten wir nicht — wir beschaffen ausschließlich, was wir
              auch selbst beim Amt beantragt haben.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Ablauf */}
      <Reveal>
        <section id="ablauf" className="relative overflow-hidden bg-navy py-20 sm:py-24">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative mx-auto max-w-[1160px] px-5 sm:px-8">
            <div className="mb-14 flex max-w-[620px] flex-col gap-3.5">
              <Eyebrow tone="gold">So läuft Ihre Bestellung ab</Eyebrow>
              <h2 className="text-[27px] text-on-navy sm:text-[33px]">
                Vier Schritte bis zum fertigen Dokument
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <div key={step.n} className="relative flex flex-col gap-3">
                  <span className="font-heading text-[30px] text-gold-light">{step.n}</span>
                  <h3 className="text-[17px] text-on-navy">{step.title}</h3>
                  <p className="text-[14.5px] text-on-navy/70">{step.text}</p>
                  {i < steps.length - 1 && (
                    <span className="absolute right-[-13px] top-2 hidden h-px w-6 bg-gradient-to-r from-gold/40 to-transparent lg:block" />
                  )}
                </div>
              ))}
            </div>

            <div className="pt-12">
              <Link
                href="/dokumentenservice-anfragen"
                className="gold-surface inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-navy-dark transition-transform hover:-translate-y-0.5"
              >
                Bestellstrecke ausprobieren →
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Für wen */}
      <Reveal>
        <section id="fuer-wen" className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mb-12 flex max-w-[620px] flex-col gap-3.5">
            <Eyebrow>Für wen</Eyebrow>
            <h2 className="text-[27px] sm:text-[33px]">
              Gebaut für alle, die amtliche Dokumente ohne Umwege brauchen
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="flex flex-col gap-2.5 rounded-2xl border border-border/80 bg-surface p-6.5 shadow-[0_1px_2px_rgba(11,31,98,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_40px_-20px_rgba(11,31,98,0.18)]"
              >
                <h3 className="text-[18px]">{a.title}</h3>
                <p className="text-[14.5px] text-ink-soft">{a.text}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Warum Urkundiva */}
      <Reveal>
        <section className="border-y border-border/70 bg-bg-alt/70 py-20 sm:py-24">
          <div className="mx-auto flex max-w-[1160px] flex-col gap-12 px-5 sm:px-8 lg:flex-row lg:items-start lg:gap-16">
            <div className="flex flex-1 flex-col gap-4">
              <Eyebrow>Warum Urkundiva</Eyebrow>
              <h2 className="text-[27px] sm:text-[31px]">
                Verlässlich, weil wir keine Amtsbearbeitung versprechen, die
                wir nicht einhalten können
              </h2>
              <p className="max-w-[50ch] text-[16px] text-ink-soft">
                Wir sind kein Amt — wir beschaffen und vermitteln amtliche
                Dokumente. Genau deshalb legen wir offen, was wir zusagen
                können und was von der Bearbeitungsdauer der Behörden abhängt.
              </p>
            </div>

            <div className="flex flex-1 flex-col rounded-2xl border border-border/80 bg-surface px-6 shadow-[0_1px_2px_rgba(11,31,98,0.03)]">
              {trustPoints.map((point, i) => (
                <div
                  key={point.bold}
                  className={`flex gap-3.5 py-5 ${
                    i < trustPoints.length - 1 ? "border-b border-border/70" : ""
                  }`}
                >
                  <CheckIcon className="mt-0.5 shrink-0 text-gold" />
                  <p className="text-[15px]">
                    <strong>{point.bold}</strong> {point.rest}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section id="faq" className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mb-10 flex max-w-[620px] flex-col gap-3.5">
            <Eyebrow>Häufige Fragen</Eyebrow>
            <h2 className="text-[27px] sm:text-[33px]">Bevor Sie bestellen</h2>
          </div>

          <div className="flex max-w-[780px] flex-col gap-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-border/80 bg-surface px-6 shadow-[0_1px_2px_rgba(11,31,98,0.03)] transition-colors open:border-gold/50"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-[16px] font-semibold text-ink-strong">
                  {f.q}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="faq-chevron shrink-0 text-ink-soft transition-transform duration-300"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <p className="pb-4.5 text-[15px] text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </Reveal>

      {/* CTA band */}
      <Reveal>
        <section className="relative overflow-hidden bg-navy-dark py-19 sm:py-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[640px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative mx-auto flex max-w-[1160px] flex-col items-center gap-5 px-5 text-center sm:px-8">
            <h2 className="max-w-[20ch] text-[27px] text-on-navy sm:text-[35px]">
              Bereit für Ihren nächsten Auszug?
            </h2>
            <p className="max-w-[48ch] text-[16px] text-on-navy/70">
              Wählen Sie Ihr Dokument, machen Sie Ihre Angaben — den Rest
              übernehmen wir.
            </p>
            <Link
              href="/dokumentenservice-anfragen"
              className="gold-surface mt-1.5 inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-navy-dark transition-transform hover:-translate-y-0.5"
            >
              Jetzt Dokument auswählen
            </Link>
          </div>
        </section>
      </Reveal>
    </>
  );
}
