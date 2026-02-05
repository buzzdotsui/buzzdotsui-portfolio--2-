import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';
import { Project } from './types';
import { ThemeProvider } from './contexts/ThemeContext';
import { ParticleBackground } from './components/effects/ParticleBackground';
import { SplashScreen } from './components/effects/SplashScreen';
import { MagneticCursor } from './components/effects/MagneticCursor';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  if (selectedProject) {
    return (
      <ThemeProvider>
        <ProjectDetail
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {!showSplash && (
        <>
          <ParticleBackground />
          <MagneticCursor />

          <main className="bg-background min-h-screen text-text-main font-sans">
            <Navbar />
            <Hero />
            <Skills />
            <Projects onProjectSelect={setSelectedProject} />
            <About />
            <Contact />
            <Footer />
          </main>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;