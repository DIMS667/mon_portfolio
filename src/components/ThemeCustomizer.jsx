import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Moon, Palette, RotateCcw, Sun, X } from "lucide-react";
import { useTheme } from "../context/theme";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const {
    theme,
    colorPalette,
    setColorPalette,
    font,
    setFont,
    mode,
    setMode,
    background,
    setBackground,
    glassEffect,
    setGlassEffect,
    resetTheme,
    colorsConfig,
    fontsConfig,
    themesConfig,
  } = useTheme();

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusableElements = [...panelRef.current.querySelectorAll(focusableSelector)];
      if (!focusableElements.length) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const textColor = mode === "dark" ? theme.colors.textDark : theme.colors.text;
  const pageBackground = mode === "dark" ? theme.colors.bgDark : theme.colors.bg;
  const inactiveBackground = mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)";
  const backgrounds = themesConfig.backgrounds;

  return (
    <>
      <Motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-2xl shadow-xl sm:flex"
        style={{
          color: theme.colors.onPrimary,
          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
        }}
        aria-label="Ouvrir les réglages d'apparence"
        aria-haspopup="dialog"
      >
        <Palette className="h-5 w-5" aria-hidden="true" />
      </Motion.button>

      <AnimatePresence>
        {open && (
          <>
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[998] bg-slate-950/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            <Motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="appearance-title"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed right-0 top-0 z-[999] h-full w-full max-w-sm overflow-y-auto shadow-2xl"
              style={{ background: pageBackground, color: textColor }}
            >
              <div
                className="sticky top-0 z-10 flex items-center justify-between border-b px-5 py-4"
                style={{ background: `${pageBackground}f5`, borderColor: `${theme.colors.primary}26` }}
              >
                <div>
                  <p id="appearance-title" className="text-lg font-extrabold">
                    Apparence
                  </p>
                  <p className="text-xs opacity-70">Personnalisez votre expérience</p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: inactiveBackground }}
                  aria-label="Fermer les réglages d'apparence"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-8 p-5">
                <section aria-labelledby="mode-title" className="!p-0">
                  <h3 id="mode-title" className="mb-3 text-sm font-extrabold">
                    Mode d'affichage
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "light", icon: Sun, label: "Clair" },
                      { value: "dark", icon: Moon, label: "Sombre" },
                    ].map((item) => {
                      const isActive = mode === item.value;
                      const ModeIcon = item.icon;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setMode(item.value)}
                          aria-pressed={isActive}
                          className="flex min-h-11 items-center justify-center gap-2 rounded-xl p-3 text-sm font-bold"
                          style={{
                            background: isActive ? theme.colors.primary : inactiveBackground,
                            color: isActive ? theme.colors.onPrimary : textColor,
                          }}
                        >
                          <ModeIcon className="h-4 w-4" aria-hidden="true" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section aria-labelledby="palette-title" className="!p-0">
                  <h3 id="palette-title" className="mb-3 text-sm font-extrabold">
                    Palette de couleurs
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {colorsConfig.palettes.map((palette) => {
                      const isActive = colorPalette.id === palette.id;
                      return (
                        <button
                          key={palette.id}
                          type="button"
                          onClick={() => setColorPalette(palette)}
                          aria-pressed={isActive}
                          className="relative min-h-16 overflow-hidden rounded-xl p-3 text-left"
                          style={{
                            background: `linear-gradient(135deg, ${palette.colors.primary}, ${palette.colors.secondary})`,
                            outline: isActive ? "3px solid currentColor" : "none",
                            outlineOffset: "2px",
                            color: textColor,
                          }}
                        >
                          <span className="relative z-10 inline-block rounded-lg bg-slate-950/65 px-2 py-1 text-xs font-extrabold text-white">
                            {palette.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section aria-labelledby="font-title" className="!p-0">
                  <h3 id="font-title" className="mb-3 text-sm font-extrabold">
                    Typographie
                  </h3>
                  <div className="grid gap-2">
                    {fontsConfig.fonts.map((item) => {
                      const isActive = font.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFont(item)}
                          aria-pressed={isActive}
                          className="min-h-11 rounded-xl px-4 py-3 text-left text-sm font-bold"
                          style={{
                            background: isActive ? theme.colors.primary : inactiveBackground,
                            color: isActive ? theme.colors.onPrimary : textColor,
                            fontFamily: item.body,
                          }}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section aria-labelledby="background-title" className="!p-0">
                  <h3 id="background-title" className="mb-3 text-sm font-extrabold">
                    Arrière-plan
                  </h3>
                  <div className="grid gap-2">
                    {backgrounds.map((item) => {
                      const isActive = background === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setBackground(item.id)}
                          aria-pressed={isActive}
                          className="min-h-11 rounded-xl px-4 py-3 text-left text-sm font-bold"
                          style={{
                            background: isActive ? theme.colors.primary : inactiveBackground,
                            color: isActive ? theme.colors.onPrimary : textColor,
                          }}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-extrabold">Effet de verre</p>
                    <p className="text-xs opacity-70">Transparence des cartes</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={glassEffect}
                    onClick={() => setGlassEffect((current) => !current)}
                    className="relative h-7 w-12 shrink-0 rounded-full"
                    style={{ background: glassEffect ? theme.colors.primary : inactiveBackground }}
                    aria-label="Activer l'effet de verre"
                  >
                    <Motion.span
                      animate={{ x: glassEffect ? 24 : 4 }}
                      className="absolute left-0 top-1 h-5 w-5 rounded-full shadow"
                      style={{ background: glassEffect ? theme.colors.onPrimary : textColor }}
                    />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={resetTheme}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl p-3 text-sm font-bold"
                  style={{ color: textColor, background: inactiveBackground }}
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Rétablir l'apparence par défaut
                </button>
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
