"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export type CreditPortfolioTheme = "dark" | "light";

const STORAGE_KEY = "credit-portfolio-theme";

function readStoredTheme(): CreditPortfolioTheme | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* ignore */
  }
  return null;
}

function applyTheme(theme: CreditPortfolioTheme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<CreditPortfolioTheme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
      const stored = readStoredTheme();
      const initial =
        stored ??
        (document.documentElement.getAttribute("data-theme") === "light"
          ? "light"
          : "dark");
      setTheme(initial);
      applyTheme(initial);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const setLight = useCallback(() => {
    setTheme("light");
    applyTheme("light");
  }, []);

  const setDark = useCallback(() => {
    setTheme("dark");
    applyTheme("dark");
  }, []);

  /* Avoid hydration mismatch: render stable placeholder until mounted */
  const isLight = mounted && theme === "light";

  return (
    <div
      className="theme-toggle"
      role="group"
      aria-label="Color theme"
    >
      <button
        type="button"
        className={`theme-toggle__btn${isLight ? " is-active" : ""}`}
        onClick={setLight}
        aria-pressed={isLight}
      >
        <Sun className="theme-toggle__icon" aria-hidden />
        Day
      </button>
      <button
        type="button"
        className={`theme-toggle__btn${!isLight ? " is-active" : ""}`}
        onClick={setDark}
        aria-pressed={!isLight}
      >
        <Moon className="theme-toggle__icon" aria-hidden />
        Dark
      </button>
    </div>
  );
}
