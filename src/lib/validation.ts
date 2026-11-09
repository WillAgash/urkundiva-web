// Kleine, geteilte Validierungs-Helfer. Eigenes Modul, damit sowohl die
// Bestellstrecke (lib/pricing.ts) als auch das Kontaktformular dieselbe
// Prüfung verwenden, ohne dass ein Modul vom anderen abhängen muss.

export function emailFormatOk(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
