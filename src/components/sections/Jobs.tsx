'use client';

import { useState } from 'react';
import type { Job, Role } from '@/lib/content';

interface JobsProps {
  jobs: Job[];
}

export default function Jobs({ jobs }: JobsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveTab(Math.max(0, index - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveTab(Math.min(jobs.length - 1, index + 1));
    }
  };

  if (!jobs.length) return null;
  const activeJob = jobs[activeTab];

  return (
    <section id="jobs">
      <h2 className="numbered-heading">Where I&apos;ve Worked</h2>
      <div className="inner">
        <ul className="tab-list" role="tablist" aria-label="Job tabs">
          {jobs.map((job, i) => (
            <li key={`${job.company}-${i}`} role="presentation">
              <button
                role="tab"
                className={`tab-button ${i === activeTab ? 'active' : ''}`}
                aria-selected={i === activeTab}
                aria-controls={`panel-${i}`}
                id={`tab-${i}`}
                onClick={() => setActiveTab(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                tabIndex={i === activeTab ? 0 : -1}
              >
                {job.company}
              </button>
            </li>
          ))}
        </ul>

        <div
          className="tab-panel"
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
        >
          <div key={activeTab} className="tab-panel-content">
            {activeJob.roles.map((role: Role, i: number) => (
              <div key={i} className={i > 0 ? 'role-entry role-entry--subsequent' : 'role-entry'}>
                <h3>
                  {role.title}{' '}
                  <span className="company">
                    &amp;{' '}
                    <a href={activeJob.url} target="_blank" rel="noopener noreferrer">
                      {activeJob.company}
                    </a>
                  </span>
                </h3>
                <p className="range">{role.range}</p>
                <div dangerouslySetInnerHTML={{ __html: role.html }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
