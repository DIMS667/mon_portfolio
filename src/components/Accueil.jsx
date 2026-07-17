import { motion as Motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Download,
  GraduationCap,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useTheme } from "../context/theme";
import photo from "../assets/photo.jpg";
import profileData from "../data/profile.json";

const stats = [
  { label: "ans d'expérience", value: `${profileData.annees_experience}+` },
  { label: "projets réalisés", value: `${profileData.projets_realises}+` },
  { label: "technologies", value: `${profileData.technologies_maitrisees}+` },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Accueil() {
  const { theme, mode, glassEffect } = useTheme();
  const reduceMotion = useReducedMotion();
  const textColor = mode === "dark" ? theme.colors.textDark : theme.colors.text;
  const mutedColor = `${textColor}c7`;
  const surface = mode === "dark" ? "rgba(15, 23, 42, 0.68)" : "rgba(255, 255, 255, 0.76)";

  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:pb-20 lg:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <Motion.div
          animate={reduceMotion ? undefined : { x: [0, 35, 0], y: [0, -25, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-16 h-80 w-80 rounded-full opacity-15 blur-3xl"
          style={{ background: theme.colors.primary }}
        />
        <Motion.div
          animate={reduceMotion ? undefined : { x: [0, -30, 0], y: [0, 28, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-32 bottom-0 h-96 w-96 rounded-full opacity-15 blur-3xl"
          style={{ background: theme.colors.secondary }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl min-w-0 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-16">
        <Motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.09 }}
          className="min-w-0 text-center lg:text-left"
        >
          <Motion.div
            variants={fadeUp}
            className="mx-auto mb-5 flex w-fit max-w-full items-center gap-2 rounded-full px-4 py-2 text-sm font-bold lg:mx-0"
            style={{
              color: theme.colors.primary,
              background: `${theme.colors.primary}12`,
              border: `1px solid ${theme.colors.primary}38`,
            }}
          >
            <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{profileData.status}</span>
          </Motion.div>

          <Motion.p
            variants={fadeUp}
            className="mb-3 text-sm font-bold uppercase tracking-[0.18em] sm:text-base"
            style={{ color: mutedColor }}
          >
            {profileData.titre}
          </Motion.p>

          <Motion.h1
            variants={fadeUp}
            className="mx-auto max-w-4xl break-words text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:mx-0 lg:text-7xl xl:text-8xl"
            style={{ color: textColor }}
          >
            Jules <span style={{ color: theme.colors.primary }}>Dimitri</span>
          </Motion.h1>

          <Motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-xl font-semibold leading-snug sm:text-2xl lg:mx-0"
            style={{ color: textColor }}
          >
            {profileData.accroche}
          </Motion.p>

          <Motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg lg:mx-0"
            style={{ color: mutedColor }}
          >
            {profileData.bio}
          </Motion.p>

          <Motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start"
            aria-label="Spécialités"
          >
            {profileData.specialites.map((specialite) => (
              <span
                key={specialite}
                className="rounded-full px-3 py-1.5 text-sm font-semibold"
                style={{
                  color: textColor,
                  background: `${theme.colors.primary}12`,
                  border: `1px solid ${theme.colors.primary}2e`,
                }}
              >
                {specialite}
              </span>
            ))}
          </Motion.div>

          <Motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
          >
            <a
              href="#projets"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold shadow-lg transition-transform hover:-translate-y-0.5"
              style={{
                color: theme.colors.onPrimary,
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              }}
            >
              Voir mes projets
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold transition-transform hover:-translate-y-0.5"
              style={{
                color: textColor,
                background: surface,
                border: `1px solid ${theme.colors.primary}42`,
                backdropFilter: glassEffect ? "blur(14px)" : "none",
              }}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Me contacter
            </a>
            <a
              href={profileData.cv}
              download
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold underline-offset-4 hover:underline"
              style={{ color: theme.colors.primary }}
            >
              <Download className="h-5 w-5" aria-hidden="true" />
              Télécharger le CV
            </a>
          </Motion.div>

          <Motion.dl
            variants={fadeUp}
            className="mt-9 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 rounded-2xl px-4 py-3 text-center lg:text-left"
                style={{
                  background: surface,
                  border: `1px solid ${theme.colors.primary}24`,
                  backdropFilter: glassEffect ? "blur(14px)" : "none",
                }}
              >
                <dd className="text-2xl font-extrabold" style={{ color: theme.colors.primary }}>
                  {stat.value}
                </dd>
                <dt className="mt-0.5 truncate text-xs font-semibold sm:text-sm" style={{ color: mutedColor }}>
                  {stat.label}
                </dt>
              </div>
            ))}
          </Motion.dl>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="mx-auto w-full max-w-md min-w-0"
        >
          <div
            className="relative overflow-hidden rounded-[2rem] p-3 shadow-2xl sm:p-4"
            style={{
              background: surface,
              border: `1px solid ${theme.colors.primary}3d`,
              backdropFilter: glassEffect ? "blur(18px)" : "none",
              boxShadow: `0 30px 80px ${theme.colors.primary}20`,
            }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <img
                src={photo}
                alt="Portrait de Tonye Nwalal Jules Dimitri"
                width="2069"
                height="2560"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-2/5"
                style={{ background: "linear-gradient(to top, rgba(2, 6, 23, 0.88), transparent)" }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white sm:p-6">
                <p className="text-xl font-extrabold">Tonye Nwalal Jules Dimitri</p>
                <p className="mt-1 text-sm text-slate-200">Développeur full-stack · Cameroun</p>
              </div>
            </div>

            <div className="grid gap-3 p-3 pt-5 text-sm sm:grid-cols-2">
              <div className="flex min-w-0 items-start gap-2" style={{ color: textColor }}>
                <BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0" style={{ color: theme.colors.primary }} aria-hidden="true" />
                <span>Atharif Financial</span>
              </div>
              <div className="flex min-w-0 items-start gap-2" style={{ color: textColor }}>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: theme.colors.primary }} aria-hidden="true" />
                <span>Douala & Yaoundé</span>
              </div>
              <div className="flex min-w-0 items-start gap-2 sm:col-span-2" style={{ color: textColor }}>
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0" style={{ color: theme.colors.primary }} aria-hidden="true" />
                <span>{profileData.formation_principale}</span>
              </div>
            </div>
          </div>

          <div
            className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ color: textColor, background: `${theme.colors.primary}10` }}
          >
            <Code2 className="h-4 w-4" style={{ color: theme.colors.primary }} aria-hidden="true" />
            Des produits utiles, du frontend au backend
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
