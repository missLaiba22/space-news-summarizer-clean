import Link from 'next/link';
import styles from '../styles/NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🚀</span>
          Space News Summarizer
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          {/* New button to view articles */}
          <Link href="/articles" className={styles.navLink}>
            <button className={styles.articleButton}>View Articles</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
