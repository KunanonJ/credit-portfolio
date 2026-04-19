import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "./credit-portfolio.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Credit Portfolio Snapshot",
  description:
    "A calm, one-page snapshot of revolving credit exposure: balances, minimums, utilization, and the next 30 days of due dates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`credit-portfolio-html ${inter.variable} ${outfit.variable}`}>
      <body className="credit-portfolio-body credit-portfolio-shell">{children}</body>
    </html>
  );
}
