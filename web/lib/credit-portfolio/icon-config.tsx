import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  CircleDot,
  Eye,
  FileCheck2,
  Flame,
  Percent,
  Search,
  Table2,
  Wallet,
} from "lucide-react";

const PLAN_METRIC_ICONS: Record<string, LucideIcon> = {
  "Estimated active debt": Wallet,
  "Likely cleared this cycle": CheckCircle2,
  "Interest drag now": Percent,
  "First attack": Flame,
};

export function getPlanMetricIcon(label: string): LucideIcon {
  return PLAN_METRIC_ICONS[label] ?? CircleDot;
}

const AUDIT_METRIC_ICONS: Record<string, LucideIcon> = {
  "Sheet total row": Table2,
  "Visible row sum": Eye,
  "Reviewed rows reference": FileCheck2,
  "Rows needing review": Search,
};

export function getAuditMetricIcon(label: string): LucideIcon {
  return AUDIT_METRIC_ICONS[label] ?? CircleDot;
}
