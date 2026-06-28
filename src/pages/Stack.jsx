import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import styles from './Stack.module.css';
import { 
  SiFigma, SiFramer, SiReact, SiHtml5, SiCss, SiJavascript, 
  SiAnthropic, SiGooglegemini, SiOpenai 
} from 'react-icons/si';
import { 
  FiLayout, FiTerminal, FiUsers, FiCheckCircle, FiMap 
} from 'react-icons/fi';

const TOOLS = [
  // Design & Prototyping
  { id: 'figma', name: 'Figma', category: 'Design & Prototyping', desc: 'End-to-end UI design and interactive prototyping.', icon: SiFigma, color: '#F24E1E' },
  { id: 'framer', name: 'Framer', category: 'Design & Prototyping', desc: 'High-fidelity interactions and web publishing.', icon: SiFramer, color: '#0055FF' },
  { id: 'stitch', name: 'Stitch', category: 'Design & Prototyping', desc: 'Advanced prototyping and component modeling.', icon: FiLayout, color: '#FF3366' },
  // AI Collaborators
  { id: 'claude', name: 'Claude', category: 'AI Collaborators', desc: 'Strategic thinking and complex problem solving.', icon: SiAnthropic, color: '#D4C5B9' },
  { id: 'gemini', name: 'Gemini', category: 'AI Collaborators', desc: 'Multimodal analysis and rapid ideation.', icon: SiGooglegemini, color: '#1A73E8' },
  { id: 'chatgpt', name: 'ChatGPT', category: 'AI Collaborators', desc: 'Code generation and architectural drafting.', icon: SiOpenai, color: '#10A37F' },
  { id: 'antigravity', name: 'Antigravity', category: 'AI Collaborators', desc: 'Agentic IDE for autonomous coding workflows.', icon: FiTerminal, color: '#FF00FF' },
  // Code
  { id: 'react', name: 'React', category: 'Code', desc: 'Component-based UI development.', icon: SiReact, color: '#61DAFB' },
  { id: 'html5', name: 'HTML5', category: 'Code', desc: 'Semantic markup and accessibility.', icon: SiHtml5, color: '#E34F26' },
  { id: 'css3', name: 'CSS3', category: 'Code', desc: 'Styling, layout, and animations.', icon: SiCss, color: '#1572B6' },
  { id: 'js', name: 'JavaScript', category: 'Code', desc: 'Client-side logic and interactions.', icon: SiJavascript, color: '#F7DF1E' },
  // UX Methods
  { id: 'research', name: 'User Research', category: 'UX Methods', desc: 'Qualitative and quantitative user insights.', icon: FiUsers, color: '#888888' },
  { id: 'testing', name: 'Usability Testing', category: 'UX Methods', desc: 'Validating assumptions with real users.', icon: FiCheckCircle, color: '#888888' },
  { id: 'journey', name: 'Journey Mapping', category: 'UX Methods', desc: 'Visualizing the end-to-end user experience.', icon: FiMap, color: '#888888' },
];

export default function Stack() {
  const categories = [...new Set(TOOLS.map(t => t.category))];

  return (
    <div className={styles.stackPage}>
      <header className={styles.header}>
        <motion.h1 
          className="h1-display"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          The Tools<br/>Behind the Work
        </motion.h1>
      </header>

      <div className={styles.content}>
        {categories.map((cat, idx) => (
          <section key={cat} className={styles.categorySection}>
            <motion.h2 
              className={styles.categoryTitle}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {cat}
            </motion.h2>
            <div className={styles.grid}>
              {TOOLS.filter(t => t.category === cat).map((tool, index) => (
                <motion.div
                  key={tool.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx * 0.1) + (index * 0.05) }}
                >
                  <div className={styles.iconWrapper} style={{ color: tool.color }}>
                    <tool.icon size={28} />
                  </div>
                  <div className={styles.cardInfo}>
                    <h3>{tool.name}</h3>
                    <p>{tool.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </div>
  );
}
