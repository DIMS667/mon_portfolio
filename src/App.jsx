import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import StackSection from "./components/StackSection";
import ContactSection from "./components/ContactSection";
import profile from "./data/profile.json";

export default function App() {
  return (
    <>
      <a href="#contenu" className="skip-link">Aller au contenu</a>
      <Navbar />
      <main id="contenu">
        <Hero />
        <ProjectsSection />
        <AboutSection />
        <StackSection />
        <ContactSection />
      </main>
      <footer className="reference-footer">
        <p>{profile.ui.footer} <a href="#accueil">↑ retour en haut</a></p>
      </footer>
    </>
  );
}
