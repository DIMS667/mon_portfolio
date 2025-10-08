import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Accueil from './components/Accueil';
import Projets from './components/Projets';
import Competences from './components/Competences';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ThemeCustomizer from './components/ThemeCustomizer';

function App() {
  return (
    <ThemeProvider>
      <div className="scroll-smooth" style={{ fontFamily: 'var(--font-body)' }}>
        <Header />
        <main>
          <Accueil />
          <Projets />
          <Competences />
          <Experience />
          <Certifications />
          <Contact />
        </main>
        <ThemeCustomizer />
      </div>
    </ThemeProvider>
  );
}

export default App;