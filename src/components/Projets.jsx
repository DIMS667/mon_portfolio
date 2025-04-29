import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

// Données projets avec tags de techno
const projets = [
  {
    titre: "Portfolio Personnel",
    description: "Site personnel développé avec React.js, TailwindCSS et Framer Motion.",
    tags: ["React", "Tailwind", "Framer Motion"],
    lien: "https://github.com/tonye/portfolio",
  },
  {
    titre: "API REST Django",
    description: "API sécurisée pour application mobile, utilisant Django REST Framework.",
    tags: ["Django", "DRF", "PostgreSQL"],
    lien: "https://github.com/tonye/api-django",
  },
  {
    titre: "Dashboard Admin",
    description: "Interface d'administration avec statistiques dynamiques.",
    tags: ["React", "Chart.js", "Django"],
    lien: "https://github.com/tonye/admin-dashboard",
  },
];

// Animation Framer Motion
const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function Projets() {
  return (
    <section
      id="projets"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#FAFFF9] via-[#FDF9F3] to-[#F8F6FF] px-6 py-24"
    >
      {/* Bloc décoratif flou */}
      <div className="pointer-events-none absolute -z-10 right-1/2 top-0 h-[120%] w-[160%] origin-top-right skew-x-[-45deg] bg-gradient-to-tr from-emerald-100/30 via-indigo-100/10 to-transparent backdrop-blur-2xl" />

      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-max border-b-4 border-emerald-400 pb-2 text-3xl font-bold tracking-tight text-emerald-700 md:text-4xl"
      >
        Mes Projets
      </motion.h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projets.map((projet, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="group relative flex flex-col rounded-3xl bg-white/80 p-6 shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Halo gradient */}
            <span className="pointer-events-none absolute inset-px rounded-[inherit] bg-gradient-to-br from-emerald-400/20 to-violet-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 grow">
              <h3 className="mb-2 text-lg font-semibold text-emerald-700 md:text-xl">
                {projet.titre}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-700">
                {projet.description}
              </p>

              {/* Tags technos */}
              <div className="mb-8 flex flex-wrap gap-2">
                {projet.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-400/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Lien "Voir plus" */}
            {projet.lien && (
              <a
                href={projet.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-2 self-start text-sm font-semibold text-emerald-600 hover:underline"
              >
                Voir plus <ExternalLink size={16} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}