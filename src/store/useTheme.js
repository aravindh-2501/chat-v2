import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTheme = create(
  persist(
    (set) => ({
      theme: localStorage.getItem("themeStorage")?.theme || "sunset",
      setTheme: (theme) => {
        set({ theme });
        localStorage.setItem("themeStorage", JSON.stringify({ theme }));
      },
    }),
    {
      name: "themeStorage",
      getStorage: () => localStorage,
    }
  )
);
