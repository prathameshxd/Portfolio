import React, { useRef } from 'react';
import styles from './HoverTiltCard.module.css';

export default function HoverTiltCard({ children, className }) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const card = cardRef.current;
    if (!card) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;
      
      card.style.setProperty('--rx', `${rotateX}deg`);
      card.style.setProperty('--ry', `${rotateY}deg`);
      card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '50%');
  };

  return (
    <div className={styles.cardWrapper}>
      <div 
        className={`${styles.cardInner} ${className || ''}`}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* The shine effect overlay for border and surface */}
        <div className={styles.shine} />
        {children}
      </div>
    </div>
  );
}
