import { create } from "zustand";

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}
//basic theme handler in store
export const useThemeStore = create<ThemeState>((set) => ({
  theme: Theme.LIGHT,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
    })),
  setTheme: (theme) => set({ theme }),
}));
