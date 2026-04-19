"use client";

import {
  AlarmClock,
  AlertCircle,
  CalendarClock,
  CreditCard,
  Filter,
  List,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  deriveAccountRows,
  type DueStateKey,
} from "@/lib/credit-portfolio/compute";
import type { Account } from "@/lib/credit-portfolio/schema";
import { formatCurrency, formatDateLabel } from "@/lib/credit-portfolio/format";
import { cn } from "@/lib/utils";

type Props = {
  accounts: Account[];
  asOf: Date;
};

type DueFilter = "all" | "overdue" | "upcoming";

function StatusIcon({ dueStateKey }: { dueStateKey: DueStateKey }) {
  switch (dueStateKey) {
    case "overdue":
      return <AlertCircle className="cp-icon cp-icon--status" aria-hidden />;
    case "today":
      return <AlarmClock className="cp-icon cp-icon--status" aria-hidden />;
    default:
      return <CalendarClock className="cp-icon cp-icon--status" aria-hidden />;
  }
}

export function AccountSection({ accounts, asOf }: Props) {
  const rows = useMemo(() => deriveAccountRows(accounts, asOf), [accounts, asOf]);
  const [filter, setFilter] = useState<DueFilter>("all");

  const filteredRows = useMemo(() => {
    if (filter === "all") {
      return rows;
    }
    return rows.filter((row) => {
      if (filter === "overdue") {
        return row.dueStateKey === "overdue";
      }
      return row.dueStateKey === "upcoming" || row.dueStateKey === "today";
    });
  }, [rows, filter]);

  return (
    <section className="panel accounts-panel" aria-labelledby="accounts-heading">
      <div className="section-head">
        <p className="eyebrow">Accounts</p>
        <h2 id="accounts-heading" className="section-head__title">
          <CreditCard className="cp-icon cp-icon--section" aria-hidden />
          <span>Every card in one place</span>
        </h2>
      </div>

      <div className="filter-toolbar" role="group" aria-label="Filter accounts by due status">
        <button
          type="button"
          className={cn("filter-button", filter === "all" && "is-active")}
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          <List className="cp-icon cp-icon--filter" aria-hidden />
          <span>All</span>
        </button>
        <button
          type="button"
          className={cn("filter-button", filter === "overdue" && "is-active")}
          aria-pressed={filter === "overdue"}
          onClick={() => setFilter("overdue")}
        >
          <AlertCircle className="cp-icon cp-icon--filter" aria-hidden />
          <span>Overdue</span>
        </button>
        <button
          type="button"
          className={cn("filter-button", filter === "upcoming" && "is-active")}
          aria-pressed={filter === "upcoming"}
          onClick={() => setFilter("upcoming")}
        >
          <CalendarClock className="cp-icon cp-icon--filter" aria-hidden />
          <span>Upcoming</span>
        </button>
        <span className="filter-hint">
          <Filter className="cp-icon cp-icon--meta" aria-hidden />
          Showing {filteredRows.length} of {rows.length}
        </span>
      </div>

      <div className="account-list">
        {filteredRows.map((row) => (
            <article key={row.id} className="account-card">
              <div className="account-card__top">
                <div>
                  <strong>{row.issuer}</strong>
                  <p>{row.product}</p>
                </div>
                <span className={`status-pill status-pill--${row.dueStateKey}`}>
                  <StatusIcon dueStateKey={row.dueStateKey} />
                  <span>{row.dueLabel}</span>
                </span>
              </div>
              <dl className="account-meta">
                <div>
                  <dt>Balance</dt>
                  <dd>{formatCurrency(row.balance)}</dd>
                </div>
                <div>
                  <dt>Minimum</dt>
                  <dd>{formatCurrency(row.minimumDue)}</dd>
                </div>
                <div>
                  <dt>Rate</dt>
                  <dd>{row.rateLabel}</dd>
                </div>
                <div>
                  <dt>Due</dt>
                  <dd>{formatDateLabel(row.dueDate)}</dd>
                </div>
              </dl>
            </article>
        ))}
      </div>
    </section>
  );
}
