import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/content';
import type { Metadata } from 'next';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(({ tag }) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return { title: `${tag} | Pensieve | Parth Chudasama` };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((p) => p.tags.some((t) => t.toLowerCase() === tag));

  return (
    <div className="pensieve-page">
      <div className="pensieve-inner">
        <h1 style={{ color: 'var(--lightest-slate)', marginBottom: '5px' }}>
          Posts tagged: <span style={{ color: 'var(--green)' }}>#{tag}</span>
        </h1>
        <p style={{ marginBottom: '40px' }}>
          <Link href="/pensieve/tags" style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fz-sm)' }}>
            ← View all tags
          </Link>
        </p>
        {posts.length === 0 ? (
          <p>No posts found for this tag.</p>
        ) : (
          <div className="pensieve-grid">
            {posts.map((post) => (
              <article key={post.slug} className="post-card">
                <h3 className="card-title">
                  <Link href={`/pensieve/${post.slug}`}>{post.title}</Link>
                </h3>
                {post.description && <p className="card-description">{post.description}</p>}
                <div className="card-footer">
                  <span className="card-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
