"use client";

import { useCallback, useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const STORAGE_KEY = "sabxi-theme";
const listeners = new Set<() => void>();

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function emit() {
  listeners.forEach((l) => l());
}

function getSnapshot(): Theme {
  return getStoredTheme();
}

function getServerSnapshot(): Theme {
  return "light";
}

function setTheme(next: Theme) {
  localStorage.setItem(STORAGE_KEY, next);
  applyTheme(next);
  emit();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const cycle = useCallback(() => {
    const current = getStoredTheme();
    const next: Theme = current === "light" ? "dark" : "light";
    setTheme(next);
  }, []);

  const label = mounted
    ? `Theme: ${theme}. Click to switch.`
    : "Toggle theme";

  const icon = !mounted ? null : theme === "dark" ? "🌙" : "☀️";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={cycle}
      aria-label={label}
      title={label}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
