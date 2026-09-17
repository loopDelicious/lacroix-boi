import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Instrument_Serif, Caveat, Space_Grotesk } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LaCroix Boi — Sparkling Water, Bike-Delivered in San Francisco",
  description:
    "Ice-cold sparkling water delivered by bike anywhere in San Francisco. Zero calories, zero judgment, all boi. Pamplemousse by the pack, weekly subs, 20-minute ETAs.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${instrument.variable} ${caveat.variable} ${space.variable} grain antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
