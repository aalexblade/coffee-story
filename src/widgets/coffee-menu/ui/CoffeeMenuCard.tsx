import type { Coffee } from '@/entities/coffee';
import styles from './CoffeeMenu.module.css';

interface CoffeeMenuCardProps {
  item: Coffee;
}

export function CoffeeMenuCard({ item }: CoffeeMenuCardProps) {
  return (
    <article
      className={`${styles.card} ${styles[item.accent]}`}
      data-menu-item={item.id}
    >
      <div className={styles.cardTop}>
        <span className={styles.number}>{item.number}</span>
        <span className={styles.tag}>{item.tag}</span>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.glow} />
        <div className={styles.cup}>
          <div className={styles.coffee} />
          <div className={styles.foam} />
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.cardTitle}>{item.title}</h3>

        <p className={styles.description}>{item.description}</p>

        <div className={styles.footer}>
          <span>{item.details}</span>

          <span className={styles.arrow} aria-hidden="true">
            ↗
          </span>
        </div>
      </div>
    </article>
  );
}
