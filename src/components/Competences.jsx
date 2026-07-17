import { motion as Motion } from "framer-motion";
import {
  Code,
  CreditCard,
  Database,
  LayoutPanelTop,
  Server,
  Smartphone,
  Workflow,
  Wrench,
} from "lucide-react";
import { useTheme } from "../context/theme";
import competencesData from "../data/competences.json";

const iconMap = {
  Server,
  LayoutPanelTop,
  Code,
  Database,
  Smartphone,
  CreditCard,
  Workflow,
};

const skills = competencesData.flatMap((group) =>
  group.elements.map((item) => ({ ...item, categorie: group.categorie })),
);

export default function Competences() {
  const { theme, mode, glassEffect } = useTheme();
  const textColor = mode === "dark" ? theme.colors.textDark : theme.colors.text;
  const mutedColor = `${textColor}bd`;
  const cardBackground = mode === "dark" ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.8)";

  return (
    <section id="competences" className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold"
            style={{ color: theme.colors.primary, background: `${theme.colors.primary}12` }}
          >
            <Wrench className="h-4 w-4" aria-hidden="true" />
            Boîte à outils
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: textColor }}>
            Compétences techniques
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: mutedColor }}>
            Des compétences utilisées en contexte projet, du design d'interface à la donnée, au paiement et à la livraison.
          </p>
        </Motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.icon] || Code;
            return (
              <Motion.article
                key={`${skill.categorie}-${skill.titre}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24) }}
                whileHover={{ y: -5 }}
                className="group min-w-0 rounded-3xl p-6 shadow-lg"
                style={{
                  background: cardBackground,
                  backdropFilter: glassEffect ? "blur(18px)" : "none",
                  border: `1px solid ${theme.colors.primary}28`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl p-3"
                    style={{
                      color: theme.colors.onPrimary,
                      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    }}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-right text-xs font-bold"
                    style={{ color: theme.colors.primary, background: `${theme.colors.primary}10` }}
                  >
                    {skill.categorie}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-extrabold" style={{ color: textColor }}>
                  {skill.titre}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: mutedColor }}>
                  {skill.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Technologies : ${skill.titre}`}>
                  {skill.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-lg px-2.5 py-1.5 text-xs font-bold"
                      style={{ color: textColor, background: `${theme.colors.primary}0e` }}
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </Motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
