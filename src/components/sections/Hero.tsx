import Typewriter from '@/components/Typewriter';
import { config } from '@/config';

const typewriterPhrases = [
  'I engineer impactful ML systems.',
  'I build scalable backends.',
  'I ship production AI.',
  'I design distributed systems.',
];

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-grid-bg" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-item">
          <span className="hero-status">
            <span className="hero-status-dot" />
            Currently @ Nationale Nederlanden
          </span>
        </div>

        <div className="hero-item">
          <p className="subtitle">Hi, my name is</p>
        </div>

        <div className="hero-item">
          <h1 className="big-heading hero-name">Parth Chudasama.</h1>
        </div>

        <div className="hero-item">
          <h2 className="big-heading hero-tagline">
            <Typewriter phrases={typewriterPhrases} />
          </h2>
        </div>

        <div className="hero-item">
          <p className="hero-desc">
            A software engineer specializing in building reliable, scalable systems across
            Machine Learning and backend domains. My work spans productionizing AI solutions,
            optimizing distributed infrastructure, and improving system observability.
          </p>
        </div>

        <div className="hero-item hero-ctas">
          <a className="hero-btn-primary" href={`mailto:${config.email}`}>
            Get In Touch
          </a>
          <a className="hero-btn-secondary" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            View Resume ↗
          </a>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
