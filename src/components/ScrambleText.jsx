import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import styles from './ScrambleText.module.css';

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export default function ScrambleText({ text, className }) {
  const containerRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start decoding when it enters screen, finish when it's fully in center
    offset: ["start 90%", "center center"] 
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, text.length]);

  useMotionValueEvent(progress, "change", (latest) => {
    const revealedCount = Math.floor(latest);
    let newText = "";
    
    for (let i = 0; i < text.length; i++) {
      if (i < revealedCount) {
        newText += text[i];
      } else if (text[i] === " ") {
        newText += " "; // Preserve spaces
      } else {
        newText += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      }
    }
    
    setDisplayText(newText);
  });

  // Initialize with full gibberish on mount
  useEffect(() => {
    let initText = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") initText += " ";
      else initText += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    }
    setDisplayText(initText);
  }, [text]);

  return (
    <section ref={containerRef} className={`${styles.scrambleSection} ${className || ''}`}>
      <h2 className={styles.scrambleText}>{displayText}</h2>
    </section>
  );
}
