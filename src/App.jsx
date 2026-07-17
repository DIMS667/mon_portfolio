import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Accueil from './components/Accueil';
import Projets from './components/Projets';
import Competences from './components/Competences';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ThemeCustomizer from './components/ThemeCustomizer';
import BackgroundAnimations from './components/BackgroundAnimations';
import { MotionConfig } from 'framer-motion';

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <BackgroundAnimations />
        <a className="skip-link" href="#contenu-principal">
          Aller au contenu principal
        </a>
        <div className="relative" style={{ fontFamily: 'var(--font-body)' }}>
          <Header />
          <main id="contenu-principal">
            <Accueil />
            <Projets />
            <Competences />
            <Experience />
            <Certifications />
            <Contact />
          </main>
          <ThemeCustomizer />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
