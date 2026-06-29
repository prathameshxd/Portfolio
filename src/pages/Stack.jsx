import { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import styles from './Stack.module.css';
import { SiAnthropic, SiGooglegemini, SiOpenai } from 'react-icons/si';

import {
  FiLayout, FiTerminal, FiUsers, FiCheckCircle, FiMap, FiList, FiEye
} from 'react-icons/fi';
import StackIcon from 'tech-stack-icons';

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
      { name: 'Figma', stackIcon: "figma", desc: 'End-to-end UI design and interactive prototyping.', img: '/images/figma.svg' },
      { name: 'Framer', stackIcon: "framer", desc: 'High-fidelity interactions and web publishing.' },
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
      { name: 'HTML5', stackIcon: "html5", desc: 'Semantic markup and accessibility.' },
      { name: 'CSS3', stackIcon: "css3", desc: 'Styling, layout, and animations.' },
      { name: 'JavaScript', stackIcon: "js", desc: 'Client-side logic and interactions.' },
      { name: 'React', stackIcon: "reactjs", desc: 'Component-driven UI development.' },
      { name: 'Git', stackIcon: "git", desc: 'Version control and collaboration.' },
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

export default function Stack() {
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

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i) => ({
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { delay: prefersReducedMotion ? 0 : 0.3 * i + 0.5, duration: 0.5 }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className={styles.stackPage}>
      <header className={styles.header}>
        <motion.span 
          className="label-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          TECH STACK
        </motion.span>
        <motion.h1
          className="h1-display"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          How I Actually Work
        </motion.h1>
        <motion.p 
          className={styles.headerSubtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Less a list of logos, more the system behind how a project moves from idea to shipped interface.
        </motion.p>
      </header>

      <motion.p 
        className={styles.flowcaption}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Discover → Design → Build → Refine — every project moves through this loop.
      </motion.p>

      <div className={styles.flowContainer}>
        {/* SVG Track */}
        {!prefersReducedMotion && (
          <div className={styles.svgTrackWrapper}>
            <svg className={styles.svgTrack} preserveAspectRatio="none" viewBox="0 0 100 2">
              {!isMobile ? (
                <motion.line 
                  x1="0" y1="1" x2="100" y2="1" 
                  className={styles.svgTrackPath}
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  vectorEffect="non-scaling-stroke"
                />
              ) : (
                <motion.line 
                  x1="1" y1="0" x2="1" y2="100" 
                  className={styles.svgTrackPath}
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  vectorEffect="non-scaling-stroke"
                />
              )}
            </svg>
          </div>
        )}

        <div 
          className={styles.stagesWrapper} 
          data-has-active={activeStage !== null}
        >
          {WORKFLOW_STAGES.map((stage, i) => (
            <motion.div
              key={stage.id}
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
              <div className={styles.nodeMarker} />
              
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
                            <img src={tool.img} alt={tool.name} className={styles.toolImage} />
                          ) : tool.stackIcon ? (
                            <div style={{width: 20, height: 20, display: 'flex'}}><StackIcon name={tool.stackIcon} /></div>
                          ) : (
                            <Icon className={styles.toolIcon} />
                          )}
                          <span>{tool.name}</span>
                          <div className={styles.tooltip}>{tool.desc}</div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
