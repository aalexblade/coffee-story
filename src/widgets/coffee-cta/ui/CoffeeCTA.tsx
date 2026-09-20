import { Container } from '@/shared/ui';
import styles from './CoffeeCTA.module.css';

export function CoffeeCTA() {
  return (
    <section className={styles.section} aria-labelledby="coffee-cta-heading">
      <Container>
        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.line} />
            <span>COFFEE TO GO</span>
          </div>

          <div className={styles.main}>
            <div className={styles.heading} id="coffee-cta-heading">
              <span>Good coffee.</span>
              <em>Right now.</em>
            </div>

            <div className={styles.action}>
              <p className={styles.description}>
                Обери свій напій, забери його з віконця та продовжуй свій день.
              </p>

              <a
                href="#order"
                className={styles.button}
                aria-label="Замовити каву"
              >
                <span>Order coffee</span>
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>

          <div className={styles.bottom}>
            <span>MON — FRI · 08:00 — 19:00</span>
            <span>KYIV · COFFEE WINDOW</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
