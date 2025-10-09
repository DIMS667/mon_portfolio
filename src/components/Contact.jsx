import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone, Github, Linkedin, Twitter, Send, MapPin } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import contactData from "../data/contact.json";

const iconMap = {
  Mail,
  MessageCircle,
  Phone,
  Github,
  Linkedin,
  Twitter
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 }
  })
};

export default function Contact() {
  const { theme, mode, glassEffect } = useTheme();

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden px-6 py-24"
    >
      {/* CORRECTION: Suppression du background qui cachait le fond d'écran */}

      {/* Décor */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 30, repeat: Infinity }}
        className="pointer-events-none absolute right-10 top-20 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: theme.colors.accent }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <Send className="h-8 w-8" style={{ color: theme.colors.primary }} />
            {/* CORRECTION: Titre avec couleur solide */}
            <h2
              className="text-4xl font-extrabold md:text-5xl"
              style={{
                color: mode === "dark" ? theme.colors.textDark : theme.colors.text
              }}
            >
              Contact & Réseaux
            </h2>
          </div>
          <p
            className="mx-auto max-w-2xl text-base md:text-lg"
            style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
          >
            {contactData.disponibilite}
          </p>
        </motion.div>

        {/* Info principale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 rounded-3xl p-8 text-center shadow-2xl"
          style={{
            background: glassEffect
              ? "rgba(255,255,255,0.1)"
              : mode === "dark"
              ? "rgba(255,255,255,0.05)"
              : "white",
            backdropFilter: glassEffect ? "blur(20px)" : "none",
            border: `2px solid ${theme.colors.primary}30`
          }}
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5" style={{ color: theme.colors.primary }} />
            <span
              className="text-lg font-semibold"
              style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
            >
              {contactData.location}
            </span>
          </div>
          <p
            className="text-sm"
            style={{ color: mode === "dark" ? `${theme.colors.textDark}aa` : `${theme.colors.text}aa` }}
          >
            N'hésitez pas à me contacter pour une collaboration, un projet ou toute autre demande professionnelle
          </p>
        </motion.div>

        {/* Méthodes de contact */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactData.methodes_contact.map((method, i) => {
            const Icon = iconMap[method.icon] || Mail;
            return (
              <motion.a
                key={method.id}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group relative overflow-hidden rounded-3xl p-6 shadow-xl"
                style={{
                  background: glassEffect
                    ? "rgba(255,255,255,0.1)"
                    : mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "white",
                  backdropFilter: glassEffect ? "blur(20px)" : "none",
                  border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`
                }}
              >
                {/* Glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at center, ${method.color}20, transparent)`
                  }}
                />

                <div className="relative z-10 flex items-center gap-4">
                  {/* Icône */}
                  <div
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: `${method.color}20`
                    }}
                  >
                    <Icon className="h-7 w-7" style={{ color: method.color }} />
                  </div>

                  {/* Texte */}
                  <div className="flex-1">
                    <p
                      className="mb-1 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: method.color }}
                    >
                      {method.label}
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
                    >
                      {method.value}
                    </p>
                  </div>
                </div>

                {/* Border glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow: `0 0 30px ${method.color}40`
                  }}
                />
              </motion.a>
            );
          })}
        </div>

        {/* Réseaux sociaux */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p
            className="mb-6 text-sm font-semibold uppercase tracking-wider"
            style={{ color: theme.colors.primary }}
          >
            Suivez-moi
          </p>
          <div className="flex justify-center gap-4">
            {contactData.reseaux.map((reseau, i) => {
              const Icon = iconMap[reseau.icon] || Github;
              return (
                <motion.a
                  key={reseau.id}
                  href={reseau.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all"
                  style={{
                    background: glassEffect
                      ? "rgba(255,255,255,0.1)"
                      : mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                    backdropFilter: glassEffect ? "blur(10px)" : "none"
                  }}
                  aria-label={reseau.nom}
                >
                  <Icon className="h-6 w-6" style={{ color: theme.colors.primary }} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p
            className="text-sm"
            style={{ color: mode === "dark" ? `${theme.colors.textDark}77` : `${theme.colors.text}77` }}
          >
            Conçu et développé par moi , Tonye Nwalal Jules Dimitri
          </p>
          <p
            className="mt-2 text-xs"
            style={{ color: mode === "dark" ? `${theme.colors.textDark}55` : `${theme.colors.text}55` }}
          >
            © 2025 - Tous droits réservés
          </p>
        </motion.div>
      </div>
    </section>
  );
}