import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink, Award } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import certificationsData from "../data/certifications.json";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" }
  })
};

export default function Certifications() {
  const { theme, mode, glassEffect } = useTheme();

  return (
    <section
      id="certifications"
      className="relative isolate overflow-hidden px-6 py-24"
    >
      {/* CORRECTION: Suppression du background qui cachait le fond d'écran */}

      {/* Décor animé */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="pointer-events-none absolute left-10 bottom-20 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: theme.colors.secondary }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <Award className="h-8 w-8" style={{ color: theme.colors.primary }} />
            {/* CORRECTION: Titre avec couleur solide */}
            <h2
              className="text-4xl font-extrabold md:text-5xl"
              style={{
                color: mode === "dark" ? theme.colors.textDark : theme.colors.text
              }}
            >
              Certifications
            </h2>
          </div>
          <p
            className="mx-auto max-w-2xl text-base md:text-lg"
            style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
          >
            Mes formations et certifications professionnelles
          </p>
        </motion.div>

        {/* Grille */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {certificationsData.map((cert, i) => (
            <motion.div
              key={cert.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, rotateY: 5 }}
              className="group relative overflow-hidden rounded-3xl p-6 shadow-xl"
              style={{
                background: glassEffect
                  ? "rgba(255,255,255,0.1)"
                  : mode === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "white",
                backdropFilter: glassEffect ? "blur(20px)" : "none",
                border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                perspective: 1000
              }}
            >
              {/* Glow effect */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at top right, ${theme.colors.primary}20, transparent)`
                }}
              />

              <div className="relative z-10">
                {/* Badge catégorie */}
                <div
                  className="mb-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    background: `${theme.colors.primary}20`,
                    color: theme.colors.primary
                  }}
                >
                  {cert.categorie}
                </div>

                {/* Icône */}
                <div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                  }}
                >
                  <BadgeCheck className="h-8 w-8 text-white" />
                </div>

                {/* Titre */}
                <h3
                  className="mb-2 text-xl font-bold"
                  style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
                >
                  {cert.titre}
                </h3>

                {/* Organisme */}
                <p
                  className="mb-1 text-sm font-semibold"
                  style={{ color: theme.colors.primary }}
                >
                  {cert.organisme}
                </p>

                {/* Date */}
                {cert.date && (
                  <p
                    className="mb-6 text-xs"
                    style={{ color: mode === "dark" ? `${theme.colors.textDark}99` : `${theme.colors.text}99` }}
                  >
                    {cert.date}
                  </p>
                )}

                {/* Lien */}
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                    style={{ color: theme.colors.primary }}
                  >
                    Voir le certificat
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>

              {/* Border glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow: `0 0 30px ${theme.colors.primary}40`
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}