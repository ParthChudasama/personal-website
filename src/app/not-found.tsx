import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 | Parth Chudasama',
};

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '0 25px',
    }}>
      <p style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)', fontSize: 'clamp(100px, 25vw, 200px)', fontWeight: 700, lineHeight: 1 }}>
        404
      </p>
      <h1 style={{ color: 'var(--lightest-slate)', fontSize: 'clamp(var(--fz-lg), 5vw, var(--fz-xxl))', fontWeight: 400 }}>
        Page Not Found
      </h1>
      <p>
        It looks like you&apos;ve found a page that used to exist... or never existed.
      </p>
      <Link href="/" className="btn-big" style={{ marginTop: '40px' }}>
        Go Home
      </Link>
    </div>
  );
}
