import { motion } from "framer-motion";
import { Server, LayoutPanelTop, Code, Database, Zap } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import competencesData from "../data/competences.json";

// Map des icônes
const iconMap = {
  Server,
  LayoutPanelTop,
  Code,
  Database,
  Zap
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" }
  })
};

// Barre de progression circulaire
function CircularProgress({ niveau, color, mode }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (niveau / 100) * circumference;

  return (
    <svg className="h-32 w-32" viewBox="0 0 100 100">
      {/* Cercle de fond */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
        strokeWidth="8"
      />
      {/* Cercle de progression */}
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ transformOrigin: "50% 50%", transform: "rotate(-90deg)" }}
      />
      {/* Pourcentage au centre */}
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-2xl font-bold"
        fill={color}
      >
        {niveau}%
      </text>
    </svg>
  );
}

export default function Competences() {
  const { theme, mode, glassEffect } = useTheme();

  return (
    <section
      id="competences"
      className="relative isolate overflow-hidden py-24"
    >
      {/* CORRECTION: Suppression du background qui cachait le fond d'écran */}

      {/* Décor */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="pointer-events-none absolute left-10 top-32 h-80 w-80 rounded-full opacity-10 blur-3xl"
        style={{ background: theme.colors.secondary }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <Zap className="h-8 w-8" style={{ color: theme.colors.primary }} />
            {/* CORRECTION: Titre avec couleur solide */}
            <h2
              className="text-4xl font-extrabold md:text-5xl"
              style={{
                color: mode === "dark" ? theme.colors.textDark : theme.colors.text
              }}
            >
              Compétences Techniques
            </h2>
          </div>
          <p
            className="mx-auto max-w-2xl text-base md:text-lg"
            style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
          >
            Un aperçu de mes domaines d'expertise en développement full‑stack
          </p>
        </motion.div>

        {/* Par catégorie */}
        {competencesData.map((bloc, idx) => (
          <div key={idx} className="mb-20">
            {/* Titre catégorie */}
            <motion.h3
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-10 flex items-center gap-3 text-2xl font-bold md:text-3xl"
              style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
            >
              <span
                className="block h-1 w-12 rounded-full"
                style={{ background: theme.colors.primary }}
              />
              {bloc.categorie}
            </motion.h3>

            {/* Grille de cartes */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {bloc.elements.map((item, i) => {
                const Icon = iconMap[item.icon] || Code;
                return (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ scale: 1.03, rotateY: 5 }}
                    className="group relative overflow-hidden rounded-3xl p-8 shadow-xl"
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
                        background: `radial-gradient(circle at top left, ${theme.colors.primary}20, transparent)`
                      }}
                    />

                    <div className="relative z-10">
                      {/* Icône + Niveau */}
                      <div className="mb-6 flex items-start justify-between">
                        <div
                          className="flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                          }}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>

                        {/* Niveau en cercle */}
                        {item.niveau && (
                          <div className="flex flex-col items-center">
                            <CircularProgress niveau={item.niveau} color={theme.colors.primary} mode={mode} />
                          </div>
                        )}
                      </div>

                      {/* Titre */}
                      <h4
                        className="mb-3 text-lg font-bold"
                        style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
                      >
                        {item.titre}
                      </h4>

                      {/* Description */}
                      <p
                        className="text-sm leading-relaxed"
                        style={{ 
                          color: mode === "dark" 
                            ? `${theme.colors.textDark}cc` 
                            : `${theme.colors.text}cc`
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}