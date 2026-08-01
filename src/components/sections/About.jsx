import { CheckCircle2, Code2, GraduationCap, Layers3, MapPin } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import profile from "../../data/profile.json";
import workspace from "../../assets/about-workspace.png";
import portrait from "../../assets/photo.jpg";

const strengths = [
  "Analyse du besoin et traduction en solution concrète",
  "Développement web, mobile et API de bout en bout",
  "Approche orientée qualité, sécurité et maintenabilité",
];

export default function About() {
  return (
    <section id="a-propos" className="section-block border-t border-line">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="À propos"
            title="Le métier d’abord, la technologie au service du résultat."
            description={profile.bio}
          />

          <Reveal delay={0.08} className="mt-7 space-y-3">
            {strengths.map((strength) => (
              <div key={strength} className="flex items-start gap-3 text-sm leading-6 text-muted sm:text-base">
                <CheckCircle2 className="mt-1 shrink-0 text-accent-blue" size={18} />
                <span>{strength}</span>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.14} className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="info-tile">
              <GraduationCap size={20} />
              <div>
                <span>Formation</span>
                <strong>Master 2 en systèmes d’information</strong>
              </div>
            </div>
            <div className="info-tile">
              <MapPin size={20} />
              <div>
                <span>Localisation</span>
                <strong>Douala & Yaoundé, Cameroun</strong>
              </div>
            </div>
            <div className="info-tile">
              <Layers3 size={20} />
              <div>
                <span>Contexte actuel</span>
                <strong>Solutions digitales financières</strong>
              </div>
            </div>
            <div className="info-tile">
              <Code2 size={20} />
              <div>
                <span>Approche</span>
                <strong>Full-stack & orientée produit</strong>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative" delay={0.08}>
          <div className="about-visual">
            <img
              src={workspace}
              alt="Espace de travail numérique moderne avec écran de développement"
              width="1448"
              height="1086"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="about-overlay" aria-hidden="true" />
          </div>
          <div className="profile-float-card">
            <img
              src={portrait}
              alt=""
              width="72"
              height="72"
              loading="lazy"
              className="h-14 w-14 rounded-2xl object-cover object-top"
            />
            <div>
              <strong className="block text-sm text-ink">Jules Dimitri</strong>
              <span className="text-xs text-muted">Full-stack · Fintech · API</span>
            </div>
          </div>
          <div className="experience-float-card">
            <span className="gradient-text text-2xl font-black">{profile.annees_experience}+</span>
            <span className="text-xs leading-tight text-muted">années<br />d’expérience</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
