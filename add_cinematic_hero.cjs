const fs = require('fs');

let home = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const cinematicComponent = `
const charAnimation = {
  hidden: { y: 20, rotateX: -90, opacity: 0 },
  visible: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
  }
};

const CinematicSplitText = ({ children }) => {
  return (
    <span className={styles.splitTextLine}>
      {children.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className={styles.wordWrapper}>
          {word.split("").map((char, charIndex) => (
            <span key={charIndex} className={styles.charWrapper}>
              <motion.span variants={charAnimation} className={styles.char}>
                {char}
              </motion.span>
            </span>
          ))}
          &nbsp;
        </span>
      ))}
    </span>
  );
};
`;

// Insert the new component right after SplitText
home = home.replace("SplitText.propTypes = {", cinematicComponent + "\nSplitText.propTypes = {");

const originalHero = `            <motion.h1
              className={\`h1-display \${styles.heroTitle}\`}
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
            </motion.h1>`;

const newHero = `            {/* --- EXPERIMENT: 3D Typographic Stagger --- */}
            <motion.h1
              className={\`h1-display \${styles.heroTitle}\`}
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.03, delayChildren: 0.2 }}
            >
              <CinematicSplitText>Designing Digital</CinematicSplitText>
              <span className={styles.splitTextLine}>
                <CinematicSplitText>Experiences</CinematicSplitText>
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
                <CinematicSplitText>That Solve</CinematicSplitText>
              </span>
              <CinematicSplitText>Human Problems.</CinematicSplitText>
            </motion.h1>
            {/* ------------------------------------------- */}`;

home = home.replace(originalHero, "            {/* Original Hero Text (Commented for Experiment) */}\n" + "            {/*\n" + originalHero + "\n            */}\n\n" + newHero);

fs.writeFileSync('src/pages/Home.jsx', home);
console.log("Updated Home.jsx for Cinematic Hero successfully.");
