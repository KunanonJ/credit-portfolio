const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 2,
});

export const integer = new Intl.NumberFormat("en-US");

export function formatCurrency(value: number): string {
  return currency.format(value).replace("THB", "THB ");
}

export function formatSignedCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return "-";
  }
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${formatCurrency(Math.abs(value))}`;
}

export function formatRate(value: number): string {
  const fixed = value.toFixed(2);
  return `${fixed.endsWith(".00") ? integer.format(value) : fixed}%`;
}
