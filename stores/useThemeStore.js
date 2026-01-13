"use client";

import { create } from "zustand";

const defaultTheme = "light";

export const useThemeStore = create((set) => ({
  theme: defaultTheme,
  setTheme: (nextTheme) => set({ theme: nextTheme }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
