import type { Insight } from "@/lib/credit-portfolio/compute";
import type { LucideIcon } from "lucide-react";
import { Receipt, Sparkles, TrendingUp, Users } from "lucide-react";

const INSIGHT_ICONS: LucideIcon[] = [TrendingUp, Receipt, Users];

type InsightsSectionProps = {
  insights: Insight[];
};

export function InsightsSection({ insights }: InsightsSectionProps) {
  return (
    <section className="panel insight-panel" aria-labelledby="insights-heading">
      <div className="section-head">
        <p className="eyebrow">Fast read</p>
        <h2 id="insights-heading" className="section-head__title">
          <Sparkles className="cp-icon cp-icon--section" aria-hidden />
          <span>What matters most right now</span>
        </h2>
      </div>
      <div className="insight-grid">
        {insights.map((insight, index) => {
          const InsightIcon = INSIGHT_ICONS[index] ?? TrendingUp;
          return (
            <article key={insight.title} className="insight-card">
              <div className="insight-card__head">
                <InsightIcon className="cp-icon cp-icon--insight" aria-hidden />
                <strong>{insight.title}</strong>
              </div>
              <p>{insight.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
