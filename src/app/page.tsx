import Link from 'next/link';
import Hero from '@/features/home/Hero';
import DeveloperTools from '@/features/home/DeveloperTools';
import LatestResources from '@/features/home/LatestResources';
import Container from '@/components/common/Container';
import { QUESTIONS } from '@/features/interview/questions';
import { ArrowRight, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

const FEATURED_QUESTIONS = QUESTIONS.slice(0, 3);

const ROADMAP_PREVIEWS = [
  {
    title: 'Frontend Engineer',
    icon: '💻',
    duration: '12–16 Weeks',
    summary:
      'HTML/CSS Grid, ES2024+, Strict TypeScript, React 19 & Next.js App Router.',
  },
  {
    title: 'Backend & APIs',
    icon: '🗄️',
    duration: '12–16 Weeks',
    summary:
      'Node.js APIs, PostgreSQL indexing, JWT/OAuth security & Redis rate limiting.',
  },
  {
    title: 'DevOps & Cloud',
    icon: '⚙️',
    duration: '10–14 Weeks',
    summary:
      'GitHub Actions CI/CD, multi-stage Docker, Nginx reverse proxy & cloud hosting.',
  },
  {
    title: 'AI Application Engineer',
    icon: '🤖',
    duration: '8–12 Weeks',
    summary:
      'Structured JSON outputs, streaming SSE, RAG pipelines & token optimization.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <DeveloperTools />

      {/* Featured Interview Questions Preview (Links to /interview) */}
      <section className='py-16 border-t border-slate-800/70'>
        <Container>
          <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8'>
            <div className='space-y-2'>
              <div className='inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400'>
                <Sparkles className='w-3.5 h-3.5' />
                Technical Interview Prep
              </div>
              <h2 className='text-3xl font-bold text-white'>
                Featured Senior Interview Questions
              </h2>
              <p className='text-sm text-slate-400 max-w-2xl'>
                Practice production-grade answers, TypeScript snippets, and
                follow-up questions across React, JavaScript, TypeScript, System
                Design, and DSA.
              </p>
            </div>

            <Link
              href='/interview'
              className='inline-flex items-center gap-1.5 rounded-xl border border-violet-600/60 bg-violet-950/40 px-4 py-2.5 text-xs font-semibold text-violet-300 hover:bg-violet-600 hover:text-white transition shrink-0'
            >
              Explore All {QUESTIONS.length}+ Questions
              <ArrowRight className='w-4 h-4' />
            </Link>
          </div>

          <div className='grid md:grid-cols-3 gap-6'>
            {FEATURED_QUESTIONS.map((item) => (
              <div
                key={item.id}
                className='rounded-2xl border border-slate-800 bg-[#111827]/80 p-6 flex flex-col justify-between space-y-4 hover:border-violet-500/50 transition'
              >
                <div className='space-y-2.5'>
                  <div className='flex items-center gap-2 text-xs'>
                    <span className='rounded bg-violet-950 border border-violet-700/60 px-2 py-0.5 text-violet-300 font-medium'>
                      {item.topic}
                    </span>
                    <span className='text-slate-400'>{item.difficulty}</span>
                  </div>
                  <h3 className='text-base font-semibold text-white leading-snug'>
                    {item.question}
                  </h3>
                  <p className='text-xs text-slate-400 line-clamp-3 leading-relaxed'>
                    {item.answer}
                  </p>
                </div>

                <Link
                  href='/interview'
                  className='inline-flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300'
                >
                  Read full answer &amp; code
                  <ArrowRight className='w-3.5 h-3.5' />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Interactive Roadmaps Preview (Links to /roadmaps) */}
      <section className='py-16 border-t border-slate-800/70'>
        <Container>
          <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8'>
            <div className='space-y-2'>
              <div className='inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400'>
                <Compass className='w-3.5 h-3.5' />
                Career Tracks
              </div>
              <h2 className='text-3xl font-bold text-white'>
                Interactive Developer Roadmaps
              </h2>
              <p className='text-sm text-slate-400 max-w-2xl'>
                Follow step-by-step engineering milestones, track your progress
                locally, and build portfolio-ready capstone projects.
              </p>
            </div>

            <Link
              href='/roadmaps'
              className='inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:border-violet-500 hover:text-white transition shrink-0'
            >
              Track Your Roadmap Progress
              <ArrowRight className='w-4 h-4' />
            </Link>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {ROADMAP_PREVIEWS.map((track) => (
              <Link
                key={track.title}
                href='/roadmaps'
                className='group rounded-2xl border border-slate-800 bg-[#111827]/80 p-5 space-y-3 hover:border-violet-500/60 transition'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-2xl'>{track.icon}</span>
                  <span className='text-[11px] font-mono text-slate-400 border border-slate-800 rounded px-2 py-0.5'>
                    {track.duration}
                  </span>
                </div>
                <h3 className='text-base font-semibold text-white group-hover:text-violet-300 transition'>
                  {track.title}
                </h3>
                <p className='text-xs text-slate-400 leading-relaxed'>
                  {track.summary}
                </p>
                <div className='pt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-400'>
                  <CheckCircle2 className='w-3.5 h-3.5' />
                  Interactive Checklist
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <LatestResources />
    </>
  );
}
