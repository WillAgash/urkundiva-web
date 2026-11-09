import type { Metadata } from "next";
import Wizard from "@/components/Wizard";

export const metadata: Metadata = {
  title: "Dokumentenservice anfragen | Urkundiva",
  description:
    "Schrittweise zur richtigen Bestellung: Handelsregisterauszug, Beglaubigung, Apostille oder beglaubigte Übersetzung — mit transparenter Preisübersicht.",
};

export default function DokumentenserviceAnfragen() {
  return <Wizard />;
}
