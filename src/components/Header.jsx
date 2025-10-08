import { useState, useEffect } from "react";
import { Menu, X, Code2, Eye, EyeOff, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "Projets", href: "#projets" },
  { label: "Compétences", href: "#competences" },
  { label: "Expérience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showcaseMode, setShowcaseMode] = useState(false);
  const { theme, mode, glassEffect } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Couleurs dynamiques
  const bgColor = scrolled 
    ? mode === "dark" 
      ? "rgba(15,23,42,0.8)" 
      : "rgba(255,255,255,0.8)"
    : "transparent";
  
  const textColor = mode === "dark" ? theme.colors.textDark : theme.colors.text;
  const mobileBg = mode === "dark" 
    ? "rgba(15,23,42,0.95)" 
    : "rgba(255,255,255,0.95)";

  // Si showcase mode, afficher seulement le bouton de retour
  if (showcaseMode) {
    return (
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setShowcaseMode(false)}
        className="fixed right-6 top-6 z-50 flex items-center gap-2 rounded-full px-5 py-3 font-semibold shadow-2xl transition-all hover:scale-105"
        style={{
          background: glassEffect
            ? "rgba(255,255,255,0.1)"
            : mode === "dark"
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.9)",
          backdropFilter: glassEffect ? "blur(12px)" : "none",
          color: theme.colors.primary,
          border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`
        }}
      >
        <Eye className="h-5 w-5" />
        <span className="text-sm">Afficher la navigation</span>
      </motion.button>
    );
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: bgColor,
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? `0 4px 24px ${mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"}` : "none",
        borderBottom: scrolled ? `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}` : "none"
      }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo avec animation */}
        <motion.a
          href="#accueil"
          className="flex items-center gap-2 text-xl font-extrabold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ color: theme.colors.primary }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Code2 className="h-7 w-7" />
          </motion.div>
          <span className="hidden bg-gradient-to-r bg-clip-text text-transparent sm:inline"
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
            }}
          >
            Mon Portfolio
          </span>
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex gap-6 text-sm font-semibold">
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <a
                  href={link.href}
                  className="relative group transition-colors"
                  style={{ color: textColor }}
                >
                  {link.label}
                  {/* Underline animation */}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: theme.colors.primary }}
                  />
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Bouton Mode Showcase */}
          <motion.button
            onClick={() => setShowcaseMode(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
            }}
          >
            <EyeOff className="h-4 w-4" />
            <span className="hidden lg:inline">Showcase</span>
          </motion.button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center md:hidden"
          aria-label="Toggle navigation"
          style={{ color: textColor }}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden"
            style={{
              background: mobileBg,
              backdropFilter: "blur(16px)",
              borderBottom: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`
            }}
          >
            <ul className="flex flex-col items-center gap-6 py-8 text-base font-semibold">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setOpen(false)}
                >
                  <a
                    href={link.href}
                    className="transition-colors hover:scale-110"
                    style={{ color: textColor }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              
              {/* Bouton Showcase mobile */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  setShowcaseMode(true);
                  setOpen(false);
                }}
                className="mt-4 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                }}
              >
                <EyeOff className="h-4 w-4" />
                Mode Showcase
              </motion.button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}