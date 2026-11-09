import { NextRequest, NextResponse } from "next/server";
import {
  type WizardState,
  anfrageGruende,
  emailFormatOk,
  positionen,
} from "@/lib/pricing";

// Diese Route ist die einzige Quelle der Wahrheit für den Preis. Der Client
// schickt nur die Auswahl (Zweck, Zielland, Optionen, Kontaktdaten) — nie
// einen fertigen Betrag. Der Betrag wird hier aus der Auswahl neu berechnet,
// genau wie bei der Live-Anzeige im Browser, damit er nicht manipulierbar ist.
//
// Hinweis: Zahlungsanbieter (Phase 9) und eigener E-Mail-Versand sind noch
// nicht angebunden. Diese Route validiert, berechnet den Preis verbindlich
// und protokolliert die Anfrage — der eigentliche Bezahl- und Mail-Schritt
// folgt, sobald der Merchant-of-Record-Anbieter eingerichtet ist.

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: NextRequest) {
  let body: Partial<WizardState>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (!isNonEmptyString(body.kontaktName)) {
    return NextResponse.json({ error: "Name fehlt." }, { status: 400 });
  }
  if (!isNonEmptyString(body.kontaktEmail) || !emailFormatOk(body.kontaktEmail)) {
    return NextResponse.json({ error: "Gültige E-Mail-Adresse fehlt." }, { status: 400 });
  }
  if (body.agb !== true) {
    return NextResponse.json({ error: "Zustimmung zu den AGB fehlt." }, { status: 400 });
  }
  if (body.kundentyp === "privat" && body.widerruf !== true) {
    return NextResponse.json({ error: "Bestätigung zum sofortigen Ausführungsbeginn fehlt." }, { status: 400 });
  }
  if (body.zweck === "ausland" && !isNonEmptyString(body.zielland)) {
    return NextResponse.json({ error: "Zielland fehlt." }, { status: 400 });
  }

  // Vollständigen, serverseitigen State aus den erlaubten Feldern zusammenbauen —
  // nichts Ungeprüftes wird einfach durchgereicht.
  const st: WizardState = {
    zweck: body.zweck ?? "inland-einfach",
    abdruckart: body.abdruckart ?? "aktuell",
    sonderart: body.sonderart ?? "gesellschafterliste",
    zielland: body.zielland ?? "",
    ziellandText: body.ziellandText ?? "",
    haager: body.haager ?? "",
    apostilleOrig: !!body.apostilleOrig,
    uebersetzung: !!body.uebersetzung,
    apostilleUeb: !!body.apostilleUeb,
    unsicher: !!body.unsicher,
    sprache: body.sprache ?? "en",
    seiten: typeof body.seiten === "number" ? body.seiten : 2,
    versand: body.versand ?? "",
    ausfertigungen: typeof body.ausfertigungen === "number" ? body.ausfertigungen : 1,
    kundentyp: body.kundentyp === "privat" ? "privat" : "unternehmen",
    widerruf: !!body.widerruf,
    agb: !!body.agb,
    kontaktName: body.kontaktName.trim(),
    kontaktEmail: body.kontaktEmail.trim(),
    firmierung: (body.firmierung ?? "").trim(),
    sitzOrt: (body.sitzOrt ?? "").trim(),
    rechtsform: body.rechtsform ?? "",
    registergericht: (body.registergericht ?? "").trim(),
    empfaenger: (body.empfaenger ?? "").trim(),
    postanschrift: (body.postanschrift ?? "").trim(),
  };

  const gruende = anfrageGruende(st);
  const anfrage = gruende.length > 0;
  const pos = positionen(st);

  const referenz = "URK-" + Date.now().toString(36).toUpperCase();

  // Noch kein Datenspeicher/E-Mail-Versand angebunden (Phase 9/10) — vorerst
  // ins Server-Log, damit während der Testphase nachvollziehbar bleibt, was
  // ankommt. Das ist ein bewusster Platzhalter, keine Auftragsverwaltung.
  console.log("[dokumentenservice] neue Anfrage", {
    referenz,
    anfrage,
    total: anfrage ? null : pos.total,
    kontaktName: st.kontaktName,
    kontaktEmail: st.kontaktEmail,
    zweck: st.zweck,
  });

  return NextResponse.json({
    referenz,
    anfrage,
    gruende,
    positionen: {
      service: pos.service,
      amt: pos.amt,
      serviceTotal: pos.serviceTotal,
      amtTotal: pos.amtTotal,
      total: pos.total,
    },
    // Zahlung ist noch nicht angebunden — darauf weist die Antwort explizit hin,
    // damit die Oberfläche keinen Zahlungsschritt vortäuscht, den es noch nicht gibt.
    zahlungBereit: false,
    hinweis: anfrage
      ? "Anfrage entgegengenommen. Wir melden uns mit einem Festpreis, bevor Kosten entstehen."
      : "Bestellung entgegengenommen. Der Zahlungsschritt wird in Kürze freigeschaltet — Sie erhalten eine Bestätigung per E-Mail, sobald er verfügbar ist.",
  });
}
