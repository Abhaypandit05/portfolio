import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact';

// How long the loading screen stays (ms). Keep in sync with <Loader duration=... />
const LOADING_TIME = 2400;

export default function App() {
  const [loading, setLoading] = useState(true);

  // Hide the loader after LOADING_TIME
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), LOADING_TIME);
    return () => clearTimeout(timer);
  }, []);

  // Stop the page from scrolling while the loader is showing
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {loading && <Loader key="loader" duration={LOADING_TIME} />}
      </AnimatePresence>

      {/* Ambient background effects */}
      <div className="grid-pattern" aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}