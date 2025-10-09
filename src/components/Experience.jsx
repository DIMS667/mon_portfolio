import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, Building2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import experiencesData from "../data/experiences.json";

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" }
  })
};

function TimelineDot({ isActive, isLeft }) {
  const { theme } = useTheme();
  
  return (
    <div className="relative flex h-6 w-6 items-center justify-center">
      {isActive && (
        <span
          className="absolute h-8 w-8 animate-ping rounded-full opacity-75"
          style={{ background: theme.colors.primary }}
        />
      )}
      <span
        className="relative h-5 w-5 rounded-full ring-4 ring-white shadow-lg"
        style={{ background: theme.colors.primary }}
      />
    </div>
  );
}

export default function Experience() {
  const { theme, mode, glassEffect } = useTheme();

  return (
    <section
      id="experience"
      className="relative isolate overflow-hidden px-6 py-24"
    >
      {/* CORRECTION: Suppression du background qui cachait le fond d'écran */}

      {/* Décor */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 30, repeat: Infinity }}
        className="pointer-events-none absolute -right-20 bottom-20 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: theme.colors.accent }}
      />

      <div className="mx-auto max-w-5xl">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <Briefcase className="h-8 w-8" style={{ color: theme.colors.primary }} />
            {/* CORRECTION: Titre avec couleur solide */}
            <h2
              className="text-4xl font-extrabold md:text-5xl"
              style={{
                color: mode === "dark" ? theme.colors.textDark : theme.colors.text
              }}
            >
              Expérience Professionnelle
            </h2>
          </div>
          <p
            className="mx-auto max-w-2xl text-base md:text-lg"
            style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
          >
            Mon parcours professionnel et les missions qui ont forgé mon expertise
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne verticale centrée */}
          <div
            className="absolute left-1/2 top-0 hidden h-full w-0.5 md:block -translate-x-1/2"
            style={{
              background: `linear-gradient(to bottom, ${theme.colors.primary}00, ${theme.colors.primary}, ${theme.colors.primary}00)`
            }}
          />

          {/* Expériences */}
          <div className="space-y-12">
            {experiencesData.map((exp, i) => {
              // Détermine si l'élément doit être à gauche ou à droite
              const isLeft = i % 2 === 0;
              
              return (
                <motion.div
                  key={exp.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative md:flex ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}
                >
                  {/* Dot sur la timeline */}
                  <div className="absolute left-1/2 top-8 hidden md:block -translate-x-1/2">
                    <TimelineDot isActive={exp.actuel} isLeft={isLeft} />
                  </div>

                  {/* Carte */}
                  <motion.div
                    whileHover={{ scale: 1.02, x: isLeft ? -10 : 10 }}
                    className="group relative overflow-hidden rounded-3xl p-8 shadow-xl md:w-5/12"
                    style={{
                      background: glassEffect
                        ? "rgba(255,255,255,0.1)"
                        : mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "white",
                      backdropFilter: glassEffect ? "blur(20px)" : "none",
                      border: `2px solid ${exp.actuel ? theme.colors.primary : mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`
                    }}
                  >
                    {/* Badge "En cours" */}
                    {exp.actuel && (
                      <div
                        className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold"
                        style={{
                          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                          color: "white"
                        }}
                      >
                        En cours
                      </div>
                    )}

                    {/* Glow effect */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at top left, ${theme.colors.primary}15, transparent)`
                      }}
                    />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="mb-4 flex items-start gap-4">
                        {/* Icône entreprise */}
                        <div
                          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
                          style={{
                            background: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.secondary}20)`
                          }}
                        >
                          <Building2 className="h-7 w-7" style={{ color: theme.colors.primary }} />
                        </div>

                        <div className="flex-1">
                          <h3
                            className="mb-1 text-2xl font-bold"
                            style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
                          >
                            {exp.titre}
                          </h3>
                          <p
                            className="text-lg font-semibold"
                            style={{ color: theme.colors.primary }}
                          >
                            {exp.entreprise}
                          </p>
                        </div>
                      </div>

                      {/* Infos */}
                      <div className="mb-4 flex flex-wrap gap-4 text-sm">
                        <div
                          className="flex items-center gap-2"
                          style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
                        >
                          <Calendar className="h-4 w-4" style={{ color: theme.colors.primary }} />
                          {exp.periode}
                        </div>
                        <div
                          className="flex items-center gap-2"
                          style={{ color: mode === "dark" ? theme.colors.textDark : theme.colors.text }}
                        >
                          <MapPin className="h-4 w-4" style={{ color: theme.colors.primary }} />
                          {exp.lieu}
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        className="leading-relaxed"
                        style={{ 
                          color: mode === "dark" 
                            ? `${theme.colors.textDark}dd` 
                            : `${theme.colors.text}dd`
                        }}
                      >
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}