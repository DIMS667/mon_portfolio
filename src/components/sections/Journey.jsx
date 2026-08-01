import { Award, BriefcaseBusiness, CalendarDays, GraduationCap, MapPin } from "lucide-react";
import experiences from "../../data/experiences.json";
import education from "../../data/certifications.json";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

export default function Journey() {
  const diplomas = education.filter((item) => item.categorie === "Diplôme");
  const certifications = education.filter((item) => item.categorie === "Certification");

  return (
    <>
      <section id="experience" className="section-block section-tinted border-y border-line">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Expérience"
            title="Un parcours construit au contact de produits et d’équipes variés."
            description="Du backend aux interfaces, de l’éducation au secteur financier : chaque expérience a renforcé ma vision globale du produit."
          />

          <div className="experience-timeline mt-11">
            {experiences.map((experience, index) => (
              <Reveal key={experience.id} delay={(index % 2) * 0.06} className="timeline-item">
                <span className="timeline-dot" aria-hidden="true" />
                <article className="experience-card">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-bold text-accent-blue">{experience.entreprise}</p>
                        {experience.actuel ? <span className="current-badge">Poste actuel</span> : null}
                      </div>
                      <h3 className="mt-1 text-xl font-bold text-ink">{experience.titre}</h3>
                    </div>
                    <div className="flex shrink-0 flex-col gap-1 text-xs text-muted sm:items-end">
                      <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} />{experience.periode}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{experience.lieu}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted">{experience.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {experience.technologies.map((technology) => (
                      <span key={technology} className="tag">{technology}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="formation" className="section-block">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="Formation"
              title="Une base scientifique, renforcée par la pratique."
              description="Un cursus en systèmes d’information et génie logiciel, complété par une veille active et des formations spécialisées."
            />
            <div className="grid gap-4">
              {diplomas.map((diploma, index) => (
                <Reveal key={diploma.id} delay={index * 0.05}>
                  <article className="education-card">
                    <div className="education-icon"><GraduationCap size={21} /></div>
                    <div className="min-w-0">
                      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                        <h3 className="font-bold text-ink">{diploma.titre}</h3>
                        <span className="shrink-0 text-sm font-bold text-accent-blue">{diploma.date}</span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-muted">{diploma.organisme}</p>
                      <p className="mt-3 text-sm leading-6 text-muted">{diploma.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
              <Reveal className="mt-2 grid gap-3 sm:grid-cols-2">
                {certifications.map((certification) => (
                  <article key={certification.id} className="certification-card">
                    <Award size={20} className="text-accent-violet" />
                    <div>
                      <h3 className="text-sm font-bold text-ink">{certification.titre}</h3>
                      <p className="mt-1 text-xs text-muted">{certification.organisme} · {certification.date}</p>
                    </div>
                  </article>
                ))}
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-14">
            <div className="availability-banner">
              <div className="availability-icon"><BriefcaseBusiness size={24} /></div>
              <div>
                <strong className="text-ink">Une expertise en progression continue</strong>
                <p className="mt-1 text-sm text-muted">Architecture logicielle, intelligence artificielle, open source et produits financiers font partie de mes centres d’intérêt techniques.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
