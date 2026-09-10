import { CoffeeStory } from '@/widgets/coffee-story';
import { Header } from '@/widgets/header';
import { Hero } from '@/widgets/hero';

export function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <CoffeeStory />
      </main>
    </>
  );
}