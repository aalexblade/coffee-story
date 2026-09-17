import { CoffeeStory } from '@/widgets/coffee-story';
import { Header } from '@/widgets/header';
import { Hero } from '@/widgets/hero';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      <CoffeeStory />

      {/* Тимчасова секція для тестування scroll */}
      <div className={styles.placeholder} />
    </main>
  );
}
