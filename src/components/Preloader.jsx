import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from './Preloader.module.css';

const words = [
  "नमस्ते",
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "Olá",
  "こんにちは",
  "你好"
];

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(() => {
        onComplete();
      }, 800);
      return;
    }
    
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150); // Keep first word longer, flash others fast
    
    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  return (
    <motion.div 
      className={styles.preloader}
      initial={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className={styles.wordContainer}>
        <motion.p 
          className={styles.word}
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.1 }}
        >
          <span className={styles.dot}></span> {words[index]}
        </motion.p>
      </div>
    </motion.div>
  );
}

Preloader.propTypes = {
  onComplete: PropTypes.func.isRequired,
};
