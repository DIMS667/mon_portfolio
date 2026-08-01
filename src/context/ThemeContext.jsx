import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./theme";

const THEME_KEY = "portfolio-theme";

function getInitialMode() {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(THEME_KEY) || localStorage.getItem("portfolio-mode");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Le thème système reste disponible si le stockage est désactivé.
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = mode === "dark";
    root.classList.toggle("dark", isDark);
    root.dataset.theme = mode;
    root.style.colorScheme = mode;

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    themeMeta?.setAttribute("content", isDark ? "#030712" : "#f4f7fb");

    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch {
      // Le site reste utilisable sans stockage local.
    }
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleTheme: () => setMode((current) => (current === "dark" ? "light" : "dark")),
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
