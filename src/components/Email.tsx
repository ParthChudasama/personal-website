import { config } from '@/config';

export default function Email() {
  return (
    <div className="side right" style={{ bottom: 0 }}>
      <div className="email-side">
        <a href={`mailto:${config.email}`}>{config.email}</a>
      </div>
    </div>
  );
}
