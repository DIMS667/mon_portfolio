import {
  ArrowUpRight,
  Bot,
  ExternalLink,
  Github,
  GraduationCap,
  HeartHandshake,
  Landmark,
  LayoutDashboard,
  QrCode,
} from "lucide-react";
import projects from "../../data/projets.json";
import contact from "../../data/contact.json";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

function getProjectIcon(project) {
  if (project.id === "score-ia") return Landmark;
  if (project.id === "publicpay") return QrCode;
  if (project.id === "maison-bleue") return HeartHandshake;
  if (project.categorie === "Intelligence artificielle") return Bot;
  if (project.categorie === "Full-stack" || project.categorie === "Backend") return GraduationCap;
  return LayoutDashboard;
}

function ProjectVisual({ project, index }) {
  const Icon = getProjectIcon(project);
  return (
    <div className={`project-visual project-visual-${(index % 4) + 1}`} aria-hidden="true">
      <div className="project-orbit project-orbit-one" />
      <div className="project-orbit project-orbit-two" />
      <div className="project-window">
        <div className="project-window-bar">
          <i />
          <i />
          <i />
        </div>
        <Icon size={42} />
        <span>{project.categorie}</span>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projets" className="section-block">
      <div className="section-shell">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Projets récents"
            title="Des solutions concrètes, pensées pour des usages réels."
            description="Une sélection de réalisations en fintech, intelligence artificielle, impact social et gestion métier."
          />
          <a className="button-secondary shrink-0" href={contact.reseaux[0].url} target="_blank" rel="noreferrer">
            Voir GitHub
            <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * 0.06}>
              <article className={`project-card ${project.featured ? "is-featured" : ""}`}>
                <ProjectVisual project={project} index={index} />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-accent-blue">{project.categorie}</p>
                      <h3 className="mt-2 text-xl font-bold leading-tight text-ink">{project.titre}</h3>
                    </div>
                    <ExternalLink className="mt-1 shrink-0 text-muted" size={18} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
                  <div className="mt-4 border-l-2 border-accent-blue/40 pl-3">
                    <p className="text-xs leading-5 text-muted"><strong className="text-ink">Contribution :</strong> {project.contribution}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {project.liens.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                        aria-label={`${link.label} du projet ${project.titre}`}
                      >
                        <Github size={15} />
                        {link.label}
                        <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
