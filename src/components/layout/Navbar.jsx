import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../../context/theme";
import profile from "../../data/profile.json";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Compétences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "Expérience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { mode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("accueil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
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
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65%", threshold: [0.01, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="section-shell flex h-[72px] items-center justify-between gap-4" aria-label="Navigation principale">
        <a href="#accueil" className="group inline-flex items-center gap-2.5" aria-label="Jules Dimitri — Accueil">
          <span className="logo-mark" aria-hidden="true">&lt;JD/&gt;</span>
          <span className="hidden text-sm font-extrabold tracking-[0.15em] text-ink sm:block">DIMITRI</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const id = link.href.slice(1);
            return (
              <a key={link.href} href={link.href} className={`nav-link ${active === id ? "is-active" : ""}`}>
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={mode === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
            title={mode === "dark" ? "Thème clair" : "Thème sombre"}
          >
            {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href={profile.cv} download className="button-secondary hidden min-h-10 px-4 text-xs sm:inline-flex">
            Télécharger CV
            <Download size={15} />
          </a>
          <button
            type="button"
            className="icon-button lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <Motion.div
            id="menu-mobile"
            className="mobile-menu lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="section-shell flex flex-col gap-1 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`mobile-link ${active === link.href.slice(1) ? "is-active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href={profile.cv} download className="button-primary mt-3">
                Télécharger mon CV
                <Download size={17} />
              </a>
            </div>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
