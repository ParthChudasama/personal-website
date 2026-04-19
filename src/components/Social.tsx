import { config } from '@/config';
import { socialIcons } from '@/lib/icons';

export default function Social() {
  return (
    <div className="side left" style={{ bottom: 0 }}>
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
  );
}
