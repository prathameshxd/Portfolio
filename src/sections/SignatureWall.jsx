import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { ref, onValue, push } from 'firebase/database';
import { db } from '../utils/firebase';
import { sanitizeInput } from '../utils/sanitizeInput';
import styles from './SignatureWall.module.css';
import BadWordsNext from 'bad-words-next';
import en from 'bad-words-next/lib/en';
import es from 'bad-words-next/lib/es';
import fr from 'bad-words-next/lib/fr';
import de from 'bad-words-next/lib/de';
import ru from 'bad-words-next/lib/ru';
import rl from 'bad-words-next/lib/ru_lat';
import ua from 'bad-words-next/lib/ua';
import pl from 'bad-words-next/lib/pl';
import ch from 'bad-words-next/lib/ch';

const badwords = new BadWordsNext();
badwords.add(en);
badwords.add(es);
badwords.add(fr);
badwords.add(de);
badwords.add(ru);
badwords.add(rl);
badwords.add(ua);
badwords.add(pl);
badwords.add(ch);

// Custom Indonesian dictionary
badwords.add({
  id: 'id',
  words: [
    'jancok', 'jancuk', 'dancok', 'dancuk', 'yancok', 'yancuk',
    'kontol', 'memek', 'jembut', 'pepek',
    'bangsat', 'bajingan', 'anjing', 'babi', 'monyet', 'kunyuk',
    'tai', 'ngentot', 'ngewe', 'pantek', 'perek', 'lonte',
    'kampret', 'tolol', 'goblok', 'bego', 'idiot', 'bodoh', 'geblek',
    'asu', 'celeng', 'jingan', 'kimak', 'puki', 'pukimak', 'koentol'
  ],
  lookalike: {
    '@': 'a',
    '0': 'o',
    '1': 'i',
    '3': 'e',
    '4': 'a',
    '5': 's',
    '7': 't',
    '8': 'b',
    '$': 's'
  }
});

const COLORS = ['Yellow', 'Pink', 'Blue', 'Green'];

export default function SignatureWall() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedColor, setSelectedColor] = useState('Yellow');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const wallRef = useRef(null);
  const isInView = useInView(wallRef, { amount: 0.2 }); // starts when 20% visible
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (!wallRef.current) return;
      const rect = wallRef.current.getBoundingClientRect();
      
      // If the section is completely below the viewport (user went back UP to previous sections), reset it.
      if (rect.top > window.innerHeight) {
        controls.set("hidden");
      }
      
      // If the section is entering the viewport from the bottom (user is scrolling DOWN into it), trigger it.
      if (rect.top < window.innerHeight * 0.85) {
        controls.start("visible");
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const notesPerPage = 8;
  const rotationInterval = 3000; // 3 seconds

  useEffect(() => {
    if (isHovered || !isInView || notes.length <= notesPerPage) return;

    const maxPages = Math.ceil(notes.length / notesPerPage);
    const interval = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % maxPages);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [isHovered, isInView, notes.length, notesPerPage]);

  useEffect(() => {
    const notesRef = ref(db, 'notes');
    const unsubscribe = onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedNotes = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        loadedNotes.sort((a, b) => {
          const isAPrathamesh = a.author === 'Prathamesh Patil';
          const isBPrathamesh = b.author === 'Prathamesh Patil';
          
          if (isAPrathamesh && !isBPrathamesh) return -1;
          if (!isAPrathamesh && isBPrathamesh) return 1;
          
          return b.timestamp - a.timestamp;
        });
        setNotes(loadedNotes);
      } else {
        setNotes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (badwords.check(newNote) || (authorName && badwords.check(authorName))) {
      setErrorMsg('Please keep the language clean! Vulgar words are not allowed.');
      return;
    }

    const sanitizedMessage = sanitizeInput(newNote, 200);
    const sanitizedName = sanitizeInput(authorName, 40);

    if (!sanitizedMessage || sanitizedMessage.length < 1) {
      setErrorMsg('Message is required.');
      return;
    }

    setIsSubmitting(true);

    const note = {
      text: sanitizedMessage,
      color: selectedColor,
      author: sanitizedName || 'Anonymous',
      rotation: Math.floor(Math.random() * 10) - 5, // -5 to 5 degrees
      timestamp: Date.now()
    };

    try {
      const notesRef = ref(db, 'notes');
      
      const pushPromise = push(notesRef, note);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Firebase connection timeout')), 8000);
      });

      await Promise.race([pushPromise, timeoutPromise]);
      
      setNewNote('');
      setAuthorName('');
    } catch (error) {
      console.error('Firebase error:', error);
      setErrorMsg('Something went wrong, try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="signature-wall" ref={wallRef} className={styles.container}>
      <motion.div 
        className={styles.header}
        initial="hidden"
        animate={controls}
      >
        <motion.h2 
          className={styles.title}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
        >
          Leave a Note for Me
        </motion.h2>
        
        <motion.p 
          className={styles.subtitle}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } }
          }}
        >
          Drop a quick message on the wall. Pick a color, pin it up, and make your mark!
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.wall}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { 
            opacity: 0, 
            rotateX: 40,
            y: 150,
            scale: 0.9
          },
          visible: { 
            opacity: 1, 
            rotateX: 0, 
            y: 0,
            scale: 1,
            transition: { 
              duration: 1.4, 
              ease: [0.16, 1, 0.3, 1] // Ultra-smooth Apple-like easeOut
            } 
          }
        }}
        style={{ transformPerspective: 1200, transformStyle: "preserve-3d" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {notes.length > notesPerPage && (
          <div className={styles.progressBarContainer}>
            <div
              key={`${pageIndex}-${isHovered ? 'paused' : 'running'}-${isInView}`}
              className={styles.progressBar}
              style={{
                animationDuration: `${rotationInterval}ms`,
                animationPlayState: (isHovered || !isInView) ? 'paused' : 'running'
              }}
            />
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {(() => {
            const maxPages = Math.ceil(notes.length / notesPerPage);
            const validPageIndex = maxPages > 0 && pageIndex >= maxPages ? maxPages - 1 : pageIndex;
            const visibleNotes = notes.slice(validPageIndex * notesPerPage, (validPageIndex + 1) * notesPerPage);

            return visibleNotes.map((note) => (
              <motion.div
                key={note.id}
                className={`${styles.note} ${styles[`color${note.color}`]}`}
                initial={{ opacity: 0, scale: 0.8, y: -50 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: note.rotation }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                whileHover={{ scale: 1.05, zIndex: 10, rotate: 0 }}
                drag={!isMobile}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
              >
                <div className={styles.pin}></div>
                <div className={styles.noteMessage}>{note.text}</div>
                <div className={styles.noteFooter}>- {note.author}</div>
              </motion.div>
            ));
          })()}
        </AnimatePresence>
      </motion.div>

      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {errorMsg && <div className={styles.errorMessage} style={{ color: 'red', marginBottom: '1rem', fontWeight: 'bold' }}>{errorMsg}</div>}
          
          <div className={styles.inputGroup}>
            <label htmlFor="noteText" className={styles.label}>Your Message</label>
            <textarea
              id="noteText"
              className={styles.textarea}
              placeholder="What's on your mind?"
              value={newNote}
              onChange={(e) => {
                setNewNote(e.target.value);
                setErrorMsg('');
              }}
              maxLength={200}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="authorName" className={styles.label}>Name (Optional)</label>
            <input
              type="text"
              id="authorName"
              className={styles.input}
              placeholder="Your name"
              value={authorName}
              onChange={(e) => {
                setAuthorName(e.target.value);
                setErrorMsg('');
              }}
              maxLength={40}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Note Color</label>
            <div className={styles.colorPicker}>
              {COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Select ${color} color`}
                  className={`${styles.colorOption} ${styles[`color${color}`]} ${selectedColor === color ? styles.selected : ''}`}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting || !newNote.trim()}
          >
            {isSubmitting ? 'Pinning...' : 'Post Note'}
          </button>
        </form>
      </div>
    </section>
  );
}
