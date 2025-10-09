import { useState, useEffect } from "react";
import { Menu, X, Code2, Eye, EyeOff } from "lucide-react";
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

  // CORRECTION: Couleurs dynamiques basées sur le thème choisi
  const bgColor = scrolled 
    ? glassEffect
      ? mode === "dark" 
        ? `${theme.colors.bgDark}cc` 
        : `${theme.colors.bg}cc`
      : mode === "dark"
      ? `${theme.colors.bgDark}ee`
      : `${theme.colors.bg}ee`
    : "transparent";
  
  const textColor = mode === "dark" ? theme.colors.textDark : theme.colors.text;
  
  const mobileBg = glassEffect
    ? mode === "dark" 
      ? `${theme.colors.bgDark}f0` 
      : `${theme.colors.bg}f0`
    : mode === "dark"
    ? `${theme.colors.bgDark}f5`
    : `${theme.colors.bg}f5`;

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
            ? mode === "dark"
              ? "rgba(255,255,255,0.1)"
              : "rgba(255,255,255,0.8)"
            : mode === "dark"
            ? theme.colors.bgDark
            : theme.colors.bg,
          backdropFilter: glassEffect ? "blur(12px)" : "none",
          color: theme.colors.primary,
          border: `2px solid ${theme.colors.primary}40`
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
        backdropFilter: scrolled && glassEffect ? "blur(16px)" : "none",
        boxShadow: scrolled ? `0 4px 24px ${theme.colors.primary}20` : "none",
        borderBottom: scrolled ? `1px solid ${theme.colors.primary}30` : "none"
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
          {/* CORRECTION: Texte visible avec couleur solide */}
          <span 
            className="hidden sm:inline"
            style={{ color: theme.colors.primary }}
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
                  className="relative group transition-colors hover:opacity-80"
                  style={{ color: textColor }}
                >
                  {link.label}
                  {/* Underline animation avec couleur du thème */}
                  <span
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
          className="flex items-center md:hidden transition-colors"
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
              backdropFilter: glassEffect ? "blur(16px)" : "none",
              borderBottom: `1px solid ${theme.colors.primary}30`
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
                    className="transition-all hover:scale-110"
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