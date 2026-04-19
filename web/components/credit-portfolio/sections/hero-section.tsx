import type { SummarySnapshot } from "@/lib/credit-portfolio/compute";
import { formatCurrency } from "@/lib/credit-portfolio/format";
import {
  AlertTriangle,
  Banknote,
  CalendarClock,
  Wallet,
} from "lucide-react";

type HeroSectionProps = {
  asOfLong: string;
  summary: SummarySnapshot;
};

export function HeroSection({ asOfLong, summary }: HeroSectionProps) {
  return (
    <header className="hero" id="overview">
      <div className="hero-copy">
        <p className="eyebrow">Credit Portfolio Snapshot</p>
        <h1>One clean view of every balance, due date, and pressure point.</h1>
        <p className="lede">
          Built from the latest readable statements as of <strong>{asOfLong}</strong>.
        </p>
        <p className="hero-hope">
          <strong>You’re not behind—you’re informed.</strong> Use this page to sequence paydowns, spot
          drift early, and keep every due date in view in one place.
        </p>
      </div>

      <section className="hero-panel summary-grid" aria-label="Portfolio summary">
        <article className="metric-tile">
          <div className="metric-tile__head">
            <Wallet className="cp-icon cp-icon--metric" aria-hidden />
            <p>Total outstanding</p>
          </div>
          <strong>{formatCurrency(summary.totalBalance)}</strong>
        </article>
        <article className="metric-tile">
          <div className="metric-tile__head">
            <Banknote className="cp-icon cp-icon--metric" aria-hidden />
            <p>Total minimum due</p>
          </div>
          <strong>{formatCurrency(summary.totalMinimum)}</strong>
        </article>
        <article className="metric-tile">
          <div className="metric-tile__head">
            <AlertTriangle className="cp-icon cp-icon--metric" aria-hidden />
            <p>Overdue accounts</p>
          </div>
          <strong>{summary.overdueCount}</strong>
        </article>
        <article className="metric-tile">
          <div className="metric-tile__head">
            <CalendarClock className="cp-icon cp-icon--metric" aria-hidden />
            <p>Next due</p>
          </div>
          <strong>{summary.nextDueLabel}</strong>
        </article>
      </section>
    </header>
  );
}
