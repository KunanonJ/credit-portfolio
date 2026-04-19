import type { IssuerRollup } from "@/lib/credit-portfolio/compute";
import { formatCurrency } from "@/lib/credit-portfolio/format";
import { Building2 } from "lucide-react";

type IssuerSectionProps = {
  issuers: IssuerRollup[];
  largestBalance: number;
};

export function IssuerSection({ issuers, largestBalance }: IssuerSectionProps) {
  return (
    <section className="panel" aria-labelledby="issuer-heading">
      <div className="section-head">
        <p className="eyebrow">Issuer view</p>
        <h2 id="issuer-heading" className="section-head__title">
          <Building2 className="cp-icon cp-icon--section" aria-hidden />
          <span>Balance concentration</span>
        </h2>
      </div>
      <div className="issuer-list">
        {issuers.map((issuer) => (
          <article key={issuer.issuer} className="issuer-row">
            <div className="issuer-meta">
              <strong className="issuer-name">
                <Building2 className="cp-icon cp-icon--issuer" aria-hidden />
                <span>{issuer.issuer}</span>
              </strong>
              <span>
                {formatCurrency(issuer.balance)} balance · {formatCurrency(issuer.minimumDue)} minimum
                due
              </span>
            </div>
            <div className="issuer-bar" aria-hidden="true">
              <span style={{ width: `${(issuer.balance / largestBalance) * 100}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
