import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'; // Import Footer here to include at bottom
import styles from './Home.module.css';

const textVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
};

const wordAnimation = {
  hidden: { y: "100%", opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } 
  }
};

const SplitText = ({ children }) => {
  return (
    <span className={styles.splitTextLine}>
      {children.split(" ").map((word, index) => (
        <span key={index} className={styles.wordWrapper}>
          <motion.span variants={wordAnimation} className={styles.word}>
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.p 
            className="label-mono"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={textVariant}
          >
            UI/UX DESIGNER · KALYAN, INDIA
          </motion.p>
          
          <motion.h1 
            className={`h1-display ${styles.heroTitle}`}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            <SplitText>I design interfaces.</SplitText>
            <br />
            <SplitText>Then I help build them.</SplitText>
          </motion.h1>

          <motion.p 
            className={styles.heroSubtext}
            initial="hidden"
            animate="visible"
            custom={4}
            variants={textVariant}
          >
            UI/UX Designer specializing in data-driven product strategy, user research, and end-to-end prototyping in Figma, with a technical foundation that lets him design accessible, high-fidelity interfaces optimized for engineering feasibility and developer handoff.
          </motion.p>

          <motion.div 
            className={styles.ctaGroup}
            initial="hidden"
            animate="visible"
            custom={5}
            variants={textVariant}
          >
            <Link to="/work" className={styles.btnPrimary} data-cursor-hover="true">
              See Work
            </Link>
            <Link to="/stack" className={styles.btnSecondary} data-cursor-hover="true">
              View Stack
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className={styles.marqueeSection}>
        <div className={styles.marqueeContainer}>
          <motion.div 
            className={styles.marqueeTrack}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 20 
            }}
          >
            <span className={styles.marqueeText}>FIGMA · REACT · USER RESEARCH · PROTOTYPING · DESIGN SYSTEMS · AI-ASSISTED DESIGN · FIGMA · REACT · USER RESEARCH · PROTOTYPING · DESIGN SYSTEMS · AI-ASSISTED DESIGN ·</span>
            <span className={styles.marqueeText}>FIGMA · REACT · USER RESEARCH · PROTOTYPING · DESIGN SYSTEMS · AI-ASSISTED DESIGN · FIGMA · REACT · USER RESEARCH · PROTOTYPING · DESIGN SYSTEMS · AI-ASSISTED DESIGN ·</span>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <motion.div 
          className={styles.aboutContent}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.aboutTextCol}>
            <h2 className={styles.sectionTitle}>About</h2>
            <p className={styles.aboutText}>
              Currently expanding into interaction design and spatial UI/UX for AR/VR/XR. I blend design thinking with development constraints, bridging the gap between what looks good and what ships fast.
            </p>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3 className={styles.statValue}>9.18</h3>
              <p className={styles.statLabel}>CGPI</p>
              <p className={styles.statDesc}>B.Sc. Computer Science<br/>Mumbai University (2023–2026)</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statValue}>2025</h3>
              <p className={styles.statLabel}>Google UX Cert</p>
              <p className={styles.statDesc}>User research, wireframing, prototyping, usability testing</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Teaser */}
      <section className={styles.teaser}>
        <Link to="/contact" data-cursor-hover="true">
          <motion.h2 
            className="h1-display"
            whileHover={{ scale: 0.98, opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            Let's build something <span className={styles.arrow}>→</span>
          </motion.h2>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
