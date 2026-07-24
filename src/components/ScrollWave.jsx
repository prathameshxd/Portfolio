import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ScrollWave.module.css';

export default function ScrollWave() {
  const containerRef = useRef(null);
  
  // Track scroll specifically for this container
  // It starts drawing when the top of the element hits 80% down the screen,
  // and finishes when the bottom of the element hits 20% down the screen.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"] 
  });

  // The path length animates from 0 to 1 based on scroll progress
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className={styles.waveContainer} ref={containerRef}>
      <svg 
        className={styles.svgWave} 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background track (faint) */}
        <path 
          d="M200 0 C200 100, 50 150, 50 200 C50 250, 350 250, 350 300 C350 350, 200 400, 200 400" 
          stroke="rgba(255, 255, 255, 0.05)" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />
        
        {/* Glow effect that draws simultaneously */}
        <motion.path 
          d="M200 0 C200 100, 50 150, 50 200 C50 250, 350 250, 350 300 C350 350, 200 400, 200 400" 
          stroke="var(--accent)" 
          strokeWidth="12" 
          strokeLinecap="round"
          style={{ pathLength, filter: 'blur(8px)', opacity: 0.5 }}
        />

        {/* The main solid animated line */}
        <motion.path 
          d="M200 0 C200 100, 50 150, 50 200 C50 250, 350 250, 350 300 C350 350, 200 400, 200 400" 
          stroke="var(--accent)" 
          strokeWidth="3" 
          strokeLinecap="round"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}
