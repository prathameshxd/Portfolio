import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiCamera, FiBookOpen } from 'react-icons/fi';
import styles from './AboutBento.module.css';

const hobbiesImages = [
  { src: '/images/20250108_173040.jpg', position: 'center' },
  { src: '/images/20250109_071622.jpg', position: 'center' },
  { src: '/images/20251125_071838.jpg', position: 'center' },
  { src: '/images/20260202_123630.jpg', position: 'center' },
  { src: '/images/20260202_144804.jpg', position: 'center' },
  { src: '/images/20260203_162926.jpg', position: 'bottom' }, // Focuses on the bottom of the image (or top if needed)
  { src: '/images/IMG-20250716-WA0049.jpg', position: 'center' },
  { src: '/images/IMG-20250716-WA0145.jpg', position: 'center' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(10px)', y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    y: 0,
    transition: { 
      type: 'spring', stiffness: 100, damping: 20,
      filter: { type: 'tween', duration: 0.6, ease: 'easeOut' }
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { 
      type: 'spring', stiffness: 120, damping: 14,
      filter: { type: 'tween', duration: 0.4, ease: 'easeOut' }
    }
  }
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.4 }
  }
};

const textString = "My foundation in computer science allows me to approach UX design with a highly structured, analytical mindset, ensuring the interfaces I conceptualize are built on logical, accessible systems rather than just aesthetics.";

export default function AboutBento() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % hobbiesImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className={styles.bentoSection}>
      <motion.h2
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-200px" }}
      >
        About
      </motion.h2>

      <motion.div 
        ref={gridRef}
        onMouseMove={handleMouseMove}
        className={styles.bentoGrid}
        style={{
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`,
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Main Statement Card */}
        <motion.div variants={cardVariants} className={`${styles.bentoCard} ${styles.cardMain}`}>
          <motion.p 
            className={styles.cardMainText}
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
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

        {/* Availability Card */}
        <motion.div variants={cardVariants} className={`${styles.bentoCard} ${styles.cardAvailability}`}>
          <div className={styles.pingGreen}></div>
          <h3 className={styles.statLabel} style={{ fontSize: '1.25rem', color: '#1a1a1a', fontWeight: '800' }}>Status</h3>
          <p className={styles.statDesc} style={{ fontSize: '1.125rem', fontWeight: '500' }}>Available for<br />work</p>
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
              transition={{ duration: 1.5 }}
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
