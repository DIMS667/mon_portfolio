import { useEffect, useMemo, useState } from "react";
import colorsConfig from "../config/colors.json";
import fontsConfig from "../config/fonts.json";
import themesConfig from "../config/themes.json";
import { ThemeContext } from "./theme";

const STORAGE_KEYS = {
  color: "portfolio-color",
  font: "portfolio-font",
  background: "portfolio-background",
  mode: "portfolio-mode",
  glass: "portfolio-glass",
};

function readStoredValue(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function getStoredOption(key, options, fallbackId) {
  const saved = readStoredValue(key);

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const storedId = typeof parsed === "string" ? parsed : parsed?.id;
      const matchingOption = options.find((option) => option.id === storedId);
      if (matchingOption) return matchingOption;
    } catch {
      // Une préférence obsolète ne doit jamais empêcher l'affichage du site.
    }
  }

  return options.find((option) => option.id === fallbackId) || options[0];
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized;

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`;
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const channels = [r, g, b].map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(first, second) {
  const firstLuminance = luminance(first);
  const secondLuminance = luminance(second);
  return (Math.max(firstLuminance, secondLuminance) + 0.05)
    / (Math.min(firstLuminance, secondLuminance) + 0.05);
}

function mixColors(color, target, amount) {
  const sourceRgb = hexToRgb(color);
  const targetRgb = hexToRgb(target);

  return rgbToHex({
    r: sourceRgb.r + (targetRgb.r - sourceRgb.r) * amount,
    g: sourceRgb.g + (targetRgb.g - sourceRgb.g) * amount,
    b: sourceRgb.b + (targetRgb.b - sourceRgb.b) * amount,
  });
}

function ensureContrast(color, background, targetRatio = 4.5) {
  if (contrastRatio(color, background) >= targetRatio) return color;

  const target = luminance(background) > 0.42 ? "#020617" : "#ffffff";
  for (let amount = 0.08; amount <= 1; amount += 0.04) {
    const candidate = mixColors(color, target, amount);
    if (contrastRatio(candidate, background) >= targetRatio) return candidate;
  }

  return target;
}

function getForeground(primary, secondary) {
  const candidates = ["#ffffff", "#020617"];
  return candidates.sort((first, second) => {
    const firstScore = Math.min(contrastRatio(first, primary), contrastRatio(first, secondary));
    const secondScore = Math.min(contrastRatio(second, primary), contrastRatio(second, secondary));
    return secondScore - firstScore;
  })[0];
}

export function ThemeProvider({ children }) {
  const [colorPalette, setColorPalette] = useState(() =>
    getStoredOption(STORAGE_KEYS.color, colorsConfig.palettes, "midnight"),
  );
  const [font, setFont] = useState(() =>
    getStoredOption(STORAGE_KEYS.font, fontsConfig.fonts, "modern"),
  );
  const [background, setBackground] = useState(
    () => readStoredValue(STORAGE_KEYS.background) || "mesh",
  );
  const [mode, setMode] = useState(
    () => readStoredValue(STORAGE_KEYS.mode) || "dark",
  );
  const [glassEffect, setGlassEffect] = useState(() => {
    const saved = readStoredValue(STORAGE_KEYS.glass);
    return saved === null ? true : saved === "true";
  });

  const theme = useMemo(() => {
    const colors = colorPalette.colors;
    const pageBackground = mode === "dark" ? colors.bgDark : colors.bg;
    const primary = ensureContrast(colors.primary, pageBackground);
    const secondary = ensureContrast(colors.secondary, pageBackground);
    const accent = ensureContrast(colors.accent, pageBackground, 3);

    return {
      ...colorPalette,
      colors: {
        ...colors,
        primary,
        secondary,
        accent,
        onPrimary: getForeground(primary, secondary),
      },
    };
  }, [colorPalette, mode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.color, JSON.stringify(colorPalette));
      localStorage.setItem(STORAGE_KEYS.font, JSON.stringify(font));
      localStorage.setItem(STORAGE_KEYS.background, background);
      localStorage.setItem(STORAGE_KEYS.mode, mode);
      localStorage.setItem(STORAGE_KEYS.glass, String(glassEffect));
    } catch {
      // Le thème reste utilisable même si le stockage est désactivé.
    }
  }, [colorPalette, font, background, mode, glassEffect]);

  useEffect(() => {
    const root = document.documentElement;
    const colors = theme.colors;
    const pageBackground = mode === "dark" ? colors.bgDark : colors.bg;
    const pageText = mode === "dark" ? colors.textDark : colors.text;

    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty("--color-on-primary", colors.onPrimary);
    root.style.setProperty("--color-bg", pageBackground);
    root.style.setProperty("--color-text", pageText);
    root.style.setProperty("--font-heading", `"${font.heading}", sans-serif`);
    root.style.setProperty("--font-body", `"${font.body}", sans-serif`);
    root.style.setProperty("--glass-effect", glassEffect ? "1" : "0");
    root.dataset.theme = mode;
    root.classList.toggle("dark", mode === "dark");
    document.body.style.backgroundColor = pageBackground;
  }, [theme, font, mode, glassEffect]);

  useEffect(() => {
    let link = document.getElementById("dynamic-font");
    if (!link) {
      link = document.createElement("link");
      link.id = "dynamic-font";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = font.url;
  }, [font]);

  const resetTheme = () => {
    setColorPalette(colorsConfig.palettes.find((palette) => palette.id === "midnight"));
    setFont(fontsConfig.fonts.find((item) => item.id === "modern"));
    setBackground("mesh");
    setMode("dark");
    setGlassEffect(true);
  };

  const value = {
    theme,
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
    themesConfig,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
