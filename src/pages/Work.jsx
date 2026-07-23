import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import Footer from '../components/Footer';
import styles from './Work.module.css';

export default function Work() {
  return (
    <div className={styles.workPage}>
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="h1-display" style={{ marginBottom: '1rem' }}>
            Selected Work
          </h1>
          <p className={styles.subtitle}>
            A showcase of my recent case studies and projects. More coming soon.
          </p>
        </motion.div>
      </section>

      <section className={styles.projectsSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} tiltReverse={true} style={{ display: 'block' }}>
            <Link 
              to="/work/pathparcel" 
              className={styles.projectCard} 
              data-cursor-hover="true"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              <div className={styles.cardContent}>
              <p className="label-mono">CASE STUDY · UX/UI DESIGN</p>
              <h2>PathParcel</h2>
              <p>Turning commuters' daily routes into a parcel delivery network.</p>
              <div className={styles.viewProject}>
                Read Case Study <span>→</span>
              </div>
            </div>
            <div className={styles.cardImagePlaceholder}>
              <div className={styles.mockupStack}>
                <img src="/mockups/splash-screen.webp" className={`${styles.stackedMockup} ${styles.mockup1}`} alt="Splash Screen" loading="lazy" />
                <img src="/mockups/onboarding-1.webp" className={`${styles.stackedMockup} ${styles.mockup2}`} alt="Onboarding 1" loading="lazy" />
                <img src="/mockups/onboarding-2.webp" className={`${styles.stackedMockup} ${styles.mockup3}`} alt="Onboarding 2" loading="lazy" />
              </div>
            </div>
            </Link>
          </Tilt>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
