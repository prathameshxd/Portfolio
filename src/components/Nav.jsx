import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Nav.module.css';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimKey(prev => prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/work', label: 'Projects' },
  ];

  const signatureText = "Prathamesh";

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : styles.top}`}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.logo} onClick={closeMenu} aria-label="Home">
          <svg key={animKey} width="200" height="40" viewBox="0 0 200 40" className={styles.logoSvg}>
            <text x="0" y="26" className={styles.logoTextGroup}>
              {signatureText.split("").map((char, index) => (
                <tspan
                  key={index}
                  className={styles.charDraw}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {char}
                </tspan>
              ))}
            </text>
          </svg>
        </NavLink>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className={styles.magicUnderline}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <a href="/Prathamesh_Patil_resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.resumeButton}>
            Resume
          </a>
          <NavLink to="/contact" className={styles.ctaButton}>
            Contact me
            <span className={styles.arrow}>→</span>
          </NavLink>
        </nav>

        {/* Mobile Hamburger */}
        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle Menu">
          <div className={`${styles.line} ${isOpen ? styles.lineOpen1 : ''}`}></div>
          <div className={`${styles.line} ${isOpen ? styles.lineOpen2 : ''}`}></div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className={styles.mobileNav}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
                    }
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + navLinks.length * 0.1 }}
              >
                <a
                  href="/Prathamesh_Patil_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileResumeButton}
                  onClick={closeMenu}
                >
                  Resume
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (navLinks.length + 1) * 0.1 }}
              >
                <NavLink
                  to="/contact"
                  className={styles.mobileCtaButton}
                  onClick={closeMenu}
                >
                  Contact me
                  <span className={styles.arrow}>→</span>
                </NavLink>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
