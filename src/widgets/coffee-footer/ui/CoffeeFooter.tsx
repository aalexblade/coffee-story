import { Container } from '@/shared/ui';
import { FOOTER_INFO, FOOTER_NAVIGATION } from '../model/footerData';
import styles from './CoffeeFooter.module.css';

export function CoffeeFooter() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.eyebrow}>COFFEE TO GO</span>

            <p className={styles.description}>
              Good coffee for the moments that matter.
            </p>
          </div>

          <nav className={styles.navigation} aria-label="Footer navigation">
            {FOOTER_NAVIGATION.map((item) => (
              <a key={item.href} href={item.href} className={styles.link}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.info}>
            <span>{FOOTER_INFO.location}</span>
            <span>{FOOTER_INFO.hours}</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Coffee Story</span>

          <span className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            Freshly brewed
          </span>
        </div>
      </Container>
    </footer>
  );
}
