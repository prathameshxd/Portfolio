import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ScrollStarburst.module.css';

export default function ScrollStarburst() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const rotateBase = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotateCounter = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const scaleOut = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8, 1], [0, 1, 0]);
  
  // The explosion effect triggers right at the end of the scroll
  const scaleExplode = useTransform(scrollYProgress, [0.8, 1], [0, 1.5]);
  const opacityExplode = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // Generate 12 lines for the starburst
  const lines = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i * 30) * (Math.PI / 180);
    return {
      x2: 200 + Math.cos(angle) * 140,
      y2: 200 + Math.sin(angle) * 140,
    };
  });

  return (
    <div className={styles.container} ref={containerRef}>
      <motion.svg 
        className={styles.svgShape} 
        viewBox="0 0 400 400" 
        fill="none" 
        style={{ rotate: rotateBase }}
      >
        {/* Central Core */}
        <motion.circle 
          cx="200" cy="200" r="8" 
          fill="var(--accent)" 
          style={{ scale: scaleOut, opacity: opacityFade }} 
        />

        {/* The expanding asterisk lines */}
        {lines.map((line, i) => (
          <motion.line 
            key={i}
            x1="200" 
            y1="200" 
            x2={line.x2} 
            y2={line.y2} 
            stroke="var(--accent)" 
            strokeWidth="2"
            strokeLinecap="round"
            style={{ 
              pathLength: scaleOut, 
              opacity: opacityFade,
              transformOrigin: "200px 200px"
            }}
          />
        ))}

        {/* Counter-rotating dashed geometric ring */}
        <motion.circle 
          cx="200" 
          cy="200" 
          r="100" 
          stroke="var(--accent)" 
          strokeWidth="1.5" 
          strokeDasharray="6 12"
          style={{ 
            rotate: rotateCounter, 
            scale: scaleOut, 
            opacity: opacityFade, 
            transformOrigin: '200px 200px' 
          }}
        />

        {/* The final geometric explosion wave */}
        <motion.circle 
          cx="200" 
          cy="200" 
          r="120" 
          stroke="var(--accent)" 
          strokeWidth="4"
          style={{ 
            scale: scaleExplode, 
            opacity: opacityExplode,
            transformOrigin: '200px 200px'
          }}
        />
        
        {/* Glow behind the explosion */}
        <motion.circle 
          cx="200" 
          cy="200" 
          r="120" 
          stroke="var(--accent)" 
          strokeWidth="10"
          style={{ 
            scale: scaleExplode, 
            opacity: opacityExplode,
            filter: 'blur(8px)',
            transformOrigin: '200px 200px'
          }}
        />
      </motion.svg>
    </div>
  );
}
