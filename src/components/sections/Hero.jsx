import { lazy, Suspense, useEffect, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Github, Mail, MapPin } from "lucide-react";
import profile from "../../data/profile.json";
import contact from "../../data/contact.json";

const HeroScene = lazy(() => import("../three/HeroScene"));

const stats = [
  { value: `${profile.annees_experience}+`, label: "années d’expérience" },
  { value: `${profile.projets_realises}+`, label: "projets réalisés" },
  { value: `${profile.technologies_maitrisees}+`, label: "technologies" },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setShow3D(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section id="accueil" className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />

      <div className="section-shell relative z-10 grid min-h-[calc(100svh-72px)] items-center gap-8 pb-14 pt-28 lg:grid-cols-[0.95fr_1.05fr] lg:pb-20 lg:pt-24">
        <Motion.div
          className="min-w-0"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08 }}
        >
          <Motion.div variants={item} transition={{ duration: 0.5 }} className="status-pill">
            <span className="status-dot" aria-hidden="true" />
            Développeur full-stack
          </Motion.div>

          <Motion.h1
            variants={item}
            transition={{ duration: 0.55 }}
            className="mt-6 max-w-3xl text-[clamp(2.75rem,7vw,5.8rem)] font-black leading-[0.98] tracking-[-0.055em] text-ink"
          >
            Je transforme des idées en{" "}
            <span className="gradient-text">solutions digitales</span> modernes.
          </Motion.h1>

          <Motion.p variants={item} transition={{ duration: 0.55 }} className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Ingénieur en systèmes d’information, je conçois des produits web et mobile fiables,
            des API performantes et des expériences simples à utiliser — du besoin métier à la mise en production.
          </Motion.p>

          <Motion.div variants={item} transition={{ duration: 0.55 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#projets" className="button-primary">
              Voir mes projets
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="button-secondary">
              Me contacter
              <Mail size={18} />
            </a>
            <a href={profile.cv} download className="button-quiet">
              <Download size={17} />
              Télécharger le CV
            </a>
          </Motion.div>

          <Motion.div variants={item} transition={{ duration: 0.55 }} className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-accent-blue" />
              {profile.localisation}
            </span>
            <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
            <a className="social-link" href={contact.reseaux[0].url} target="_blank" rel="noreferrer">
              <Github size={17} />
              GitHub
            </a>
            <a className="social-link" href={`mailto:${contact.email}`}>
              <Mail size={17} />
              Email
            </a>
          </Motion.div>

          <Motion.dl variants={item} transition={{ duration: 0.55 }} className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <dd className="text-xl font-extrabold text-ink sm:text-2xl">{stat.value}</dd>
                <dt className="mt-1 text-[0.68rem] font-medium leading-tight text-muted sm:text-xs">{stat.label}</dt>
              </div>
            ))}
          </Motion.dl>
        </Motion.div>

        {show3D ? (
          <Motion.div
            className="relative hidden min-h-[520px] lg:block"
            initial={{ opacity: 0, scale: 0.94, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-scene-frame">
              <Suspense fallback={<div className="scene-loader">Initialisation de la scène 3D…</div>}>
                <HeroScene reducedMotion={Boolean(reducedMotion)} />
              </Suspense>
            </div>
            <div className="scene-chip scene-chip-top">
              <span className="scene-chip-dot bg-cyan-400" />
              React · Django · Flutter
            </div>
            <div className="scene-chip scene-chip-bottom">
              <span className="scene-chip-dot bg-violet-400" />
              API · Fintech · IA
            </div>
          </Motion.div>
        ) : null}

        <div className="mx-auto mt-4 w-full max-w-lg lg:hidden">
          <div className="mobile-tech-visual" aria-label="Illustration d’un environnement de développement">
            <div className="mobile-screen">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="mobile-keyboard" />
          </div>
        </div>
      </div>

      <a href="#a-propos" className="scroll-cue" aria-label="Découvrir la suite">
        <span>Découvrir</span>
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
