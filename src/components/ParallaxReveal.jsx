import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ParallaxReveal.module.css';

export default function ParallaxReveal() {
  const containerRef = useRef(null);
  
  // Track scroll over the entire tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale the image down to normal size as we scroll
  const imageScale = useTransform(scrollYProgress, [0.2, 0.8], [1.2, 1]);
  
  // Parallax movement (moves opposite to scroll direction)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  // The clip path reveals the image
  // It starts as a small floating box and expands to fill the screen
  const clipPath = useTransform(
    scrollYProgress, 
    [0.3, 0.65], 
    ["inset(35% 25% 35% 25% round 32px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  const textY = useTransform(scrollYProgress, [0.35, 0.65], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.stickyWrapper}>
        <motion.div 
          className={styles.imageWrapper}
          style={{ clipPath }}
        >
          <motion.img 
            src="/images/20251125_071838.jpg" 
            alt="Parallax Reveal"
            className={styles.parallaxImage}
            style={{ scale: imageScale, y: imageY }}
          />
          <div className={styles.overlay}>
            <motion.h2 
              className={styles.overlayText}
              style={{ y: textY, opacity: textOpacity }}
            >
              BEYOND<br/>THE CODE.
            </motion.h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
