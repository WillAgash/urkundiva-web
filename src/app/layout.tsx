import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/400-italic.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Urkundiva | Registerauszüge, Apostillen & Dokumentenservice",
  description:
    "Urkundiva beschafft und vermittelt Handelsregisterauszüge, amtliche Beglaubigungen, Apostillen und beglaubigte Übersetzungen – für Unternehmen, Steuerberater, Notare und Privatpersonen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
