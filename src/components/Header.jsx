import { useEffect, useState } from "react";
import { Menu, X, Code2 } from "lucide-react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useTheme } from "../context/theme";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "Projets", href: "#projets" },
  { label: "Compétences", href: "#competences" },
  { label: "Expérience", href: "#experience" },
  { label: "Formation", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const { theme, mode, glassEffect } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const pageBackground = mode === "dark" ? theme.colors.bgDark : theme.colors.bg;
  const textColor = mode === "dark" ? theme.colors.textDark : theme.colors.text;
  const headerBackground = scrolled
    ? glassEffect
      ? `${pageBackground}e8`
      : pageBackground
    : `${pageBackground}b8`;

  return (
    <Motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 24 }}
      className="fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300"
      style={{
        background: headerBackground,
        backdropFilter: glassEffect ? "blur(18px)" : "none",
        boxShadow: scrolled ? `0 10px 35px ${theme.colors.primary}14` : "none",
        borderBottom: `1px solid ${scrolled ? `${theme.colors.primary}30` : "transparent"}`,
      }}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
        aria-label="Navigation principale"
      >
        <Motion.a
          href="#accueil"
          className="flex min-w-0 items-center gap-2 font-extrabold"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          style={{ color: theme.colors.primary }}
          aria-label="Retour à l'accueil — Jules Dimitri"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: `${theme.colors.primary}18`,
              border: `1px solid ${theme.colors.primary}38`,
            }}
          >
            <Code2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden truncate text-base sm:inline">Jules Dimitri</span>
        </Motion.a>

        <ul className="hidden items-center gap-4 text-sm font-semibold md:flex lg:gap-6">
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative block rounded-md px-1 py-2 transition-colors"
                  style={{ color: isActive ? theme.colors.primary : textColor }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-1 bottom-0 h-0.5 origin-left rounded-full transition-transform ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{ background: theme.colors.primary }}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl md:hidden"
          aria-label={open ? "Fermer la navigation" : "Ouvrir la navigation"}
          aria-expanded={open}
          aria-controls="navigation-mobile"
          style={{
            color: textColor,
            background: `${theme.colors.primary}12`,
            border: `1px solid ${theme.colors.primary}30`,
          }}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <Motion.div
            id="navigation-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t md:hidden"
            style={{
              background: pageBackground,
              borderColor: `${theme.colors.primary}24`,
            }}
          >
            <ul className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
              {links.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 font-semibold"
                      style={{
                        color: isActive ? theme.colors.primary : textColor,
                        background: isActive ? `${theme.colors.primary}12` : "transparent",
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.header>
  );
}
