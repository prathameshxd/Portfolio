import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './AnimatedHeading.module.css';

const words = ['build', 'design', 'craft', 'shape', 'refine'];

export default function AnimatedHeading({ className }) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1900); // Roughly 1.8-2 seconds
    
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <h1 className={className}>
      {/* Screen reader only text so it isn't announced constantly */}
      <span className={styles.srOnly}>Let's build something worth using.</span>
      
      {/* Visual presentation hidden from screen readers */}
      <span aria-hidden="true" className={styles.headingFlex}>
        <span>Let's </span>
        <span className={styles.wordWrapper}>
          {/* The ghost word ensures the wrapper is always exactly the width of the longest word */}
          <span className={styles.ghostWord}>design</span>
          
          {shouldReduceMotion ? (
            <span className={styles.animatingWord}>{words[0]}</span>
          ) : (
            <AnimatePresence initial={false}>
              <motion.span
                key={index}
                className={styles.animatingWord}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25, 
                  mass: 1 
                }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          )}
        </span>
        <span> something worth using.</span>
      </span>
    </h1>
  );
}
