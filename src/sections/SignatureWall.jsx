import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, onValue, push } from 'firebase/database';
import { db } from '../utils/firebase';
import { sanitizeInput } from '../utils/sanitizeInput';
import styles from './SignatureWall.module.css';



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

  const notesPerPage = 8;
  const rotationInterval = 3000; // 5 seconds

  useEffect(() => {
    if (isHovered || notes.length <= notesPerPage) return;

    const maxPages = Math.ceil(notes.length / notesPerPage);
    const interval = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % maxPages);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [isHovered, notes.length, notesPerPage]);

  useEffect(() => {
    const notesRef = ref(db, 'notes');
    const unsubscribe = onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedNotes = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        loadedNotes.sort((a, b) => b.timestamp - a.timestamp);
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
    <section id="signature-wall" className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Leave a Note for Me</h2>
        <p className={styles.subtitle}>
          Drop a quick message on the wall. Pick a color, pin it up, and make your mark!
        </p>
      </div>

      <div
        className={styles.wall}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
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
                drag
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
      </div>

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
