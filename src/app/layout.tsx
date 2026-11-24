import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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
    default:
      'DevToolkit Hub | Free Browser Dev Tools, Interview Prep & Roadmaps',
    template: '%s | DevToolkit Hub',
  },
  description:
    'Free client-side developer tools (JSON Formatter, JWT Decoder, UUID Generator, Regex Tester, Base64, Password Generator), coding interview Q&A, and interactive career roadmaps.',
  keywords: [
    'developer tools online',
    'JSON formatter',
    'JWT decoder',
    'UUID v4 generator',
    'regex tester',
    'frontend interview questions',
    'developer roadmaps',
  ],
  openGraph: {
    title: 'DevToolkit Hub — Build Faster, Learn Smarter, Get Hired',
    description:
      '7+ browser-based developer utilities, searchable interview Q&A, and interactive career roadmaps.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-screen flex flex-col bg-background text-foreground'>
        <Navbar />
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
      {process.env.NODE_ENV === 'production' && (
        <GoogleAnalytics gaId='G-J6920SV1L5' />
      )}
    </html>
  );
}
