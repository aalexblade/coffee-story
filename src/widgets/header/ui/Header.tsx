import Link from 'next/link';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Coffee Story
      </Link>
      {/* Rest of navigation */}
    </header>
  );
}