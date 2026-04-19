const portfolio = {
  asOf: "2026-04-19",
  accounts: [
    {
      issuer: "Thai Credit",
      name: "Thai Credit Loan",
      statementDate: "2026-03-31",
      dueDate: "2026-04-15",
      balance: 163644.35,
      minimumDue: 4909.33,
      limit: 180000,
      note: "Largest balance and the highest line usage at 90.91% utilization."
    },
    {
      issuer: "UOB",
      name: "UOB Credit Card",
      statementDate: "2026-03-17",
      dueDate: "2026-04-08",
      balance: 113843.52,
      minimumDue: 29206,
      limit: 430000,
      note: "Main finance-cost driver, with installment principal and interest both visible this cycle."
    },
    {
      issuer: "UOB",
      name: "UOB Cash Card",
      statementDate: "2026-03-22",
      dueDate: "2026-04-10",
      balance: 27442.62,
      minimumDue: 27442.62,
      limit: 250000,
      note: "This cycle behaved like a pay-in-full obligation."
    },
    {
      issuer: "Krungsri",
      name: "KKC Signature",
      statementDate: "2026-03-31",
      dueDate: "2026-04-20",
      balance: 66915.99,
      minimumDue: 6512.32,
      limit: 270000,
      note: "Only readable account not yet past due as of April 19, 2026."
    },
    {
      issuer: "CardX",
      name: "CardX1 UP2ME",
      statementDate: "2026-03-16",
      dueDate: "2026-04-05",
      balance: 22365,
      minimumDue: 22365,
      limitShown: 219000,
      note: "Mostly transfer and installment activity rather than normal retail spend."
    },
    {
      issuer: "CardX",
      name: "CardX2 BEYOND",
      statementDate: "2026-03-16",
      dueDate: "2026-04-05",
      balance: 11503.02,
      minimumDue: 11503.02,
      limitShown: 219000,
      note: "Driven by Apple Store Ginza purchases."
    },
    {
      issuer: "KTC",
      name: "KTC1 World Rewards",
      statementDate: "2026-03-17",
      dueDate: "2026-04-01",
      balance: 2492.5,
      minimumDue: 199.4,
      sharedLimit: 360000,
      note: "Small fresh-spend card, after the prior balance was fully cleared."
    },
    {
      issuer: "KTC",
      name: "KTC2 World Rewards",
      statementDate: "2026-03-17",
      dueDate: "2026-04-01",
      balance: 21612.06,
      minimumDue: 13995.62,
      sharedLimit: 360000,
      note: "Fresh-spend heavy cycle, including a large Christian Louboutin charge."
    }
  ]
};

const aprilAudit = {
  sheetTotalRow: 128437,
  rows: [
    {
      description: "Water",
      sheetPaid: 80,
      verified: null,
      status: "unverified",
      statusLabel: "Sheet only",
      note: "Utility row, not part of the card statement pack."
    },
    {
      description: "UOB Express",
      sheetPaid: 3300,
      verified: null,
      status: "unverified",
      statusLabel: "Sheet only",
      note: "No matching UOB Express statement was included in the PDFs reviewed."
    },
    {
      description: "Thai Credit",
      sheetPaid: 5000,
      verified: 5000,
      status: "match",
      statusLabel: "Match",
      note: "Matches the payment recorded in the Thai Credit statement."
    },
    {
      description: "Condominium Loan",
      sheetPaid: 18000,
      verified: null,
      status: "unverified",
      statusLabel: "Sheet only",
      note: "Outside the credit-card statement set reviewed here."
    },
    {
      description: "Krungsri Visa Signature",
      sheetPaid: 6512,
      verified: 6512.32,
      status: "rounded",
      statusLabel: "Rounded",
      note: "Very close to the Krungsri minimum due, short by THB 0.32 versus the statement."
    },
    {
      description: "UOB Cash",
      sheetPaid: 27500,
      verified: 27442.62,
      status: "rounded",
      statusLabel: "Above min",
      note: "Sheet entry is THB 57.38 above the UOB Cash statement amount."
    },
    {
      description: "KTC World Credit Card",
      sheetPaid: 4970,
      verified: 24104.56,
      status: "paid",
      statusLabel: "Paid in full",
      note: "The sheet shows THB 4,970, but you confirmed the KTC balance was fully paid at THB 24,104.56 outside that sheet entry."
    },
    {
      description: "UOB Privilemiles",
      sheetPaid: 29206,
      verified: 29206,
      status: "match",
      statusLabel: "Match",
      note: "Matches the minimum due from the UOB credit card statement."
    },
    {
      description: "SCB Card Up2Me",
      sheetPaid: 33868,
      verified: 33868.02,
      status: "rounded",
      statusLabel: "Rounded",
      note: "Very close to the combined CardX due, short by THB 0.02."
    }
  ]
};

const debtPlan = {
  items: [
    {
      label: "Thai Credit Loan",
      group: "Thai Credit",
      balance: 163644.35,
      rate: 9.99,
      aprilPaid: 5000,
      note: "Keep this on minimum-only mode until the higher-rate debts are gone."
    },
    {
      label: "UOB Privilemiles",
      group: "UOB",
      balance: 113843.52,
      rate: 15,
      aprilPaid: 29206,
      note: "Large enough to keep finance cost heavy even after the April payment."
    },
    {
      label: "Krungsri Visa Signature",
      group: "Krungsri",
      balance: 66915.99,
      rate: 16,
      aprilPaid: 6512,
      note: "Top-rate debt with the next due date, so it becomes the first unsecured payoff target now."
    },
    {
      label: "UOB Cash",
      group: "UOB",
      balance: 27442.62,
      rate: 11.99,
      aprilPaid: 27500,
      note: "Looks effectively cleared if the April payment has already posted."
    },
    {
      label: "SCB Card Up2Me / CardX",
      group: "CardX",
      balance: 33868.02,
      rate: 9.99,
      aprilPaid: 33868,
      note: "Looks effectively cleared if the April payment has already posted."
    },
    {
      label: "KTC World Credit Card",
      group: "KTC",
      balance: 24104.56,
      rate: 16,
      aprilPaid: 24104.56,
      note: "Treated as fully paid based on your confirmation, so it drops out of the active payoff ladder."
    }
  ]
};

const asOfDate = new Date(`${portfolio.asOf}T00:00:00`);
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 2
});

const integer = new Intl.NumberFormat("en-US");

function formatCurrency(value) {
  return currency.format(value).replace("THB", "THB ");
}

function formatSignedCurrency(value) {
  if (value === null || value === undefined) {
    return "-";
  }

  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${formatCurrency(Math.abs(value))}`;
}

function formatRate(value) {
  const fixed = value.toFixed(2);
  return `${fixed.endsWith(".00") ? integer.format(value) : fixed}%`;
}

function daysBetween(from, to) {
  const milliseconds = 24 * 60 * 60 * 1000;
  return Math.round((to - from) / milliseconds);
}

function getDueState(account) {
  const due = new Date(`${account.dueDate}T00:00:00`);
  const delta = daysBetween(asOfDate, due);

  if (delta < 0) {
    return {
      key: "overdue",
      label: `Overdue by ${Math.abs(delta)} day${Math.abs(delta) === 1 ? "" : "s"}`,
      sortValue: delta
    };
  }

  if (delta === 0) {
    return {
      key: "today",
      label: "Due today",
      sortValue: delta
    };
  }

  if (delta === 1) {
    return {
      key: "upcoming",
      label: "Due April 20, 2026",
      sortValue: delta
    };
  }

  return {
    key: "upcoming",
    label: `Due in ${delta} days`,
    sortValue: delta
  };
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function buildIssuerRollup(accounts) {
  const grouped = new Map();

  for (const account of accounts) {
    const current = grouped.get(account.issuer) || {
      issuer: account.issuer,
      balance: 0,
      minimumDue: 0,
      count: 0
    };

    current.balance += account.balance;
    current.minimumDue += account.minimumDue;
    current.count += 1;
    grouped.set(account.issuer, current);
  }

  return [...grouped.values()].sort((a, b) => b.balance - a.balance);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildHorizontalBarSvg(items, options) {
  const {
    labelAccessor,
    valueAccessor,
    subtextAccessor,
    valueFormatter,
    gradientId,
    gradientStops
  } = options;

  const maxValue = Math.max(...items.map((item) => valueAccessor(item)), 1);
  const width = 700;
  const left = 16;
  const right = 16;
  const barWidth = width - left - right;
  const rowHeight = 60;
  const top = 18;
  const height = top * 2 + rowHeight * items.length;

  const rows = items
    .map((item, index) => {
      const y = top + index * rowHeight;
      const label = escapeHtml(labelAccessor(item));
      const subtext = escapeHtml(subtextAccessor(item));
      const value = valueAccessor(item);
      const formatted = escapeHtml(valueFormatter(value));
      const widthValue = Math.max((value / maxValue) * barWidth, 2);

      return `
        <text class="chart-label" x="${left}" y="${y + 16}">${label} &middot; <tspan class="chart-subtext">${subtext}</tspan></text>
        <text class="chart-value" x="${width - right}" y="${y + 16}" text-anchor="end">${formatted}</text>
        <rect class="chart-track" x="${left}" y="${y + 26}" rx="999" ry="999" width="${barWidth}" height="14"></rect>
        <rect class="animated-bar" x="${left}" y="${y + 26}" rx="999" ry="999" width="${widthValue}" height="14" fill="url(#${gradientId})"></rect>
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

function animateValue(obj, start, end, duration, formatFn) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * easeProgress;
    obj.innerHTML = formatFn(current);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function renderSummary(accounts) {
  const totalBalance = sum(accounts.map((account) => account.balance));
  const totalMinimum = sum(accounts.map((account) => account.minimumDue));
  const overdueAccounts = accounts.filter((account) => getDueState(account).key === "overdue");
  const nextDue = [...accounts]
    .map((account) => ({ account, due: new Date(`${account.dueDate}T00:00:00`) }))
    .filter(({ due }) => due >= asOfDate)
    .sort((a, b) => a.due - b.due)[0];

  animateValue(document.querySelector("#total-balance"), 0, totalBalance, 1200, formatCurrency);
  animateValue(document.querySelector("#total-minimum"), 0, totalMinimum, 1200, formatCurrency);
  animateValue(document.querySelector("#overdue-count"), 0, overdueAccounts.length, 1000, Math.floor);

  document.querySelector("#next-due").textContent = nextDue
    ? `${nextDue.account.name} · ${new Date(`${nextDue.account.dueDate}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      })}`
    : "None";

  const highestBalance = [...accounts].sort((a, b) => b.balance - a.balance)[0];
  const highestMinimum = [...accounts].sort((a, b) => b.minimumDue - a.minimumDue)[0];
  const upcomingCount = accounts.length - overdueAccounts.length;

  const insights = [
    {
      title: highestBalance.name,
      body: `Largest balance at ${formatCurrency(highestBalance.balance)}.`
    },
    {
      title: highestMinimum.name,
      body: `Largest payment currently due at ${formatCurrency(highestMinimum.minimumDue)}.`
    },
    {
      title: `${integer.format(upcomingCount)} still in play`,
      body: `${integer.format(overdueAccounts.length)} account${overdueAccounts.length === 1 ? "" : "s"} are already past due, while ${integer.format(upcomingCount)} remain current or next-up.`
    }
  ];

  document.querySelector("#insights").innerHTML = insights
    .map(
      (insight) => `
        <article class="insight-card">
          <strong>${insight.title}</strong>
          <p>${insight.body}</p>
        </article>
      `
    )
    .join("");
}

function renderGraphs(accounts) {
  const issuers = buildIssuerRollup(accounts);
  const issuerSvg = buildHorizontalBarSvg(issuers, {
    labelAccessor: (issuer) => issuer.issuer,
    subtextAccessor: (issuer) => `${issuer.count} account${issuer.count === 1 ? "" : "s"}`,
    valueAccessor: (issuer) => issuer.balance,
    valueFormatter: formatCurrency,
    gradientId: "issuerGradient",
    gradientStops: ["#d49571", "#9d4d31"]
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
    gradientStops: ["#6e9388", "#295f52"]
  });

  document.querySelector("#issuer-chart").innerHTML = issuerSvg;
  document.querySelector("#minimum-chart").innerHTML = minimumSvg;
}

function buildDebtPlanItems(plan) {
  return plan.items.map((item) => {
    const workingBalance = Math.max(item.balance - item.aprilPaid, 0);
    return {
      ...item,
      workingBalance,
      monthlyInterest: (workingBalance * item.rate) / 100 / 12
    };
  });
}

function renderDebtPlan(plan) {
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

  const metrics = [
    {
      label: "Estimated active debt",
      value: formatCurrency(totalActive),
      note: "Statement balances minus the April 2026 payments already logged in the sheet or confirmed afterward."
    },
    {
      label: "Likely cleared this cycle",
      value: `${integer.format(cleared.length)} debt${cleared.length === 1 ? "" : "s"}`,
      note: cleared.length
        ? `${cleared.map((item) => item.label).join(" and ")} look effectively closed if those payments have posted.`
        : "No reviewed debt drops out of the ladder yet."
    },
    {
      label: "Interest drag now",
      value: `~${formatCurrency(totalMonthlyInterest)}/mo`,
      note: "Based on the interest rates in the sheet, before late fees and excluding the condo loan."
    },
    {
      label: "First attack",
      value: firstAttack.label,
      note: `${formatRate(firstAttack.rate)} rate · est. remaining ${formatCurrency(firstAttack.workingBalance)}.`
    }
  ];

  document.querySelector("#plan-summary").innerHTML = metrics
    .map(
      (metric) => `
        <article class="plan-metric">
          <p>${metric.label}</p>
          <strong>${metric.value}</strong>
          <span>${metric.note}</span>
        </article>
      `
    )
    .join("");

  document.querySelector("#plan-order").innerHTML = active
    .map(
      (item, index) => `
        <article class="plan-order-item ${index === 0 ? "is-primary" : ""}">
          <div class="plan-order-head">
            <span class="plan-rank">${index + 1}</span>
            <div class="plan-order-copy">
              <strong>${item.label}</strong>
              <p>${formatRate(item.rate)} rate · est. remaining ${formatCurrency(item.workingBalance)}</p>
            </div>
          </div>
          <p class="plan-order-note">${item.note}</p>
        </article>
      `
    )
    .join("");

  const actions = [
    {
      title: "Verify every April payment has actually posted",
      body: "The sheet looks like a payment log, but the real control point is the lender ledger. The most time-sensitive check is Krungsri because its due date is April 20, 2026. KTC is now treated as cleared based on your full-payment confirmation, so the remaining priority is making sure the other April payments have posted cleanly."
    },
    {
      title: "Freeze all revolving-card spend now",
      body: "Do not put new purchases, installments, or cash withdrawals on KTC, Krungsri, UOB, CardX, or Thai Credit while this ladder is active. The fastest payoff plan breaks the moment fresh spend restarts."
    },
    {
      title: `Attack ${firstAttack.label} first and roll the payment forward`,
      body: `After all required minimums are covered, send every extra baht to ${firstAttack.label} until it hits zero. Then roll that full payment into ${secondAttack.label}, then into the next debt after that.`
    },
    {
      title: "Use restructuring only if cash flow is too tight to stay current",
      body: "If you cannot safely cover the required payments, call the issuer before the next due date and ask about converting revolving debt into a term loan or a hardship structure. BOT guidance explicitly discusses term-loan conversion for revolving debt and longer workout paths for persistent debt."
    },
    {
      title: "Keep the condominium loan outside the attack ladder",
      body: "At 2.8%, the condo loan is far cheaper than the unsecured balances. I would leave it in maintenance mode until the card-style debt is gone, unless a bank offers a clearly lower-cost restructuring that also removes the temptation to reuse the cards."
    }
  ];

  document.querySelector("#plan-actions").innerHTML = actions
    .map(
      (action, index) => `
        <article class="plan-action-item">
          <div class="plan-action-head">
            <span class="plan-action-number">${index + 1}</span>
            <div class="plan-action-copy">
              <strong>${action.title}</strong>
              <p>${action.body}</p>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelector("#plan-note").innerHTML = `
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
      ${reviewItem ? ` Right now, ${reviewItem.label} is the one payment I would double-check first.` : ""}
    </p>
  `;
}

function renderIssuers(accounts) {
  const issuers = buildIssuerRollup(accounts);
  const largestBalance = issuers[0]?.balance || 1;

  document.querySelector("#issuer-list").innerHTML = issuers
    .map(
      (issuer) => `
        <article class="issuer-row">
          <div class="issuer-meta">
            <strong>${issuer.issuer}</strong>
            <span>${formatCurrency(issuer.balance)} balance · ${formatCurrency(issuer.minimumDue)} minimum due</span>
          </div>
          <div class="issuer-bar" aria-hidden="true">
            <span style="width:${(issuer.balance / largestBalance) * 100}%"></span>
          </div>
        </article>
      `
    )
    .join("");
}

function limitText(account) {
  if (account.limit) {
    return formatCurrency(account.limit);
  }

  if (account.sharedLimit) {
    return `${formatCurrency(account.sharedLimit)} shared`;
  }

  if (account.limitShown) {
    return `${formatCurrency(account.limitShown)} shown`;
  }

  return "Not shown";
}

function renderAccounts(accounts, filter = "all") {
  const list = [...accounts].sort((a, b) => {
    const byDue = new Date(`${a.dueDate}T00:00:00`) - new Date(`${b.dueDate}T00:00:00`);
    return byDue || b.balance - a.balance;
  });

  document.querySelector("#account-grid").innerHTML = list
    .map((account) => {
      const dueState = getDueState(account);
      const hidden = filter !== "all" && dueState.key !== filter;

      return `
        <article class="account-card" data-status="${dueState.key}" ${hidden ? "hidden" : ""}>
          <div class="card-top">
            <div class="card-title">
              <strong>${account.name}</strong>
              <p>${account.issuer}</p>
            </div>
            <span class="status-pill ${dueState.key}">${dueState.label}</span>
          </div>

          <div class="account-meta">
            <div>
              <span>Statement date</span>
              <strong>${new Date(`${account.statementDate}T00:00:00`).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}</strong>
            </div>
            <div>
              <span>Due date</span>
              <strong>${new Date(`${account.dueDate}T00:00:00`).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}</strong>
            </div>
          </div>

          <div class="account-stats">
            <div class="account-stat">
              <span>Balance</span>
              <strong>${formatCurrency(account.balance)}</strong>
            </div>
            <div class="account-stat">
              <span>Minimum due</span>
              <strong>${formatCurrency(account.minimumDue)}</strong>
            </div>
            <div class="account-stat">
              <span>Credit line</span>
              <strong>${limitText(account)}</strong>
            </div>
          </div>

          <div class="account-note">
            <p class="card-note">${account.note}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderAudit(audit) {
  const visibleRowSum = sum(audit.rows.map((row) => row.sheetPaid));
  const reviewedRows = audit.rows.filter((row) => row.verified !== null);
  const reviewedSheetTotal = sum(reviewedRows.map((row) => row.sheetPaid));
  const reviewedReferenceTotal = sum(reviewedRows.map((row) => row.verified));
  const needsReviewCount = audit.rows.filter((row) => row.status === "review").length;

  const metrics = [
    {
      label: "Sheet total row",
      value: formatCurrency(audit.sheetTotalRow)
    },
    {
      label: "Visible row sum",
      value: formatCurrency(visibleRowSum)
    },
    {
      label: "Reviewed rows reference",
      value: formatCurrency(reviewedReferenceTotal)
    },
    {
      label: "Rows needing review",
      value: integer.format(needsReviewCount)
    }
  ];

  document.querySelector("#audit-summary").innerHTML = metrics
    .map(
      (metric) => `
        <article class="audit-metric">
          <p>${metric.label}</p>
          <strong>${metric.value}</strong>
        </article>
      `
    )
    .join("");

  const chartRows = audit.rows
    .filter((row) => row.verified !== null)
    .map((row) => {
      const maxValue = Math.max(
        ...audit.rows.filter((item) => item.verified !== null).map((item) => Math.max(item.sheetPaid, item.verified)),
        1
      );
      const sheetWidth = `${(row.sheetPaid / maxValue) * 100}%`;
      const verifiedWidth = `${(row.verified / maxValue) * 100}%`;

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
              <div class="compare-bar-value">${formatCurrency(row.verified)}</div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelector("#audit-chart").innerHTML = chartRows;

  const body = audit.rows
    .map((row) => {
      const delta = row.verified === null ? null : row.verified - row.sheetPaid;
      return `
        <article class="audit-row">
          <div class="audit-cell">
            <strong>${row.description}</strong>
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
            <p>${row.note}</p>
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelector("#audit-table").innerHTML = `
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
}

function setActiveFilter(nextFilter) {
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === nextFilter);
  });

  renderAccounts(portfolio.accounts, nextFilter);
}

function initFilters() {
  document.querySelector(".filter-group").addEventListener("click", (event) => {
    const button = event.target.closest(".filter-button");
    if (!button) {
      return;
    }

    setActiveFilter(button.dataset.filter);
  });
}

renderSummary(portfolio.accounts);
renderGraphs(portfolio.accounts);
renderDebtPlan(debtPlan);
renderIssuers(portfolio.accounts);
renderAccounts(portfolio.accounts);
renderAudit(aprilAudit);
initFilters();
