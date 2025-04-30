import { motion } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";
import photo from "../assets/photo.jpg";

// Animation variants
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Accueil() {
  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,theme(colors.emerald.50),theme(colors.indigo.50),white)] px-6 py-24 text-center"
    >
      {/* Blobs décoratifs */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="animate-blob absolute -left-[10%] -top-[10%] h-72 w-72 rounded-full bg-emerald-100 opacity-60 blur-3xl" />
        <div className="animation-delay-2000 animate-blob absolute -right-[8%] -bottom-[15%] h-80 w-80 rounded-full bg-indigo-100 opacity-50 blur-3xl" />
      </div>

      {/* Contenu principal */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-3xl"
      >
        {/* Portrait */}
        <motion.div
          variants={fadeUp}
          className="relative mx-auto mb-8 h-48 w-48 overflow-hidden rounded-full shadow-xl ring-4 ring-white/60 transition-transform duration-500 hover:scale-105 md:h-56 md:w-56"
        >
          <img
            src={photo}
            alt="Portrait de Tonye Nwalal Jules Dimitri"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Nom */}
        <motion.h1
          variants={fadeUp}
          className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-lime-500 to-emerald-700 md:text-6xl"
        >
          Bonjour, je suis
          <br className="block md:hidden" /> Tonye&nbsp;Nwalal&nbsp;Jules&nbsp;Dimitri
        </motion.h1>

        {/* Rôle */}
        <motion.p
          variants={fadeUp}
          className="mb-2 text-base font-semibold uppercase tracking-wider text-emerald-700 md:text-lg"
        >
          Développeur Full‑stack · Django / React.js
        </motion.p>

        {/* Accroche */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-gray-700 md:text-base"
        >
          Fascinée par la création d’expériences web fluides et performantes, j’allie le meilleur de Django et React pour bâtir des produits robustes, scalables et centrés sur l’utilisateur.
        </motion.p>

        {/* Bouton CV */}
        <motion.a
          variants={fadeUp}
          href="/CV_TONYE%20NWALAL_JULES%20DIMITRI.pdf"
          download
          aria-label="Télécharger le CV de Tonye Nwalal Jules Dimitri"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3 font-medium text-white shadow-lg transition focus:outline-none focus:ring-4 focus:ring-emerald-300 hover:bg-emerald-500"
        >
          <Download className="h-5 w-5" /> Télécharger mon CV
        </motion.a>
      </motion.div>

      {/* Flèche vers Projets - Positionnée en bas au centre */}
      <motion.a
        href="#projets"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        animate={{ y: [0, 12, 0] }}
        transition={{ opacity: { duration: 0.8, delay: 1 }, y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } }}
        className="pointer-events-auto absolute bottom-10 left-1/2 -translate-x-1/2 text-emerald-600"
        aria-label="Faire défiler vers mes projets"
      >
        <ChevronDown className="h-8 w-8" />
      </motion.a>

      {/* Styles utilitaires pour l'animation des blobs */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
