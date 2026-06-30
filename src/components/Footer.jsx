import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const [time, setTime] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      const formatter = new Intl.DateTimeFormat([], options);
      setTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  // Spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className={styles.footerWrapper} ref={containerRef} onMouseMove={handleMouseMove}>
      <div 
        className={styles.spotlight}
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />
      
      <motion.footer 
        className={styles.footer}
        style={{ scale, opacity, y }}
      >
        <div className={styles.gridContainer}>
          
          <div className={`${styles.gridItem} ${styles.headerItem}`}>
            <h2 className={styles.massiveText}>LET'S TALK.</h2>
          </div>

          <div className={`${styles.gridItem} ${styles.statusItem}`}>
            <span className={styles.label}>Status</span>
            <div className={styles.statusInner}>
              <div className={styles.statusDot}></div>
              <span className={styles.statusText}>Available for Work</span>
            </div>
          </div>

          <div className={`${styles.gridItem} ${styles.timeItem}`}>
            <span className={styles.label}>Local Time</span>
            <span className={styles.timeValue}>{time}</span>
            <span className={styles.location}>Kalyan, India</span>
          </div>

          <div className={`${styles.gridItem} ${styles.socialsItem}`}>
            <span className={styles.label}>Socials</span>
            <div className={styles.socialLinks}>
              <a href="https://linkedin.com/in/prathamesh-patil-5652a1358/" target="_blank" rel="noopener noreferrer" className={styles.socialBlock}>LinkedIn</a>
              <a href="https://www.behance.net/prathmeshpatila5" target="_blank" rel="noopener noreferrer" className={styles.socialBlock}>Behance</a>
              <a href="mailto:prathmeshpatila5@gmail.com" className={styles.socialBlock}>Email</a>
            </div>
          </div>

          <div className={`${styles.gridItem} ${styles.copyItem}`}>
            <span className={styles.copyText}>© {new Date().getFullYear()} Prathamesh Patil. All rights reserved.</span>
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} className={styles.backToTop}>
              Back to Top ↑
            </a>
          </div>
          
        </div>
      </motion.footer>
    </div>
  );
}
