import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    entreprise: "POWERSOFT",
    titre: "Développeur Full‑stack",
    periode: "Octobre 2024 – Aujourd’hui",
    lieu: "Yaoundé",
    description:
      "Stage académique me permettant de développer mes compétences en backend (Django) et frontend (React), intégration, tests et déploiement.",
  },
  {
    entreprise: "SINARES",
    titre: "Développeur Backend",
    periode: "Juillet – Septembre 2024",
    lieu: "Yaoundé",
    description:
      "Création d’API REST sécurisées, documentation technique et déploiement. Approfondissement des outils backend et bases de données.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

function Dot() {
  return (
    <span className="relative flex h-5 w-5 items-center justify-center">
      <span className="absolute h-6 w-6 animate-ping rounded-full bg-emerald-300/60" />
      <span className="relative z-10 h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-white" />
    </span>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#FAFFF9] via-[#FDF9F3] to-[#F8F6FF] px-6 py-24"
    >
      {/* décor flou */}
      <div className="pointer-events-none absolute -z-10 left-1/2 top-0 h-[120%] w-[170%] origin-top-left -skew-x-[45deg] bg-gradient-to-tl from-indigo-100/10 via-emerald-100/30 to-transparent backdrop-blur-2xl" />

      {/* Titre */}
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto mb-24 max-w-max border-b-4 border-emerald-400 pb-2 text-3xl font-bold tracking-tight text-emerald-700 md:text-4xl"
      >
        Expérience Professionnelle
      </motion.h2>

      {/* Timeline Grid */}
      <div className="relative mx-auto grid max-w-5xl gap-y-20 md:grid-cols-[1fr_auto_1fr]">
        {/* Ligne centrale */}
        <span className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-b from-emerald-400/40 via-emerald-400/10 to-transparent md:block md:h-full md:w-px" />

        {experiences.map((exp, i) => (
          <>
            {/* Carte côté gauche */}
            {i % 2 === 0 ? (
              <motion.div
                key={`card-left-${i}`}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="group relative md:pr-10"
              >
                <ExperienceCard exp={exp} side="left" />
              </motion.div>
            ) : (
              <div key={`empty-left-${i}`} />
            )}

            {/* Dot */}
            <div key={`dot-${i}`} className="flex items-center justify-center">
              <Dot />
            </div>

            {/* Carte côté droit */}
            {i % 2 === 0 ? (
              <div key={`empty-right-${i}`} />
            ) : (
              <motion.div
                key={`card-right-${i}`}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="group relative md:pl-10"
              >
                <ExperienceCard exp={exp} side="right" />
              </motion.div>
            )}
          </>
        ))}
      </div>
    </section>
  );
}

function ExperienceCard({ exp, side }) {
  return (
    <div
      className={`rounded-3xl bg-white/80 p-6 shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        side === "left" ? "timeline-card-left" : "timeline-card-right"
      }`}
    >
      <span className="pointer-events-none absolute inset-px rounded-[inherit] bg-gradient-to-br from-emerald-400/20 to-violet-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <h3 className="mb-1 text-lg font-semibold text-emerald-700 md:text-xl">
        {exp.titre}
      </h3>
      <p className="mb-2 text-sm font-medium text-gray-800">{exp.entreprise}</p>

      <div className="mb-1 flex items-center gap-2 text-sm text-gray-600">
        <Calendar className="h-4 w-4" /> {exp.periode}
      </div>
      <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
        <MapPin className="h-4 w-4" /> {exp.lieu}
      </div>

      <p className="text-sm leading-relaxed text-gray-700">{exp.description}</p>
    </div>
  );
}

/* No additional global CSS needed for arrows in this grid layout */
