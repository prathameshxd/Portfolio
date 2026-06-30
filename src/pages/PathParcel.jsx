
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiTarget, FiEdit3, FiPenTool, FiCheckSquare } from 'react-icons/fi';
import Footer from '../components/Footer';
import styles from './PathParcel.module.css';


export default function PathParcel() {
  return (
    <div className={styles.workPage}>
      <div className={styles.backBtnWrapper}>
        <Link to="/work" className={styles.backBtn} data-cursor-hover="true">
          ← Back to Work
        </Link>
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="label-mono" style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
            CASE STUDY · UX/UI DESIGN
          </p>
          <h1 className="h1-display" style={{ marginBottom: '2rem' }}>
            PathParcel
          </h1>
          <h2 className={styles.hook}>
            Turning commuters' daily routes into a parcel delivery network.
          </h2>
        </motion.div>
      </section>

      {/* Problem Statement & Solution */}
      <section className={styles.contextSection}>
        <div className={styles.grid2}>
          <motion.div 
            className={styles.contextBlock}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3>Problem Statement</h3>
            <p>
              Traditional intra-city couriers take 24 to 48 hours and require expensive warehousing infrastructure. Meanwhile, millions of local train commuters travel these exact same routes (like Kalyan to CSMT) every single day with empty hands, but there is no trusted system to connect this supply and demand.
            </p>
          </motion.div>
          
          <motion.div 
            className={styles.researchCallout}
            style={{ background: '#eab308', color: '#0B0B0C' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className={styles.calloutInner}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Possible solution</h3>
              <p style={{ fontSize: '1.125rem' }}>
                A two-sided marketplace that connects local Senders with daily Commuters. It uses a "Zero-Trust" physical handover protocol to eliminate theft, turning dead commute time into a fast, secure delivery network.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Design Process */}
        <div style={{ marginTop: '6rem', textAlign: 'center' }}>
          <h3 className={styles.sectionHeader} style={{ color: '#f97316' }}>Design Process</h3>
          <div className={styles.designProcess}>
            <div className={styles.processStep}>
              <div className={styles.processIcon}><FiHeart size={24} /></div>
              <span>Empathize</span>
            </div>
            <div className={styles.processStep}>
              <div className={styles.processIcon}><FiTarget size={24} /></div>
              <span>Define</span>
            </div>
            <div className={styles.processStep}>
              <div className={styles.processIcon}><FiEdit3 size={24} /></div>
              <span>Ideate</span>
            </div>
            <div className={styles.processStep}>
              <div className={styles.processIcon}><FiPenTool size={24} /></div>
              <span>Design</span>
            </div>
            <div className={styles.processStep}>
              <div className={styles.processIcon}><FiCheckSquare size={24} /></div>
              <span>Test</span>
            </div>
          </div>
        </div>
      </section>

      {/* User Research & Key Findings */}
      <section className={styles.contextSection}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <h3 className={styles.sectionHeader} style={{ color: '#f97316' }}>User Research</h3>
          <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>
            Before architecting the two-sided marketplace, I analyzed the behaviors of local businesses (Senders) and daily Mumbai local train riders (Commuters). The goal was to uncover the core friction points preventing peer-to-peer transit logistics from scaling.
          </p>
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p><strong>Demand Side (Senders):</strong> High anxiety about package safety, frustrated by slow 24-hour delivery times for things that are only 30km away.</p>
            <p><strong>Supply Side (Commuters):</strong> Want to earn pocket money to offset travel costs, but refuse to deviate from their daily route or deal with complex gig-worker onboarding.</p>
          </div>
        </div>

        <motion.div 
          className={styles.researchCallout}
          style={{ background: '#5c7052', color: 'white' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 style={{ color: '#facc15', marginBottom: '2rem' }}>Key Findings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p><strong>Trust is the Ultimate Barrier:</strong> Senders experience high anxiety about handing over valuable parcels to strangers.</p>
            <p><strong>Zero Route Deviation:</strong> Commuters are highly motivated to earn passive income, but they absolutely refuse to alter their daily transit route or leave the station to complete a drop-off.</p>
            <p><strong>Speed Over Cost:</strong> For intra-city micro-logistics, senders prioritize guaranteed same-day speed (2-3 hours) over minor cost savings.</p>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <p><strong>Conclusion:</strong> Understanding these dual-sided pain points directly shaped the product architecture. PathParcel was engineered around a rigid station-to-station routing model for commuters, and a "Zero-Trust Handover Protocol" to manufacture absolute security for senders.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Personas */}
      <section className={styles.personaSection}>
        <div className={styles.personaGrid}>
          
          {/* Commuter Persona */}
          <motion.div className={styles.personaCard} data-type="commuter" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className={styles.personaHeader}>
              <div className={styles.personaAvatar}></div>
              <div>
                <h3 className={styles.personaName}>Rahul M.</h3>
                <p style={{ color: '#F24E1E', fontWeight: 600 }}>User Persona (The Commuter)</p>
              </div>
            </div>
            
            <div className={styles.personaStats}>
              <span>Age</span><span>20</span>
              <span>Gender</span><span>Male</span>
              <span>Education</span><span>B.A Finance</span>
              <span>Occupation</span><span>Student</span>
              <span>Location</span><span>Kalyan</span>
            </div>

            <div className={styles.personaBody}>
              <h4>Background</h4>
              <p>Rahul is a final-year B.A Finance student. Every day, he spends roughly three hours commuting back and forth on the crowded local train from Kalyan to his college near CSMT. He wants to earn his own pocket money to pay for software subscriptions and weekend outings, but his heavy coursework means he doesn't have the time to work a traditional part-time job or do food delivery gigs that require owning a two-wheeler.</p>
              
              <h4>Goals</h4>
              <ul>
                <li>Earn passive pocket money to cover travel and daily expenses.</li>
                <li>Zero route deviation (must be able to pick up and drop off without exiting the station gates).</li>
                <li>Fast, frictionless payouts via UPI.</li>
              </ul>

              <h4>Pain points</h4>
              <ul>
                <li>Traditional gig economy apps (like Swiggy or Zepto) require owning a two-wheeler and working dedicated shifts.</li>
                <li>Doesn't want the liability or stress of handling complex logistics; just wants a simple "take this from point A to B" task.</li>
              </ul>
            </div>
          </motion.div>

          {/* Sender Persona */}
          <motion.div className={styles.personaCard} data-type="sender" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className={styles.personaHeader}>
              <div className={styles.personaAvatar}></div>
              <div>
                <h3 className={styles.personaName}>Priya S.</h3>
                <p style={{ color: '#F87171', fontWeight: 600 }}>User Persona (The Sender)</p>
              </div>
            </div>
            
            <div className={styles.personaStats}>
              <span>Age</span><span>32</span>
              <span>Gender</span><span>Female</span>
              <span>Occupation</span><span>Small business owner</span>
              <span>Location</span><span>Dadar</span>
            </div>

            <div className={styles.personaBody}>
              <h4>Background</h4>
              <p>Priya recently left her corporate job to scale her own direct-to-consumer (D2C) brand based in Thane. Her customers are spread all across Mumbai and constantly demand same-day delivery. She is frustrated because standard local couriers take 2 to 3 days and sometimes damage inventory, while instant delivery apps charge exorbitant fees for a 40km trip, completely destroying her profit margins.</p>
              
              <h4>Goals</h4>
              <ul>
                <li>Send intra-city parcels (documents, small retail goods) in under 3 hours.</li>
                <li>Absolute transparency and live tracking to ensure the item isn't lost.</li>
                <li>Cost-effective rates compared to premium on-demand couriers.</li>
              </ul>

              <h4>Pain points</h4>
              <ul>
                <li>Standard logistics companies require packages to go through central sorting hubs, adding 24 hours of delay.</li>
                <li>High anxiety about handing over valuable inventory to an unverified stranger without a formal guarantee.</li>
              </ul>
            </div>
          </motion.div>

        </div>

        {/* Empathy Maps */}
        <motion.div className={styles.empathyMap} data-type="commuter" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h4 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 800 }}>User Empathy (Commuter)</h4>
          <p style={{ textAlign: 'center', marginTop: '1rem', maxWidth: '800px', margin: '1rem auto' }}>I empathize with the users of PathParcel by understanding their emotions, needs, and frustrations. By putting ourselves in their shoes, we gain insight into their experiences and can tailor the app to better serve their needs.</p>
          <div className={styles.empathyGrid}>
            <div className={styles.empathyBox} data-type="commuter">
              <h5>Says</h5>
              <ul>
                <li>I spend almost three hours on the train every day doing nothing.</li>
                <li>I wish I had a way to make some extra pocket money without committing to a part-time job.</li>
              </ul>
            </div>
            <div className={styles.empathyBox} data-type="commuter">
              <h5>Thinks</h5>
              <ul>
                <li>Is the payout worth carrying a 2kg box in a crowded local compartment?</li>
                <li>What is actually inside this package? Am I legally safe carrying it?</li>
              </ul>
            </div>
            <div className={styles.empathyBox} data-type="commuter">
              <h5>Does</h5>
              <ul>
                <li>Scrolls aimlessly on social media or watches downloaded shows to kill time on the train.</li>
                <li>Travels the exact same route at the exact same time, 5 to 6 days a week.</li>
                <li>Heavily relies on UPI for all daily micro-transactions.</li>
              </ul>
            </div>
            <div className={styles.empathyBox} data-type="commuter">
              <h5>Feels</h5>
              <ul>
                <li>Boredom: During the dead time of the daily commute.</li>
                <li>Satisfaction: When a task is completed effortlessly and the payout hits their wallet instantly.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div className={styles.empathyMap} data-type="sender" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h4 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 800 }}>User Empathy (Sender)</h4>
          <p style={{ textAlign: 'center', marginTop: '1rem', maxWidth: '800px', margin: '1rem auto' }}>I empathize with the users of PathParcel by understanding their emotions, needs, and frustrations. By putting ourselves in their shoes, we gain insight into their experiences and can tailor the app to better serve their needs.</p>
          <div className={styles.empathyGrid}>
            <div className={styles.empathyBox} data-type="sender">
              <h5>Says</h5>
              <ul>
                <li>Standard couriers are completely ruining my profit margins for local orders.</li>
                <li>My customer is demanding this gets delivered by this evening.</li>
              </ul>
            </div>
            <div className={styles.empathyBox} data-type="sender">
              <h5>Thinks</h5>
              <ul>
                <li>Can I actually trust a random college student with ₹5,000 worth of inventory?</li>
                <li>What if they steal it or damage it in the train crowd?</li>
              </ul>
            </div>
            <div className={styles.empathyBox} data-type="sender">
              <h5>Does</h5>
              <ul>
                <li>Obsessively refreshes tracking links when sending high-value items.</li>
                <li>Calculates the exact trade-off between delivery speed and delivery cost for every order.</li>
              </ul>
            </div>
            <div className={styles.empathyBox} data-type="sender">
              <h5>Feels</h5>
              <ul>
                <li>High Anxiety: From the moment the package leaves their hands until it reaches the destination.</li>
                <li>Urgency: Driven by customer demands for same-day gratification.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* User Workflows */}
      <section className={styles.workflowSection}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h3 className={styles.sectionHeader} style={{ color: '#f97316' }}>User Workflows</h3>
        </div>
        <div className={styles.workflowContainer}>
          <div className={styles.workflowTrack}>
            <h3 style={{ color: '#f97316' }}>Parcel Sending Workflow</h3>
            <div className={styles.workflowSteps}>
              <div className={styles.workflowStep}>Initialisation</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Home Page</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Send Parcel</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Fill details</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Find Traveller</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Matching Process</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Loading Status</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Traveller Found</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Confirmed Details</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Transit & Delivery</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Physical Handover</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>In Transit</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Activity Screen</div>
            </div>
          </div>

          <div className={styles.workflowTrack}>
            <h3 style={{ color: '#5c7052' }}>Commuter Workflow</h3>
            <div className={styles.workflowSteps}>
              <div className={styles.workflowStep}>Initialisation</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Home Page</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Accept request matched with route</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Meet sender</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Photograph parcel condition</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Enter 4-digit senders PIN</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Swipe to start transit</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Navigate to destination</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Take drop-off photo</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Enter receivers PIN</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>Tap confirm & get paid</div>
              <div className={styles.workflowArrow}>→</div>
              <div className={styles.workflowStep}>View Success status</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mockups Gallery */}
      <section className={styles.gallerySection}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h3 className={styles.sectionHeader} style={{ color: '#f97316' }}>High-Fidelity Mockups</h3>
        </div>
        <div className={styles.mockupGrid}>
          {/* Dual Homepages */}
          <motion.div 
            className={`${styles.mockupItem} ${styles.mockupLarge}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.mockupDual}>
              <img src="/mockups/home-sender.webp" alt="Home - Sender Dashboard" className={styles.mockupImg} loading="lazy" />
              <img src="/mockups/home-commuter.webp" alt="Home - Commuter Mode" className={styles.mockupImg} loading="lazy" />
            </div>
            <p className={styles.caption}>Dual Modes: Sender Dashboard & Commuter Mode</p>
          </motion.div>

          {/* User Profiles */}
          <motion.div 
            className={`${styles.mockupItem} ${styles.mockupLarge}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.mockupDual}>
              <img src="/mockups/profile.webp" alt="User Profile" className={styles.mockupImg} loading="lazy" />
              <img src="/mockups/profile-2.webp" alt="Trust Settings" className={styles.mockupImg} loading="lazy" />
            </div>
            <p className={styles.caption}>User Profiles & Trust Settings</p>
          </motion.div>
          
          {/* Live Tracking */}
          <motion.div 
            className={styles.mockupItem}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <img src="/mockups/tracking.webp" alt="Live Tracking & OTP" className={styles.mockupImg} loading="lazy" />
            <p className={styles.caption}>Live Tracking & OTP</p>
          </motion.div>

          {/* Delivery Complete */}
          <motion.div 
            className={styles.mockupItem}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <img src="/mockups/delivery-complete.webp" alt="Delivery Complete" className={styles.mockupImg} loading="lazy" />
            <p className={styles.caption}>Delivery Complete</p>
          </motion.div>

          {/* Past Deliveries */}
          <motion.div 
            className={styles.mockupItem}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <img src="/mockups/activity.webp" alt="Past Deliveries" className={styles.mockupImg} loading="lazy" />
            <p className={styles.caption}>Past Deliveries</p>
          </motion.div>

          {/* Commuter Wallet */}
          <motion.div 
            className={styles.mockupItem}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <img src="/mockups/commuter-wallet.webp" alt="Commuter Earnings Wallet" className={styles.mockupImg} loading="lazy" />
            <p className={styles.caption}>Commuter Earnings Wallet</p>
          </motion.div>
        </div>
      </section>

      {/* Behance Link */}
      <section className={styles.behanceSection}>
        <a 
          href="https://www.behance.net/gallery/250193989/Pathparcel-Detailed-Case-Study" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.behanceBtn}
          data-cursor-hover="true"
        >
          View Full Case Study on Behance ↗
        </a>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <Link to="/contact" className={styles.nextProject} data-cursor-hover="true">
          <h2>Ready to talk?</h2>
          <span className={styles.ctaArrow}>→</span>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
