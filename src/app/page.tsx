import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Jobs from '@/components/sections/Jobs';
import Featured from '@/components/sections/Featured';
import Contact from '@/components/sections/Contact';
import ScrollReveal from '@/components/ScrollReveal';
import { getJobs, getFeaturedProjects } from '@/lib/content';

export default async function Home() {
  const jobs = await getJobs();
  const projects = await getFeaturedProjects();

  return (
    <>
      <Hero />
      <ScrollReveal><About /></ScrollReveal>
      <ScrollReveal><Jobs jobs={jobs} /></ScrollReveal>
      <ScrollReveal><Featured projects={projects} /></ScrollReveal>
      <ScrollReveal><Contact /></ScrollReveal>
    </>
  );
}
