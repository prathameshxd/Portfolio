import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SignatureWall from '../components/SignatureWall';
import { SiAnthropic, SiGooglegemini, SiOpenai } from 'react-icons/si';

import {
  FiLayout, FiUsers, FiCheckCircle, FiMap, FiPenTool, FiTerminal
} from 'react-icons/fi';
import StackIcon from 'tech-stack-icons';
import styles from './Home.module.css';

const bentoCategories = [
  {
    id: 'design',
    title: 'Design & Research',
    color: '#D4FF3F',
    tools: [
      { name: 'Figma', stackIcon: "figma", color: '#F24E1E', img: '/images/figma.svg' },
      { name: 'Framer', stackIcon: "framer", color: '#0055FF' },
      { name: 'Research', icon: FiUsers, color: '#E2E8F0' },
      { name: 'Wireframes', icon: FiPenTool, color: '#E2E8F0' },
      { name: 'Prototypes', icon: FiLayout, color: '#E2E8F0' },
      { name: 'Testing', icon: FiCheckCircle, color: '#E2E8F0' },
      { name: 'Mapping', icon: FiMap, color: '#E2E8F0' },
    ]
  },
  {
    id: 'ai',
    title: 'AI Collaborators',
    color: '#FF7B9C',
    tools: [
      { name: 'Claude', icon: SiAnthropic, color: '#D4C5B9', img: '/images/claude.svg' },
      { name: 'Gemini', icon: SiGooglegemini, color: '#1A73E8' },
      { name: 'ChatGPT', icon: SiOpenai, color: '#10A37F' },
      { name: 'Antigravity', icon: FiTerminal, color: '#FF00FF', img: '/images/antigravity.svg' },
    ]
  },
  {
    id: 'code',
    title: 'Core Technologies',
    color: '#FFB84D',
    tools: [
      { name: 'HTML5', stackIcon: "html5", color: '#E34F26' },
      { name: 'CSS3', stackIcon: "css3", color: '#1572B6' },
      { name: 'JavaScript', stackIcon: "js", color: '#F7DF1E' },
      { name: 'GitHub', stackIcon: "github", color: '#181717' },
    ]
  }
];

const textVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
};

const wordAnimation = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
  }
};

const SplitText = ({ children }) => {
  return (
    <span className={styles.splitTextLine}>
      {children.split(" ").map((word, index) => (
        <span key={index} className={styles.wordWrapper}>
          <motion.span variants={wordAnimation} className={styles.word}>
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <motion.p
              className="label-mono"
              initial="hidden"
              animate="visible"
              custom={0}
              variants={textVariant}
            >
              UI/UX DESIGNER · KALYAN, MAHARASHTRA, INDIA
            </motion.p>

            <motion.h1
              className={`h1-display ${styles.heroTitle}`}
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              <SplitText>Designing Digital</SplitText>
              <SplitText>Experiences That Solves</SplitText>
              <SplitText>Human Problems.</SplitText>
              
              <motion.div 
                className={styles.heroImageWrapper}
                initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: ['-50%', '-50%', '-50%', '-50%'],
                  y: ['-50%', '-55%', '-45%', '-50%']
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.8, ease: "easeOut" },
                  scale: { duration: 0.8, delay: 0.8, ease: "easeOut" },
                  x: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
                }}
              >
                <img src="/photo.jpg" alt="Prathamesh Patil" className={styles.heroImage} />
              </motion.div>
            </motion.h1>

            <motion.p
              className={styles.heroSubtext}
              initial="hidden"
              animate="visible"
              custom={4}
              variants={textVariant}
            >
              I specialize in data-driven product strategy and user research to craft accessible, high-fidelity interfaces. My focus is on understanding human behavior to design intuitive digital solutions that genuinely help people and remove friction from their daily lives.
            </motion.p>

            <motion.div
              className={styles.ctaGroup}
              initial="hidden"
              animate="visible"
              custom={5}
              variants={textVariant}
            >
              <Link to="/work" className={styles.btnPrimary} data-cursor-hover="true">
                View Projects
              </Link>
              <a href="/Prathamesh_Patil_resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary} data-cursor-hover="true">
                Resume
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className={styles.marqueeSection}>
        <div className={styles.marqueeContainer}>
          <motion.div
            className={styles.marqueeTrack}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20
            }}
          >
            <span className={styles.marqueeText}>FIGMA · USER RESEARCH · PROTOTYPING · DESIGN SYSTEMS · AI-ASSISTED DESIGN · FIGMA · USER RESEARCH · PROTOTYPING · DESIGN SYSTEMS · AI-ASSISTED DESIGN ·</span>
            <span className={styles.marqueeText}>FIGMA · USER RESEARCH · PROTOTYPING · DESIGN SYSTEMS · AI-ASSISTED DESIGN · FIGMA · USER RESEARCH · PROTOTYPING · DESIGN SYSTEMS · AI-ASSISTED DESIGN ·</span>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <motion.div
          className={styles.aboutContent}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.aboutTextCol}>
            <h2 className={styles.sectionTitle}>About</h2>
            <p className={styles.aboutText}>
              My foundation in computer science allows me to approach UX design with a highly structured, analytical mindset—ensuring the interfaces I conceptualize are built on logical, accessible systems rather than just aesthetics. When I am off the grid, I am usually trekking the Sahyadri mountains or capturing landscape photography.
            </p>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3 className={styles.statValue}>2026</h3>
              <p className={styles.statLabel}>B.Sc. Computer Science</p>
              <p className={styles.statDesc}>Mumbai University<br />(2023–2026)</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statValue}>2025</h3>
              <p className={styles.statLabel}>Google UX Cert</p>
              <p className={styles.statDesc}>User research, wireframing, prototyping, usability testing</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stack Section */}
      <section className={styles.stackSection}>
        <div className={styles.stackHeader}>
          <span className={styles.stackBadge}>TECH STACK</span>
          <h2 className={styles.stackTitle}>Tools I Build With</h2>
          <p className={styles.stackDesc}>
            A curated set of technologies and methods I rely on to build modern web experiences.
          </p>
        </div>

        <div className={styles.bentoGrid}>
          {bentoCategories.map((category, index) => (
            <motion.div 
              key={category.id}
              className={`${styles.bentoCard} ${styles[category.id]}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
              style={{ '--card-color': category.color }}
            >
              <div className={styles.bentoGlow} />
              <h3 className={styles.bentoTitle}>{category.title}</h3>
              <div className={styles.bentoTools}>
                {category.tools.map(tool => {
                  const Icon = tool.icon;
                  return (
                    <div key={tool.name} className={styles.bentoToolPill}>
                      {tool.img ? (
                        <img src={tool.img} alt={tool.name} className={styles.toolImage} />
                      ) : tool.stackIcon ? (
                        <div style={{width: 24, height: 24, display: 'flex'}}><StackIcon name={tool.stackIcon} /></div>
                      ) : (
                        <Icon className={styles.bentoToolIcon} color={tool.color} />
                      )}
                      <span>{tool.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <SignatureWall />

      {/* Teaser */}
      <section className={styles.teaser}>
        <Link to="/contact" data-cursor-hover="true">
          <motion.h2
            className="h1-display"
            whileHover={{ scale: 0.98, opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            Let's build something <span className={styles.arrow}>→</span>
          </motion.h2>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
