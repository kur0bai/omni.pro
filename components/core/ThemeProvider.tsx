"use client";
import { Theme, useThemeStore } from "@/store/theme.store";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  theme: Theme.LIGHT,
  setTheme: (theme: Theme) => {},
});

import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.dataset.theme = theme.toLowerCase();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
