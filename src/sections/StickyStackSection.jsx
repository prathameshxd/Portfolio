import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SiAnthropic, SiGooglegemini, SiOpenai, SiFigma, SiFramer, SiHtml5, SiCss, SiJavascript, SiGithub } from 'react-icons/si';
import { FiLayout, FiTerminal, FiUsers, FiCheckCircle, FiMap, FiList, FiEye } from 'react-icons/fi';
import styles from './StickyStackSection.module.css';

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

// Helper component for individual cards so they can have independent scroll transforms
const StageCard = ({ stage, index, scrollYProgress, activeStage, setActiveStage, isMobile, handleStageInteraction }) => {
  // Stagger the start time of each card based on its index
  const start = 0.05 + (index * 0.1);
  const center = start + 0.25; // When it hits the center
  const end = center + 0.35; // When it leaves the top of the screen
  
  // Cards slide from below the screen, rest near center, then slide up above the viewport
  const y = useTransform(scrollYProgress, [start, center, end], ["120vh", "0vh", "-120vh"]);
  
  // Opacity fades in on entry, fades out on exit
  const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);

  // "Cross" / Angle effect: cards come in at an angle, straighten out, then angle out
  const angles = [-15, -5, 5, 15]; // Different angle for each card
  const initialAngle = angles[index % angles.length];
  const rotate = useTransform(scrollYProgress, [start, center, end], [initialAngle, 0, -initialAngle]);

  return (
    <motion.div 
      className={styles.stageCardWrapper} 
      style={{ 
        display: "block", 
        flex: 1, 
        y: isMobile ? 0 : y, 
        opacity: isMobile ? 1 : opacity, 
        rotate: isMobile ? 0 : rotate 
      }}
    >
      <motion.div
        className={`${styles.stageNode} ${activeStage === stage.id ? styles.active : ''}`}
        style={{ '--node-color': stage.color }}
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
    </motion.div>
  );
};

export default function StickyStackSection() {
  const containerRef = useRef(null);
  const [activeStage, setActiveStage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Title animations: start slightly faded and lower, then snap to center quickly
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.05], [0.9, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.05], ["30px", "0px"]);

  const handleStageInteraction = (id) => {
    if (isMobile) {
      setActiveStage(prev => prev === id ? null : id);
    }
  };

  return (
    <section ref={containerRef} className={styles.scrollTrack}>
      <div className={styles.stickyFrame}>
        
        {/* Pinned Title */}
        <motion.div 
          className={styles.stackHeader}
          style={{ 
            opacity: isMobile ? 1 : titleOpacity, 
            scale: isMobile ? 1 : titleScale, 
            y: isMobile ? 0 : titleY 
          }}
        >
          <h2 className={styles.stackTitle}>The Arsenal</h2>
          <p className={styles.stackDesc}>Where design precision meets engineering scale. The instruments I use to forge digital experiences.</p>
        </motion.div>

        {/* Sliding Cards */}
        <div className={styles.cardsContainer}>
          <div className={styles.stagesWrapper} data-has-active={activeStage !== null}>
            {WORKFLOW_STAGES.map((stage, i) => (
              <StageCard 
                key={stage.id} 
                stage={stage} 
                index={i} 
                scrollYProgress={scrollYProgress}
                activeStage={activeStage}
                setActiveStage={setActiveStage}
                isMobile={isMobile}
                handleStageInteraction={handleStageInteraction}
              />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
