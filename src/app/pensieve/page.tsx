import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pensieve | Parth Chudasama',
  description: 'A collection of thoughts, write-ups, and references.',
};

export default async function PensievePage() {
  const posts = await getAllPosts();

  return (
    <div className="pensieve-page">
      <div className="pensieve-inner">
        <h1 style={{ marginBottom: '10px', color: 'var(--lightest-slate)', fontSize: 'clamp(40px, 8vw, 80px)' }}>
          My Thoughts on the Whirlpool
        </h1>
        <p style={{ color: 'var(--slate)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fz-md)', marginBottom: '10px' }}>
          A collection of my thoughts, write-ups, and references.
        </p>
        <p style={{ color: 'var(--slate)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fz-sm)' }}>
          <Link href="/pensieve/tags" style={{ color: 'var(--green)' }}>View all tags</Link>
        </p>

        <div className="pensieve-grid">
          {posts.map((post) => (
            <article key={post.slug} className="post-card">
              <div className="card-top">
                <div className="folder">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" width="40" height="40">
                    <title>Folder</title>
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="card-links">
                  <a href={`/pensieve/${post.slug}`} aria-label={post.title}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>

              <h3 className="card-title">
                <Link href={`/pensieve/${post.slug}`}>{post.title}</Link>
              </h3>
              {post.description && <p className="card-description">{post.description}</p>}

              <div className="card-footer">
                <span className="card-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                {post.tags.length > 0 && (
                  <ul className="card-tags">
                    {post.tags.slice(0, 3).map((tag) => (
                      <li key={tag}>
                        <Link href={`/pensieve/tags/${tag.toLowerCase()}`}>#{tag}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
