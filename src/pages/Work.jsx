import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import styles from './Work.module.css';

// Animated CountUp Component
const CountUp = ({ to, suffix = "", decimals = 0, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <span ref={ref}>
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration }}
        >
          <motion.span
            initial={{ counter: 0 }}
            animate={{ counter: to }}
            transition={{ duration, ease: "easeOut" }}
            onUpdate={(latest) => {
              if (ref.current) {
                ref.current.textContent = Number(latest.counter).toFixed(decimals) + suffix;
              }
            }}
          >
            0{suffix}
          </motion.span>
        </motion.span>
      ) : (
        `0${suffix}`
      )}
    </span>
  );
};

export default function Work() {
  return (
    <div className={styles.workPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="label-mono" style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
            CASE STUDY · UX/UI DESIGN
          </p>
          <h1 className="h1-display" style={{ marginBottom: '2rem' }}>
            PathParcel
          </h1>
          <h2 className={styles.hook}>
            Turning commuters' daily routes into a parcel delivery network.
          </h2>
        </motion.div>
      </section>

      {/* Problem & Research */}
      <section className={styles.contextSection}>
        <div className={styles.grid2}>
          <motion.div 
            className={styles.contextBlock}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3>The Problem</h3>
            <p>
              Students and daily commuters have no way to earn money on routes they already travel; senders pay ₹50–200 per parcel in delivery costs.
            </p>
          </motion.div>
          
          <motion.div 
            className={styles.researchCallout}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className={styles.calloutInner}>
              <h3 className={styles.calloutStat}>70%</h3>
              <p>
                <strong>Conducted 15 interviews with students and commuters.</strong> 
                <br />70% already share commute routes but had no earning mechanism.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features & Results */}
      <section className={styles.resultsSection}>
        <h3 className={styles.sectionHeader}>Key Interventions & Results</h3>
        <div className={styles.grid2}>
          <motion.div 
            className={styles.resultCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h4>Traveler Onboarding</h4>
            <p className={styles.resultDesc}>Implemented seamless identity verification.</p>
            <div className={styles.metricRow}>
              <div className={styles.metric}>
                <span className={styles.metricOld}>15 min</span>
                <span className={styles.metricArrow}>→</span>
                <span className={styles.metricNew}>
                  <CountUp to={90} suffix=" sec" />
                </span>
              </div>
              <div className={styles.improvementTag}>80% Faster</div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.resultCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            <h4>Zero-Trust Physical Handover</h4>
            <p className={styles.resultDesc}>Introduced photo verification for secure handovers.</p>
            <div className={styles.metricRow}>
              <div className={styles.metric}>
                <span className={styles.metricOld}>3.2/5</span>
                <span className={styles.metricArrow}>→</span>
                <span className={styles.metricNew}>
                  <CountUp to={4.7} suffix="/5" decimals={1} />
                </span>
              </div>
              <div className={styles.improvementTag}>Trust Score</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Testing Callout */}
      <section className={styles.testingSection}>
        <motion.div 
          className={styles.testingCard}
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.hugeStat}>
            <CountUp to={83} suffix="%" duration={2.5} />
          </div>
          <p className={styles.testingDesc}>
            Tested prototype with 12 users. 83% expressed active interest in the concept.
          </p>
        </motion.div>
      </section>

      {/* Gallery Grid Placeholder */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryGrid}>
          {[1, 2, 3, 4].map((item) => (
            <motion.div 
              key={item}
              className={styles.galleryItem}
              whileHover={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className={styles.imgPlaceholder}></div>
              <p className={styles.caption}>Screen Mockup {item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Behance Link */}
      <section className={styles.behanceSection}>
        <a 
          href="https://www.behance.net/gallery/250193989/Pathparcel-Detailed-Case-Study" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.behanceBtn}
          data-cursor-hover="true"
        >
          View Full Case Study on Behance ↗
        </a>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <Link to="/contact" className={styles.nextProject} data-cursor-hover="true">
          <h2>Ready to talk?</h2>
          <span className={styles.ctaArrow}>→</span>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
