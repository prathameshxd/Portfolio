import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowDownRight } from 'react-icons/fi';
import styles from './WorkExperience.module.css';

const EXPERIENCES = [
  {
    id: 'yupe',
    period: 'Aug 2026 — Sep 2026',
    company: 'YuPe',
    role: 'UX/UI Design Intern',
    bullets: [
      'Designed end-to-end mobile experiences across onboarding, authentication, financial management, and AI-powered features.',
      'Designed the Yufi AI experience, creating a personalized financial guidance journey within YuPe.',
      'Redesigned Finboard’s core financial flows, simplifying expense, income, savings, and transaction management.',
      'Redesigned the Yupe website and contributed to a product launch that reached 500+ downloads.'
    ]
  }
];

export default function WorkExperience() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.experienceSection}>
      <div className={styles.sectionHeader}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
          Work Experiences
        </motion.h2>
      </div>

      <div className={styles.experienceList}>
        {EXPERIENCES.map((exp, index) => {
          const isOpen = expandedId === exp.id;
          return (
            <motion.div
              key={exp.id}
              className={styles.experienceItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              onMouseEnter={() => setExpandedId(exp.id)}
              onMouseLeave={() => setExpandedId(null)}
            >
              <div
                className={styles.itemHeader}
                onClick={() => toggleExpand(exp.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(exp.id);
                  }
                }}
                aria-expanded={isOpen}
                data-cursor-hover="true"
              >
                <span className={styles.period}>{exp.period}</span>
                <span className={styles.company}>{exp.company}</span>
                <span className={styles.role}>{exp.role}</span>
                <div className={styles.arrowWrapper}>
                  <FiArrowDownRight
                    className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ''}`}
                  />
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className={styles.detailsWrapper}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
                      opacity: { duration: 0.25, ease: 'easeOut' }
                    }}
                  >
                    <div className={styles.detailsContent}>
                      <ul className={styles.bulletList}>
                        {exp.bullets.map((bullet, bIndex) => (
                          <li key={bIndex} className={styles.bulletItem}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
