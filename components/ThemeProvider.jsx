"use client";

import { useEffect } from "react";

import { useThemeStore } from "@/stores/useThemeStore";

export default function ThemeProvider({ children }) {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("auralization-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      return;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, [setTheme]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    window.localStorage.setItem("auralization-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
