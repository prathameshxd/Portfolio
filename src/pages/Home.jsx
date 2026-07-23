import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SignatureWall from '../sections/SignatureWall';
import { SiAnthropic, SiGooglegemini, SiOpenai, SiFigma, SiFramer, SiHtml5, SiCss, SiJavascript, SiGithub } from 'react-icons/si';

import { FiLayout, FiTerminal, FiUsers, FiCheckCircle, FiMap, FiList, FiEye, FiPenTool } from 'react-icons/fi';
import PropTypes from 'prop-types';
import styles from './Home.module.css';

const WORKFLOW_STAGES = [
  {
    id: 'discover',
    number: '01',
    title: 'DISCOVER',
    philosophy: 'Understand the real problem first.',
    color: '#8CA0B3',
    tools: [
      { name: 'User Research', icon: FiUsers, desc: 'Qualitative and quantitative insights.' },
      { name: 'User Interviews', icon: FiUsers, desc: 'Talking to real people to uncover needs.' },
      { name: 'Personas', icon: FiUsers, desc: 'Mapping user archetypes.' },
      { name: 'Journey Mapping', icon: FiMap, desc: 'Visualizing the end-to-end user experience.' },
      { name: 'Information Arch', icon: FiList, desc: 'Structuring content logically.' },
    ]
  },
  {
    id: 'design',
    number: '02',
    title: 'DESIGN',
    philosophy: 'Shape it in Figma before it\'s anywhere else.',
    color: '#D4FF3F',
    tools: [
      { name: 'Figma', icon: SiFigma, desc: 'End-to-end UI design and interactive prototyping.', img: '/images/figma.svg' },
      { name: 'Framer', icon: SiFramer, desc: 'High-fidelity interactions and web publishing.' },
      { name: 'Wireframing', icon: FiLayout, desc: 'Low-fidelity structural layouts.' },
      { name: 'Prototyping', icon: FiLayout, desc: 'Connecting screens for user testing.' },
      { name: 'Design Systems', icon: FiLayout, desc: 'Building scalable UI component libraries.' },
    ]
  },
  {
    id: 'build',
    number: '03',
    title: 'BUILD',
    philosophy: 'Design and code converge here, with AI as a collaborator.',
    color: '#FFB84D',
    tools: [
      { name: 'HTML5', icon: SiHtml5, desc: 'Semantic markup and accessibility.' },
      { name: 'CSS3', icon: SiCss, desc: 'Styling, layout, and animations.' },
      { name: 'JavaScript', icon: SiJavascript, desc: 'Client-side logic and interactions.' },
      { name: 'GitHub', icon: SiGithub, desc: 'Version control and collaboration.' },
      { name: 'Claude', icon: SiAnthropic, desc: 'Drafting UX copy and case study writing.', img: '/images/claude.svg' },
      { name: 'Gemini', icon: SiGooglegemini, desc: 'Multimodal analysis and rapid ideation.' },
      { name: 'ChatGPT', icon: SiOpenai, desc: 'Code generation and architectural drafting.' },
      { name: 'Antigravity', icon: FiTerminal, desc: 'Turning Figma frames into front-end code.', img: '/images/antigravity.svg' },
      { name: 'Stitch', icon: FiLayout, desc: 'Advanced prototyping and component modeling.' },
    ]
  },
  {
    id: 'refine',
    number: '04',
    title: 'REFINE',
    philosophy: 'Test it on real users, then tighten it.',
    color: '#FF7B9C',
    tools: [
      { name: 'Usability Testing', icon: FiCheckCircle, desc: 'Validating assumptions with real users.' },
      { name: 'Interaction Design', icon: FiEye, desc: 'Polishing micro-interactions and feedback.' },
      { name: 'Data Vis', icon: FiLayout, desc: 'Making complex data readable and beautiful.' },
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

SplitText.propTypes = {
  children: PropTypes.string.isRequired,
};

export default function Home() {
  const [activeStage, setActiveStage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStageInteraction = (id) => {
    if (isMobile) {
      setActiveStage(activeStage === id ? null : id);
    }
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: prefersReducedMotion ? 0 : 0.15 * i + 0.2, duration: 0.5 }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

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
              <span className={styles.splitTextLine}>
                <SplitText>Experiences</SplitText>
                <span className={styles.textSpacer}>
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
                    <img src="/avatar.webp" alt="Prathamesh Patil" className={styles.heroImage} />
                  </motion.div>
                </span>
                <SplitText>That Solve</SplitText>
              </span>
              <SplitText>Human Problems.</SplitText>
            </motion.h1>


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
              My foundation in computer science allows me to approach UX design with a highly structured, analytical mindset ensuring the interfaces I conceptualize are built on logical, accessible systems rather than just aesthetics. When I am off the grid, I am usually trekking the Sahyadri mountains or capturing landscape photography.
            </p>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3 className={styles.statValue}>2026</h3>
              <p className={styles.statLabel}>B.Sc. Computer Science</p>
              <p className={styles.statDesc}>Mumbai University<br />(2023–2026)</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stack Section */}
      <section className={styles.stackSection}>
        <div className={styles.stackHeader}>
          <h2 className={styles.stackTitle}>Tools I Build With</h2>
        </div>


        <div className={styles.flowContainer}>
          <div
            className={styles.stagesWrapper}
            data-has-active={activeStage !== null}
          >
            {WORKFLOW_STAGES.map((stage, i) => (
              <div key={stage.id} style={{ display: "block", flex: 1 }}>
                <motion.div
                  className={`${styles.stageNode} ${activeStage === stage.id ? styles.active : ''}`}
                  style={{ '--node-color': stage.color }}
                  custom={i}
                  variants={prefersReducedMotion ? containerVariants : nodeVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  onMouseEnter={() => !isMobile && setActiveStage(stage.id)}
                  onMouseLeave={() => !isMobile && setActiveStage(null)}
                  onClick={() => handleStageInteraction(stage.id)}
                >
                  <div className={styles.stageNumber}>{stage.number}</div>
                  <h2 className={styles.stageTitle}>{stage.title}</h2>
                  <p className={styles.stagePhilosophy}>{stage.philosophy}</p>

                  <AnimatePresence>
                    {(!isMobile || activeStage === stage.id) && (
                      <motion.div
                        className={styles.toolsList}
                        initial={isMobile ? { height: 0, opacity: 0 } : false}
                        animate={isMobile ? { height: 'auto', opacity: 1 } : false}
                        exit={isMobile ? { height: 0, opacity: 0 } : false}
                        transition={{ duration: 0.3 }}
                      >
                        {stage.tools.map(tool => {
                          const Icon = tool.icon;
                          return (
                            <div key={tool.name} className={styles.toolPill}>
                              {tool.img ? (
                                <img src={tool.img} alt={tool.name} className={styles.toolImage} loading="lazy" />
                              ) : (
                                <Icon className={styles.toolIcon} />
                              )}
                              <span>{tool.name}</span>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            ))}
          </div>
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
