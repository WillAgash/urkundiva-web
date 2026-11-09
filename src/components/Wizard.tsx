"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  type WizardState,
  type Zweck,
  type Versand,
  defaultState,
  steps,
  STEP_LABELS,
  anfrageGruende,
  versandOptionen,
  positionen,
  reihenfolge,
  eur,
  emailFormatOk,
  laender,
} from "@/lib/pricing";
import { CheckIcon, InfoIcon } from "@/components/ui";

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-strong">
      <span className="h-px w-5 bg-gold" />
      {children}
    </span>
  );
}

function Hint({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "flag" | "ok" }) {
  const icon =
    tone === "ok" ? (
      <CheckIcon className="mt-0.5 shrink-0 text-gold" />
    ) : (
      <InfoIcon className="mt-0.5 shrink-0 text-gold" />
    );
  return (
    <div
      className={`flex gap-3 rounded-xl border p-4 ${
        tone === "flag" ? "border-gold bg-surface" : "border-border/80 bg-bg-alt"
      }`}
    >
      {icon}
      <p className="text-[13.5px] leading-relaxed text-ink-soft [&_strong]:text-ink-strong">{children}</p>
    </div>
  );
}

function OptionCard({
  name,
  value,
  checked,
  onChange,
  title,
  sub,
  disabled,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  sub: ReactNode;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${checked ? "border-gold shadow-[0_0_0_1px_var(--color-gold)_inset]" : "border-border/80 bg-surface"}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="mt-1 shrink-0 accent-[var(--color-gold)]"
      />
      <span>
        <strong className="block text-[15px] text-ink-strong">{title}</strong>
        <span className="block pt-0.5 text-[13.5px] leading-relaxed text-ink-soft [&_a]:font-semibold [&_a]:text-ink-strong">{sub}</span>
      </span>
    </label>
  );
}

function CheckOption({
  checked,
  onChange,
  title,
  sub,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  title?: string;
  sub: ReactNode;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${checked ? "border-gold shadow-[0_0_0_1px_var(--color-gold)_inset]" : "border-border/80 bg-surface"}`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="mt-1 shrink-0 accent-[var(--color-gold)]"
      />
      <span>
        {title && <strong className="block text-[15px] text-ink-strong">{title}</strong>}
        <span className="block pt-0.5 text-[13.5px] leading-relaxed text-ink-soft [&_a]:font-semibold [&_a]:text-ink-strong">{sub}</span>
      </span>
    </label>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13.5px] font-semibold text-ink-strong">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-[14.5px] text-ink outline-none focus:border-gold";

type SubmitPhase = "idle" | "sending" | "done" | "error";

export default function Wizard() {
  const [st, setSt] = useState<WizardState>(defaultState);
  const [current, setCurrent] = useState<string>("zweck");
  const [reached, setReached] = useState<Record<string, boolean>>({ zweck: true });
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>("idle");
  const [resultText, setResultText] = useState("");

  function patch(p: Partial<WizardState>) {
    setSt((s) => ({ ...s, ...p }));
  }

  const active = useMemo(() => steps(st), [st.zweck]);
  const pos = useMemo(() => positionen(st), [st]);
  const gruende = useMemo(() => anfrageGruende(st), [st]);
  const anfrage = gruende.length > 0;
  const vOptions = useMemo(() => versandOptionen(st), [st]);
  const order = useMemo(() => reihenfolge(st), [st]);

  // Versand-Auswahl gültig halten, wenn sich die verfügbaren Optionen ändern.
  useEffect(() => {
    const available = vOptions.filter((o) => !o.off).map((o) => o.value);
    if (!available.includes(st.versand as Versand)) {
      patch({ versand: available[0] ?? "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vOptions]);

  // Apostille-auf-Übersetzung ist nur zusammen mit einer Übersetzung möglich.
  useEffect(() => {
    if (!st.uebersetzung && st.apostilleUeb) patch({ apostilleUeb: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.uebersetzung]);

  // Widerruf-Haken ist nur für Privatpersonen relevant.
  useEffect(() => {
    if (st.kundentyp !== "privat" && st.widerruf) patch({ widerruf: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.kundentyp]);

  // Wenn der aktive Schritt wegen einer Zweck-Änderung wegfällt (z. B. "ausland"
  // verlassen), auf den ersten verfügbaren Schritt zurückfallen.
  useEffect(() => {
    if (!active.includes(current)) setCurrent(active[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function go(dir: 1 | -1) {
    const i = active.indexOf(current);
    const next = active[i + dir];
    if (!next) return;
    setCurrent(next);
    setReached((r) => ({ ...r, [next]: true }));
    if (typeof window !== "undefined") {
      document.getElementById("wz-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const needsWiderruf = st.kundentyp === "privat" && !st.widerruf;
  const ready = st.agb && !needsWiderruf;

  async function handleSubmit() {
    if (!st.kontaktName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    if (!emailFormatOk(st.kontaktEmail)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);

    setSubmitPhase("sending");
    try {
      const res = await fetch("/api/dokumentenservice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(st),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitPhase("error");
        setResultText(data.error || "Da ist etwas schiefgelaufen. Bitte versuchen Sie es erneut.");
        return;
      }
      setSubmitPhase("done");
      setResultText(data.hinweis);
    } catch {
      setSubmitPhase("error");
      setResultText("Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.");
    }
  }

  return (
    <section id="wz-top" className="mx-auto max-w-[1160px] px-5 pb-20 pt-10 sm:px-8 sm:pt-12">
      <div className="flex max-w-[680px] flex-col gap-3">
        <Eyebrow>Bestellstrecke</Eyebrow>
        <h1 className="text-[28px] sm:text-[36px]">Wir fragen erst, wofür Sie das Dokument brauchen</h1>
        <p className="pt-1 text-[16px] text-ink-soft">
          Die häufigsten Fehler entstehen bei der Auswahl: aktueller, chronologischer oder historischer Abdruck — und ob
          Apostille, Übersetzung oder beides verlangt wird. Deshalb führen wir Sie schrittweise durch die Bestellung,
          statt Sie zwischen Fachbegriffen wählen zu lassen.
        </p>
      </div>

      {/* Schritt-Chips */}
      <div className="flex flex-wrap gap-2 pt-7">
        {active.map((s, i) => {
          const isActive = s === current;
          const isDone = reached[s] && !isActive;
          return (
            <button
              key={s}
              type="button"
              disabled={!isDone}
              onClick={() => isDone && setCurrent(s)}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] ${
                isActive
                  ? "border-gold font-semibold text-ink-strong"
                  : isDone
                    ? "cursor-pointer border-border/80 text-ink-soft hover:border-gold"
                    : "cursor-default border-border/80 text-ink-soft"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                  isActive ? "bg-navy text-on-navy" : isDone ? "bg-gold text-on-navy" : "bg-bg-alt text-ink-soft"
                }`}
              >
                {i + 1}
              </span>
              {STEP_LABELS[s]}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-10 pt-6 lg:flex-row lg:items-start lg:gap-10">
        {/* Linke Spalte: Schritte */}
        <div className="flex min-w-0 flex-1 flex-col gap-5" style={{ flexBasis: "440px" }}>
          {current === "zweck" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-[20px]">Wofür brauchen Sie das Dokument?</h2>
              <OptionCard
                name="zweck"
                value="inland-einfach"
                checked={st.zweck === "inland-einfach"}
                onChange={() => patch({ zweck: "inland-einfach" })}
                title="Zur Information — Bank, Geschäftspartner, eigene Unterlagen"
                sub="Ein einfacher, unbeglaubigter Auszug als PDF reicht dafür fast immer aus."
              />
              <OptionCard
                name="zweck"
                value="inland-amtlich"
                checked={st.zweck === "inland-amtlich"}
                onChange={() => patch({ zweck: "inland-amtlich" })}
                title="Für eine Behörde, ein Gericht oder eine Ausschreibung in Deutschland"
                sub="Hier wird in der Regel ein amtlich beglaubigter Auszug verlangt."
              />
              <OptionCard
                name="zweck"
                value="ausland"
                checked={st.zweck === "ausland"}
                onChange={() => patch({ zweck: "ausland" })}
                title="Für die Verwendung im Ausland"
                sub="Beglaubigter Auszug, je nach Zielland zusätzlich Apostille und/oder beglaubigte Übersetzung."
              />
              <OptionCard
                name="zweck"
                value="sonderdokument"
                checked={st.zweck === "sonderdokument"}
                onChange={() => patch({ zweck: "sonderdokument" })}
                title="Ich brauche ein bestimmtes Registerdokument"
                sub="Gesellschafterliste, Jahresabschluss oder ein anderes hinterlegtes Dokument."
              />
              <Hint>
                Nicht sicher, was die Gegenseite verlangt? Wählen Sie, was am ehesten passt — wir prüfen Ihre Angaben vor
                dem Antrag und fragen im Zweifel nach, bevor Kosten entstehen.
              </Hint>
              <div className="flex gap-3 pt-1">
                <button onClick={() => go(1)} className="rounded-lg border border-navy bg-navy px-6 py-3 text-[15px] font-semibold text-on-navy hover:bg-navy-dark">
                  Weiter
                </button>
              </div>
            </div>
          )}

          {current === "details" && (
            <div className="flex flex-col gap-4">
              {st.zweck === "sonderdokument" ? (
                <>
                  <h2 className="text-[20px]">Welches Dokument brauchen Sie?</h2>
                  <OptionCard
                    name="sonderart"
                    value="gesellschafterliste"
                    checked={st.sonderart === "gesellschafterliste"}
                    onChange={() => patch({ sonderart: "gesellschafterliste" })}
                    title="Gesellschafterliste"
                    sub="Beim Registergericht hinterlegte Liste der Gesellschafter."
                  />
                  <OptionCard
                    name="sonderart"
                    value="jahresabschluss"
                    checked={st.sonderart === "jahresabschluss"}
                    onChange={() => patch({ sonderart: "jahresabschluss" })}
                    title="Jahresabschluss / Bilanz"
                    sub="Offengelegter Jahresabschluss des Unternehmens."
                  />
                  <OptionCard
                    name="sonderart"
                    value="sonstiges"
                    checked={st.sonderart === "sonstiges"}
                    onChange={() => patch({ sonderart: "sonstiges" })}
                    title="Ein anderes hinterlegtes Dokument"
                    sub="Wir klären die Verfügbarkeit beim Registergericht und melden uns mit einem Angebot."
                  />
                  <Hint>
                    <strong>Wichtig:</strong> Nicht jedes Dokument liegt elektronisch im Portal. Ist es dort nicht
                    abrufbar, fragen wir schriftlich beim Registergericht an — gegen Vorkasse und ohne feste Terminzusage.
                  </Hint>
                </>
              ) : (
                <>
                  <h2 className="text-[20px]">Welchen Registerstand brauchen Sie?</h2>
                  <OptionCard
                    name="abdruckart"
                    value="aktuell"
                    checked={st.abdruckart === "aktuell"}
                    onChange={() => patch({ abdruckart: "aktuell" })}
                    title="Den aktuellen Stand"
                    sub="Was heute im Register eingetragen ist. Der Standardfall für Banken und Ausschreibungen."
                  />
                  <OptionCard
                    name="abdruckart"
                    value="chronologisch"
                    checked={st.abdruckart === "chronologisch"}
                    onChange={() => patch({ abdruckart: "chronologisch" })}
                    title="Alle Änderungen im Zeitverlauf"
                    sub="Chronologischer Abdruck: jede Eintragung in zeitlicher Reihenfolge, ohne gelöschte Einträge."
                  />
                  <OptionCard
                    name="abdruckart"
                    value="historisch"
                    checked={st.abdruckart === "historisch"}
                    onChange={() => patch({ abdruckart: "historisch" })}
                    title="Auch gelöschte und überholte Einträge"
                    sub="Historischer Abdruck: zeigt zusätzlich z. B. frühere Geschäftsführer. Wird oft mit dem chronologischen Abdruck verwechselt."
                  />
                </>
              )}
              <div className="flex gap-3 pt-1">
                <button onClick={() => go(-1)} className="rounded-lg border border-border bg-surface px-5 py-3 text-[15px] font-semibold text-ink-strong">
                  Zurück
                </button>
                <button onClick={() => go(1)} className="rounded-lg border border-navy bg-navy px-6 py-3 text-[15px] font-semibold text-on-navy hover:bg-navy-dark">
                  Weiter
                </button>
              </div>
            </div>
          )}

          {current === "unternehmen" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-[20px]">Um welches Unternehmen geht es?</h2>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <Field label="Firmierung *">
                  <input className={inputClass} placeholder="z. B. Musterbau GmbH" value={st.firmierung} onChange={(e) => patch({ firmierung: e.target.value })} />
                </Field>
                <Field label="Sitz (Ort) *">
                  <input className={inputClass} placeholder="z. B. München" value={st.sitzOrt} onChange={(e) => patch({ sitzOrt: e.target.value })} />
                </Field>
                <Field label="Rechtsform *">
                  <select className={inputClass} value={st.rechtsform} onChange={(e) => patch({ rechtsform: e.target.value })}>
                    <option>GmbH</option>
                    <option>UG (haftungsbeschränkt)</option>
                    <option>AG</option>
                    <option>OHG</option>
                    <option>KG / GmbH &amp; Co. KG</option>
                    <option>eingetragener Kaufmann (e. K.)</option>
                    <option>Sonstige</option>
                  </select>
                </Field>
                <Field label="Registergericht & HRB/HRA-Nummer">
                  <input className={inputClass} placeholder="z. B. AG München, HRB 123456" value={st.registergericht} onChange={(e) => patch({ registergericht: e.target.value })} />
                </Field>
              </div>
              <Hint>
                <strong>Die Registernummer ist der sicherste Weg.</strong> Gibt es mehrere ähnlich heißende Firmen in
                verschiedenen Städten, können wir ohne sie nicht eindeutig zuordnen und müssen nachfragen — das
                verzögert die Bearbeitung um rund zwei Werktage. Wir rufen nie „auf Verdacht“ ab.
              </Hint>
              <div className="flex gap-3 pt-1">
                <button onClick={() => go(-1)} className="rounded-lg border border-border bg-surface px-5 py-3 text-[15px] font-semibold text-ink-strong">
                  Zurück
                </button>
                <button onClick={() => go(1)} className="rounded-lg border border-navy bg-navy px-6 py-3 text-[15px] font-semibold text-on-navy hover:bg-navy-dark">
                  Weiter
                </button>
              </div>
            </div>
          )}

          {current === "ausland" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-[20px]">Zielland und was dort verlangt wird</h2>
              <Field label="In welchem Land wird das Dokument vorgelegt? *">
                <select
                  className={inputClass}
                  value={st.zielland}
                  onChange={(e) => {
                    const opt = laender.find((l) => l.value === e.target.value);
                    patch({ zielland: e.target.value, ziellandText: opt?.label ?? "", haager: opt?.haager ?? "" });
                  }}
                >
                  {laender.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </Field>

              {st.haager === "ja" && (
                <Hint tone="ok">
                  {st.ziellandText} ist Vertragsstaat des Haager Übereinkommens — eine Apostille ist hier der richtige
                  Weg. Den Vertragsstand prüfen wir vor jedem Antrag erneut beim Auswärtigen Amt.
                </Hint>
              )}
              {st.haager === "nein" && (
                <Hint tone="flag">
                  {st.ziellandText} ist kein Vertragsstaat des Haager Übereinkommens. Statt einer Apostille ist eine
                  Legalisation über Botschaft oder Konsulat nötig — mehrstufig, mehrere Wochen Laufzeit. Diesen Fall
                  kalkulieren wir individuell.
                </Hint>
              )}
              {st.haager === "unklar" && (
                <Hint tone="flag">
                  Für dieses Land prüfen wir zuerst beim Auswärtigen Amt, ob eine Apostille genügt oder eine
                  Legalisation nötig ist, und melden uns mit einem Angebot.
                </Hint>
              )}

              <label className="text-[13.5px] font-semibold text-ink-strong">Was verlangt die Stelle im Zielland?</label>
              <CheckOption
                checked={st.apostilleOrig}
                onChange={() => patch({ apostilleOrig: !st.apostilleOrig })}
                title="Apostille auf dem Auszug"
                sub="Bestätigt die Echtheit des amtlichen Dokuments. Wird vom Landgericht erteilt und setzt das Papier-Original voraus."
              />
              <CheckOption
                checked={st.uebersetzung}
                onChange={() => patch({ uebersetzung: !st.uebersetzung })}
                title="Beglaubigte Übersetzung"
                sub="Durch vereidigte Übersetzer. Wird gemeinsam mit dem Original versendet."
              />
              <CheckOption
                checked={st.apostilleUeb}
                disabled={!st.uebersetzung}
                onChange={() => patch({ apostilleUeb: !st.apostilleUeb })}
                title="Apostille auf der Übersetzerbestätigung"
                sub="Zusätzliche Apostille auf der Unterschrift des Übersetzers — nur zusammen mit einer Übersetzung möglich."
              />
              <CheckOption
                checked={st.unsicher}
                onChange={() => patch({ unsicher: !st.unsicher })}
                title="Das weiß ich nicht genau"
                sub="Wir klären mit Ihnen, was die Empfängerstelle verlangt, und erstellen ein Angebot — ohne dass Sie vorab etwas zahlen."
              />

              {st.uebersetzung && (
                <div className="flex flex-col gap-3.5 pt-1">
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <Field label="Zielsprache *">
                      <select className={inputClass} value={st.sprache} onChange={(e) => patch({ sprache: e.target.value as "en" | "fr" | "andere" })}>
                        <option value="en">Englisch</option>
                        <option value="fr">Französisch</option>
                        <option value="andere">Andere Sprache</option>
                      </select>
                    </Field>
                    <Field label="Seitenzahl des Dokuments">
                      <select className={inputClass} value={st.seiten} onChange={(e) => patch({ seiten: parseInt(e.target.value, 10) })}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} Seite{n > 1 ? "n" : ""}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Hint>
                    {st.apostilleOrig ? (
                      <>
                        <strong>Die Apostille zählt als zusätzliche Seite</strong> und wird mitübersetzt — sie ist in der
                        Kalkulation bereits enthalten. Die endgültige Seitenzahl bestätigen wir, sobald der Auszug
                        vorliegt.
                      </>
                    ) : (
                      "Die endgültige Seitenzahl bestätigen wir, sobald der Auszug vorliegt."
                    )}
                  </Hint>
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button onClick={() => go(-1)} className="rounded-lg border border-border bg-surface px-5 py-3 text-[15px] font-semibold text-ink-strong">
                  Zurück
                </button>
                <button onClick={() => go(1)} className="rounded-lg border border-navy bg-navy px-6 py-3 text-[15px] font-semibold text-on-navy hover:bg-navy-dark">
                  Weiter
                </button>
              </div>
            </div>
          )}

          {current === "versand" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-[20px]">Wie sollen wir liefern?</h2>
              {vOptions.map((o) => (
                <OptionCard
                  key={o.value}
                  name="versand"
                  value={o.value}
                  checked={st.versand === o.value}
                  disabled={o.off}
                  onChange={() => !o.off && patch({ versand: o.value })}
                  title={o.title}
                  sub={o.sub}
                />
              ))}
              {st.versand === "papier" && (
                <div className="flex flex-col gap-3.5 pt-1">
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <Field label="Empfänger / z. Hd. *">
                      <input className={inputClass} placeholder="Name der empfangenden Person" value={st.empfaenger} onChange={(e) => patch({ empfaenger: e.target.value })} />
                    </Field>
                    <Field label="Anzahl Ausfertigungen">
                      <select className={inputClass} value={st.ausfertigungen} onChange={(e) => patch({ ausfertigungen: parseInt(e.target.value, 10) })}>
                        <option value={1}>1 Ausfertigung</option>
                        <option value={2}>2 Ausfertigungen</option>
                        <option value={3}>3 Ausfertigungen</option>
                      </select>
                    </Field>
                  </div>
                  <Field label="Postanschrift *">
                    <input className={inputClass} placeholder="Straße, Hausnummer, PLZ, Ort" value={st.postanschrift} onChange={(e) => patch({ postanschrift: e.target.value })} />
                  </Field>
                  <Hint>
                    Jede weitere Ausfertigung kostet eine eigene Amtsgebühr — sie wird in der Zusammenfassung einzeln
                    ausgewiesen. Originale versenden wir ausschließlich mit Sendungsverfolgung.
                  </Hint>
                </div>
              )}
              <div className="flex gap-3 pt-1">
                <button onClick={() => go(-1)} className="rounded-lg border border-border bg-surface px-5 py-3 text-[15px] font-semibold text-ink-strong">
                  Zurück
                </button>
                <button onClick={() => go(1)} className="rounded-lg border border-navy bg-navy px-6 py-3 text-[15px] font-semibold text-on-navy hover:bg-navy-dark">
                  Weiter
                </button>
              </div>
            </div>
          )}

          {current === "pruefen" && (
            <div className="flex flex-col gap-5">
              <h2 className="text-[20px]">Prüfen und bestellen</h2>

              <div className="flex flex-col gap-3.5">
                <label className="text-[13.5px] font-semibold text-ink-strong">Ihre Kontaktdaten</label>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <Field label="Name *">
                    <input
                      className={`${inputClass} ${nameError ? "border-gold" : ""}`}
                      placeholder="Vor- und Nachname"
                      value={st.kontaktName}
                      onChange={(e) => patch({ kontaktName: e.target.value })}
                    />
                  </Field>
                  <Field label="E-Mail für Rechnung & Zustellung *">
                    <input
                      className={`${inputClass} ${emailError ? "border-gold" : ""}`}
                      placeholder="name@firma.de"
                      value={st.kontaktEmail}
                      onChange={(e) => patch({ kontaktEmail: e.target.value })}
                    />
                  </Field>
                </div>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-surface p-5">
                <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-strong">So bearbeiten wir Ihren Auftrag</span>
                <div className="flex flex-col gap-3">
                  {order.map((t, i) => (
                    <div key={i} className="flex items-start gap-3 text-[14px] text-ink-soft">
                      <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-navy text-[11.5px] font-bold text-on-navy">
                        {i + 1}
                      </span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                {st.zweck === "ausland" && st.apostilleOrig && st.uebersetzung && (
                  <p className="text-[13px] text-ink-soft">
                    Die Reihenfolge ist fest: Die Apostille wird vor der Übersetzung eingeholt, weil die Apostille-Seite
                    mitübersetzt werden muss. Andernfalls erkennen viele ausländische Stellen die Unterlagen nicht an.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[13.5px] font-semibold text-ink-strong">Sie bestellen als</label>
                <div className="flex flex-wrap gap-3">
                  <OptionCard
                    name="kundentyp"
                    value="unternehmen"
                    checked={st.kundentyp === "unternehmen"}
                    onChange={() => patch({ kundentyp: "unternehmen" })}
                    title="Unternehmen"
                    sub="Bestellung im Rahmen einer gewerblichen Tätigkeit."
                  />
                  <OptionCard
                    name="kundentyp"
                    value="privat"
                    checked={st.kundentyp === "privat"}
                    onChange={() => patch({ kundentyp: "privat" })}
                    title="Privatperson"
                    sub="Bestellung als Verbraucher."
                  />
                </div>
              </div>

              {st.kundentyp === "privat" && (
                <CheckOption
                  checked={st.widerruf}
                  onChange={() => patch({ widerruf: !st.widerruf })}
                  sub="Ich verlange ausdrücklich, dass Sie vor Ablauf der Widerrufsfrist mit der Ausführung beginnen. Mir ist bekannt, dass ich mit vollständiger Vertragserfüllung mein Widerrufsrecht verliere (§ 356 Abs. 4 BGB)."
                />
              )}

              <CheckOption
                checked={st.agb}
                onChange={() => patch({ agb: !st.agb })}
                sub={
                  <>
                    Ich stimme den{" "}
                    <Link href="/agb" className="font-semibold text-ink-strong">
                      AGB
                    </Link>{" "}
                    zu und habe die{" "}
                    <Link href="/datenschutz" className="font-semibold text-ink-strong">
                      Datenschutzerklärung
                    </Link>{" "}
                    zur Kenntnis genommen.
                  </>
                }
              />

              <Hint>
                Die Bearbeitung startet nach Zahlungseingang. Wir gehen nicht in Vorleistung bei Amts- und
                Partnerkosten — und melden uns bei jedem Bearbeitungsschritt per E-Mail.
              </Hint>

              <div className="flex gap-3 pt-1">
                <button onClick={() => go(-1)} className="rounded-lg border border-border bg-surface px-5 py-3 text-[15px] font-semibold text-ink-strong">
                  Zurück
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Rechte Spalte: Zusammenfassung */}
        <div className="flex-1 lg:sticky lg:top-24" style={{ flexBasis: "320px" }}>
          <div className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-surface p-6 shadow-[0_1px_2px_rgba(11,31,98,0.03)]">
            <h3 className="text-[16px]">Ihre Zusammenfassung</h3>

            {anfrage && (
              <div className="rounded-xl border border-gold bg-surface p-3.5">
                <p className="text-[13.5px] text-ink">
                  <strong className="text-ink-strong">Individuelles Angebot nötig.</strong> {gruende[0]}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-1">
              <span className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-ink-strong">Servicegebühr</span>
              {pos.service.map((l, i) => (
                <div key={i} className="flex justify-between gap-3.5 text-[14px] text-ink-soft">
                  <span>{l.label}</span>
                  <span className="whitespace-nowrap font-medium text-ink-strong">{anfrage ? "n. Angebot" : eur(l.value)}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 border-t border-border pt-3">
              <span className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-ink-strong">Amts- &amp; Gerichtsgebühren (durchlaufende Posten)</span>
              {pos.amt.map((l, i) => (
                <div key={i} className="flex justify-between gap-3.5 text-[14px] text-ink-soft">
                  <span>{l.label}</span>
                  <span className="whitespace-nowrap font-medium text-ink-strong">{anfrage ? "n. Angebot" : eur(l.value)}</span>
                </div>
              ))}
              <p className="text-[12px] text-ink-soft">Diese Gebühren reichen wir unverändert weiter — daran verdienen wir nichts.</p>
            </div>

            <div className="flex items-baseline justify-between border-t border-border pt-3.5">
              <span className="text-[14px] text-ink-soft">Gesamtbetrag</span>
              <span className={`font-heading font-semibold text-ink-strong ${anfrage ? "text-[20px]" : "text-[26px]"}`}>
                {anfrage ? "auf Anfrage" : eur(pos.total)}
              </span>
            </div>

            <div className="flex items-start gap-2.5 border-t border-border pt-3.5">
              <InfoIcon className="mt-0.5 shrink-0 text-ink-soft" />
              <p className="text-[13px] text-ink-soft">
                {anfrage
                  ? "Laufzeit nennen wir im Angebot — bei Legalisationen sind mehrere Wochen realistisch."
                  : st.zweck === "inland-einfach"
                    ? "In der Regel am selben Werktag, bei Bestellung bis 16:00 Uhr — sonst am nächsten Werktag."
                    : `Erfahrungsgemäß ${pos.zmin}–${pos.zmax} Werktage, abhängig von der Bearbeitungsdauer der zuständigen Stellen. Eine feste Zusage ist nicht möglich; bei Verzögerungen melden wir uns aktiv.`}
              </p>
            </div>

            {submitPhase !== "done" && (
              <>
                <button
                  onClick={handleSubmit}
                  disabled={current !== "pruefen" || (!anfrage && !ready) || submitPhase === "sending"}
                  className="flex items-center justify-center rounded-lg border border-navy bg-navy px-6 py-3.5 text-[15px] font-semibold text-on-navy transition-opacity hover:bg-navy-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitPhase === "sending" ? "Wird gesendet …" : anfrage ? "Unverbindliche Anfrage senden" : "Zahlungspflichtig bestellen"}
                </button>
                <p className={`text-[12.5px] ${submitPhase === "error" ? "font-semibold text-gold" : "text-ink-soft"}`}>
                  {submitPhase === "error"
                    ? resultText
                    : current !== "pruefen"
                      ? "Die Bestellung schließen Sie im letzten Schritt ab."
                      : anfrage
                        ? "Ihre Anfrage ist unverbindlich und kostenlos. Wir melden uns mit einem Festpreis, bevor Kosten entstehen."
                        : !st.agb
                          ? "Bitte stimmen Sie noch den AGB zu."
                          : needsWiderruf
                            ? "Als Verbraucher bestätigen Sie bitte noch den sofortigen Ausführungsbeginn."
                            : "Die Bearbeitung startet nach Zahlungseingang."}
                </p>
              </>
            )}

            {submitPhase === "done" && (
              <div className="py-1 text-center">
                <div className="mx-auto mb-2.5 flex h-12 w-12 items-center justify-center rounded-full bg-bg-alt text-gold">
                  <CheckIcon />
                </div>
                <p className="text-[14px] text-ink-soft">{resultText}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
