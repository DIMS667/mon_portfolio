import { motion } from "framer-motion";
import { Server, LayoutPanelTop, Code, Database } from "lucide-react";

// Compétences regroupées par catégorie
const competences = [
  {
    categorie: "Frontend",
    elements: [
      {
        titre: "Connaissance en technologie frontend (React.js)",
        description: "Je maîtrise l'intégration d'une API dans un frontend.",
        icon: LayoutPanelTop,
      },
    ],
  },
  {
    categorie: "Backend",
    elements: [
      {
        titre: "Connaissance des technologies backend",
        description:
          "Je maîtrise le framework Django avec son modèle MVT pour la création d'applications web, mais je travaille aussi avec Laravel et son modèle MVC, qui est semblable au modèle MVT.",
        icon: Code,
      },
      {
        titre: "Création et gestion des API (REST)",
        description: "Je suis capable de concevoir des API robustes et sécurisées.",
        icon: Server,
      },
    ],
  },
  {
    categorie: "Bases de données",
    elements: [
      {
        titre: "Gestion des bases de données (SQL / NoSQL)",
        description:
          "Je travaille avec des bases relationnelles (MySQL, PostgreSQL) et non relationnelles (MongoDB, Firebase), en structurant et interrogeant les données efficacement.",
        icon: Database,
      },
    ],
  },
];

// Variants pour une animation d'apparition fluide
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

export default function Competences() {
  return (
    <section
      id="competences"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#FAFFF9] via-[#FDF9F3] to-[#F8F6FF] py-20"
    >
      {/* Décor en background */}
      <div className="absolute inset-y-0 right-1/2 -z-10 w-[150%] origin-top-right skew-x-[-45deg] bg-gradient-to-tr from-emerald-100/30 via-indigo-100/10 to-transparent backdrop-blur-2xl" />

      <div className="max-w-6xl px-6 mx-auto">
        {/* Titre principal */}
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-emerald-700 mb-4"
        >
          Compétences Techniques
        </motion.h2>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl text-sm md:text-base text-gray-700/90 leading-relaxed mb-12"
        >
          Voici un aperçu de mes domaines de compétence clés en tant que développeur full-stack :
        </motion.p>

        {/* Liste par catégorie */}
        {competences.map((bloc, i) => (
          <div key={i} className="mb-14">
            {/* Titre de catégorie */}
            <h3 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-emerald-600 mb-6">
              <span className="block w-5 h-[2px] bg-emerald-500" />
              {bloc.categorie}
            </h3>

            {/* Cartes individuelles */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bloc.elements.map((item, j) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    custom={j}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    key={j}
                    className="group relative rounded-2xl bg-white/80 p-6 shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Effet d'anneau lumineux au survol */}
                    <span className="pointer-events-none absolute inset-px rounded-[inherit] bg-gradient-to-br from-emerald-400/20 to-violet-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative z-10 flex items-start gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 transition-colors duration-300 group-hover:bg-emerald-500/10">
                        <Icon className="h-6 w-6 text-emerald-600 transition-transform duration-300 group-hover:scale-110" />
                      </span>
                      <h4 className="text-base font-semibold text-emerald-700">
                        {item.titre}
                      </h4>
                    </div>
                    <p className="relative z-10 mt-4 text-sm leading-relaxed text-gray-600">
                      {item.description}
                    </p>
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