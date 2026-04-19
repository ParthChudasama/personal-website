import { config } from '@/config';
import { socialIcons } from '@/lib/icons';

export default function Footer() {
  return (
    <footer>
      <div className="social-links">
        <ul>
          {config.socialMedia.map(({ name, url }) => (
            <li key={name}>
              <a href={url} aria-label={name} target="_blank" rel="noopener noreferrer">
                {socialIcons[name]}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="credit">
        <a href="https://github.com/ParthChudasama" target="_blank" rel="noopener noreferrer">
          Designed &amp; Built by Parth Chudasama
        </a>
      </div>
    </footer>
  );
}
