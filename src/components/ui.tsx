import type { ReactNode } from "react";
import Link from "next/link";

export function CheckIcon({ className = "" }: { className?: string }) {
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

export function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
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

export function InfoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 8v5M12 16.2v.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: ReactNode;
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

/** The dark-gold "note" box used throughout for caveats and edge cases. */
export function InfoCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3.5 rounded-2xl border border-border/80 bg-surface p-6 shadow-[0_1px_2px_rgba(11,31,98,0.03)]">
      <InfoIcon className="mt-0.5 shrink-0 text-gold" />
      <p className="text-[14.5px] text-ink-soft">{children}</p>
    </div>
  );
}

/** Primary navy call-to-action button, matching the hero's button treatment. */
export function PrimaryCta({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-[15px] font-semibold text-on-navy shadow-[0_1px_2px_rgba(8,23,71,0.15),0_14px_28px_-14px_rgba(8,23,71,0.55)] transition-all hover:-translate-y-0.5 hover:bg-navy-dark hover:shadow-[0_1px_2px_rgba(8,23,71,0.2),0_18px_32px_-14px_rgba(8,23,71,0.6)]"
    >
      {children}
      <ArrowRightIcon />
    </Link>
  );
}

/** A priced service card, used on the service detail pages. */
export function PriceCard({
  title,
  description,
  price,
  priceNote,
}: {
  title: string;
  description: ReactNode;
  price: string;
  priceNote: string;
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-border/80 bg-surface p-7 shadow-[0_1px_2px_rgba(11,31,98,0.03)]">
      <h2 className="text-[18px]">{title}</h2>
      <p className="text-[15px] text-ink-soft">{description}</p>
      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 pt-1">
        <span className="whitespace-nowrap font-heading text-[22px] font-semibold text-ink-strong">
          {price}
        </span>
        <span className="text-[13px] text-ink-soft">{priceNote}</span>
      </div>
    </div>
  );
}

/** Header used on every legal page (Impressum, Datenschutz, AGB). */
export function LegalIntro({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      <Eyebrow>Rechtliches</Eyebrow>
      <h1 className="text-[28px] sm:text-[36px]">{title}</h1>
    </div>
  );
}

/** A single numbered/titled section of body text within a legal page. */
export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[17px]">{title}</h2>
      <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-ink-soft [&_a]:font-semibold [&_a]:text-ink-strong [&_a:hover]:text-navy-dark [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}

/** The standard page header used on every service detail page. */
export function ServiceIntro({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <Eyebrow>Leistung</Eyebrow>
      <h1 className="text-[29px] sm:text-[36px]">{title}</h1>
      <p className="pt-1 text-[16px] text-ink-soft">{children}</p>
    </div>
  );
}
