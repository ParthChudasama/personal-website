'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { config } from '@/config';
import Menu from './Menu';

export default function Nav() {
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 0);
      if (currentScrollY < lastScrollY.current) {
        setScrollDir('up');
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setScrollDir('down');
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`${scrolled ? 'scrolled' : ''} ${isMounted && scrollDir === 'down' ? 'hidden' : ''}`}
        style={{ counterReset: 'item 0' }}
      >
        <div className="logo">
          <Link href="/" aria-label="home">
            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 84 96" width="42" height="48" style={{ fill: 'none' }}>
              <title>Logo</title>
              <polygon
                id="Shape"
                stroke="#64ffda"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="39 0 0 22 0 67 39 90 78 68 78 23"
                style={{ fill: 'none' }}
              />
              <text
                x="39"
                y="60"
                textAnchor="middle"
                fill="#64ffda"
                fontSize="32"
                fontFamily="Calibre, Inter, sans-serif"
                fontWeight="bold"
              >
                P
              </text>
            </svg>
          </Link>
        </div>

        <ol className="nav-links" style={{ counterReset: 'item 0' }}>
          {config.navLinks.map(({ name, url }) => (
            <li key={name}>
              <Link href={url} onClick={handleNavLinkClick}>{name}</Link>
            </li>
          ))}
          <li>
            <a href="/resume.pdf" className="resume-button" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </li>
        </ol>

        <button
          className={`hamburger-button ${menuOpen ? 'is-active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </nav>

      <Menu isOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />
      {menuOpen && (
        <div
          className="mobile-menu-backdrop open"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
