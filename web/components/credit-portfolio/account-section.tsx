"use client";

import { useMemo, useState } from "react";
import type { Account } from "@/lib/credit-portfolio/schema";
import type { DueFilter } from "@/lib/credit-portfolio/schema";
import { getDueState, limitText } from "@/lib/credit-portfolio/compute";
import { formatCurrency } from "@/lib/credit-portfolio/format";

const FILTERS: { key: DueFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "overdue", label: "Overdue" },
  { key: "upcoming", label: "Upcoming" },
];

function sortAccounts(accounts: Account[]): Account[] {
  return [...accounts].sort((a, b) => {
    const byDue =
      new Date(`${a.dueDate}T00:00:00`).getTime() -
      new Date(`${b.dueDate}T00:00:00`).getTime();
    if (byDue !== 0) return byDue;
    return b.balance - a.balance;
  });
}

export function AccountSection({
  accounts,
  asOf,
}: {
  accounts: Account[];
  asOf: Date;
}) {
  const [filter, setFilter] = useState<DueFilter>("all");

  const sorted = useMemo(() => sortAccounts(accounts), [accounts]);

  return (
    <section aria-labelledby="accounts-heading" className="panel">
      <div className="section-head section-head-split">
        <div>
          <p className="eyebrow">Accounts</p>
          <h2 id="accounts-heading">Statement-by-statement detail</h2>
        </div>
        <div className="filter-group" role="group" aria-label="Filter accounts by due status">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`filter-button${filter === key ? " is-active" : ""}`}
              aria-pressed={filter === key}
              data-filter={key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="card-grid" id="account-grid">
        {sorted.map((account) => {
          const dueState = getDueState(account, asOf);
          const hidden = filter !== "all" && dueState.key !== filter;
          return (
            <article
              key={`${account.issuer}-${account.name}`}
              className="account-card"
              data-status={dueState.key}
              hidden={hidden}
            >
              <div className="card-top">
                <div className="card-title">
                  <strong>{account.name}</strong>
                  <p>{account.issuer}</p>
                </div>
                <span className={`status-pill ${dueState.key}`}>{dueState.label}</span>
              </div>

              <div className="account-meta">
                <div>
                  <span>Statement date</span>
                  <strong>
                    {new Date(`${account.statementDate}T00:00:00`).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </strong>
                </div>
                <div>
                  <span>Due date</span>
                  <strong>
                    {new Date(`${account.dueDate}T00:00:00`).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </strong>
                </div>
              </div>

              <div className="account-stats">
                <div className="account-stat">
                  <span>Balance</span>
                  <strong>{formatCurrency(account.balance)}</strong>
                </div>
                <div className="account-stat">
                  <span>Minimum due</span>
                  <strong>{formatCurrency(account.minimumDue)}</strong>
                </div>
                <div className="account-stat">
                  <span>Credit line</span>
                  <strong>{limitText(account)}</strong>
                </div>
              </div>

              <div className="account-note">
                <p className="card-note">{account.note}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
