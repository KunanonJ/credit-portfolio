import type { DebtPlanPresentation } from "@/lib/credit-portfolio/compute";
import { formatCurrency, formatRate } from "@/lib/credit-portfolio/format";
import { getPlanMetricIcon } from "@/lib/credit-portfolio/icon-config";
import { cn } from "@/lib/utils";
import { ListChecks, ListOrdered, Route } from "lucide-react";

type PlanSectionProps = {
  plan: DebtPlanPresentation;
  asOfLong: string;
};

export function PlanSection({ plan, asOfLong }: PlanSectionProps) {
  return (
    <section className="panel" aria-labelledby="plan-heading">
      <div className="section-head">
        <p className="eyebrow">Debt Freedom Plan</p>
        <h2 id="plan-heading" className="section-head__title">
          <Route className="cp-icon cp-icon--section" aria-hidden />
          <span>Fastest route out from here</span>
        </h2>
        <p className="section-subtext">
          This plan assumes the April 2026 payments entered in the sheet were already paid or fully
          reserved, and that no new revolving debt is added from <strong>{asOfLong}</strong> onward.
        </p>
      </div>
      <div className="plan-summary">
        {plan.metrics.map((metric) => {
          const MetricIcon = getPlanMetricIcon(metric.label);
          return (
            <article key={metric.label} className="plan-metric">
              <div className="plan-metric__head">
                <MetricIcon className="cp-icon cp-icon--metric" aria-hidden />
                <p>{metric.label}</p>
              </div>
              <strong>{metric.value}</strong>
              <span>{metric.note}</span>
            </article>
          );
        })}
      </div>
      <div className="plan-layout">
        <article className="plan-card">
          <div className="graph-head">
            <h3 className="graph-head__title plan-graph-head__title">
              <ListOrdered className="cp-icon cp-icon--graph" aria-hidden />
              <span>Attack order</span>
            </h3>
            <p>
              Highest interest first. When the rate ties, clear the smaller balance first and roll
              that payment into the next debt.
            </p>
          </div>
          <div className="plan-order">
            {plan.active.map((item, index) => (
              <article
                key={item.label}
                className={cn("plan-order-item", index === 0 && "is-primary")}
              >
                <div className="plan-order-head">
                  <span className="plan-rank">{index + 1}</span>
                  <div className="plan-order-copy">
                    <strong>{item.label}</strong>
                    <p>
                      {formatRate(item.rate)} rate · est. remaining{" "}
                      {formatCurrency(item.workingBalance)}
                    </p>
                  </div>
                </div>
                <p className="plan-order-note">{item.note}</p>
              </article>
            ))}
          </div>
        </article>
        <article className="plan-card">
          <div className="graph-head">
            <h3 className="graph-head__title plan-graph-head__title">
              <ListChecks className="cp-icon cp-icon--graph" aria-hidden />
              <span>Action plan</span>
            </h3>
            <p>What to do now so the fastest-payoff strategy actually works in real life.</p>
          </div>
          <div className="plan-actions">
            {plan.actions.map((action, index) => (
              <article key={action.title} className="plan-action-item">
                <div className="plan-action-head">
                  <span className="plan-action-number">{index + 1}</span>
                  <div className="plan-action-copy">
                    <strong>{action.title}</strong>
                    <p>{action.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </article>
      </div>
      <div
        className="plan-note"
        role="note"
        aria-label="Working assumptions for this payoff ladder"
        dangerouslySetInnerHTML={{ __html: plan.planNoteHtml }}
      />
    </section>
  );
}
