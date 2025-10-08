import Header from './components/Header';
import Accueil from './components/Accueil';
import Projets from './components/Projets';
import Competences from './components/Competences';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Certifications from './components/Certifications';

function App() {
  return (
    <div className="font-inter bg-beige text-gray-800 scroll-smooth">
      <Header />
      <main className="pt-16 space-y-20">
        <Accueil />
        <Projets />
        <Competences />
        <Experience />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}

export default App;
