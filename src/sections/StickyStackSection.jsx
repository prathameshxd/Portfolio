import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  SiAnthropic, 
  SiGooglegemini, 
  SiOpenai, 
  SiFigma, 
  SiFramer, 
  SiHtml5, 
  SiGithub,
  SiReact
} from 'react-icons/si';
import { 
  FiLayout, 
  FiTerminal, 
  FiUsers, 
  FiCheckCircle, 
  FiMap, 
  FiList, 
  FiEye,
  FiLayers,
  FiZap
} from 'react-icons/fi';
import TextAnimate from '../components/TextAnimate';
import styles from './StickyStackSection.module.css';

const WORKFLOW_STAGES = [
  {
    id: 'discover',
    number: '01',
    category: 'RESEARCH & STRATEGY',
    title: 'DISCOVER',
    philosophy: 'Uncover real human needs, map journeys, and validate foundational assumptions.',
    color: '#38BDF8', // Cyan
    tools: [
      { name: 'User Research', icon: FiUsers },
      { name: 'User Interviews', icon: FiUsers },
      { name: 'Persona Mapping', icon: FiUsers },
      { name: 'Journey Mapping', icon: FiMap },
      { name: 'Information Arch', icon: FiList },
      { name: 'Usability Testing', icon: FiCheckCircle },
    ]
  },
  {
    id: 'design',
    number: '02',
    category: 'CRAFT & SYSTEMS',
    title: 'DESIGN',
    philosophy: 'Craft pixel-perfect interfaces, scalable design systems, and responsive layouts.',
    color: '#D4FF3F', // Electric Neon Lime
    tools: [
      { name: 'Figma', icon: SiFigma, img: '/images/figma.svg' },
      { name: 'Framer', icon: SiFramer },
      { name: 'Design Systems', icon: FiLayers },
      { name: 'Interactive Proto', icon: FiLayout },
      { name: 'Wireframing', icon: FiLayout },
      { name: 'Motion & UX', icon: FiEye },
    ]
  },
  {
    id: 'build',
    number: '03',
    category: 'DEVELOPMENT & AI',
    title: 'BUILD & AI',
    philosophy: 'Design and code converge into shipping software, amplified by agentic AI.',
    color: '#FFB84D', // Radiant Amber Gold
    tools: [
      { name: 'Claude', icon: SiAnthropic, img: '/images/claude.svg' },
      { name: 'Antigravity', icon: FiTerminal, img: '/images/antigravity.svg' },
      { name: 'Gemini', icon: SiGooglegemini },
      { name: 'ChatGPT', icon: SiOpenai },
      { name: 'React & JS', icon: SiReact },
      { name: 'HTML5 & CSS3', icon: SiHtml5 },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Live Prototyping', icon: FiZap },
    ]
  }
];

// Staggered sequential scroll ranges: all 3 cards start early and rise from ground with smooth wave overlap
const CARD_RANGES = [
  { start: 0.06, end: 0.38 }, // Card 01 (DISCOVER)
  { start: 0.18, end: 0.50 }, // Card 02 (DESIGN)
  { start: 0.30, end: 0.62 }, // Card 03 (BUILD & AI)
];

const MobileStageCard = ({ stage, index, handleStageInteraction }) => {
  return (
    <div className={styles.stageCardWrapper}>
      <div
        className={styles.stageNode}
        style={{ '--node-color': stage.color }}
        onClick={() => handleStageInteraction(stage.id)}
      >
        <div className={styles.topBeam} />

        <div className={styles.stageHeaderContent}>
          <div className={styles.stageNumber}>
            {stage.number} · {stage.category}
          </div>
          <TextAnimate 
            as="h2" 
            by="character" 
            className={styles.stageTitle}
            delayOffset={index * 2}
          >
            {stage.title}
          </TextAnimate>
          <p className={styles.stagePhilosophy}>{stage.philosophy}</p>
        </div>

        <div className={styles.toolsList}>
          {stage.tools.map(tool => {
            const Icon = tool.icon;
            return (
              <div key={tool.name} className={styles.toolItem}>
                <div className={styles.toolIconContainer}>
                  {tool.img ? (
                    <img src={tool.img} alt={tool.name} className={styles.toolImage} loading="lazy" decoding="async" />
                  ) : (
                    <Icon className={styles.toolIcon} />
                  )}
                </div>
                <span className={styles.toolName}>{tool.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Desktop cards with staggered rising-from-ground 3D motion and Magic UI character-pop headings
const DesktopStageCard = ({ stage, index, scrollYProgress, setActiveStage }) => {
  const range = CARD_RANGES[index] || { start: 0.06 + index * 0.12, end: 0.38 + index * 0.12 };
  const cardStart = range.start;
  const cardEnd = range.end;
  const duration = cardEnd - cardStart;
  const settleMid = cardStart + duration * 0.7;
  
  // Smoothly rises up from below the viewport (110vh) up to resting position (0vh)
  const y = useTransform(
    scrollYProgress, 
    [cardStart, settleMid, cardEnd], 
    ["110vh", "3vh", "0vh"], 
    { clamp: true }
  );

  const scale = useTransform(
    scrollYProgress, 
    [cardStart, settleMid, cardEnd], 
    [0.88, 0.98, 1], 
    { clamp: true }
  );

  // Symmetrical fan angles: Left (-12°), Center (0°), Right (+12°)
  const zAngles = [-12, 0, 12];
  const initialZ = zAngles[index] ?? 0;

  const yAngles = [-10, 0, 10];
  const initialY = yAngles[index] ?? 0;

  const rotateZ = useTransform(
    scrollYProgress, 
    [cardStart, settleMid, cardEnd], 
    [initialZ, initialZ * 0.3, 0], 
    { clamp: true }
  );

  const rotateX = useTransform(
    scrollYProgress, 
    [cardStart, settleMid, cardEnd], 
    [24, 6, 0], 
    { clamp: true }
  );

  const rotateY = useTransform(
    scrollYProgress, 
    [cardStart, settleMid, cardEnd], 
    [initialY, initialY * 0.3, 0], 
    { clamp: true }
  );

  return (
    <motion.div 
      className={styles.stageCardWrapper} 
      style={{ 
        display: "flex", 
        flex: 1, 
        y, 
        opacity: 1, // Strictly 100% solid opacity - never white/translucent
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
        <div className={styles.topBeam} />

        <div className={styles.stageHeaderContent}>
          <div className={styles.stageNumber}>
            {stage.number} · {stage.category}
          </div>
          <TextAnimate 
            as="h2" 
            by="character" 
            className={styles.stageTitle}
            delayOffset={index * 3}
          >
            {stage.title}
          </TextAnimate>
          <p className={styles.stagePhilosophy}>{stage.philosophy}</p>
        </div>

        <div className={styles.toolsList}>
          {stage.tools.map(tool => {
            const Icon = tool.icon;
            return (
              <div key={tool.name} className={styles.toolItem}>
                <div className={styles.toolIconContainer}>
                  {tool.img ? (
                    <img src={tool.img} alt={tool.name} className={styles.toolImage} loading="lazy" decoding="async" />
                  ) : (
                    <Icon className={styles.toolIcon} />
                  )}
                </div>
                <span className={styles.toolName}>{tool.name}</span>
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
  const [_activeStage, setActiveStage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <section ref={setContainerNode} className={styles.scrollTrack}>
      <div className={styles.stickyFrame}>
        
        {/* Pinned Title with Magic UI Character Animation */}
        <div className={styles.stackHeader}>
          <TextAnimate as="h2" by="character" className={styles.stackTitle}>
            The Arsenal
          </TextAnimate>
          <p className={styles.stackDesc}>The tools I use to explore ideas, try things out, and learn as I go.</p>
        </div>

        {/* Sliding Cards */}
        <div className={styles.cardsContainer}>
          <div className={styles.stagesWrapper}>
            {isMobile
              ? WORKFLOW_STAGES.map((stage, i) => (
                  <MobileStageCard 
                    key={stage.id} 
                    stage={stage} 
                    index={i}
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
