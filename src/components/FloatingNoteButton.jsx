import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit3 } from 'react-icons/fi';
import styles from './FloatingNoteButton.module.css';

export default function FloatingNoteButton() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const handleClick = () => {
    if (isHome) {
      document.getElementById('signature-wall')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#signature-wall');
    }
  };

  return (
    <motion.button
      className={`${styles.floatingBtn} ${isHome ? styles.homePos : styles.otherPos}`}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-cursor-hover="true"
      aria-label="Leave a Note"
    >
      <FiEdit3 className={styles.icon} />
      <span className={styles.text}>Leave a Note</span>
    </motion.button>
  );
}
