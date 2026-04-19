'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { config } from '@/config';

interface MenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function Menu({ isOpen, toggleMenu }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) toggleMenu();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, toggleMenu]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div
      className={`mobile-menu ${isOpen ? 'open' : ''}`}
      ref={menuRef}
      aria-hidden={!isOpen}
      tabIndex={isOpen ? 0 : -1}
    >
      <nav>
        <ol style={{ counterReset: 'item 0' }}>
          {config.navLinks.map(({ name, url }) => (
            <li key={name}>
              <Link href={url} onClick={toggleMenu}>{name}</Link>
            </li>
          ))}
        </ol>
        <a
          href="/resume.pdf"
          className="resume-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
      </nav>
    </div>
  );
}
