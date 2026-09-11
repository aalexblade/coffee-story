import { CoffeeStory } from '@/widgets/coffee-story';
import { Header } from '@/widgets/header';
import { Hero } from '@/widgets/hero';

export function HomePage() {
  return (
    <main className="flex-1">
      <Header />
      <Hero />
      <CoffeeStory />
      {/* Інші секції будуть нижче */}
      <div style={{ height: '100vh', backgroundColor: '#1a100c' }} />
    </main>
  );
}
