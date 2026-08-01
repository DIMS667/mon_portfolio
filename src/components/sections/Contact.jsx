import { useState } from "react";
import { ArrowRight, Github, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import contact from "../../data/contact.json";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

const initialForm = { name: "", email: "", subject: "", message: "" };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Indiquez votre nom.";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Indiquez une adresse e-mail valide.";
  if (values.subject.trim().length < 3) errors.subject = "Précisez le sujet de votre message.";
  if (values.message.trim().length < 12) errors.message = "Votre message doit contenir au moins 12 caractères.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
    setStatus("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const body = [
      `Bonjour Jules Dimitri,`,
      "",
      form.message.trim(),
      "",
      `Nom : ${form.name.trim()}`,
      `E-mail : ${form.email.trim()}`,
    ].join("\n");
    const href = `mailto:${contact.email}?subject=${encodeURIComponent(form.subject.trim())}&body=${encodeURIComponent(body)}`;
    setStatus("Votre application e-mail va s’ouvrir avec le message préparé.");
    window.location.href = href;
  };

  return (
    <section id="contact" className="section-block section-tinted border-t border-line">
      <div className="section-shell">
        <div className="contact-panel">
          <div className="contact-copy">
            <SectionHeading
              eyebrow="Contact"
              title="Construisons quelque chose d’utile ensemble."
              description={contact.disponibilite}
            />

            <Reveal delay={0.08} className="mt-8 grid gap-3">
              <a className="contact-method" href={`mailto:${contact.email}`}>
                <span><Mail size={19} /></span>
                <div><small>Email</small><strong>{contact.email}</strong></div>
              </a>
              <a className="contact-method" href={`tel:${contact.phone}`}>
                <span><Phone size={19} /></span>
                <div><small>Téléphone</small><strong>+237 675 95 31 23</strong></div>
              </a>
              <a className="contact-method" href={contact.methodes_contact[0].href} target="_blank" rel="noreferrer">
                <span><MessageCircle size={19} /></span>
                <div><small>WhatsApp</small><strong>Écrire directement</strong></div>
              </a>
              <div className="contact-method">
                <span><MapPin size={19} /></span>
                <div><small>Localisation</small><strong>{contact.location}</strong></div>
              </div>
            </Reveal>

            <Reveal delay={0.14} className="mt-7 flex items-center gap-3">
              <a href={contact.reseaux[0].url} target="_blank" rel="noreferrer" className="button-secondary">
                <Github size={17} />
                {contact.reseaux[0].username}
              </a>
              <span className="availability-dot"><i /> Disponible</span>
            </Reveal>
          </div>

          <Reveal className="contact-form-wrap" delay={0.08}>
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field">
                  <span>Nom</span>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Votre nom" autoComplete="name" aria-invalid={Boolean(errors.name)} />
                  {errors.name ? <small>{errors.name}</small> : null}
                </label>
                <label className="field">
                  <span>Email</span>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="vous@entreprise.com" autoComplete="email" aria-invalid={Boolean(errors.email)} />
                  {errors.email ? <small>{errors.email}</small> : null}
                </label>
              </div>
              <label className="field mt-4">
                <span>Sujet</span>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Parlons de votre projet" aria-invalid={Boolean(errors.subject)} />
                {errors.subject ? <small>{errors.subject}</small> : null}
              </label>
              <label className="field mt-4">
                <span>Message</span>
                <textarea name="message" value={form.message} onChange={handleChange} rows="6" placeholder="Décrivez brièvement votre besoin…" aria-invalid={Boolean(errors.message)} />
                {errors.message ? <small>{errors.message}</small> : null}
              </label>
              <button type="submit" className="button-primary mt-5 w-full">
                Préparer l’e-mail
                <Send size={18} />
              </button>
              <p className="mt-3 text-center text-xs leading-5 text-muted">Aucune donnée n’est stockée : le bouton ouvre votre application e-mail.</p>
              {status ? <p className="form-status" role="status">{status}</p> : null}
            </form>
          </Reveal>
        </div>

        <Reveal className="contact-cta mt-8">
          <div>
            <p className="text-sm font-bold text-accent-blue">Un besoin web, mobile ou API ?</p>
            <h3 className="mt-2 text-2xl font-black text-ink sm:text-3xl">Parlons de votre prochain produit.</h3>
          </div>
          <a href={contact.methodes_contact[0].href} target="_blank" rel="noreferrer" className="button-primary shrink-0">
            Discuter sur WhatsApp
            <ArrowRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
