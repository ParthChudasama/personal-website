import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Social from '@/components/Social';
import Email from '@/components/Email';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import ParticleCanvas from '@/components/ParticleCanvas';

export const metadata: Metadata = {
  title: 'Parth Chudasama | Software Engineer',
  description: 'Software engineer specializing in building reliable, scalable systems across Machine Learning and backend domains.',
  metadataBase: new URL('https://parthchudasama.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://parthchudasama.com',
    siteName: 'Parth Chudasama',
    title: 'Parth Chudasama | Software Engineer',
    description: 'Software engineer specializing in building reliable, scalable systems across Machine Learning and backend domains.',
    images: [{ url: '/images/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parth Chudasama | Software Engineer',
    description: 'Software engineer specializing in building reliable, scalable systems across Machine Learning and backend domains.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-JQ46F75TNL`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JQ46F75TNL');
            `,
          }}
        />
      </head>
      <body>
        <CursorGlow />
        <ParticleCanvas />
        <div className="bg-orb bg-orb-1" aria-hidden="true" />
        <div className="bg-orb bg-orb-2" aria-hidden="true" />
        <a href="#content" className="skip-to-content">Skip to Content</a>
        <Nav />
        <Social />
        <Email />
        <main id="content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
