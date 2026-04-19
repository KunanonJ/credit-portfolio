import { AccountSection } from "@/components/credit-portfolio/account-section";
import { AuditSection } from "@/components/credit-portfolio/sections/audit-section";
import { GraphsSection } from "@/components/credit-portfolio/sections/graphs-section";
import { HeroSection } from "@/components/credit-portfolio/sections/hero-section";
import { InsightsSection } from "@/components/credit-portfolio/sections/insights-section";
import { IssuerSection } from "@/components/credit-portfolio/sections/issuer-section";
import { NotesSection } from "@/components/credit-portfolio/sections/notes-section";
import { PlanSection } from "@/components/credit-portfolio/sections/plan-section";
import { PortfolioNav } from "@/components/credit-portfolio/sections/portfolio-nav";
import {
  buildIssuerRollup,
  computeAuditPresentation,
  computeDebtPlanPresentation,
  computeGraphSvgs,
  computeInsights,
  computeSummary,
} from "@/lib/credit-portfolio/compute";
import { aprilAudit, debtPlan, portfolio } from "@/lib/credit-portfolio/data";

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
        <PortfolioNav />
        <HeroSection asOfLong={asOfLong} summary={summary} />
        <main className="content">
          <InsightsSection insights={insights} />
          <GraphsSection issuerSvg={issuerSvg} minimumSvg={minimumSvg} />
          <PlanSection plan={plan} asOfLong={asOfLong} />
          <IssuerSection issuers={issuers} largestBalance={largestBalance} />
          <AccountSection accounts={portfolio.accounts} asOf={asOfDate} />
          <AuditSection audit={audit} />
          <NotesSection />
        </main>
      </div>
    </>
  );
}
