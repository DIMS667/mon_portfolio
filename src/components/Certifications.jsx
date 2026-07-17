import { motion as Motion } from "framer-motion";
import { Award, BadgeCheck, GraduationCap } from "lucide-react";
import { useTheme } from "../context/theme";
import certificationsData from "../data/certifications.json";

export default function Certifications() {
  const { theme, mode, glassEffect } = useTheme();
  const textColor = mode === "dark" ? theme.colors.textDark : theme.colors.text;
  const mutedColor = `${textColor}bd`;
  const cardBackground = mode === "dark" ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.82)";

  return (
    <section id="certifications" className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
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
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            Formation continue
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: textColor }}>
            Formation & certifications
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: mutedColor }}>
            Un Master 2 en systèmes d'information et génie logiciel, complété par des formations techniques ciblées.
          </p>
        </Motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {certificationsData.map((item, index) => {
            const isDegree = item.categorie === "Diplôme";
            const Icon = isDegree ? GraduationCap : BadgeCheck;
            return (
              <Motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.07, 0.25) }}
                whileHover={{ y: -5 }}
                className="flex min-w-0 flex-col rounded-3xl p-6 shadow-lg"
                style={{
                  background: cardBackground,
                  backdropFilter: glassEffect ? "blur(18px)" : "none",
                  border: `1px solid ${theme.colors.primary}28`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                    style={{
                      color: theme.colors.onPrimary,
                      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    }}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold"
                    style={{ color: theme.colors.primary, background: `${theme.colors.primary}10` }}
                  >
                    {item.categorie} · {item.date}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-extrabold leading-snug" style={{ color: textColor }}>
                  {item.titre}
                </h3>
                <p className="mt-2 text-sm font-bold" style={{ color: theme.colors.primary }}>
                  {item.organisme}
                </p>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: mutedColor }}>
                  {item.description}
                </p>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 font-bold"
                    style={{ color: theme.colors.primary }}
                  >
                    <Award className="h-4 w-4" aria-hidden="true" />
                    Voir le justificatif
                  </a>
                )}
              </Motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
