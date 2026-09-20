import { Container } from '@/shared/ui';
import { COFFEE_MENU_ITEMS } from '../model/menuItems';
import { CoffeeMenuCard } from './CoffeeMenuCard';
import styles from './CoffeeMenu.module.css';

export function CoffeeMenu() {
  return (
    <section className={styles.section} aria-labelledby="coffee-menu-heading">
      <Container>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.line} />
            <span>OUR COFFEE</span>
          </div>

          <div className={styles.headingRow}>
            <h2 id="coffee-menu-heading" className={styles.headingTitle}>
              Choose your
              <br />
              <em>moment.</em>
            </h2>

            <p className={styles.intro}>
              Від насиченого еспресо до шовковистого лате — кожен напій має свій
              характер.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          {COFFEE_MENU_ITEMS.map((item) => (
            <CoffeeMenuCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
