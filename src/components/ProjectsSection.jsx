import profile from "../data/profile.json";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  return (
    <section id="projets" className="reference-section">
      <div className="reference-wrap">
        <div className="reference-section-head">
          <p className="section-kicker">{profile.ui.projectsEyebrow}</p>
          <h2 className="section-heading">{profile.ui.projectsTitle}</h2>
          <p className="section-description">{profile.ui.projectsDescription}</p>
        </div>

        <div className="reference-board">
          {profile.projects.slice(0, 6).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
