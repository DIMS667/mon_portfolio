import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, Folder, Code2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import projetsData from "../data/projets.json";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5, 
      delay: i * 0.1,
      ease: [0.6, 0.05, 0.01, 0.9]
    }
  })
};

export default function Projets() {
  const { theme, mode, glassEffect } = useTheme();
  const [filter, setFilter] = useState("all");

  // Extraire les tags uniques
  const allTags = [...new Set(projetsData.flatMap(p => p.tags))];
  
  // Filtrer les projets
  const filteredProjects = filter === "all" 
    ? projetsData 
    : projetsData.filter(p => p.tags.includes(filter));

  return (
    <section
      id="projets"
      className="relative isolate overflow-hidden px-6 py-24"
    >
      {/* CORRECTION: Suppression du background qui cachait le fond d'écran */}

      {/* Décor animé */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: theme.colors.primary }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Titre avec icône */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <Code2 className="h-8 w-8" style={{ color: theme.colors.primary }} />
            {/* CORRECTION: Titre avec couleur solide au lieu de gradient transparent */}
            <h2
              className="text-4xl font-extrabold md:text-5xl"
              style={{
                color: mode === "dark" ? theme.colors.textDark : theme.colors.text
              }}
            >
              Mes Projets
            </h2>
          </div>
          <p
            className="mx-auto max-w-2xl text-base md:text-lg"
            style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
          >
            Une sélection de projets qui reflètent mes compétences et ma passion pour le développement
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={() => setFilter("all")}
            className="rounded-full px-6 py-2 text-sm font-semibold transition-all"
            style={{
              background: filter === "all" 
                ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                : glassEffect
                ? "rgba(255,255,255,0.1)"
                : mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              color: filter === "all" ? "white" : theme.colors.primary,
              backdropFilter: glassEffect && filter !== "all" ? "blur(10px)" : "none"
            }}
          >
            Tous
          </button>
          {allTags.slice(0, 5).map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className="rounded-full px-6 py-2 text-sm font-semibold transition-all"
              style={{
                background: filter === tag
                  ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                  : glassEffect
                  ? "rgba(255,255,255,0.1)"
                  : mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                color: filter === tag ? "white" : theme.colors.primary,
                backdropFilter: glassEffect && filter !== tag ? "blur(10px)" : "none"
              }}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Grille de projets */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((projet, i) => (
            <motion.div
              key={projet.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl"
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
              {/* Badge Featured */}
              {projet.featured && (
                <div
                  className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    color: "white"
                  }}
                >
                  <Star className="h-3 w-3 fill-current" />
                  Featured
                </div>
              )}

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.secondary}15)`
                }}
              />

              {/* Contenu */}
              <div className="relative z-10 flex h-full flex-col p-6">
                {/* Icône */}
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.secondary}20)`
                  }}
                >
                  <Folder className="h-7 w-7" style={{ color: theme.colors.primary }} />
                </div>

                {/* Titre */}
                <h3
                  className="mb-3 text-xl font-bold"
                  style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
                >
                  {projet.titre}
                </h3>

                {/* Description */}
                <p
                  className="mb-6 text-sm leading-relaxed"
                  style={{ 
                    color: mode === "dark" 
                      ? `${theme.colors.textDark}cc` 
                      : `${theme.colors.text}cc`
                  }}
                >
                  {projet.description}
                </p>

                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {projet.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        background: `${theme.colors.primary}15`,
                        color: theme.colors.primary
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Lien */}
                <a
                  href={projet.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
                  style={{ color: theme.colors.primary }}
                >
                  <Github className="h-5 w-5" />
                  Voir sur GitHub
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Border glow effect */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow: `0 0 30px ${theme.colors.primary}40`
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Message si aucun projet */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p
              className="text-lg"
              style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
            >
              Aucun projet trouvé pour ce filtre
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}