import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "Projets", href: "#projets" },
  { label: "Compétences", href: "#competences" },
  { label: "Expérience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shrink / blur header on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/70 shadow backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo / Title */}
        <a href="#accueil" className="text-lg font-bold text-emerald-600 md:text-xl">
          Mon&nbsp;Portfolio
        </a>

        {/* Desktop nav */}
        <ul className="hidden gap-6 text-sm font-medium text-gray-700 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative transition-colors hover:text-emerald-600"
              >
                {link.label}
                {/* Underline on hover */}
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-emerald-500 transition-all hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex items-center md:hidden"
          aria-label="Toggle navigation"
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-white/90 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col items-center gap-6 py-6 text-base font-medium text-gray-700">
              {links.map((link) => (
                <li key={link.href} onClick={() => setOpen(false)}>
                  <a href={link.href} className="transition-colors hover:text-emerald-600">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}