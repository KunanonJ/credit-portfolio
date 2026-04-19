import { BarChart3, PieChart, Receipt } from "lucide-react";

type GraphsSectionProps = {
  issuerSvg: string;
  minimumSvg: string;
};

export function GraphsSection({ issuerSvg, minimumSvg }: GraphsSectionProps) {
  return (
    <section className="panel" aria-labelledby="graphs-heading">
      <div className="section-head">
        <p className="eyebrow">Graphs</p>
        <h2 id="graphs-heading" className="section-head__title">
          <BarChart3 className="cp-icon cp-icon--section" aria-hidden />
          <span>Visual read of the portfolio</span>
        </h2>
        <p className="section-subtext">
          A chart-first view of concentration risk and monthly payment pressure.
        </p>
      </div>
      <div className="graph-grid">
        <article className="graph-card">
          <div className="graph-head">
            <h3 className="graph-head__title">
              <PieChart className="cp-icon cp-icon--graph" aria-hidden />
              <span>Balance by issuer</span>
            </h3>
            <p>Where the total debt is concentrated.</p>
          </div>
          <p className="scroll-hint" aria-hidden="true">
            Scroll sideways to see the full chart.
          </p>
          <div className="chart-scroll">
            <div className="chart-shell" dangerouslySetInnerHTML={{ __html: issuerSvg }} />
          </div>
        </article>
        <article className="graph-card">
          <div className="graph-head">
            <h3 className="graph-head__title">
              <Receipt className="cp-icon cp-icon--graph" aria-hidden />
              <span>Minimum due by account</span>
            </h3>
            <p>Which accounts are asking for the most cash this cycle.</p>
          </div>
          <p className="scroll-hint" aria-hidden="true">
            Scroll sideways to see the full chart.
          </p>
          <div className="chart-scroll">
            <div className="chart-shell" dangerouslySetInnerHTML={{ __html: minimumSvg }} />
          </div>
        </article>
      </div>
    </section>
  );
}
