"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps a section and gently fades/slides it into view the first time it
 * scrolls into the viewport. Intentionally subtle and one-shot (no replay,
 * no scroll-jacking) — this is meant to add quiet polish, not spectacle.
 * Respects prefers-reduced-motion via the CSS in globals.css.
 */
export default function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setVisible(true), delayMs);
          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
