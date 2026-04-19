import { config } from '@/config';

export default function Contact() {
  return (
    <section id="contact">
      <div className="contact-inner">
        <span className="contact-overline">04. What&apos;s Next?</span>
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-body">
          Although I&apos;m not currently looking for any new opportunities, my inbox is always open.
          Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
        <a className="contact-cta" href={`mailto:${config.email}`}>
          <span className="contact-cta-text">Say Hello</span>
          <span className="contact-cta-icon" aria-hidden="true">✉</span>
        </a>
        <div className="contact-email-display">
          <a href={`mailto:${config.email}`}>{config.email}</a>
        </div>
      </div>
    </section>
  );
}
