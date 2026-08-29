import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '120px 5%', maxWidth: '800px', margin: '0 auto', color: '#fff', minHeight: '100vh' }}
    >
      <SEO title="Privacy Policy" description="Privacy Policy for Prathamesh Patil's Portfolio" />
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Privacy Policy</h1>
      <div style={{ fontSize: '1.2rem', lineHeight: '1.6', opacity: 0.8 }}>
        <p style={{ marginBottom: '1rem' }}>
          This Privacy Policy describes how your personal information is collected, used, and shared when you visit 
          the portfolio website of Prathamesh Patil. By using this website, you agree to the collection and use of 
          information in accordance with this policy.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Information Collection and Use</strong><br/>
          While using our site, we may ask you to provide us with certain personally identifiable information that 
          can be used to contact or identify you. This primarily occurs when you fill out the contact form. 
          The information we collect may include, but is not limited to, your name, email address, and company name.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Log Data and Analytics</strong><br/>
          We want to inform you that whenever you visit our site, we collect information that your browser sends 
          to us that is called Log Data. This Log Data may include information such as your computer's Internet 
          Protocol ("IP") address, browser version, pages of our site that you visit, the time and date of your visit, 
          the time spent on those pages, and other statistics. We use third-party services like Vercel Analytics 
          to monitor and analyze this data to improve the user experience.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Contact Us</strong><br/>
          If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us 
          at the email provided on the contact page. This privacy policy is designed to comply with standard 
          data protection regulations and is subject to change as our services evolve.
        </p>
      </div>
    </motion.div>
  );
}
