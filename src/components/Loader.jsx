import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '50vh', width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          fontSize: '2rem',
          fontWeight: '900',
          fontFamily: 'Inter, sans-serif',
          color: 'var(--accent, #D4FF3F)',
          letterSpacing: '-2px'
        }}
      >
        PP
      </motion.div>
    </div>
  );
}
