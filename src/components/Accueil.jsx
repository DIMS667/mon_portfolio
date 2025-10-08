import { motion } from "framer-motion";
import { Download, ChevronDown, Sparkles, Code2, Zap, Star, Rocket } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import photo from "../assets/photo.jpg";
import profileData from "../data/profile.json";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
  }
};

export default function Accueil() {
  const { theme, mode, glassEffect } = useTheme();

  // Couleurs dynamiques selon le mode
  const bgColor = mode === "dark" ? theme.colors.bgDark : theme.colors.bg;
  const textColor = mode === "dark" ? theme.colors.textDark : theme.colors.text;
  const cardBg = mode === "dark" 
    ? glassEffect ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.08)"
    : glassEffect ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.9)";

  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-32"
      style={{ background: bgColor }}
    >
      {/* Background animé */}
      <div className="pointer-events-none absolute inset-0">
        {/* Blobs animés */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-20 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: theme.colors.primary }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-32 bottom-20 h-[32rem] w-[32rem] rounded-full opacity-20 blur-3xl"
          style={{ background: theme.colors.secondary }}
        />

        {/* Particules flottantes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 8 + 3,
              height: Math.random() * 8 + 3,
              background: theme.colors.primary,
              opacity: 0.3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl text-center"
      >
        {/* Badge statut */}
        <motion.div
          variants={fadeUp}
          className="mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-lg"
          style={{
            background: cardBg,
            backdropFilter: glassEffect ? "blur(12px)" : "none",
            border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            color: theme.colors.primary
          }}
        >
          <Sparkles className="h-4 w-4" />
          {profileData.status}
        </motion.div>

        {/* Portrait avec animation 3D */}
        <motion.div
          variants={fadeUp}
          className="relative mx-auto mb-10 inline-block"
        >
          {/* Glow effect autour de la photo */}
          <div
            className="absolute -inset-4 rounded-full opacity-50 blur-2xl"
            style={{
              background: `radial-gradient(circle, ${theme.colors.primary}, ${theme.colors.secondary})`
            }}
          />
          
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative h-44 w-44 md:h-52 md:w-52"
          >
            <img
              src={photo}
              alt={profileData.nom_complet}
              className="h-full w-full rounded-full object-cover shadow-2xl"
              style={{
                border: `4px solid ${mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.8)"}`
              }}
            />
            
            {/* Icônes orbitales */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <Code2
                className="absolute -right-3 top-8 h-7 w-7 rounded-full p-1.5 shadow-lg"
                style={{ 
                  background: theme.colors.primary,
                  color: "white"
                }}
              />
              <Zap
                className="absolute -left-3 bottom-8 h-7 w-7 rounded-full p-1.5 shadow-lg"
                style={{ 
                  background: theme.colors.secondary,
                  color: "white"
                }}
              />
              <Rocket
                className="absolute right-8 -bottom-2 h-7 w-7 rounded-full p-1.5 shadow-lg"
                style={{ 
                  background: theme.colors.accent,
                  color: "white"
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Salutation */}
        <motion.div variants={fadeUp} className="mb-4">
          <span
            className="text-xl font-medium md:text-2xl"
            style={{ color: textColor }}
          >
            👋 Bonjour, je suis
          </span>
        </motion.div>

        {/* Nom avec gradient animé */}
        <motion.h1
          variants={fadeUp}
          className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.accent})`,
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradient-shift 8s ease infinite"
          }}
        >
          {profileData.nom_complet}
        </motion.h1>

        {/* Titre avec effet typing */}
        <motion.div
          variants={fadeUp}
          className="mb-4"
        >
          <p
            className="text-2xl font-bold uppercase tracking-wider md:text-3xl"
            style={{ color: theme.colors.primary }}
          >
            {profileData.titre}
          </p>
        </motion.div>

        {/* Spécialités */}
        <motion.div variants={fadeUp} className="mb-8 flex flex-wrap justify-center gap-3">
          {profileData.specialites.map((spec, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.1, y: -2 }}
              className="rounded-full px-5 py-2 text-sm font-semibold shadow-md"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.secondary}20)`,
                color: theme.colors.primary,
                border: `2px solid ${theme.colors.primary}40`
              }}
            >
              {spec}
            </motion.span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed md:text-xl"
          style={{ color: textColor }}
        >
          {profileData.bio}
        </motion.p>

        {/* Statistiques */}
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-12 grid max-w-3xl grid-cols-3 gap-6"
        >
          {[
            { label: "Années", value: profileData.annees_experience + "+", icon: Star },
            { label: "Projets", value: profileData.projets_realises + "+", icon: Rocket },
            { label: "Technologies", value: profileData.technologies_maitrisees + "+", icon: Code2 }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="rounded-2xl p-6 shadow-xl"
                style={{
                  background: cardBg,
                  backdropFilter: glassEffect ? "blur(12px)" : "none",
                  border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`
                }}
              >
                <Icon className="mx-auto mb-2 h-6 w-6" style={{ color: theme.colors.primary }} />
                <div
                  className="mb-1 text-3xl font-extrabold md:text-4xl"
                  style={{ color: theme.colors.primary }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-medium" style={{ color: textColor }}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.a
          variants={fadeUp}
          href={profileData.cv}
          download
          whileHover={{ scale: 1.08, boxShadow: `0 20px 40px ${theme.colors.primary}40` }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg font-bold text-white shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            backgroundSize: "200% 200%",
            animation: "gradient-shift 5s ease infinite"
          }}
        >
          <Download className="h-6 w-6" />
          Télécharger mon CV
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#projets"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 12, 0] }}
        transition={{
          opacity: { delay: 2 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ color: theme.colors.primary }}
      >
        <ChevronDown className="h-10 w-10" />
      </motion.a>
    </section>
  );
}