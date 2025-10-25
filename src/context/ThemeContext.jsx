import { createContext, useContext, useState, useEffect } from "react";
import colorsConfig from "../config/colors.json";
import fontsConfig from "../config/fonts.json";
import themesConfig from "../config/themes.json";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Vérifier que les configs sont chargées
  useEffect(() => {
    console.log("🎨 Theme Config Loaded:", {
      colors: colorsConfig.palettes?.length || 0,
      fonts: fontsConfig.fonts?.length || 0,
      backgrounds: themesConfig.backgrounds?.length || 0
    });
  }, []);

  // CONFIGURATION PAR DÉFAUT: Midnight Purple
  const getDefaultColorPalette = () => {
    try {
      const saved = localStorage.getItem("portfolio-color");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Error reading color from localStorage", e);
    }
    // Trouver Midnight Purple dans la config
    const midnightPurple = colorsConfig.palettes.find(p => p.id === "midnight");
    return midnightPurple || colorsConfig.palettes[0];
  };

  // CONFIGURATION PAR DÉFAUT: Police Retro
  const getDefaultFont = () => {
    try {
      const saved = localStorage.getItem("portfolio-font");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Error reading font from localStorage", e);
    }
    // Trouver la police Retro
    const retroFont = fontsConfig.fonts.find(f => f.id === "retro");
    return retroFont || fontsConfig.fonts[0];
  };

  // CONFIGURATION PAR DÉFAUT: Grille Cyber
  const getDefaultBackground = () => {
    try {
      const saved = localStorage.getItem("portfolio-background");
      if (saved) return saved;
    } catch (e) {
      console.warn("Error reading background from localStorage", e);
    }
    return "grid"; // "grid" = Grille Cyber
  };

  // CONFIGURATION PAR DÉFAUT: Mode Sombre
  const getDefaultMode = () => {
    try {
      const saved = localStorage.getItem("portfolio-mode");
      if (saved) return saved;
    } catch (e) {
      console.warn("Error reading mode from localStorage", e);
    }
    return "dark";
  };

  const [colorPalette, setColorPalette] = useState(() => getDefaultColorPalette());
  const [font, setFont] = useState(() => getDefaultFont());
  const [background, setBackground] = useState(() => getDefaultBackground());
  const [mode, setMode] = useState(() => getDefaultMode());

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
    
    // Appliquer la couleur de fond au body
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
    // Réinitialiser avec le thème Cyber par défaut
    const midnightPurple = colorsConfig.palettes.find(p => p.id === "midnight");
    const retroFont = fontsConfig.fonts.find(f => f.id === "retro");
    
    setColorPalette(midnightPurple || colorsConfig.palettes[0]);
    setFont(retroFont || fontsConfig.fonts[0]);
    setBackground("grid");
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