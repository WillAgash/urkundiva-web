import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Kontakt | Urkundiva",
  description:
    "Fragen zu einem laufenden Auftrag, zu einem Dokumenttyp oder zu einer Kooperation als Steuerberater oder Notar — schreiben Sie uns.",
};

export default function Kontakt() {
  return (
    <Reveal>
      <ContactForm />
    </Reveal>
  );
}
