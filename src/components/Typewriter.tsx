'use client';
import { useState, useEffect } from 'react';

interface Props {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

export default function Typewriter({ phrases, typingSpeed = 75, deletingSpeed = 40, pauseMs = 2200 }: Props) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const phrase = phrases[idx];
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, pauseMs);
      return () => clearTimeout(t);
    }
    if (!deleting) {
      if (text.length < phrase.length) {
        const t = setTimeout(() => setText(phrase.slice(0, text.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      }
      setPaused(true);
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
        return () => clearTimeout(t);
      }
      setDeleting(false);
      setIdx((prev) => (prev + 1) % phrases.length);
    }
  }, [text, idx, deleting, paused, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className="typewriter-text">
      {text}
      <span className="typewriter-cursor" aria-hidden="true">|</span>
    </span>
  );
}
