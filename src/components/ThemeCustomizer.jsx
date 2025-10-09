import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, Sun, Moon, Sparkles, RotateCcw } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
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
    themesConfig 
  } = useTheme();

  const backgrounds = themesConfig?.backgrounds || [
    { id: "mesh", name: "Mesh Gradient" },
    { id: "particles", name: "Particules" },
    { id: "waves", name: "Vagues" },
    { id: "static", name: "Statique" }
  ];

  return (
    <>
      {/* Bouton flottant - CORRECTION: z-index réduit pour ne pas gêner */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all"
        style={{ 
          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` 
        }}
        aria-label="Ouvrir le personnalisateur de thème"
      >
        <Palette className="h-6 w-6 text-white" />
      </motion.button>

      {/* Panneau drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay - CORRECTION: z-index ajusté */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm"
            />

            {/* Panel - CORRECTION: z-index ajusté pour rester sous le header */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-[999] h-full w-full max-w-md overflow-y-auto shadow-2xl sm:w-96"
              style={{ 
                background: mode === "dark" ? theme.colors.bgDark : "white"
              }}
            >
              {/* Header - CORRECTION: sticky avec bon z-index */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b p-6"
                style={{
                  borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                  background: mode === "dark" ? theme.colors.bgDark : "white"
                }}
              >
                <h2 className="text-xl font-bold" style={{ color: theme.colors.primary }}>
                  Personnaliser
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 transition-colors hover:bg-gray-100"
                  style={{
                    color: mode === "dark" ? theme.colors.textDark : theme.colors.text
                  }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-8 p-6">
                {/* Mode Clair/Sombre */}
                <div>
                  <label className="mb-3 block text-sm font-semibold" style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}>
                    Mode
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: "light", icon: Sun, label: "Clair" },
                      { value: "dark", icon: Moon, label: "Sombre" }
                    ].map(({ value, icon: Icon, label }) => (
                      <button
                        key={value}
                        onClick={() => setMode(value)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl p-3 transition-all"
                        style={{
                          background: mode === value ? theme.colors.primary : mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                          color: mode === value ? "white" : mode === "dark" ? theme.colors.textDark : theme.colors.text
                        }}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thèmes */}
                <div>
                  <label className="mb-3 block text-sm font-semibold" style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}>
                    Palette de couleurs
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {colorsConfig.palettes.map((palette) => (
                      <button
                        key={palette.id}
                        onClick={() => setColorPalette(palette)}
                        className="group relative overflow-hidden rounded-xl p-4 transition-all"
                        style={{
                          background: `linear-gradient(135deg, ${palette.colors.primary}, ${palette.colors.secondary})`,
                          transform: colorPalette.id === palette.id ? "scale(1.05)" : "scale(1)",
                          boxShadow: colorPalette.id === palette.id ? "0 8px 20px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.1)"
                        }}
                      >
                        <span className="relative z-10 text-sm font-semibold text-white">
                          {palette.name}
                        </span>
                        {colorPalette.id === palette.id && (
                          <motion.div
                            layoutId="activeTheme"
                            className="absolute inset-0 ring-4 ring-white/50 rounded-xl"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Polices */}
                <div>
                  <label className="mb-3 block text-sm font-semibold" style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}>
                    Police
                  </label>
                  <div className="space-y-2">
                    {fontsConfig.fonts.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFont(f)}
                        className="w-full rounded-xl p-3 text-left transition-all"
                        style={{
                          background: font.id === f.id ? theme.colors.primary : mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                          color: font.id === f.id ? "white" : mode === "dark" ? theme.colors.textDark : theme.colors.text
                        }}
                      >
                        <span className="text-sm font-medium">{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background */}
                <div>
                  <label className="mb-3 block text-sm font-semibold" style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}>
                    Fond d'écran
                  </label>
                  <div className="space-y-2">
                    {themesConfig.backgrounds.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => setBackground(bg.id)}
                        className="w-full rounded-xl p-3 text-left transition-all"
                        style={{
                          background: background === bg.id ? theme.colors.primary : mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                          color: background === bg.id ? "white" : mode === "dark" ? theme.colors.textDark : theme.colors.text
                        }}
                      >
                        <span className="text-sm font-medium">{bg.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Effet de verre */}
                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}>
                      Effet Glassmorphism
                    </span>
                    <button
                      onClick={() => setGlassEffect(!glassEffect)}
                      className="relative h-6 w-11 rounded-full transition-colors"
                      style={{ background: glassEffect ? theme.colors.primary : mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)" }}
                    >
                      <motion.span
                        animate={{ x: glassEffect ? 20 : 2 }}
                        className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-md"
                      />
                    </button>
                  </label>
                </div>

                {/* Reset */}
                <button
                  onClick={resetTheme}
                  className="flex w-full items-center justify-center gap-2 rounded-xl p-3 transition-all hover:opacity-80"
                  style={{ background: theme.colors.primary, color: "white" }}
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="text-sm font-medium">Réinitialiser</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}