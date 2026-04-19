import Link from 'next/link';
import { getAllTags } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tags | Pensieve | Parth Chudasama',
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="pensieve-page">
      <div className="pensieve-inner">
        <h1 style={{ color: 'var(--lightest-slate)', marginBottom: '10px' }}>All Tags</h1>
        <p style={{ marginBottom: '30px' }}>
          <Link href="/pensieve" style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fz-sm)' }}>
            ← Back to Pensieve
          </Link>
        </p>
        <div className="tags-container">
          {tags.map(({ tag, count }) => (
            <Link key={tag} href={`/pensieve/tags/${tag.toLowerCase()}`} className="tag-item">
              {tag}
              <span className="count">{count}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
