import { motion } from "framer-motion";
import { Mail, Github, MessageCircle } from "lucide-react";

const contacts = [
  {
    label: "Écrire sur WhatsApp",
    href: "https://api.whatsapp.com/send?phone=237694478577&text=Bonjour%2C%20je%20viens%20de%20visiter%20votre%20portfolio%20et%20je%20souhaite%20vous%20contacter.",
    icon: MessageCircle,
  },
  {
    label: "tonyenwalal@gmail.com",
    href: "mailto:tonyenwalal@gmail.com",
    icon: Mail,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#FAFFF9] via-[#FDF9F3] to-[#F8F6FF] px-6 py-24 text-center"
    >
      {/* décor flou */}
      <div className="pointer-events-none absolute -z-10 right-1/2 top-0 h-[120%] w-[160%] origin-top-right skew-x-[-45deg] bg-gradient-to-tr from-emerald-100/30 via-indigo-100/10 to-transparent backdrop-blur-2xl" />

      {/* Titre */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mx-auto mb-10 max-w-max border-b-4 border-emerald-400 pb-2 text-3xl font-bold tracking-tight text-emerald-700 md:text-4xl"
      >
        Contact & Réseaux
      </motion.h2>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mx-auto mb-16 max-w-2xl text-sm leading-relaxed text-gray-700 md:text-base"
      >
        N'hésitez pas à me contacter pour une collaboration, un projet ou toute autre demande professionnelle.
      </motion.p>

      {/* Cartes de contact */}
      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
        {contacts.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, boxShadow: "0 12px 25px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex items-center gap-3 rounded-3xl bg-white/80 p-5 text-emerald-700 shadow-md ring-1 ring-black/5 transition-all duration-300"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 transition-colors group-hover:bg-emerald-500/10">
                <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
              </span>
              <span className="text-sm font-medium md:text-base">{item.label}</span>

              {/* Halo */}
              <span className="pointer-events-none absolute inset-px rounded-[inherit] bg-gradient-to-br from-emerald-400/20 to-violet-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.a>
          );
        })}
      </div>

      {/* Réseaux sociaux */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 flex justify-center gap-6"
      >
        <a
          href="https://github.com/DIMS667"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-emerald-600 transition-transform duration-300 hover:scale-110 hover:text-gray-800"
        >
          <Github className="h-8 w-8" />
        </a>
      </motion.div>
    </section>
  );
}