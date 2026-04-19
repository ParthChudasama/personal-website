import Image from 'next/image';

const skills = [
  'Python', 'GoLang', 'AWS', 'PyTorch',
  'FastAPI', 'REST APIs', 'NoSQL', 'System Design',
];

export default function About() {
  return (
    <section id="about">
      <h2 className="numbered-heading">About Me</h2>
      <div className="about-inner">
        <div className="about-text">
          <p>
            Welcome to my corner of the web! I&apos;m Parth — an adaptable, innovative,
            and results-driven technologist with a passion for building things that matter.
          </p>
          <p>
            When I&apos;m not immersed in the world of technology, you can find me exploring the
            outdoors or diving into a captivating book. These activities provide me with the balance
            and inspiration necessary to bring fresh perspectives to my work.
          </p>
          <p>
            I love connecting with people who share a passion for innovation and problem-solving.
            Let&apos;s build something remarkable together.
          </p>
          <p className="about-skills-label">Technologies I work with:</p>
          <div className="skills-badges">
            {skills.map((skill) => (
              <span key={skill} className="skill-badge">
                <span className="skill-badge-dot" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="about-photo">
          <div className="photo-ring" />
          <div className="photo-wrapper">
            <Image
              src="/images/me.jpeg"
              alt="Parth Chudasama"
              width={500}
              height={500}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              className="about-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
