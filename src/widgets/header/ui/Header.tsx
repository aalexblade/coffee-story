import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <span className={styles.logo}>Coffee Story</span>
      </nav>
    </header>
  );
}