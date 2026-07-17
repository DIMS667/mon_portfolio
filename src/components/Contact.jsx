import { motion as Motion } from "framer-motion";
import { ArrowUpRight, Github, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useTheme } from "../context/theme";
import contactData from "../data/contact.json";

const iconMap = { Mail, MessageCircle, Phone, Github };

export default function Contact() {
  const { theme, mode, glassEffect } = useTheme();
  const textColor = mode === "dark" ? theme.colors.textDark : theme.colors.text;
  const mutedColor = `${textColor}bd`;
  const cardBackground = mode === "dark" ? "rgba(15, 23, 42, 0.72)" : "rgba(255, 255, 255, 0.84)";
  const currentYear = new Date().getFullYear();

  return (
    <section id="contact" className="relative isolate overflow-hidden px-4 pb-10 pt-20 sm:px-6 lg:pt-28">
      <div className="mx-auto max-w-6xl">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="overflow-hidden rounded-[2rem] p-6 shadow-2xl sm:p-10 lg:p-12"
          style={{
            background: cardBackground,
            backdropFilter: glassEffect ? "blur(20px)" : "none",
            border: `1px solid ${theme.colors.primary}38`,
            boxShadow: `0 30px 90px ${theme.colors.primary}18`,
          }}
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="min-w-0">
              <span
                className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold"
                style={{ color: theme.colors.primary, background: `${theme.colors.primary}12` }}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Parlons de votre projet
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: textColor }}>
                Construisons quelque chose d'utile ensemble.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: mutedColor }}>
                {contactData.disponibilite}. Je réponds volontiers aux besoins full-stack, mobile, API et fintech.
              </p>
              <p className="mt-5 flex items-center gap-2 text-sm font-semibold" style={{ color: textColor }}>
                <MapPin className="h-4 w-4 shrink-0" style={{ color: theme.colors.primary }} aria-hidden="true" />
                {contactData.location}
              </p>
            </div>

            <div className="grid gap-3">
              {contactData.methodes_contact.map((method) => {
                const Icon = iconMap[method.icon] || Mail;
                const isExternal = method.href.startsWith("http");
                return (
                  <a
                    key={method.id}
                    href={method.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group flex min-w-0 items-center gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
                    style={{ background: `${method.color}0d`, border: `1px solid ${method.color}2d` }}
                  >
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ color: method.color, background: `${method.color}16` }}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-extrabold uppercase tracking-wider" style={{ color: method.color }}>
                        {method.label}
                      </span>
                      <span className="mt-1 block truncate text-sm font-semibold sm:text-base" style={{ color: textColor }}>
                        {method.value}
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: method.color }} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </Motion.div>

        <div className="flex flex-col items-center justify-between gap-5 py-8 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold" style={{ color: mutedColor }}>
              © {currentYear} Tonye Nwalal Jules Dimitri
            </p>
            <p className="mt-1 text-xs" style={{ color: `${textColor}8f` }}>
              Conçu et développé au Cameroun.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {contactData.reseaux.map((network) => {
              const Icon = iconMap[network.icon] || Github;
              return (
                <a
                  key={network.id}
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold"
                  style={{ color: textColor, background: `${theme.colors.primary}10` }}
                  aria-label={`${network.nom} — ${network.username}`}
                >
                  <Icon className="h-5 w-5" style={{ color: theme.colors.primary }} aria-hidden="true" />
                  {network.nom}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
