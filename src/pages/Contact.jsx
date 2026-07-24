import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
  const [formState, setFormState] = useState('idle'); // idle, submitting, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');

    const formData = new FormData(e.target);
    formData.append("access_key", "be92650d-8d94-48e0-854f-8eefac5fad32");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const data = await response.json();

      if (data.success) {
        setFormState('success');
      } else {
        setFormState('idle');
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      setFormState('idle');
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.contactSection}>
      <div className={styles.contentWrapper}>
        
        <motion.div 
          className={styles.headerRow}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className={styles.title}>Let's Talk.</h1>
          <div className={styles.socials}>
            <a href="mailto:prathmeshpatila5@gmail.com" className={styles.socialLink}>Email</a>
            <a href="https://www.linkedin.com/in/prathamesh-patil-5652a1358/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
            <a href="https://www.behance.net/prathmeshpatila5" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Behance</a>
          </div>
        </motion.div>

        {formState === 'success' ? (
          <motion.div 
            className={styles.successMessage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Thank you. Your message has been sent.<br/>
            <span style={{ fontSize: '1.5rem', opacity: 0.6, color: '#111' }}>I will get back to you shortly.</span>
          </motion.div>
        ) : (
          <motion.form 
            className={styles.conversationalForm} 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.formText}>Hello Prathamesh! My name is</span>
            <input 
              type="text" 
              name="name" 
              required 
              className={styles.blankInput} 
              placeholder="Your Name"
            />
            <span className={styles.formText}>from</span>
            <input 
              type="text" 
              name="company" 
              className={styles.blankInput} 
              placeholder="Company / School (Optional)"
            />
            <span className={styles.formText}>. I am reaching out because I want to talk about</span>
            <input 
              type="text" 
              name="message" 
              required 
              className={`${styles.blankInput} ${styles.messageInput}`} 
              placeholder="a new website / a bold idea / hiring you"
            />
            <span className={styles.formText}>. You can reach me back at</span>
            <input 
              type="email" 
              name="email" 
              required 
              className={styles.blankInput} 
              placeholder="Your Email"
            />
            <span className={styles.formText}>. Let's build something amazing.</span>

            <div className={styles.submitContainer}>
              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={formState === 'submitting'}
              >
                {formState === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </motion.form>
        )}

      </div>
    </div>
  );
}
