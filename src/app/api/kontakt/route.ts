import { NextRequest, NextResponse } from "next/server";
import { emailFormatOk } from "@/lib/validation";

// Wie bei der Bestellstrecke: kein Versand über einen Drittanbieter (kein
// EmailJS o. Ä.). Diese Route validiert die Nachricht und protokolliert sie
// serverseitig — der tatsächliche Mailversand/die Ablage in einer
// Auftragsverwaltung folgt in einer späteren Phase.

const ANLIEGEN_LABELS: Record<string, string> = {
  handelsregisterauszug: "Handelsregisterauszug",
  beglaubigung: "Beglaubigung",
  apostille: "Apostille",
  uebersetzung: "Beglaubigte Übersetzung",
  sonstiges: "Sonstiges",
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: NextRequest) {
  let body: { name?: unknown; email?: unknown; anliegen?: unknown; nachricht?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (!isNonEmptyString(body.name)) {
    return NextResponse.json({ error: "Name fehlt." }, { status: 400 });
  }
  if (!isNonEmptyString(body.email) || !emailFormatOk(body.email)) {
    return NextResponse.json({ error: "Gültige E-Mail-Adresse fehlt." }, { status: 400 });
  }
  if (!isNonEmptyString(body.nachricht)) {
    return NextResponse.json({ error: "Bitte geben Sie eine Nachricht ein." }, { status: 400 });
  }

  const anliegenKey = typeof body.anliegen === "string" && body.anliegen in ANLIEGEN_LABELS ? body.anliegen : "sonstiges";
  const referenz = "KT-" + Date.now().toString(36).toUpperCase();

  console.log("[kontakt] neue Nachricht", {
    referenz,
    name: body.name.trim(),
    email: body.email.trim(),
    anliegen: ANLIEGEN_LABELS[anliegenKey],
    nachrichtLaenge: body.nachricht.trim().length,
  });

  return NextResponse.json({
    referenz,
    hinweis: "Nachricht entgegengenommen. Wir melden uns, sobald wir sie bearbeitet haben.",
  });
}
