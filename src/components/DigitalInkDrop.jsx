import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './DigitalInkDrop.module.css';

export default function DigitalInkDrop() {
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(1000);
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    // Keep internal SVG dimensions synced with screen size so coordinate math is easy
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 1. Drop flattens and vanishes (Scroll: 0.5 -> 0.6)
  const dropScaleY = useTransform(scrollYProgress, [0.5, 0.6], [1, 0.1]);
  const dropScaleX = useTransform(scrollYProgress, [0.5, 0.6], [1, 4]);
  const dropOpacity = useTransform(scrollYProgress, [0.5, 0.6], [1, 0]);

  // 2. Text writes out left-to-right (Scroll: 0.6 -> 0.9)
  const textClipPath = useTransform(scrollYProgress, [0.6, 0.9], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);

  const gridSize = 40;
  const gap = 80;

  const renderGridBlocks = () => {
    const blocks = [];
    const cx = windowWidth / 2;
    const cy = windowHeight / 3; // Start higher up

    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        // Initial position
        const startX = cx + col * gap;
        const startY = cy + row * gap;
        
        // Final merged position
        const endX = cx;
        const endY = cy;

        // Custom transform for each block driven purely by scrollYProgress
        const x = useTransform(scrollYProgress, (s) => {
          let m = 0;
          if (s > 0.1) m = Math.min((s - 0.1) / 0.2, 1); // Merge phase (0.1 -> 0.3)
          return startX + (endX - startX) * m - gridSize / 2;
        });

        const y = useTransform(scrollYProgress, (s) => {
          let m = 0;
          if (s > 0.1) m = Math.min((s - 0.1) / 0.2, 1); // Merge phase
          const baseY = startY + (endY - startY) * m;
          
          let fall = 0;
          if (s > 0.3) { // Fall phase (0.3 -> 0.5)
            const clampedS = Math.min(s, 0.5);
            // Fall distance reaches down to roughly 60vh
            fall = ((clampedS - 0.3) / 0.2) * (windowHeight * 0.35); 
          }
          return baseY - gridSize / 2 + fall;
        });
        
        // When they merge, morph from squares to circles
        const rx = useTransform(scrollYProgress, (s) => {
          let m = 0;
          if (s > 0.1) m = Math.min((s - 0.1) / 0.2, 1);
          return m * (gridSize / 2);
        });

        blocks.push(
          <motion.rect
            key={`${row}-${col}`}
            width={gridSize}
            height={gridSize}
            fill="var(--accent)"
            style={{
              x,
              y,
              rx,
              scaleX: dropScaleX,
              scaleY: dropScaleY,
              opacity: dropOpacity,
              transformOrigin: "center"
            }}
          />
        );
      }
    }
    return blocks;
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.stickyWrapper}>
        
        {/* The Gooey Grid SVG */}
        <svg 
          className={styles.svgGooey} 
          width={windowWidth} 
          height={windowHeight} 
          viewBox={`0 0 ${windowWidth} ${windowHeight}`} 
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
          </defs>

          <g filter="url(#goo)">
             {renderGridBlocks()}
          </g>
        </svg>

        {/* The Leave A Note Text Reveal */}
        <motion.h2 
          className={styles.leaveNoteText}
          style={{ clipPath: textClipPath }}
        >
          Leave a note.
        </motion.h2>
      </div>
    </div>
  );
}
