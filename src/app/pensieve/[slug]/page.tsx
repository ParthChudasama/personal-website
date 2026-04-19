import Link from 'next/link';
import { getAllPosts, getPostBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Pensieve | Parth Chudasama`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="pensieve-page">
      <div className="pensieve-inner">
        <p style={{ marginBottom: '20px' }}>
          <Link href="/pensieve" style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fz-sm)' }}>
            ← Back to Pensieve
          </Link>
        </p>

        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            {post.tags.length > 0 && (
              <ul className="post-tags">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Link href={`/pensieve/tags/${tag.toLowerCase()}`}>#{tag}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  );
}
