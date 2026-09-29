import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCamera, FiBookOpen } from 'react-icons/fi';
import TextAnimate from '../components/TextAnimate';
import styles from './AboutBento.module.css';

const hobbiesImages = [
  { src: '/images/20250108_173040.webp', position: 'center' },
  { src: '/images/20250109_071622.webp', position: 'center' },
  { src: '/images/20251125_071838.webp', position: 'center' },
  { src: '/images/20260202_123630.webp', position: 'center' },
  { src: '/images/20260202_144804.webp', position: 'center' },
  { src: '/images/20260203_162926.webp', position: 'bottom' },
  { src: '/images/IMG-20250716-WA0049.webp', position: 'center' },
  { src: '/images/IMG-20250716-WA0145.webp', position: 'center' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: 'spring', stiffness: 120, damping: 20
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', stiffness: 140, damping: 16
    }
  }
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.2 }
  }
};

const textString = "My foundation in computer science allows me to approach UX design with a highly structured, analytical mindset, ensuring the interfaces I conceptualize are built on logical, accessible systems rather than just aesthetics.";

export default function AboutBento() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const gridRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % hobbiesImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    const grid = gridRef.current;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    rafRef.current = requestAnimationFrame(() => {
      const rect = grid.getBoundingClientRect();
      grid.style.setProperty('--mouse-x', `${clientX - rect.left}px`);
      grid.style.setProperty('--mouse-y', `${clientY - rect.top}px`);
    });
  };

  return (
    <section className={styles.bentoSection}>
      <TextAnimate as="h2" by="character" className={styles.sectionTitle}>
        About
      </TextAnimate>

      <motion.div 
        ref={gridRef}
        onMouseMove={handleMouseMove}
        className={styles.bentoGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Main Statement Card */}
        <motion.div variants={cardVariants} className={`${styles.bentoCard} ${styles.cardMain}`}>
          <motion.p 
            className={styles.cardMainText}
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {textString.split(" ").map((word, i) => (
              <span key={i} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                <motion.span variants={wordVariants} style={{ display: 'inline-block' }}>
                  {word === "computer" || word === "science" ? <span className={styles.cardAccent}>{word}</span> : word}
                </motion.span>
              </span>
            ))}
          </motion.p>
        </motion.div>

        {/* Education Card */}
        <motion.div variants={cardVariants} className={`${styles.bentoCard} ${styles.cardEdu}`}>
          <FiBookOpen className={styles.cardIcon} />
          <h3 className={styles.statValue}>2026</h3>
          <p className={styles.statLabel}>B.Sc. Computer Science</p>
          <p className={styles.statDesc}>Mumbai University (2023–2026)</p>
        </motion.div>

        {/* Current Role Card */}
        <motion.div variants={cardVariants} className={`${styles.bentoCard} ${styles.cardAvailability}`}>
          <div className={styles.availMesh}></div>
          <div className={styles.availHeader}>
            <div className={styles.statusBadge}>
              <span className={styles.statusDot}></span>
              <span className={styles.statusText}>Currently</span>
            </div>
          </div>
          <div className={styles.availBody}>
            <div className={styles.availLogoWrap}>
              <img src="/intelgrader-logo.png" alt="Intelgrader" className={styles.availLogo} />
            </div>
            <h3 className={styles.availRole}>Product Design Intern</h3>
            <p className={styles.availCompany}>@ Intelgrader</p>
          </div>
          <div className={styles.availAccent}></div>
        </motion.div>

        {/* Hobbies Card */}
        <motion.div variants={cardVariants} className={`${styles.bentoCard} ${styles.cardHobbies}`}>

          <AnimatePresence>
            <motion.div
              key={currentImageIndex}
              className={styles.hobbiesBg}
              style={{
                backgroundImage: `url(${hobbiesImages[currentImageIndex].src})`,
                backgroundPosition: hobbiesImages[currentImageIndex].position
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            />
          </AnimatePresence>

          <div className={styles.glassPill}>
            <FiCamera style={{ color: '#fff', fontSize: '1.2rem' }} />
            <span className={styles.pillText}>Off the Grid</span>
          </div>
          <p className={styles.hobbiesText}>Trekking the Sahyadri mountains & landscape photography.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
