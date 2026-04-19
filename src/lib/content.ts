import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDir = path.join(process.cwd(), 'content');

let postsCache: Post[] | null = null;

interface RawJob {
  date: string;
  title: string;
  company: string;
  location: string;
  range: string;
  url: string;
  html: string;
}

export interface Role {
  title: string;
  range: string;
  date: string;
  html: string;
}

export interface Job {
  company: string;
  location: string;
  url: string;
  date: string; // most recent role date, used for sorting companies
  roles: Role[];
}

export interface FeaturedProject {
  date: string;
  title: string;
  github?: string;
  external?: string;
  cta?: string;
  tech: string[];
  html: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  draft: boolean;
  tags: string[];
  html: string;
}

async function markdownToHtml(content: string): Promise<string> {
  const result = await remark().use(html, { sanitize: false }).process(content);
  return result.toString();
}

export async function getJobs(): Promise<Job[]> {
  const jobsDir = path.join(contentDir, 'jobs');
  const entries = fs.readdirSync(jobsDir);
  const dirs = entries.filter((e) => fs.statSync(path.join(jobsDir, e)).isDirectory());

  const jobs = await Promise.all(
    dirs.map(async (dir) => {
      const filePath = path.join(jobsDir, dir, 'index.md');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      // Build a map of "## Section Title" → body content from the markdown
      const sectionMap = new Map<string, string>();
      for (const chunk of content.split(/\n## /)) {
        const newlineIdx = chunk.indexOf('\n');
        if (newlineIdx === -1) continue;
        const title = chunk.slice(0, newlineIdx).trim();
        const body = chunk.slice(newlineIdx + 1).trim();
        sectionMap.set(title, body);
      }

      const roles: Role[] = await Promise.all(
        (data.roles as RawJob[]).map(async (r) => ({
          title: r.title,
          range: r.range,
          date: r.date,
          html: await markdownToHtml(sectionMap.get(r.title) ?? ''),
        }))
      );

      // Most recent role date drives company sort order
      const latestDate = roles.reduce(
        (max, r) => (new Date(r.date) > new Date(max) ? r.date : max),
        roles[0].date
      );

      return {
        company: data.company,
        location: data.location,
        url: data.url,
        date: latestDate,
        roles,
      } as Job;
    })
  );

  return jobs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  const featuredDir = path.join(contentDir, 'featured');
  if (!fs.existsSync(featuredDir)) return [];
  const projects = fs.readdirSync(featuredDir);

  const featured = await Promise.all(
    projects.map(async (project) => {
      const filePath = path.join(featuredDir, project, 'index.md');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      const htmlContent = await markdownToHtml(content);
      return {
        date: data.date,
        title: data.title,
        github: data.github,
        external: data.external,
        cta: data.cta,
        tech: data.tech || [],
        html: htmlContent,
      } as FeaturedProject;
    })
  );

  return featured.sort((a, b) => parseInt(a.date) - parseInt(b.date));
}

export async function getAllPosts(): Promise<Post[]> {
  if (postsCache) return postsCache;

  const postsDir = path.join(contentDir, 'posts');
  if (!fs.existsSync(postsDir)) return [];
  const postDirs = fs.readdirSync(postsDir);

  const posts = await Promise.all(
    postDirs.map(async (postDir) => {
      const filePath = path.join(postsDir, postDir, 'index.md');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      const htmlContent = await markdownToHtml(content);
      const slug = data.slug?.replace('/pensieve/', '') || postDir;
      return {
        slug,
        title: data.title,
        description: data.description || '',
        date: data.date,
        draft: data.draft || false,
        tags: data.tags || [],
        html: htmlContent,
      } as Post;
    })
  );

  postsCache = posts
    .filter(p => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return postsCache;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find(p => p.slug === slug) || null;
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getAllPosts();
  const tagMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
