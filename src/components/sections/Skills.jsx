import {
  Braces,
  Code2,
  CreditCard,
  Database,
  LayoutPanelTop,
  Server,
  Smartphone,
  Workflow,
} from "lucide-react";
import skills from "../../data/competences.json";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

const iconMap = {
  LayoutPanelTop,
  Smartphone,
  Server,
  Code: Code2,
  Database,
  CreditCard,
  Workflow,
};

const technologies = [
  { name: "React.js", mark: "Re" },
  { name: "Django", mark: "Dj" },
  { name: "FastAPI", mark: "FA" },
  { name: "Laravel", mark: "La" },
  { name: "Flutter", mark: "Fl" },
  { name: "PostgreSQL", mark: "Pg" },
  { name: "MongoDB", mark: "Mo" },
  { name: "Docker", mark: "Do" },
  { name: "Tailwind CSS", mark: "Tw" },
];

export default function Skills() {
  const skillItems = skills.flatMap((category) =>
    category.elements.map((item) => ({ ...item, category: category.categorie })),
  );

  return (
    <section id="competences" className="section-block section-tinted border-y border-line">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Compétences"
          title="Un socle technique complet pour construire des produits fiables."
          description="Frontend, backend, mobile, données et intégrations financières : une maîtrise transversale pour limiter les frictions entre les couches du produit."
        />

        <Reveal className="technology-strip mt-10" delay={0.06}>
          {technologies.map((technology) => (
            <div key={technology.name} className="technology-item">
              <span>{technology.mark}</span>
              <small>{technology.name}</small>
            </div>
          ))}
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillItems.map((skill, index) => {
            const Icon = iconMap[skill.icon] || Braces;
            return (
              <Reveal key={skill.titre} delay={(index % 3) * 0.06}>
                <article className="skill-card">
                  <div className="skill-card-icon">
                    <Icon size={22} />
                  </div>
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-accent-blue">{skill.category}</p>
                  <h3 className="mt-2 text-lg font-bold text-ink">{skill.titre}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{skill.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {skill.technologies.map((technology) => (
                      <span key={technology} className="tag">{technology}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
