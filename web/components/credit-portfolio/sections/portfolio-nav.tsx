import { ThemeToggle } from "@/components/credit-portfolio/theme-toggle";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Building2,
  ClipboardCheck,
  CreditCard,
  LayoutDashboard,
  Route,
  Sparkles,
} from "lucide-react";

const SNAP_NAV: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "#overview", label: "Overview", Icon: LayoutDashboard },
  { href: "#insights-heading", label: "Fast read", Icon: Sparkles },
  { href: "#graphs-heading", label: "Graphs", Icon: BarChart3 },
  { href: "#plan-heading", label: "Plan", Icon: Route },
  { href: "#issuer-heading", label: "Issuers", Icon: Building2 },
  { href: "#accounts-heading", label: "Accounts", Icon: CreditCard },
  { href: "#audit-heading", label: "Audit", Icon: ClipboardCheck },
  { href: "#notes-heading", label: "Notes", Icon: BookOpen },
];

export function PortfolioNav() {
  return (
    <nav className="snap-nav-wrap" aria-label="Page sections">
      <div className="snap-nav">
        {SNAP_NAV.map(({ href, label, Icon }) => (
          <a key={href} className="snap-nav__link" href={href}>
            <Icon className="cp-icon cp-icon--nav" aria-hidden />
            <span>{label}</span>
          </a>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
