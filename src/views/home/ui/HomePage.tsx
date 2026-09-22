import { CoffeeCTA } from '@/widgets/coffee-cta';
import { CoffeeMenu } from '@/widgets/coffee-menu';
import { CoffeeOrder } from '@/widgets/coffee-order';
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
      <CoffeeMenu />
      <CoffeeOrder />
      <CoffeeCTA />
    </main>
  );
}