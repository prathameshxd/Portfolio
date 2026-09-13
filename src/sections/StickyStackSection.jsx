import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SiAnthropic, SiGooglegemini, SiOpenai, SiFigma, SiFramer, SiHtml5, SiCss, SiJavascript, SiGithub } from 'react-icons/si';
import { FiLayout, FiTerminal, FiUsers, FiCheckCircle, FiMap, FiList, FiEye } from 'react-icons/fi';
import styles from './StickyStackSection.module.css';

const WORKFLOW_STAGES = [
  {
    id: 'discover',
    number: '01',
    title: 'DISCOVER',
    philosophy: 'Understand the real problem first.',
    color: '#58A6FF',
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
    philosophy: 'Design and code converge here, with AI as a superpower collaborator.',
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
      { name: 'A/B Testing', icon: FiCheckCircle, desc: 'Measuring conversion and user flow impact.' },
      { name: 'A11y Standards', icon: FiEye, desc: 'WCAG compliance and accessibility checks.' },
      { name: 'QA Polish', icon: FiCheckCircle, desc: 'Ensuring pixel-perfect edge case behavior.' },
    ]
  }
];

const CARD_RANGES = [
  { start: 0.06, end: 0.22 }, // Card 01 (DISCOVER)
  { start: 0.23, end: 0.39 }, // Card 02 (DESIGN)
  { start: 0.40, end: 0.56 }, // Card 03 (BUILD)
  { start: 0.57, end: 0.73 }, // Card 04 (REFINE)
];

const MobileStageCard = ({ stage, handleStageInteraction }) => {
  return (
    <div className={styles.stageCardWrapper}>
      <div
        className={styles.stageNode}
        style={{ '--node-color': stage.color }}
        onClick={() => handleStageInteraction(stage.id)}
      >
        <div className={styles.stageHeaderContent}>
          <div className={styles.stageNumber}>{stage.number}</div>
          <h2 className={styles.stageTitle}>{stage.title}</h2>
          <p className={styles.stagePhilosophy}>{stage.philosophy}</p>
        </div>

        <div className={styles.toolsList}>
          {stage.tools.map(tool => {
            const Icon = tool.icon;
            return (
              <div key={tool.name} className={styles.toolPill}>
                {tool.img ? (
                  <img src={tool.img} alt={tool.name} className={styles.toolImage} loading="lazy" decoding="async" />
                ) : (
                  <Icon className={styles.toolIcon} />
                )}
                <span>{tool.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Helper component for desktop cards with 3D entry animation
const DesktopStageCard = ({ stage, index, scrollYProgress, setActiveStage }) => {
  const range = CARD_RANGES[index] || { start: 0.06 + index * 0.17, end: 0.06 + index * 0.17 + 0.16 };
  const cardStart = range.start;
  const cardEnd = range.end;
  const duration = cardEnd - cardStart;
  const settleMid = cardStart + duration * 0.55;
  
  const y = useTransform(
    scrollYProgress, 
    [cardStart, cardStart + duration * 0.7, cardEnd], 
    ["100vh", "6vh", "0vh"], 
    { clamp: true }
  );

  const opacity = useTransform(scrollYProgress, [cardStart, cardStart + 0.012, cardEnd], [0, 1, 1], { clamp: true });
  const scale = useTransform(scrollYProgress, [cardStart, settleMid, cardEnd], [0.86, 0.96, 1], { clamp: true });

  const zAngles = [-16, -7, 7, 16];
  const initialZ = zAngles[index % zAngles.length];

  const yAngles = [-12, -5, 5, 12];
  const initialY = yAngles[index % yAngles.length];

  const rotateZ = useTransform(
    scrollYProgress, 
    [cardStart, settleMid, cardEnd], 
    [initialZ, initialZ * 0.55, 0], 
    { clamp: true }
  );

  const rotateX = useTransform(
    scrollYProgress, 
    [cardStart, settleMid, cardEnd], 
    [24, 8, 0], 
    { clamp: true }
  );

  const rotateY = useTransform(
    scrollYProgress, 
    [cardStart, settleMid, cardEnd], 
    [initialY, initialY * 0.45, 0], 
    { clamp: true }
  );

  return (
    <motion.div 
      className={styles.stageCardWrapper} 
      style={{ 
        display: "flex", 
        flex: 1, 
        y, 
        opacity, 
        scale,
        rotateZ,
        rotateX,
        rotateY,
      }}
    >
      <motion.div
        className={styles.stageNode}
        style={{ '--node-color': stage.color }}
        onMouseEnter={() => setActiveStage(stage.id)}
        onMouseLeave={() => setActiveStage(null)}
      >
        <div className={styles.stageHeaderContent}>
          <div className={styles.stageNumber}>{stage.number}</div>
          <h2 className={styles.stageTitle}>{stage.title}</h2>
          <p className={styles.stagePhilosophy}>{stage.philosophy}</p>
        </div>

        <div className={styles.toolsList}>
          {stage.tools.map(tool => {
            const Icon = tool.icon;
            return (
              <div key={tool.name} className={styles.toolPill}>
                {tool.img ? (
                  <img src={tool.img} alt={tool.name} className={styles.toolImage} loading="lazy" decoding="async" />
                ) : (
                  <Icon className={styles.toolIcon} />
                )}
                <span>{tool.name}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function StickyStackSection() {
  const [containerNode, setContainerNode] = useState(null);
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
    target: containerNode ? { current: containerNode } : undefined,
    offset: ["start start", "end end"]
  });

  // Title animations: pinned cleanly at top
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [0.6, 1], { clamp: true });
  const titleScale = useTransform(scrollYProgress, [0, 0.05], [0.97, 1], { clamp: true });
  const titleY = useTransform(scrollYProgress, [0, 0.05], ["10px", "0px"], { clamp: true });

  const handleStageInteraction = (id) => {
    if (isMobile) {
      setActiveStage(prev => prev === id ? null : id);
    }
  };

  return (
    <section ref={setContainerNode} className={styles.scrollTrack}>
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
          <div className={styles.stagesWrapper}>
            {isMobile
              ? WORKFLOW_STAGES.map((stage) => (
                  <MobileStageCard 
                    key={stage.id} 
                    stage={stage} 
                    handleStageInteraction={handleStageInteraction}
                  />
                ))
              : WORKFLOW_STAGES.map((stage, i) => (
                  <DesktopStageCard 
                    key={stage.id} 
                    stage={stage} 
                    index={i} 
                    scrollYProgress={scrollYProgress}
                    setActiveStage={setActiveStage}
                  />
                ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
