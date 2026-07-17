import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { ArrowUpRight, Code2, FolderKanban, Github, Sparkles } from "lucide-react";
import { useTheme } from "../context/theme";
import projetsData from "../data/projets.json";

const categories = [...new Set(projetsData.map((project) => project.categorie))];
const filters = ["Sélection", "Tous", ...categories];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: Math.min(index * 0.07, 0.28) },
  }),
};

export default function Projets() {
  const { theme, mode, glassEffect } = useTheme();
  const [filter, setFilter] = useState("Sélection");
  const textColor = mode === "dark" ? theme.colors.textDark : theme.colors.text;
  const mutedColor = `${textColor}bf`;
  const cardBackground = mode === "dark" ? "rgba(15, 23, 42, 0.72)" : "rgba(255, 255, 255, 0.82)";
  const visibleProjects = projetsData.filter((project) => {
    if (filter === "Sélection") return project.featured;
    if (filter === "Tous") return true;
    return project.categorie === filter;
  });

  return (
    <section id="projets" className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
        >
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold"
            style={{ color: theme.colors.primary, background: `${theme.colors.primary}12` }}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Sélection de travaux
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: textColor }}>
            Des projets pensés pour des usages réels
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: mutedColor }}>
            Chaque projet présente le besoin traité, ma contribution et la valeur apportée — au-delà de la simple liste de technologies.
          </p>
        </Motion.div>

        <div
          className="mb-10 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible"
          role="group"
          aria-label="Filtrer les projets"
        >
          {filters.map((item) => {
            const isActive = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={isActive}
                className="min-h-11 shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-transform hover:-translate-y-0.5"
                style={{
                  color: isActive ? theme.colors.onPrimary : textColor,
                  background: isActive
                    ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                    : `${theme.colors.primary}0e`,
                  border: `1px solid ${theme.colors.primary}${isActive ? "00" : "30"}`,
                }}
              >
                {item}
              </button>
            );
          })}
        </div>

        <Motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <Motion.article
              layout
              key={project.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6 }}
              className="group flex min-w-0 flex-col overflow-hidden rounded-3xl shadow-xl"
              style={{
                background: cardBackground,
                backdropFilter: glassEffect ? "blur(18px)" : "none",
                border: `1px solid ${theme.colors.primary}28`,
              }}
            >
              <div
                className="relative flex min-h-40 items-end overflow-hidden p-5"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}2e, ${theme.colors.secondary}18)`,
                  borderBottom: `1px solid ${theme.colors.primary}25`,
                }}
              >
                <div
                  className="absolute -right-10 -top-12 h-44 w-44 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125"
                  style={{ background: `${theme.colors.primary}2b` }}
                  aria-hidden="true"
                />
                <Code2
                  className="absolute right-5 top-5 h-20 w-20 opacity-10"
                  style={{ color: theme.colors.primary }}
                  aria-hidden="true"
                />
                <div className="relative flex w-full items-end justify-between gap-3">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold"
                    style={{ color: textColor, background: cardBackground }}
                  >
                    {project.categorie}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: theme.colors.primary }}>
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      Projet phare
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-start gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ color: theme.colors.primary, background: `${theme.colors.primary}12` }}
                  >
                    <FolderKanban className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-extrabold leading-tight" style={{ color: textColor }}>
                    {project.titre}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: mutedColor }}>
                  {project.description}
                </p>

                <dl className="mt-5 space-y-3 border-l-2 pl-4" style={{ borderColor: `${theme.colors.primary}45` }}>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.colors.primary }}>
                      Ma contribution
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed" style={{ color: textColor }}>
                      {project.contribution}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.colors.primary }}>
                      Résultat
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed" style={{ color: textColor }}>
                      {project.resultat}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Technologies utilisées pour ${project.titre}`}>
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{ color: textColor, background: `${theme.colors.primary}10` }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  {project.liens.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition-transform hover:-translate-y-0.5"
                      style={{ color: textColor, background: `${theme.colors.primary}10` }}
                      aria-label={`${link.label} du projet ${project.titre} sur GitHub`}
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      {link.label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </Motion.article>
          ))}
        </Motion.div>
      </div>
    </section>
  );
}
