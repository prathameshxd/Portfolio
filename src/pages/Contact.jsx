import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Footer from '../components/Footer';
import styles from './Contact.module.css';

const MagneticButton = ({ children, href }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.magneticLink}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      data-cursor-hover="true"
    >
      {children}
    </motion.a>
  );
};

export default function Contact() {
  const [formState, setFormState] = useState('idle'); // idle, submitting, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.target);
    // Web3Forms Access Key
    formData.append("access_key", "be92650d-8d94-48e0-854f-8eefac5fad32");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormState('success');
      } else {
        console.error("Error submitting form", data);
        setFormState('idle');
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setFormState('idle');
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.contact}>
      <section className={styles.hero}>
        <motion.h1 
          className="h1-display"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          Let's Talk.
        </motion.h1>
      </section>

      <section className={styles.content}>
        <div className={styles.directContact}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="label-mono">Email</p>
            <a href="mailto:prathmeshpatila5@gmail.com" className={styles.bigLink} data-cursor-hover="true">
              prathmeshpatila5@gmail.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="label-mono">Phone</p>
            <a href="tel:+918928584724" className={styles.bigLink} data-cursor-hover="true">
              +91 89285 84724
            </a>
          </motion.div>

          <motion.div
            className={styles.socialRow}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="label-mono">Socials</p>
            <div className={styles.socialLinks}>
              <MagneticButton href="https://linkedin.com">LinkedIn</MagneticButton>
              <MagneticButton href="https://behance.net">Behance</MagneticButton>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className={styles.formWrapper}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {formState === 'success' ? (
            <div className={styles.successMessage}>
              <motion.h3 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}
              >
                Message Sent!
              </motion.h3>
              <p style={{ color: 'rgba(247, 246, 242, 0.7)' }}>I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input type="text" id="name" name="name" required placeholder=" " />
                <label htmlFor="name">Your Name</label>
              </div>
              <div className={styles.inputGroup}>
                <input type="email" id="email" name="email" required placeholder=" " />
                <label htmlFor="email">Your Email</label>
              </div>
              <div className={styles.inputGroup}>
                <textarea id="message" name="message" required placeholder=" " rows={5}></textarea>
                <label htmlFor="message">Your Message</label>
              </div>
              <button 
                type="submit" 
                className={styles.submitBtn}
                data-cursor-hover="true"
                disabled={formState === 'submitting'}
              >
                {formState === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
