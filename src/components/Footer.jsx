import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUp, FiMapPin, FiClock } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
  const containerRef = useRef(null);
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setIstTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footerWrapper} ref={containerRef}>
      {/* Soft Dusk Meadow Landscape Layer */}
      <div className={styles.duskBackground}>
        <img
          src="/images/footer-anime-meadow-dusk.jpg"
          alt="Peaceful sunset painted meadow with warm dusk clouds"
          className={styles.duskImage}
          loading="lazy"
        />
        <div className={styles.duskTopFade} />
        <div className={styles.duskWarmGlow} />
        <div className={styles.duskVignette} />
      </div>

      <div className={styles.footerInner}>
        {/* Main Grid */}
        <div className={styles.gridContainer}>
          {/* Left Column: Brand & Live IST Status */}
          <div className={styles.leftSide}>
            <div className={styles.brandBlock}>
              <Link
                to="/"
                className={styles.logo}
                data-cursor-hover="true"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    scrollToTop();
                  }
                }}
              >
                <span>Prathamesh Patil</span>
              </Link>
              <p className={styles.tagline}>
                Crafting intuitive digital products & high-craft user experiences.
              </p>
            </div>

            {/* Live Location / Status Badge */}
            <div className={styles.statusBadge}>
              <div className={styles.statusRow}>
                <span className={styles.radarDot}></span>
                <span className={styles.statusText}>Available for UI/UX & Product Design</span>
              </div>
              <div className={styles.locationTimeRow}>
                <span className={styles.locationTag}>
                  <FiMapPin className={styles.miniIcon} />
                  Kalyan, India
                </span>
                <span className={styles.timeDivider}>•</span>
                <span className={styles.timeTag}>
                  <FiClock className={styles.miniIcon} />
                  {istTime || 'IST'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Open Navigation */}
          <div className={styles.rightSide}>
            <div className={styles.navColumn}>
              <span className={styles.colTitle}>Sitemap</span>
              <Link to="/" className={styles.navLink} data-cursor-hover="true">Home</Link>
              <Link to="/projects" className={styles.navLink} data-cursor-hover="true">Projects</Link>
              <a href="/#signature-wall" className={styles.navLink} data-cursor-hover="true">Signature Wall</a>
              <Link to="/contact" className={styles.navLink} data-cursor-hover="true">Contact</Link>
            </div>

            <div className={styles.navColumn}>
              <span className={styles.colTitle}>Connect</span>
              <a
                href="https://linkedin.com/in/prathamesh-patil-5652a1358/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
                data-cursor-hover="true"
              >
                LinkedIn
              </a>
              <a
                href="https://www.behance.net/prathmeshpatila5"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
                data-cursor-hover="true"
              >
                Behance
              </a>
              <a
                href="mailto:prathmeshpatila5@gmail.com"
                className={styles.navLink}
                data-cursor-hover="true"
              >
                Email
              </a>
            </div>

            <div className={styles.navColumn}>
              <span className={styles.colTitle}>Resources</span>
              <a
                href="/Prathamesh_UXDesign.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
                data-cursor-hover="true"
              >
                Resume
              </a>
              <a
                href="https://github.com/prathameshxd"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
                data-cursor-hover="true"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} Prathamesh Patil. Designed & built with care.
          </div>

          <button
            type="button"
            className={`${styles.backToTopBtn} btn-wave-hover`}
            style={{ '--wave-color': '#111', '--wave-text-color': '#fff' }}
            onClick={scrollToTop}
            data-cursor-hover="true"
            aria-label="Back to top"
          >
            <span className={`btn-wave-text ${styles.backToTopInner}`}>
              Back to Top
              <FiArrowUp className={styles.topArrowIcon} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
