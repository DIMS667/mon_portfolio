import { motion as Motion } from "framer-motion";
import { BriefcaseBusiness, Building2, Calendar, MapPin } from "lucide-react";
import { useTheme } from "../context/theme";
import experiencesData from "../data/experiences.json";

export default function Experience() {
  const { theme, mode, glassEffect } = useTheme();
  const textColor = mode === "dark" ? theme.colors.textDark : theme.colors.text;
  const mutedColor = `${textColor}bd`;
  const cardBackground = mode === "dark" ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.82)";

  return (
    <section id="experience" className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold"
            style={{ color: theme.colors.primary, background: `${theme.colors.primary}12` }}
          >
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            Parcours professionnel
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: textColor }}>
            Expériences
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: mutedColor }}>
            Un parcours progressif du backend au full-stack, aujourd'hui appliqué aux produits et services financiers.
          </p>
        </Motion.div>

        <div className="relative space-y-6 pl-8 sm:pl-12">
          <div
            className="absolute bottom-5 left-[9px] top-5 w-px sm:left-[17px]"
            style={{ background: `linear-gradient(${theme.colors.primary}20, ${theme.colors.primary}, ${theme.colors.primary}20)` }}
            aria-hidden="true"
          />

          {experiencesData.map((experience, index) => (
            <Motion.article
              key={experience.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.07, 0.25) }}
              className="relative min-w-0 rounded-3xl p-5 shadow-lg sm:p-7"
              style={{
                background: cardBackground,
                backdropFilter: glassEffect ? "blur(18px)" : "none",
                border: `1px solid ${experience.actuel ? `${theme.colors.primary}68` : `${theme.colors.primary}24`}`,
              }}
            >
              <span
                className="absolute -left-[31px] top-8 flex h-5 w-5 items-center justify-center rounded-full sm:-left-[47px]"
                style={{ background: mode === "dark" ? theme.colors.bgDark : theme.colors.bg }}
                aria-hidden="true"
              >
                {experience.actuel && (
                  <span className="absolute h-5 w-5 animate-ping rounded-full opacity-40" style={{ background: theme.colors.primary }} />
                )}
                <span className="relative h-3 w-3 rounded-full" style={{ background: theme.colors.primary }} />
              </span>

              <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ color: theme.colors.primary, background: `${theme.colors.primary}12` }}
                >
                  <Building2 className="h-6 w-6" aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-xl font-extrabold sm:text-2xl" style={{ color: textColor }}>
                        {experience.titre}
                      </h3>
                      <p className="mt-1 text-base font-bold" style={{ color: theme.colors.primary }}>
                        {experience.entreprise}
                      </p>
                    </div>
                    {experience.actuel && (
                      <span
                        className="w-fit shrink-0 rounded-full px-3 py-1 text-xs font-extrabold"
                        style={{ color: theme.colors.onPrimary, background: theme.colors.primary }}
                      >
                        Poste actuel
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-5" style={{ color: mutedColor }}>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 shrink-0" style={{ color: theme.colors.primary }} aria-hidden="true" />
                      {experience.periode}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0" style={{ color: theme.colors.primary }} aria-hidden="true" />
                      {experience.lieu}
                    </span>
                  </div>

                  <p className="mt-4 leading-relaxed" style={{ color: mutedColor }}>
                    {experience.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Technologies utilisées chez ${experience.entreprise}`}>
                    {experience.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-lg px-2.5 py-1 text-xs font-bold"
                        style={{ color: textColor, background: `${theme.colors.primary}0e` }}
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
