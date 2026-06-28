import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className="label-mono">Based in Kalyan, Maharashtra</span>
        </div>
        <div className={styles.right}>
          <span className="label-mono">© {currentYear} Prathamesh Patil</span>
        </div>
      </div>
    </footer>
  );
}
