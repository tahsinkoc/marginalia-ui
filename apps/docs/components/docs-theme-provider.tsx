"use client";

import * as React from "react";

export type DocsThemeMode = "light" | "dark";

type DocsThemeContextValue = {
  mode: DocsThemeMode;
  setMode: (mode: DocsThemeMode) => void;
  toggleMode: () => void;
};

const STORAGE_KEY = "marginalia-docs-theme-mode";

const DocsThemeContext = React.createContext<DocsThemeContextValue | null>(null);

export function DocsThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<DocsThemeMode>("light");

  React.useEffect(() => {
    const root = document.documentElement;
    const storedMode = root.dataset.marginaliaTheme;
    const initialMode = storedMode === "dark" ? "dark" : "light";

    setMode(initialMode);
    applyThemeMode(initialMode);
  }, []);

  const handleSetMode = React.useCallback((nextMode: DocsThemeMode) => {
    setMode(nextMode);
    applyThemeMode(nextMode);
  }, []);

  const toggleMode = React.useCallback(() => {
    handleSetMode(mode === "dark" ? "light" : "dark");
  }, [handleSetMode, mode]);

  const value = React.useMemo(
    () => ({
      mode,
      setMode: handleSetMode,
      toggleMode
    }),
    [handleSetMode, mode, toggleMode]
  );

  return <DocsThemeContext.Provider value={value}>{children}</DocsThemeContext.Provider>;
}

export function useDocsTheme() {
  const context = React.useContext(DocsThemeContext);

  if (!context) {
    throw new Error("useDocsTheme must be used within DocsThemeProvider.");
  }

  return context;
}

function applyThemeMode(mode: DocsThemeMode) {
  const root = document.documentElement;

  root.dataset.marginaliaTheme = mode;
  root.classList.toggle("dark", mode === "dark");

  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Ignore storage failures and still apply the mode for the current session.
  }
}

