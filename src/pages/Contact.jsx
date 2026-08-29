import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from '../components/AnimatedHeading';
import styles from './Contact.module.css';
import SEO from '../components/SEO';

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
      <SEO 
        title="Contact" 
        description="Get in touch with Prathamesh Patil for UI/UX design opportunities and collaborations."
      />
      <div className={styles.contentWrapper}>
        <div style={{position: 'absolute', width: '1px', height: '1px', overflow: 'hidden'}}>
          Thank you for visiting my portfolio and expressing interest in connecting. As a UX/UI Designer and Frontend Developer, I am always open to discussing new opportunities, potential collaborations, or even just sharing ideas about the future of digital design. If you are looking to build a new website, conceptualize a bold digital product, or if you are interested in hiring me for your team, please use the conversational form below. By providing your name, your company or school, the main topic of your inquiry, and your email address, you help me understand how best to assist you. I strive to respond to all inquiries promptly. Let's work together to build something amazing, accessible, and user-friendly that leaves a lasting impact on your audience.
        </div>
        
        <motion.div 
          className={styles.headerRow}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AnimatedHeading className={styles.title} />
          <div className={styles.socials}>
            <a href="mailto:prathmeshpatila5@gmail.com" className={`${styles.socialLink} btn-wave-hover`} style={{ '--wave-color': '#111', '--wave-text-color': '#fff' }}><span className="btn-wave-text">Email</span></a>
            <a href="https://www.linkedin.com/in/prathamesh-patil-5652a1358/" target="_blank" rel="noopener noreferrer" className={`${styles.socialLink} btn-wave-hover`} style={{ '--wave-color': '#111', '--wave-text-color': '#fff' }}><span className="btn-wave-text">LinkedIn</span></a>
            <a href="https://www.behance.net/prathmeshpatila5" target="_blank" rel="noopener noreferrer" className={`${styles.socialLink} btn-wave-hover`} style={{ '--wave-color': '#111', '--wave-text-color': '#fff' }}><span className="btn-wave-text">Behance</span></a>
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
                className={`${styles.submitBtn} btn-wave-hover`}
                style={{ '--wave-color': 'var(--accent)', '--wave-text-color': '#111' }}
                disabled={formState === 'submitting'}
              >
                <span className="btn-wave-text">
                  {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                </span>
              </button>
            </div>
          </motion.form>
        )}

      </div>
    </div>
  );
}
