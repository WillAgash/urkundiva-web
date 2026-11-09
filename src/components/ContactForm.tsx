"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { CheckIcon, Eyebrow } from "@/components/ui";
import { emailFormatOk } from "@/lib/validation";

type SubmitPhase = "idle" | "sending" | "done" | "error";

const ANLIEGEN_OPTIONS = [
  { value: "handelsregisterauszug", label: "Handelsregisterauszug" },
  { value: "beglaubigung", label: "Beglaubigung" },
  { value: "apostille", label: "Apostille" },
  { value: "uebersetzung", label: "Beglaubigte Übersetzung" },
  { value: "sonstiges", label: "Sonstiges" },
];

const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-[14.5px] text-ink outline-none focus:border-gold";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13.5px] font-semibold text-ink-strong">{label}</label>
      {children}
    </div>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 4h3l2 5-2.5 1.5a12 12 0 006 6L16 14l5 2v3a2 2 0 01-2 2C11.6 21 3 12.4 3 6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ContactRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-bg-alt text-ink-strong">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 pt-1.5">
        <span className="text-[14px] font-semibold text-ink-strong">{label}</span>
        <span className="text-[14.5px] text-ink-soft">{value}</span>
      </div>
    </div>
  );
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [anliegen, setAnliegen] = useState(ANLIEGEN_OPTIONS[0].value);
  const [nachricht, setNachricht] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nachrichtError, setNachrichtError] = useState(false);

  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>("idle");
  const [resultText, setResultText] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nameOk = name.trim().length > 0;
    const emailOk = emailFormatOk(email);
    const nachrichtOk = nachricht.trim().length > 0;
    setNameError(!nameOk);
    setEmailError(!emailOk);
    setNachrichtError(!nachrichtOk);
    if (!nameOk || !emailOk || !nachrichtOk) return;

    setSubmitPhase("sending");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, anliegen, nachricht }),
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
    <section className="mx-auto max-w-[1160px] px-5 pb-20 pt-10 sm:px-8 sm:pt-12">
      <div className="flex max-w-[600px] flex-col gap-3">
        <Eyebrow>Kontakt</Eyebrow>
        <h1 className="text-[28px] sm:text-[36px]">Wir helfen gern weiter</h1>
        <p className="pt-1 text-[16px] text-ink-soft">
          Fragen zu einem laufenden Auftrag, zu einem Dokumenttyp oder zu einer Kooperation als
          Steuerberater oder Notar — schreiben Sie uns.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="flex flex-col gap-7 lg:w-[300px] lg:shrink-0">
          <ContactRow icon={<MailIcon />} label="E-Mail" value="[E-Mail-Adresse]" />
          <ContactRow icon={<PhoneIcon />} label="Telefon" value="[Telefonnummer]" />
          <ContactRow icon={<ClockIcon />} label="Erreichbarkeit" value="Mo–Fr, [Uhrzeit]" />

          <div className="mt-1 flex flex-col gap-1.5 rounded-2xl border border-border/80 bg-surface p-5 shadow-[0_1px_2px_rgba(11,31,98,0.03)]">
            <span className="text-[14px] font-semibold text-ink-strong">Schon eine Bestellung laufen?</span>
            <p className="text-[13.5px] text-ink-soft">
              Bitte geben Sie in Ihrer Nachricht Ihr Aktenzeichen an — wir finden Ihren Auftrag
              dann sofort.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4.5 rounded-2xl border border-border/80 bg-surface p-7 shadow-[0_1px_2px_rgba(11,31,98,0.03)] sm:p-8"
        >
          {submitPhase === "done" ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-2.5 flex h-12 w-12 items-center justify-center rounded-full bg-bg-alt text-gold">
                <CheckIcon />
              </div>
              <p className="text-[14.5px] text-ink-soft">{resultText}</p>
            </div>
          ) : (
            <>
              <Field label="Name">
                <input
                  className={`${inputClass} ${nameError ? "border-gold" : ""}`}
                  placeholder="Vor- und Nachname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field>
              <Field label="E-Mail">
                <input
                  className={`${inputClass} ${emailError ? "border-gold" : ""}`}
                  placeholder="ihre@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field label="Anliegen">
                <select className={inputClass} value={anliegen} onChange={(e) => setAnliegen(e.target.value)}>
                  {ANLIEGEN_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Nachricht">
                <textarea
                  className={`${inputClass} resize-y ${nachrichtError ? "border-gold" : ""}`}
                  rows={5}
                  placeholder="Wie können wir helfen?"
                  value={nachricht}
                  onChange={(e) => setNachricht(e.target.value)}
                />
              </Field>

              <button
                type="submit"
                disabled={submitPhase === "sending"}
                className="mt-1 flex items-center justify-center rounded-lg border border-navy bg-navy px-6 py-3.5 text-[15px] font-semibold text-on-navy transition-opacity hover:bg-navy-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitPhase === "sending" ? "Wird gesendet …" : "Nachricht senden"}
              </button>

              <p className={`text-[12.5px] ${submitPhase === "error" ? "font-semibold text-gold" : "text-ink-soft"}`}>
                {submitPhase === "error" ? (
                  resultText
                ) : (
                  <>
                    Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben gemäß unserer{" "}
                    <Link href="/datenschutz" className="font-semibold text-ink-strong hover:text-navy-dark">
                      Datenschutzerklärung
                    </Link>{" "}
                    zu.
                  </>
                )}
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
