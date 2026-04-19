import type { AuditPresentation } from "@/lib/credit-portfolio/compute";
import { getAuditMetricIcon } from "@/lib/credit-portfolio/icon-config";
import { ClipboardCheck, GitCompare } from "lucide-react";

type AuditSectionProps = {
  audit: AuditPresentation;
};

export function AuditSection({ audit }: AuditSectionProps) {
  return (
    <section className="panel" aria-labelledby="audit-heading">
      <div className="section-head">
        <p className="eyebrow">April 2026 Review</p>
        <h2 id="audit-heading" className="section-head__title">
          <ClipboardCheck className="cp-icon cp-icon--section" aria-hidden />
          <span>Minimum Expenses audit from the sheet</span>
        </h2>
        <p className="section-subtext">
          This section compares the <strong>Minimum Expenses</strong> amounts entered in the April
          2026 Google Sheet tab against the card statements that were available in the PDF pack.
        </p>
      </div>
      <div className="audit-summary">
        {audit.metrics.map((metric) => {
          const AuditIcon = getAuditMetricIcon(metric.label);
          return (
            <article key={metric.label} className="audit-metric">
              <div className="audit-metric__head">
                <AuditIcon className="cp-icon cp-icon--metric" aria-hidden />
                <p>{metric.label}</p>
              </div>
              <strong>{metric.value}</strong>
            </article>
          );
        })}
      </div>
      <div className="audit-graph-card">
        <div className="graph-head">
          <h3 id="audit-compare-heading" className="graph-head__title">
            <GitCompare className="cp-icon cp-icon--graph" aria-hidden />
            <span>Sheet vs statement comparison</span>
          </h3>
          <p>
            The blue bars are the sheet amounts. The darker bars are statement-backed references.
          </p>
        </div>
        <p className="scroll-hint" aria-hidden="true">
          Scroll horizontally to see the full comparison.
        </p>
        <div
          className="compare-scroll"
          role="region"
          aria-labelledby="audit-compare-heading"
        >
          <div className="compare-chart" dangerouslySetInnerHTML={{ __html: audit.chartRowsHtml }} />
        </div>
      </div>
      <p className="scroll-hint" aria-hidden="true">
        Scroll the table horizontally to read all columns.
      </p>
      <div
        className="audit-table"
        role="region"
        aria-label="Minimum expenses audit: sheet versus statement by line item"
        dangerouslySetInnerHTML={{ __html: audit.tableHtml }}
      />
    </section>
  );
}
