// Zentrale Preis- und Ablauf-Logik für die Bestellstrecke.
// Bewusst als reine, zustandslose Funktionen gebaut: dieselbe Logik läuft
// im Browser (für die Live-Zusammenfassung) UND in der API-Route (für die
// verbindliche, serverseitige Neuberechnung bei der Bestellung). Der Client
// darf nie den Gesamtbetrag selbst mitschicken — nur die Auswahl.

export type Zweck = "inland-einfach" | "inland-amtlich" | "ausland" | "sonderdokument";
export type Abdruckart = "aktuell" | "chronologisch" | "historisch";
export type Sonderart = "gesellschafterliste" | "jahresabschluss" | "sonstiges";
export type Versand = "pdf" | "signiert" | "papier";
export type Kundentyp = "unternehmen" | "privat";
export type Haager = "" | "ja" | "nein" | "unklar";

export interface WizardState {
  zweck: Zweck;
  abdruckart: Abdruckart;
  sonderart: Sonderart;
  zielland: string;
  ziellandText: string;
  haager: Haager;
  apostilleOrig: boolean;
  uebersetzung: boolean;
  apostilleUeb: boolean;
  unsicher: boolean;
  sprache: "en" | "fr" | "andere";
  seiten: number;
  versand: Versand | "";
  ausfertigungen: number;
  kundentyp: Kundentyp;
  widerruf: boolean;
  agb: boolean;
  kontaktName: string;
  kontaktEmail: string;
  firmierung: string;
  sitzOrt: string;
  rechtsform: string;
  registergericht: string;
  empfaenger: string;
  postanschrift: string;
}

export const defaultState: WizardState = {
  zweck: "inland-einfach",
  abdruckart: "aktuell",
  sonderart: "gesellschafterliste",
  zielland: "",
  ziellandText: "",
  haager: "",
  apostilleOrig: false,
  uebersetzung: false,
  apostilleUeb: false,
  unsicher: false,
  sprache: "en",
  seiten: 2,
  versand: "",
  ausfertigungen: 1,
  kundentyp: "unternehmen",
  widerruf: false,
  agb: false,
  kontaktName: "",
  kontaktEmail: "",
  firmierung: "",
  sitzOrt: "",
  rechtsform: "GmbH",
  registergericht: "",
  empfaenger: "",
  postanschrift: "",
};

// Beispielpreise – vorläufige Kalkulation, kein verbindliches Angebot.
const P = {
  einfach: { s: 15, a: 0 },
  beglaubigtSig: { s: 35, a: 12 },
  beglaubigtPap: { s: 39, a: 12 },
  sonder: { s: 29, a: 12 },
  apostilleOrig: { s: 45, a: 20 },
  uebersetzung: { s: 32, a: 0 },
  apostilleUeb: { s: 39, a: 20 },
  ausfertigung: { s: 0, a: 12 },
};

export interface LineItem {
  label: string;
  value: number;
}

export interface Positionen {
  service: LineItem[];
  amt: LineItem[];
  serviceTotal: number;
  amtTotal: number;
  total: number;
  zmin: number;
  zmax: number;
}

export const STEP_LABELS: Record<string, string> = {
  zweck: "Zweck",
  details: "Dokument",
  unternehmen: "Unternehmen",
  ausland: "Zielland",
  versand: "Versand",
  pruefen: "Prüfen",
};

export function steps(st: Pick<WizardState, "zweck">): string[] {
  const s = ["zweck", "details", "unternehmen"];
  if (st.zweck === "ausland") s.push("ausland");
  s.push("versand", "pruefen");
  return s;
}

/** Gründe, warum kein Sofortpreis möglich ist, sondern ein individuelles Angebot nötig wird. */
export function anfrageGruende(st: WizardState): string[] {
  const g: string[] = [];
  const ausland = st.zweck === "ausland";
  if (ausland && st.haager === "nein") {
    g.push(
      `Für ${st.ziellandText} ist statt einer Apostille eine Legalisation über Botschaft oder Konsulat nötig. Diesen Weg kalkulieren wir einzeln.`
    );
  }
  if (ausland && st.haager === "unklar") {
    g.push("Für Ihr Zielland prüfen wir zuerst, ob eine Apostille ausreicht oder eine Legalisation nötig ist.");
  }
  if (ausland && st.uebersetzung && st.sprache === "andere") {
    g.push(
      "Im Standardangebot sind Englisch und Französisch. Für weitere Sprachen suchen wir einen vereidigten Übersetzer und melden uns mit einem Angebot."
    );
  }
  if (ausland && st.unsicher) {
    g.push("Sie sind sich noch nicht sicher, was die Empfängerstelle verlangt — wir klären das mit Ihnen, bevor Kosten entstehen.");
  }
  if (st.zweck === "sonderdokument" && st.sonderart === "sonstiges") {
    g.push("Für dieses Dokument klären wir zuerst die Verfügbarkeit beim Registergericht.");
  }
  return g;
}

export interface VersandOption {
  value: Versand;
  title: string;
  sub: string;
  off: boolean;
}

export function versandOptionen(st: WizardState): VersandOption[] {
  if (st.zweck === "inland-einfach") {
    return [
      {
        value: "pdf",
        title: "PDF per E-Mail",
        sub: "Der unbeglaubigte Auszug wird als PDF versendet — ein Postversand ist hier nicht nötig.",
        off: false,
      },
    ];
  }
  const ausland = st.zweck === "ausland";
  const apostilleNeedsPaper = ausland && (st.apostilleOrig || st.apostilleUeb);
  const uebersetzungNeedsPaper = ausland && st.uebersetzung;
  const lockedReason = apostilleNeedsPaper
    ? "Für die Apostille wird das Papier-Original mit Siegel benötigt — ein signiertes PDF kann nicht apostilliert werden."
    : uebersetzungNeedsPaper
      ? "Original und beglaubigte Übersetzung gehen gemeinsam per Post — viele Behörden verlangen beides zusammen."
      : "";
  return [
    {
      value: "signiert",
      title: "Elektronisch signiertes PDF",
      sub:
        lockedReason ||
        "Gültig durch die elektronische Signatur. Wir leiten die Datei unverändert weiter — Ausdrucken oder Einscannen zerstört die Signatur.",
      off: !!lockedReason,
    },
    {
      value: "papier",
      title: "Papier-Original per Post",
      sub: "Original mit Siegel und Unterschrift, versendet mit Sendungsverfolgung. Einen Scan erhalten Sie vorab zur Information.",
      off: false,
    },
  ];
}

export function positionen(st: WizardState): Positionen {
  const service: LineItem[] = [];
  const amt: LineItem[] = [];
  let zmin = 0;
  let zmax = 0;
  const ausland = st.zweck === "ausland";

  if (st.zweck === "sonderdokument") {
    const sonderName =
      st.sonderart === "jahresabschluss" ? "Jahresabschluss" : st.sonderart === "gesellschafterliste" ? "Gesellschafterliste" : "Registerdokument";
    service.push({ label: `Beschaffung ${sonderName}`, value: P.sonder.s });
    amt.push({ label: "Amtsgebühr Registergericht", value: P.sonder.a });
    zmin += 5;
    zmax += 20;
  } else if (st.zweck === "inland-einfach") {
    const art = st.abdruckart === "chronologisch" ? "chronologischer Abdruck" : st.abdruckart === "historisch" ? "historischer Abdruck" : "aktueller Abdruck";
    service.push({ label: `Einfacher Auszug (${art})`, value: P.einfach.s });
    amt.push({ label: "Amtsgebühr Registerportal", value: 0 });
  } else {
    const pap = st.versand === "papier";
    service.push({
      label: `Beglaubigter Auszug (${pap ? "Papier-Original" : "signiertes PDF"})`,
      value: pap ? P.beglaubigtPap.s : P.beglaubigtSig.s,
    });
    amt.push({ label: "Amtsgebühr Registergericht", value: pap ? P.beglaubigtPap.a : P.beglaubigtSig.a });
    zmin += 1;
    zmax += 20;
    if (pap && st.ausfertigungen > 1) {
      amt.push({
        label: `Amtsgebühr ${st.ausfertigungen - 1} weitere Ausfertigung${st.ausfertigungen > 2 ? "en" : ""}`,
        value: P.ausfertigung.a * (st.ausfertigungen - 1),
      });
    }
  }

  if (ausland && st.apostilleOrig) {
    service.push({ label: "Apostille auf dem Auszug", value: P.apostilleOrig.s });
    amt.push({ label: "Gerichtsgebühr Landgericht", value: P.apostilleOrig.a });
    zmin += 5;
    zmax += 8;
  }
  if (ausland && st.uebersetzung) {
    const seiten = st.seiten + (st.apostilleOrig ? 1 : 0);
    service.push({ label: `Beglaubigte Übersetzung (${seiten} Seiten)`, value: P.uebersetzung.s * seiten });
    zmin += 3;
    zmax += 5;
  }
  if (ausland && st.apostilleUeb) {
    service.push({ label: "Apostille auf der Übersetzerbestätigung", value: P.apostilleUeb.s });
    amt.push({ label: "Gerichtsgebühr Landgericht (Übersetzer)", value: P.apostilleUeb.a });
    zmin += 5;
    zmax += 8;
  }

  const serviceTotal = service.reduce((a, b) => a + b.value, 0);
  const amtTotal = amt.reduce((a, b) => a + b.value, 0);
  return { service, amt, serviceTotal, amtTotal, total: serviceTotal + amtTotal, zmin, zmax };
}

export function reihenfolge(st: WizardState): string[] {
  const r: string[] = [];
  const ausland = st.zweck === "ausland";
  if (st.zweck === "inland-einfach") {
    r.push("Auszug über das Registerportal abrufen und auf Vollständigkeit prüfen");
  } else if (st.zweck === "sonderdokument") {
    r.push("Dokument beim zuständigen Registergericht anfordern");
  } else {
    r.push("Beglaubigten Auszug beim zuständigen Registergericht beantragen");
  }
  if (ausland && st.apostilleOrig) r.push("Apostille auf dem Papier-Original beim zuständigen Landgericht beantragen");
  if (ausland && st.uebersetzung) r.push(`Beglaubigte Übersetzung beauftragen${st.apostilleOrig ? " — einschließlich der Apostille-Seite" : ""}`);
  if (ausland && st.apostilleUeb) r.push("Apostille auf der Übersetzerbestätigung beim Landgericht des Übersetzers beantragen");
  r.push(st.versand === "papier" ? "Alles gemeinsam prüfen und per Post mit Sendungsverfolgung versenden" : "Prüfen und digital an Sie übermitteln");
  return r;
}

export function eur(n: number): string {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 0 }) + " €";
}

// Re-export, damit bestehende Importe aus "@/lib/pricing" (Wizard, API-Route)
// unverändert weiterlaufen — die eigentliche Implementierung liegt in
// lib/validation.ts, damit auch andere Formulare (z. B. Kontakt) sie nutzen
// können, ohne das Preismodul zu importieren.
export { emailFormatOk } from "./validation";

export interface Laenderoption {
  value: string;
  label: string;
  haager: Haager;
}

export const laender: Laenderoption[] = [
  { value: "", label: "Bitte wählen", haager: "" },
  { value: "at", label: "Österreich", haager: "ja" },
  { value: "ch", label: "Schweiz", haager: "ja" },
  { value: "es", label: "Spanien", haager: "ja" },
  { value: "it", label: "Italien", haager: "ja" },
  { value: "uk", label: "Vereinigtes Königreich", haager: "ja" },
  { value: "us", label: "Vereinigte Staaten", haager: "ja" },
  { value: "tr", label: "Türkei", haager: "ja" },
  { value: "ae", label: "Vereinigte Arabische Emirate", haager: "ja" },
  { value: "eg", label: "Ägypten", haager: "nein" },
  { value: "vn", label: "Vietnam", haager: "nein" },
  { value: "qa", label: "Katar", haager: "nein" },
  { value: "other", label: "Anderes Land", haager: "unklar" },
];
