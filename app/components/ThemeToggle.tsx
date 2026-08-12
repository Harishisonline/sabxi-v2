"use client";

import { useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const STORAGE_KEY = "sabxi-theme";
const listeners = new Set<() => void>();

function systemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return systemTheme();
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onScheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== "light" && stored !== "dark") onStoreChange();
  };
  mq.addEventListener("change", onScheme);
  return () => {
    listeners.delete(onStoreChange);
    mq.removeEventListener("change", onScheme);
  };
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

function SunIcon() {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" />
    </svg>
  );
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const label = mounted
    ? `Theme: ${theme}. Click to switch.`
    : "Toggle theme";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => {
        setTheme(getStoredTheme() === "light" ? "dark" : "light");
      }}
      aria-label={label}
      title={label}
    >
      <span className={styles.icon} aria-hidden="true">
        {mounted ? (theme === "dark" ? <MoonIcon /> : <SunIcon />) : null}
      </span>
    </button>
  );
}
