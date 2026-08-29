import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '120px 5%', maxWidth: '800px', margin: '0 auto', color: '#fff', minHeight: '100vh' }}
    >
      <SEO title="About" description="About Prathamesh Patil, UX/UI Designer based in Pune." />
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>About Me</h1>
      <div style={{ fontSize: '1.2rem', lineHeight: '1.6', opacity: 0.8 }}>
        <p style={{ marginBottom: '1rem' }}>
          Hello, I am Prathamesh Patil, a passionate and dedicated UX/UI Designer based in Pune, India. 
          My journey in design is driven by a deep curiosity about how people interact with digital products 
          and a desire to create experiences that are not just usable, but delightful.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          I specialize in building storytelling portfolios, comprehensive design systems, and robust frontend 
          architectures. My background bridges the gap between aesthetic visual design and highly functional 
          technical implementation, allowing me to craft solutions that look beautiful and perform flawlessly.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          In my recent projects, such as PathParcel, I have focused on solving complex data transfer 
          challenges by breaking down complicated user flows into simple, intuitive, and accessible steps. 
          I believe that good design is invisible—it empowers users to achieve their goals without friction.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          When I'm not pushing pixels or writing code, I'm constantly learning about new technologies, 
          exploring the latest trends in web animations, and refining my understanding of human-computer interaction. 
          I am always open to new opportunities, collaborations, and conversations about the future of design.
        </p>
      </div>
    </motion.div>
  );
}
