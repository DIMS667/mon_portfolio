import { ArrowUp, Github, Mail } from "lucide-react";
import contact from "../../data/contact.json";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="section-shell flex flex-col items-center justify-between gap-5 text-center text-sm text-muted sm:flex-row sm:text-left">
        <div>
          <a href="#accueil" className="font-bold text-ink">Jules Dimitri</a>
          <p className="mt-1">Ingénieur SI & développeur full-stack.</p>
        </div>
        <p>© {new Date().getFullYear()} Tonye Nwalal Jules Dimitri. Tous droits réservés.</p>
        <div className="flex items-center gap-2">
          <a className="icon-button" href={contact.reseaux[0].url} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} />
          </a>
          <a className="icon-button" href={`mailto:${contact.email}`} aria-label="Envoyer un e-mail">
            <Mail size={17} />
          </a>
          <a className="icon-button" href="#accueil" aria-label="Retour en haut">
            <ArrowUp size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
