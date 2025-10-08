import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";

// Toutes tes certifications (modifiables)
const certifications = [
  {
    titre: "Responsive Web Design",
    organisme: "freeCodeCamp",
    categorie: "Frontend",
    url: "https://www.freecodecamp.org/certification/example",
  },
  {
    titre: "Introduction to Django",
    organisme: "Udemy",
    categorie: "Backend",
    url: "",
  },
  {
    titre: "Meta Front-End Developer",
    organisme: "Coursera / Meta",
    categorie: "Frontend",
    url: "https://coursera.org/verify/example",
  },
  {
    titre: "Développement Web",
    organisme: "OpenClassrooms",
    categorie: "Autres",
    url: "",
  },
];

const categories = ["Tous", "Frontend", "Backend", "Autres"];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Certifications() {
  const [filtre, setFiltre] = useState("Tous");
  const certificationsFiltrees =
    filtre === "Tous"
      ? certifications
      : certifications.filter((c) => c.categorie === filtre);

  return (
    <section
      id="certifications"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#FAFFF9] via-[#FDF9F3] to-[#F8F6FF] px-6 py-24"
    >
      {/* décor flou */}
      <div className="pointer-events-none absolute -z-10 left-1/2 top-0 h-[120%] w-[160%] -translate-x-1/2 skew-x-[-45deg] bg-gradient-to-tr from-emerald-100/30 via-indigo-100/10 to-transparent backdrop-blur-2xl" />

      {/* Titre */}
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-max border-b-4 border-emerald-400 pb-2 text-3xl font-bold tracking-tight text-emerald-700 md:text-4xl"
      >
        Mes Certifications
      </motion.h2>

      {/* Filtres */}
      <div className="mx-auto mb-14 flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltre(cat)}
            className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
              filtre === cat
                ? "bg-emerald-500/90 text-white shadow-lg ring-emerald-500/30 ring-2"
                : "border-gray-300 text-gray-700 hover:bg-emerald-500/10 hover:text-emerald-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {certificationsFiltrees.map((cert, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="group relative flex flex-col rounded-3xl bg-white/80 p-6 shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Halo */}
            <span className="pointer-events-none absolute inset-px rounded-[inherit] bg-gradient-to-br from-emerald-400/20 to-violet-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 mb-4 flex items-center gap-3 text-emerald-600">
              <BadgeCheck className="h-6 w-6 flex-shrink-0" />
              <h3 className="text-base font-semibold md:text-lg">{cert.titre}</h3>
            </div>
            <p className="relative z-10 mb-6 text-sm text-gray-700">{cert.organisme}</p>

            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 mt-auto inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline"
              >
                Voir le certificat <ExternalLink size={14} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}