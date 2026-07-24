import React, { useRef, useState } from 'react';
import styles from './HoverTiltCard.module.css';

export default function HoverTiltCard({ children, className }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 12 degrees)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setRotate({ x: rotateX, y: rotateY });
    setMousePos({ 
      x: (x / rect.width) * 100, 
      y: (y / rect.height) * 100 
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className={styles.cardWrapper}>
      <div 
        className={`${styles.cardInner} ${className || ''}`}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          '--rx': `${rotate.x}deg`,
          '--ry': `${rotate.y}deg`,
          '--mx': `${mousePos.x}%`,
          '--my': `${mousePos.y}%`,
        }}
      >
        {/* The shine effect overlay for border and surface */}
        <div className={styles.shine} />
        {children}
      </div>
    </div>
  );
}
