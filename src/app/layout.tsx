import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/shared/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Coffee Story — Coffee to Go',
    template: '%s | Coffee Story',
  },
  description:
    'Coffee to go experience — from intense espresso to silky latte.',
  keywords: ['coffee', 'coffee to go', 'espresso', 'latte', 'coffee story'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Coffee Story — Coffee to Go',
    description:
      'From intense espresso to silky latte. Discover your coffee moment.',
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Coffee Story',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coffee Story — Coffee to Go',
    description:
      'From intense espresso to silky latte. Discover your coffee moment.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
