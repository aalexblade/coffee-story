'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/shared/lib/gsap';
import { Container } from '@/shared/ui';
import styles from './Hero.module.css';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Базова GSAP анімація для перевірки
      gsap.from(`.${styles.title}`, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>Coffee 3D Experience</h1>
          <p className={styles.subtitle}>
            Інтерактивна геометрія та складна анімація кави
          </p>
        </div>
      </Container>
    </section>
  );
}
