import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import TextAnimate from './TextAnimate';
import styles from './AnimatedHeading.module.css';

const words = ['build', 'design', 'craft', 'shape', 'refine'];

const characterVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    rotate: 35,
    scale: 0.6,
  },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      y: {
        type: 'spring',
        damping: 12,
        stiffness: 220,
        mass: 0.8,
      },
      rotate: {
        type: 'spring',
        damping: 8,
        stiffness: 160,
      },
      scale: {
        type: 'spring',
        damping: 10,
        stiffness: 300,
      },
    },
  }),
  exit: (i) => ({
    opacity: 0,
    y: -22,
    rotate: -20,
    scale: 0.7,
    transition: {
      delay: i * 0.02,
      duration: 0.25,
      ease: [0.32, 0, 0.67, 0],
    },
  }),
};

export default function AnimatedHeading({ className }) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2200);
    
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <h1 className={className}>
      {/* Screen reader only text so it isn't announced constantly */}
      <span className={styles.srOnly}>Let's build something worth using.</span>
      
      {/* Visual presentation preserving exact layout and structure */}
      <span aria-hidden="true" className={styles.headingFlex}>
        <TextAnimate by="character" startDelay={0.7}>Let's </TextAnimate>
        
        <span className={styles.wordWrapper}>
          {/* The ghost word ensures the wrapper is always exactly the width of the longest word */}
          <span className={styles.ghostWord}>design</span>
          
          {shouldReduceMotion ? (
            <span className={styles.animatingWord}>{words[0]}</span>
          ) : (
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                className={styles.animatingWord}
                initial="hidden"
                animate="show"
                exit="exit"
                style={{ display: 'inline-flex' }}
              >
                {words[index].split('').map((char, charIdx) => (
                  <motion.span
                    key={`${words[index]}-${char}-${charIdx}`}
                    custom={charIdx}
                    variants={characterVariants}
                    style={{
                      display: 'inline-block',
                      transformOrigin: 'center center',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </AnimatePresence>
          )}
        </span>

        <TextAnimate by="character" startDelay={0.7} delayOffset={6}>
          something worth using.
        </TextAnimate>
      </span>
    </h1>
  );
}
