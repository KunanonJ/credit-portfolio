import { AccountSection } from "@/components/credit-portfolio/account-section";
import {
  buildIssuerRollup,
  computeAuditPresentation,
  computeDebtPlanPresentation,
  computeGraphSvgs,
  computeInsights,
  computeSummary,
} from "@/lib/credit-portfolio/compute";
import { aprilAudit, debtPlan, portfolio } from "@/lib/credit-portfolio/data";
import { formatCurrency, formatRate } from "@/lib/credit-portfolio/format";

export default function HomePage() {
  const asOfDate = new Date(`${portfolio.asOf}T00:00:00`);
  const asOfLong = asOfDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const summary = computeSummary(portfolio.accounts, asOfDate);
  const insights = computeInsights(portfolio.accounts, asOfDate);
  const { issuerSvg, minimumSvg } = computeGraphSvgs(portfolio.accounts);
  const plan = computeDebtPlanPresentation(debtPlan);
  const audit = computeAuditPresentation(aprilAudit);
  const issuers = buildIssuerRollup(portfolio.accounts);
  const largestBalance = issuers[0]?.balance ?? 1;

  return (
    <>
      <div className="ambient-glow" aria-hidden="true" />
      <div className="ambient-glow glow-2" aria-hidden="true" />
      <div className="page-shell">
        <nav className="snap-nav-wrap" aria-label="Page sections">
          <div className="snap-nav">
            <a className="snap-nav__link" href="#overview">
              Overview
            </a>
            <a className="snap-nav__link" href="#insights-heading">
              Fast read
            </a>
            <a className="snap-nav__link" href="#graphs-heading">
              Graphs
            </a>
            <a className="snap-nav__link" href="#plan-heading">
              Plan
            </a>
            <a className="snap-nav__link" href="#issuer-heading">
              Issuers
            </a>
            <a className="snap-nav__link" href="#accounts-heading">
              Accounts
            </a>
            <a className="snap-nav__link" href="#audit-heading">
              Audit
            </a>
            <a className="snap-nav__link" href="#notes-heading">
              Notes
            </a>
          </div>
        </nav>

        <header className="hero" id="overview">
          <div className="hero-copy">
            <p className="eyebrow">Credit Portfolio Snapshot</p>
            <h1>One clean view of every balance, due date, and pressure point.</h1>
            <p className="lede">
              Built from the latest readable statements as of <strong>{asOfLong}</strong>.
            </p>
            <p className="hero-hope">
              <strong>You’re not behind—you’re informed.</strong> Use this page to sequence paydowns,
              spot drift early, and keep every due date in view in one place.
            </p>
          </div>

          <section className="hero-panel summary-grid" aria-label="Portfolio summary">
            <article className="metric-tile">
              <p>Total outstanding</p>
              <strong>{formatCurrency(summary.totalBalance)}</strong>
            </article>
            <article className="metric-tile">
              <p>Total minimum due</p>
              <strong>{formatCurrency(summary.totalMinimum)}</strong>
            </article>
            <article className="metric-tile">
              <p>Overdue accounts</p>
              <strong>{summary.overdueCount}</strong>
            </article>
            <article className="metric-tile">
              <p>Next due</p>
              <strong>{summary.nextDueLabel}</strong>
            </article>
          </section>
        </header>

        <main className="content">
          <section className="panel insight-panel" aria-labelledby="insights-heading">
            <div className="section-head">
              <p className="eyebrow">Fast read</p>
              <h2 id="insights-heading">What matters most right now</h2>
            </div>
            <div className="insight-grid">
              {insights.map((insight) => (
                <article key={insight.title} className="insight-card">
                  <strong>{insight.title}</strong>
                  <p>{insight.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="panel" aria-labelledby="graphs-heading">
            <div className="section-head">
              <p className="eyebrow">Graphs</p>
              <h2 id="graphs-heading">Visual read of the portfolio</h2>
              <p className="section-subtext">
                A chart-first view of concentration risk and monthly payment pressure.
              </p>
            </div>
            <div className="graph-grid">
              <article className="graph-card">
                <div className="graph-head">
                  <h3>Balance by issuer</h3>
                  <p>Where the total debt is concentrated.</p>
                </div>
                <div className="chart-scroll">
                  <div
                    className="chart-shell"
                    dangerouslySetInnerHTML={{ __html: issuerSvg }}
                  />
                </div>
              </article>
              <article className="graph-card">
                <div className="graph-head">
                  <h3>Minimum due by account</h3>
                  <p>Which accounts are asking for the most cash this cycle.</p>
                </div>
                <div className="chart-scroll">
                  <div
                    className="chart-shell"
                    dangerouslySetInnerHTML={{ __html: minimumSvg }}
                  />
                </div>
              </article>
            </div>
          </section>

          <section className="panel" aria-labelledby="plan-heading">
            <div className="section-head">
              <p className="eyebrow">Debt Freedom Plan</p>
              <h2 id="plan-heading">Fastest route out from here</h2>
              <p className="section-subtext">
                This plan assumes the April 2026 payments entered in the sheet were already paid or
                fully reserved, and that no new revolving debt is added from{" "}
                <strong>{asOfLong}</strong> onward.
              </p>
            </div>
            <div className="plan-summary">
              {plan.metrics.map((metric) => (
                <article key={metric.label} className="plan-metric">
                  <p>{metric.label}</p>
                  <strong>{metric.value}</strong>
                  <span>{metric.note}</span>
                </article>
              ))}
            </div>
            <div className="plan-layout">
              <article className="plan-card">
                <div className="graph-head">
                  <h3>Attack order</h3>
                  <p>
                    Highest interest first. When the rate ties, clear the smaller balance first and
                    roll that payment into the next debt.
                  </p>
                </div>
                <div className="plan-order">
                  {plan.active.map((item, index) => (
                    <article
                      key={item.label}
                      className={`plan-order-item${index === 0 ? " is-primary" : ""}`}
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
                  <h3>Action plan</h3>
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
              dangerouslySetInnerHTML={{ __html: plan.planNoteHtml }}
            />
          </section>

          <section className="panel" aria-labelledby="issuer-heading">
            <div className="section-head">
              <p className="eyebrow">Issuer view</p>
              <h2 id="issuer-heading">Balance concentration</h2>
            </div>
            <div className="issuer-list">
              {issuers.map((issuer) => (
                <article key={issuer.issuer} className="issuer-row">
                  <div className="issuer-meta">
                    <strong>{issuer.issuer}</strong>
                    <span>
                      {formatCurrency(issuer.balance)} balance · {formatCurrency(issuer.minimumDue)}{" "}
                      minimum due
                    </span>
                  </div>
                  <div className="issuer-bar" aria-hidden="true">
                    <span style={{ width: `${(issuer.balance / largestBalance) * 100}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <AccountSection accounts={portfolio.accounts} asOf={asOfDate} />

          <section className="panel" aria-labelledby="audit-heading">
            <div className="section-head">
              <p className="eyebrow">April 2026 Review</p>
              <h2 id="audit-heading">Minimum Expenses audit from the sheet</h2>
              <p className="section-subtext">
                This section compares the <strong>Minimum Expenses</strong> amounts entered in the
                April 2026 Google Sheet tab against the card statements that were available in the
                PDF pack.
              </p>
            </div>
            <div className="audit-summary">
              {audit.metrics.map((metric) => (
                <article key={metric.label} className="audit-metric">
                  <p>{metric.label}</p>
                  <strong>{metric.value}</strong>
                </article>
              ))}
            </div>
            <div className="audit-graph-card">
              <div className="graph-head">
                <h3>Sheet vs statement comparison</h3>
                <p>
                  The blue bars are the sheet amounts. The darker bars are statement-backed
                  references.
                </p>
              </div>
              <div className="compare-scroll">
                <div
                  className="compare-chart"
                  dangerouslySetInnerHTML={{ __html: audit.chartRowsHtml }}
                />
              </div>
            </div>
            <div className="audit-table" dangerouslySetInnerHTML={{ __html: audit.tableHtml }} />
          </section>

          <section className="panel footnotes" aria-labelledby="notes-heading">
            <div className="section-head">
              <p className="eyebrow">Notes</p>
              <h2 id="notes-heading">Context behind the numbers</h2>
            </div>
            <ul>
              <li>KTC statements use a shared credit limit of THB 360,000 across both KTC cards.</li>
              <li>
                CardX statements each show THB 219,000, but that limit may be shared rather than
                additive.
              </li>
              <li>
                Status labels use April 19, 2026 as the reference date, not today in a moving browser
                session.
              </li>
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}
