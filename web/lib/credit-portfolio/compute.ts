import type { Account, AprilAudit, DebtPlan } from "./schema";
import { debtPlan } from "./data";
import {
  formatCurrency,
  formatRate,
  formatSignedCurrency,
  integer,
} from "./format";

export function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

export function daysBetween(from: Date, to: Date): number {
  const milliseconds = 24 * 60 * 60 * 1000;
  return Math.round((to.getTime() - from.getTime()) / milliseconds);
}

export type DueStateKey = "overdue" | "today" | "upcoming";

export function getDueState(account: Account, asOfDate: Date): {
  key: DueStateKey;
  label: string;
  sortValue: number;
} {
  const due = new Date(`${account.dueDate}T00:00:00`);
  const delta = daysBetween(asOfDate, due);

  if (delta < 0) {
    return {
      key: "overdue",
      label: `Overdue by ${Math.abs(delta)} day${Math.abs(delta) === 1 ? "" : "s"}`,
      sortValue: delta,
    };
  }

  if (delta === 0) {
    return { key: "today", label: "Due today", sortValue: delta };
  }

  if (delta === 1) {
    const longDue = due.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return {
      key: "upcoming",
      label: `Due ${longDue}`,
      sortValue: delta,
    };
  }

  return {
    key: "upcoming",
    label: `Due in ${delta} days`,
    sortValue: delta,
  };
}

export type IssuerRollup = {
  issuer: string;
  balance: number;
  minimumDue: number;
  count: number;
};

export function buildIssuerRollup(accounts: Account[]): IssuerRollup[] {
  const grouped = new Map<string, IssuerRollup>();

  for (const account of accounts) {
    const current = grouped.get(account.issuer) ?? {
      issuer: account.issuer,
      balance: 0,
      minimumDue: 0,
      count: 0,
    };
    current.balance += account.balance;
    current.minimumDue += account.minimumDue;
    current.count += 1;
    grouped.set(account.issuer, current);
  }

  return [...grouped.values()].sort((a, b) => b.balance - a.balance);
}

export function escapeHtml(text: string): string {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildHorizontalBarSvg<T>(
  items: T[],
  options: {
    labelAccessor: (item: T) => string;
    valueAccessor: (item: T) => number;
    subtextAccessor: (item: T) => string;
    valueFormatter: (value: number) => string;
    gradientId: string;
    gradientStops: [string, string];
  },
): string {
  const {
    labelAccessor,
    valueAccessor,
    subtextAccessor,
    valueFormatter,
    gradientId,
    gradientStops,
  } = options;

  const maxValue = Math.max(...items.map((item) => valueAccessor(item)), 1);
  const width = 700;
  const left = 16;
  const right = 16;
  const barWidth = width - left - right;
  const rowHeight = 60;
  const top = 18;
  const height = top * 2 + rowHeight * items.length;
  /** Bar height in user units; rx/ry must be ≤ min(width,height)/2. Do not use huge rx (e.g. 999) — SVG clamps rx and ry independently, which turns wide rects into “spindle/eye” shapes instead of pills. */
  const barH = 14;
  const barR = barH / 2;

  const rows = items
    .map((item, index) => {
      const y = top + index * rowHeight;
      const label = escapeHtml(labelAccessor(item));
      const subtext = escapeHtml(subtextAccessor(item));
      const value = valueAccessor(item);
      const formatted = escapeHtml(valueFormatter(value));
      const widthValue = Math.max((value / maxValue) * barWidth, 2);
      const fillR = Math.min(barR, widthValue / 2);

      return `
        <text class="chart-label" x="${left}" y="${y + 16}">${label} &middot; <tspan class="chart-subtext">${subtext}</tspan></text>
        <text class="chart-value" x="${width - right}" y="${y + 16}" text-anchor="end">${formatted}</text>
        <rect class="chart-track" x="${left}" y="${y + 26}" rx="${barR}" ry="${barR}" width="${barWidth}" height="${barH}"></rect>
        <rect class="animated-bar" x="${left}" y="${y + 26}" rx="${fillR}" ry="${fillR}" width="${widthValue}" height="${barH}" fill="url(#${gradientId})"></rect>
      `;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Horizontal bar chart">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stop-color="${gradientStops[0]}"></stop>
          <stop offset="100%" stop-color="${gradientStops[1]}"></stop>
        </linearGradient>
      </defs>
      <style>
        .animated-bar {
          animation: expandWidth 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-origin: left;
        }
        @keyframes expandWidth {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      </style>
      ${rows}
    </svg>
  `;
}

export function limitText(account: Account): string {
  if (account.limit !== undefined) {
    return formatCurrency(account.limit);
  }
  if (account.sharedLimit !== undefined) {
    return `${formatCurrency(account.sharedLimit)} shared`;
  }
  if (account.limitShown !== undefined) {
    return `${formatCurrency(account.limitShown)} shown`;
  }
  return "Not shown";
}

export type SummarySnapshot = {
  totalBalance: number;
  totalMinimum: number;
  overdueCount: number;
  nextDueLabel: string;
};

export function computeSummary(accounts: Account[], asOfDate: Date): SummarySnapshot {
  const totalBalance = sum(accounts.map((a) => a.balance));
  const totalMinimum = sum(accounts.map((a) => a.minimumDue));
  const overdueAccounts = accounts.filter(
    (a) => getDueState(a, asOfDate).key === "overdue",
  );
  const nextDue = [...accounts]
    .map((account) => ({ account, due: new Date(`${account.dueDate}T00:00:00`) }))
    .filter(({ due }) => due >= asOfDate)
    .sort((a, b) => a.due.getTime() - b.due.getTime())[0];

  const nextDueLabel = nextDue
    ? `${nextDue.account.name} · ${new Date(`${nextDue.account.dueDate}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`
    : "None";

  return {
    totalBalance,
    totalMinimum,
    overdueCount: overdueAccounts.length,
    nextDueLabel,
  };
}

export type Insight = { title: string; body: string };

/** Maps portfolio account `name` to debt-plan ladder `label` for rate display. */
const ACCOUNT_NAME_TO_PLAN_LABEL: Record<string, string> = {
  "Thai Credit Loan": "Thai Credit Loan",
  "UOB Credit Card": "UOB Privilemiles",
  "UOB Cash Card": "UOB Cash",
  "KKC Signature": "Krungsri Visa Signature",
  "CardX1 UP2ME": "SCB Card Up2Me / CardX",
  "CardX2 BEYOND": "SCB Card Up2Me / CardX",
  "KTC1 World Rewards": "KTC World Credit Card",
  "KTC2 World Rewards": "KTC World Credit Card",
};

export type AccountRow = {
  id: string;
  issuer: string;
  product: string;
  balance: number;
  minimumDue: number;
  rateLabel: string;
  dueDate: Date;
  /** Same labels as portfolio rollups/summary (`getDueState`). */
  dueStateKey: DueStateKey;
  dueLabel: string;
};

function rateLabelForAccount(account: Account): string {
  const planLabel = ACCOUNT_NAME_TO_PLAN_LABEL[account.name];
  const item = planLabel
    ? debtPlan.items.find((i) => i.label === planLabel)
    : undefined;
  return item ? formatRate(item.rate) : "—";
}

export function deriveAccountRows(accounts: Account[], asOf: Date): AccountRow[] {
  return accounts.map((account) => {
    const due = getDueState(account, asOf);
    return {
      id: `${account.issuer}-${account.name}`.replaceAll(/\s+/g, "-"),
      issuer: account.issuer,
      product: account.name,
      balance: account.balance,
      minimumDue: account.minimumDue,
      rateLabel: rateLabelForAccount(account),
      dueDate: new Date(`${account.dueDate}T00:00:00`),
      dueStateKey: due.key,
      dueLabel: due.label,
    };
  });
}

export function computeInsights(accounts: Account[], asOfDate: Date): Insight[] {
  if (accounts.length === 0) {
    return [];
  }

  const overdueAccounts = accounts.filter(
    (a) => getDueState(a, asOfDate).key === "overdue",
  );
  const upcomingCount = accounts.length - overdueAccounts.length;
  const highestBalance = [...accounts].sort((a, b) => b.balance - a.balance)[0]!;
  const highestMinimum = [...accounts].sort((a, b) => b.minimumDue - a.minimumDue)[0]!;

  return [
    {
      title: highestBalance.name,
      body: `Largest balance at ${formatCurrency(highestBalance.balance)}.`,
    },
    {
      title: highestMinimum.name,
      body: `Largest payment currently due at ${formatCurrency(highestMinimum.minimumDue)}.`,
    },
    {
      title: `${integer.format(upcomingCount)} still in play`,
      body: `${integer.format(overdueAccounts.length)} account${overdueAccounts.length === 1 ? "" : "s"} are already past due, while ${integer.format(upcomingCount)} remain current or next-up.`,
    },
  ];
}

export function computeGraphSvgs(accounts: Account[]) {
  const issuers = buildIssuerRollup(accounts);
  const issuerSvg = buildHorizontalBarSvg(issuers, {
    labelAccessor: (issuer) => issuer.issuer,
    subtextAccessor: (issuer) =>
      `${issuer.count} account${issuer.count === 1 ? "" : "s"}`,
    valueAccessor: (issuer) => issuer.balance,
    valueFormatter: formatCurrency,
    gradientId: "issuerGradient",
    gradientStops: ["#d49571", "#9d4d31"],
  });

  const minimumRanking = [...accounts]
    .sort((a, b) => b.minimumDue - a.minimumDue)
    .slice(0, 8);

  const minimumSvg = buildHorizontalBarSvg(minimumRanking, {
    labelAccessor: (account) => account.name,
    subtextAccessor: (account) => account.issuer,
    valueAccessor: (account) => account.minimumDue,
    valueFormatter: formatCurrency,
    gradientId: "minimumGradient",
    gradientStops: ["#6e9388", "#295f52"],
  });

  return { issuerSvg, minimumSvg };
}

export type PlanWorkingItem = DebtPlan["items"][number] & {
  workingBalance: number;
  monthlyInterest: number;
};

export function buildDebtPlanItems(plan: DebtPlan): PlanWorkingItem[] {
  return plan.items.map((item) => {
    const workingBalance = Math.max(item.balance - item.aprilPaid, 0);
    return {
      ...item,
      workingBalance,
      monthlyInterest: (workingBalance * item.rate) / 100 / 12,
    };
  });
}

export type PlanMetrics = {
  label: string;
  value: string;
  note: string;
};

export type PlanAction = { title: string; body: string };

export function computeDebtPlanPresentation(plan: DebtPlan): {
  metrics: PlanMetrics[];
  active: PlanWorkingItem[];
  cleared: PlanWorkingItem[];
  actions: PlanAction[];
  planNoteHtml: string;
} {
  const items = buildDebtPlanItems(plan);
  const active = items
    .filter((item) => item.workingBalance > 1)
    .sort((a, b) => b.rate - a.rate || a.workingBalance - b.workingBalance);
  const cleared = items.filter((item) => item.workingBalance <= 1);
  const totalActive = sum(active.map((item) => item.workingBalance));
  const totalMonthlyInterest = sum(active.map((item) => item.monthlyInterest));
  const firstAttack = active[0];
  const secondAttack = active[1];
  const reviewItem = items.find((item) => item.needsReview);

  const metrics: PlanMetrics[] = [
    {
      label: "Estimated active debt",
      value: formatCurrency(totalActive),
      note: "Statement balances minus the April 2026 payments already logged in the sheet or confirmed afterward.",
    },
    {
      label: "Likely cleared this cycle",
      value: `${integer.format(cleared.length)} debt${cleared.length === 1 ? "" : "s"}`,
      note: cleared.length
        ? `${cleared.map((item) => item.label).join(" and ")} look effectively closed if those payments have posted.`
        : "No reviewed debt drops out of the ladder yet.",
    },
    {
      label: "Interest drag now",
      value: `~${formatCurrency(totalMonthlyInterest)}/mo`,
      note: "Based on the interest rates in the sheet, before late fees and excluding the condo loan.",
    },
    {
      label: "First attack",
      value: firstAttack?.label ?? "—",
      note: firstAttack
        ? `${formatRate(firstAttack.rate)} rate · est. remaining ${formatCurrency(firstAttack.workingBalance)}.`
        : "No active debts in the modeled ladder.",
    },
  ];

  const actions: PlanAction[] = [
    {
      title: "Verify every April payment has actually posted",
      body: "The sheet looks like a payment log, but the real control point is the lender ledger. The most time-sensitive check is Krungsri because its due date is April 20, 2026. KTC is now treated as cleared based on your full-payment confirmation, so the remaining priority is making sure the other April payments have posted cleanly.",
    },
    {
      title: "Freeze all revolving-card spend now",
      body: "Do not put new purchases, installments, or cash withdrawals on KTC, Krungsri, UOB, CardX, or Thai Credit while this ladder is active. The fastest payoff plan breaks the moment fresh spend restarts.",
    },
    {
      title: `Attack ${firstAttack?.label ?? "the highest-rate balance"} first and roll the payment forward`,
      body:
        firstAttack && secondAttack
          ? `After all required minimums are covered, send every extra baht to ${firstAttack.label} until it hits zero. Then roll that full payment into ${secondAttack.label}, then into the next debt after that.`
          : firstAttack
            ? `After all required minimums are covered, send every extra baht to ${firstAttack.label} until it hits zero.`
            : "Cover required minimums first, then direct extra cash to the highest-rate remaining balance.",
    },
    {
      title: "Use restructuring only if cash flow is too tight to stay current",
      body: "If you cannot safely cover the required payments, call the issuer before the next due date and ask about converting revolving debt into a term loan or a hardship structure. BOT guidance explicitly discusses term-loan conversion for revolving debt and longer workout paths for persistent debt.",
    },
    {
      title: "Keep the condominium loan outside the attack ladder",
      body: "At 2.8%, the condo loan is far cheaper than the unsecured balances. I would leave it in maintenance mode until the card-style debt is gone, unless a bank offers a clearly lower-cost restructuring that also removes the temptation to reuse the cards.",
    },
  ];

  const planNoteHtml = `
    <p>
      <strong>Working assumption.</strong> This ladder uses the statement balances as the starting
      point and subtracts the April 2026 payments already entered in your sheet or confirmed afterward. On that basis,
      ${cleared.length ? `${cleared.map((item) => item.label).join(" and ")} look effectively cleared this cycle` : "none of the reviewed debts look fully cleared yet"}.
      <strong>Important:</strong> the fastest mathematical method is the highest-interest-rate
      method, which CFPB says saves money in the long run. BOT guidance also points debtors toward
      staying current where possible, paying more than the minimum when they can, and negotiating
      term-loan conversion or restructuring when revolving debt becomes too heavy. Since BOT stated
      its temporary debt-consolidation support would end in 2025, I would treat any 2026
      consolidation offer as bank-specific and verify the true rate, fees, and payoff speed before
      signing.
      ${reviewItem ? ` Right now, ${escapeHtml(reviewItem.label)} is the one payment I would double-check first.` : ""}
    </p>
  `;

  return { metrics, active, cleared, actions, planNoteHtml };
}

export type AuditMetric = { label: string; value: string };

export function computeAuditPresentation(audit: AprilAudit): {
  metrics: AuditMetric[];
  chartRowsHtml: string;
  tableHtml: string;
} {
  const visibleRowSum = sum(audit.rows.map((row) => row.sheetPaid));
  const reviewedRows = audit.rows.filter((row) => row.verified !== null);
  const reviewedSheetTotal = sum(reviewedRows.map((row) => row.sheetPaid));
  const reviewedReferenceTotal = sum(
    reviewedRows.map((row) => row.verified as number),
  );
  const needsReviewCount = audit.rows.filter((row) => row.status === "review").length;

  const metrics: AuditMetric[] = [
    { label: "Sheet total row", value: formatCurrency(audit.sheetTotalRow) },
    { label: "Visible row sum", value: formatCurrency(visibleRowSum) },
    { label: "Reviewed rows reference", value: formatCurrency(reviewedReferenceTotal) },
    { label: "Rows needing review", value: integer.format(needsReviewCount) },
  ];

  const maxForChart = Math.max(
    ...audit.rows
      .filter((item) => item.verified !== null)
      .map((item) => Math.max(item.sheetPaid, item.verified ?? 0)),
    1,
  );

  const chartRowsHtml = audit.rows
    .filter((row) => row.verified !== null)
    .map((row) => {
      const sheetWidth = `${(row.sheetPaid / maxForChart) * 100}%`;
      const verifiedWidth = `${((row.verified ?? 0) / maxForChart) * 100}%`;

      return `
        <article class="compare-row">
          <div class="compare-title">
            <strong>${escapeHtml(row.description)}</strong>
            <span>${row.statusLabel}</span>
          </div>
          <div class="compare-bars">
            <div class="compare-bar-line">
              <div class="compare-bar-label">Sheet</div>
              <div class="compare-bar-track">
                <div class="compare-bar-fill sheet" style="--bar-width: ${sheetWidth};"></div>
              </div>
              <div class="compare-bar-value">${formatCurrency(row.sheetPaid)}</div>
            </div>
            <div class="compare-bar-line">
              <div class="compare-bar-label">Reference</div>
              <div class="compare-bar-track">
                <div class="compare-bar-fill verified" style="--bar-width: ${verifiedWidth};"></div>
              </div>
              <div class="compare-bar-value">${formatCurrency(row.verified ?? 0)}</div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  const body = audit.rows
    .map((row) => {
      const delta = row.verified === null ? null : row.verified - row.sheetPaid;
      return `
        <article class="audit-row">
          <div class="audit-cell">
            <strong>${escapeHtml(row.description)}</strong>
          </div>
          <div class="audit-cell">
            <span>${formatCurrency(row.sheetPaid)}</span>
          </div>
          <div class="audit-cell">
            <span>${row.verified === null ? "-" : formatCurrency(row.verified)}</span>
          </div>
          <div class="audit-cell">
            <span>${formatSignedCurrency(delta)}</span>
          </div>
          <div class="audit-cell">
            <span class="audit-pill ${row.status}">${row.statusLabel}</span>
          </div>
          <div class="audit-cell">
            <p>${escapeHtml(row.note)}</p>
          </div>
        </article>
      `;
    })
    .join("");

  const tableHtml = `
    <article class="audit-row audit-head">
      <div class="audit-cell">Item</div>
      <div class="audit-cell">Sheet paid</div>
      <div class="audit-cell">Statement ref</div>
      <div class="audit-cell">Delta</div>
      <div class="audit-cell">Status</div>
      <div class="audit-cell">Note</div>
    </article>
    ${body}
    <article class="audit-row">
      <div class="audit-cell">
        <strong>Reviewed rows subtotal</strong>
      </div>
      <div class="audit-cell">
        <span>${formatCurrency(reviewedSheetTotal)}</span>
      </div>
      <div class="audit-cell">
        <span>${formatCurrency(reviewedReferenceTotal)}</span>
      </div>
      <div class="audit-cell">
        <span>${formatSignedCurrency(reviewedReferenceTotal - reviewedSheetTotal)}</span>
      </div>
      <div class="audit-cell">
        <span class="audit-pill review">Gap</span>
      </div>
      <div class="audit-cell">
        <p>This subtotal only includes rows that could be checked against the statement PDFs.</p>
      </div>
    </article>
  `;

  return { metrics, chartRowsHtml, tableHtml };
}

export type DebtPlanPresentation = ReturnType<typeof computeDebtPlanPresentation>;
export type AuditPresentation = ReturnType<typeof computeAuditPresentation>;
