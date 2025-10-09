import { createContext, useContext, useState, useEffect } from "react";
import colorsConfig from "../config/colors.json";
import fontsConfig from "../config/fonts.json";
import themesConfig from "../config/themes.json";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [colorPalette, setColorPalette] = useState(() => {
    const saved = localStorage.getItem("portfolio-color");
    return saved ? JSON.parse(saved) : colorsConfig.palettes[0];
  });

  const [font, setFont] = useState(() => {
    const saved = localStorage.getItem("portfolio-font");
    if (saved) return JSON.parse(saved);
    // Police Retro par défaut
    const retroFont = fontsConfig.fonts.find(f => f.id === "retro");
    return retroFont || fontsConfig.fonts[0];
  });

  const [background, setBackground] = useState(() => {
    const saved = localStorage.getItem("portfolio-background");
    return saved || "mesh";
  });

  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("portfolio-mode");
    // Mode sombre par défaut
    return saved || "dark";
  });

  const [glassEffect, setGlassEffect] = useState(() => {
    const saved = localStorage.getItem("portfolio-glass");
    return saved === "true" || saved === null;
  });

  // Sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem("portfolio-color", JSON.stringify(colorPalette));
    localStorage.setItem("portfolio-font", JSON.stringify(font));
    localStorage.setItem("portfolio-background", background);
    localStorage.setItem("portfolio-mode", mode);
    localStorage.setItem("portfolio-glass", glassEffect);
  }, [colorPalette, font, background, mode, glassEffect]);

  // Appliquer le thème au DOM (variables CSS uniquement)
  useEffect(() => {
    const root = document.documentElement;
    const colors = mode === "dark" ? {
      primary: colorPalette.colors.primary,
      secondary: colorPalette.colors.secondary,
      accent: colorPalette.colors.accent,
      bg: colorPalette.colors.bgDark,
      text: colorPalette.colors.textDark
    } : colorPalette.colors;

    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty("--color-bg", colors.bg);
    root.style.setProperty("--color-text", colors.text);
    root.style.setProperty("--font-heading", font.heading);
    root.style.setProperty("--font-body", font.body);
    root.style.setProperty("--glass-effect", glassEffect ? "1" : "0");
    
    // Appliquer aussi la couleur de fond au body pour le mode
    document.body.style.backgroundColor = colors.bg;
  }, [colorPalette, font, mode, glassEffect]);

  // Charger la police dynamiquement
  useEffect(() => {
    const link = document.getElementById("dynamic-font");
    if (link) {
      link.href = font.url;
    } else {
      const newLink = document.createElement("link");
      newLink.id = "dynamic-font";
      newLink.rel = "stylesheet";
      newLink.href = font.url;
      document.head.appendChild(newLink);
    }
  }, [font]);

  const resetTheme = () => {
    setColorPalette(colorsConfig.palettes[0]);
    const retroFont = fontsConfig.fonts.find(f => f.id === "retro");
    setFont(retroFont || fontsConfig.fonts[0]);
    setBackground("mesh");
    setMode("dark");
    setGlassEffect(true);
  };

  const value = {
    theme: colorPalette,
    colorPalette,
    setColorPalette,
    font,
    setFont,
    background,
    setBackground,
    mode,
    setMode,
    glassEffect,
    setGlassEffect,
    resetTheme,
    colorsConfig,
    fontsConfig,
    themesConfig
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme doit être utilisé dans ThemeProvider");
  }
  return context;
}