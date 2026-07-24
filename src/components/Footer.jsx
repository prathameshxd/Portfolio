import { useRef, useState } from 'react';
import styles from './Footer.module.css';
import { SiGoogle } from 'react-icons/si';

export default function Footer() {
  const containerRef = useRef(null);

  return (
    <footer className={styles.footerWrapper} ref={containerRef}>

      {/* The Aurora Mesh Glow that fades from the black section above */}
      <div className={styles.aurora} />

      <div className={styles.footerInner}>

        {/* Middle Section: Logo, Copyright, and Columns */}
        <div className={styles.gridContainer}>
          <div className={styles.leftSide}>
            <div className={styles.logo}>
              {/* Optional tiny icon to match the screenshot vibe */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Prathamesh P
            </div>

            <div className={styles.copyright}>
              © {new Date().getFullYear()} Prathamesh Patil. All rights reserved.
            </div>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.navColumn}>
              <span className={styles.colTitle}>Sitemap</span>
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={styles.navLink}>Home</a>
              <a href="#work" className={styles.navLink}>Projects</a>
              <a href="#signature-wall" className={styles.navLink}>Signature Wall</a>
            </div>

            <div className={styles.navColumn}>
              <span className={styles.colTitle}>Connect</span>
              <a href="https://linkedin.com/in/prathamesh-patil-5652a1358/" target="_blank" rel="noopener noreferrer" className={styles.navLink}>LinkedIn</a>
              <a href="https://www.behance.net/prathmeshpatila5" target="_blank" rel="noopener noreferrer" className={styles.navLink}>Behance</a>
              <a href="mailto:prathmeshpatila5@gmail.com" className={styles.navLink}>Email</a>
            </div>

            <div className={styles.navColumn}>
              <span className={styles.colTitle}>Resources</span>
              <a href="/Prathamesh_Patil_resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.navLink}>Resume</a>
              <a href="https://github.com/prathameshxd" target="_blank" rel="noopener noreferrer" className={styles.navLink}>GitHub</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
