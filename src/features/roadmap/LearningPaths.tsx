'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Circle, ArrowUpRight, Compass } from 'lucide-react';

interface MilestoneItem {
  label: string;
  toolLink?: { label: string; href: string };
}

interface RoadmapTrack {
  id: string;
  title: string;
  icon: string;
  duration: string;
  description: string;
  capstoneProject: string;
  milestones: MilestoneItem[];
}

const PATHS: RoadmapTrack[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineer',
    icon: '💻',
    duration: '12–16 Weeks',
    description:
      'Master modern responsive UI architecture, React 19 concurrent features, strict TypeScript, and Next.js App Router.',
    capstoneProject:
      'Build a multi-tool developer productivity suite with SSR metadata, client-side state persistence, and Lighthouse 95+ performance.',
    milestones: [
      {
        label:
          'Semantic HTML5, accessible ARIA landmarks, CSS Grid & Flexbox layouts',
        toolLink: { label: 'HSL Color Picker', href: '/tools/color-picker' },
      },
      {
        label:
          'Modern ES2024+ JavaScript, closures, Promises & Async Event Loop',
        toolLink: { label: 'Regex Tester', href: '/tools/regex-tester' },
      },
      {
        label:
          'TypeScript strict mode, generics, discriminated unions & type narrowing',
      },
      {
        label:
          'React Hooks, custom hooks, state architecture & render optimization',
      },
      {
        label:
          'Next.js App Router, Server Components, SEO sitemaps & Vercel CI/CD',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    icon: '🗄️',
    duration: '12–16 Weeks',
    description:
      'Design scalable REST/GraphQL services, relational database schemas, caching layers, and stateless authentication flows.',
    capstoneProject:
      'Build a rate-limited multi-tenant REST API with PostgreSQL migrations, Redis caching, and role-based JWT auth.',
    milestones: [
      {
        label:
          'Node.js runtime, Express / Fastify routing, validation & error middleware',
        toolLink: { label: 'JSON Validator', href: '/tools/json-formatter' },
      },
      {
        label:
          'PostgreSQL relational schema design, composite indexing & query plans',
        toolLink: { label: 'UUID Generator', href: '/tools/uuid-generator' },
      },
      {
        label: 'JWT authentication, OAuth 2.0 flows, password hashing & RBAC',
        toolLink: { label: 'JWT Decoder', href: '/tools/jwt-decoder' },
      },
      {
        label:
          'Redis caching strategies, sliding-window rate limiting & job queues',
      },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    icon: '⚙️',
    duration: '10–14 Weeks',
    description:
      'Automate testing, reproducible container builds, reverse proxies, and zero-downtime cloud deployments.',
    capstoneProject:
      'Containerize a full-stack Next.js + PostgreSQL service with automated GitHub Actions tests and HTTPS reverse proxy.',
    milestones: [
      {
        label:
          'Git branching strategies, pull request checks & GitHub Actions CI/CD',
      },
      {
        label: 'Docker multi-stage builds, image optimization & Docker Compose',
        toolLink: {
          label: 'Base64 Secrets Helper',
          href: '/tools/base64-encoder',
        },
      },
      {
        label:
          'Linux shell scripting, Nginx reverse proxy, DNS & SSL/TLS certificates',
      },
      {
        label:
          'Cloud observability, structured logging, alerts & Vercel / AWS hosting',
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI Application Engineer',
    icon: '🤖',
    duration: '8–12 Weeks',
    description:
      'Build reliable production LLM applications with structured JSON outputs, tool calling, RAG pipelines, and guardrails.',
    capstoneProject:
      'Build a citation-backed technical documentation assistant using hybrid vector search and streaming UI responses.',
    milestones: [
      {
        label:
          'Prompt engineering, system instructions & strict JSON schema enforcement',
        toolLink: { label: 'AI Prompt & Token Tool', href: '/ai' },
      },
      {
        label:
          'Server-Sent Events (SSE) streaming responses & function/tool calling',
      },
      {
        label:
          'Text embeddings, vector databases & Retrieval-Augmented Generation (RAG)',
      },
      {
        label:
          'Token budget optimization, latency caching & automated eval guardrails',
      },
    ],
  },
];

const STORAGE_KEY = 'devtoolkit-roadmap-progress-v1';

export default function LearningPaths() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    'frontend-0': true,
    'frontend-1': true,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setCompleted(JSON.parse(saved));
        }
      } catch {
        /* ignore */
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleStep = (key: string) => {
    setCompleted((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      return updated;
    });
  };

  return (
    <section className='py-20'>
      <div className='mx-auto max-w-6xl px-6 space-y-12'>
        <div className='space-y-3 max-w-3xl'>
          <div className='inline-flex items-center gap-2 rounded-full border border-violet-700/60 bg-violet-950/50 px-3 py-1 text-xs text-violet-300'>
            <Compass className='w-3.5 h-3.5' />
            Interactive Career Tracks
          </div>
          <h1 className='text-4xl font-bold text-white'>
            Developer Career &amp; Engineering Roadmaps
          </h1>
          <p className='text-slate-300 leading-relaxed'>
            Follow structured, milestone-driven learning paths across Frontend,
            Backend, DevOps, and AI Engineering. Click any milestone to track
            your progress locally in your browser and jump straight into
            hands-on developer utilities.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          {PATHS.map((path) => {
            const doneCount = path.milestones.filter(
              (_, idx) => !!completed[`${path.id}-${idx}`]
            ).length;
            const percent = Math.round(
              (doneCount / path.milestones.length) * 100
            );

            return (
              <Card
                key={path.id}
                className='rounded-2xl border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between space-y-6'
              >
                <div className='space-y-4'>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <span className='text-2xl'>{path.icon}</span>
                      <h2 className='mt-2 text-2xl font-bold text-white'>
                        {path.title}
                      </h2>
                    </div>
                    <span className='rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-mono text-slate-300'>
                      {path.duration}
                    </span>
                  </div>

                  <p className='text-sm text-slate-300 leading-relaxed'>
                    {path.description}
                  </p>

                  <div className='space-y-1.5'>
                    <div className='flex justify-between text-xs text-slate-400'>
                      <span>Track Progress</span>
                      <span className='font-mono text-violet-300'>
                        {doneCount}/{path.milestones.length} ({percent}%)
                      </span>
                    </div>
                    <div className='h-2 w-full rounded-full bg-slate-800 overflow-hidden'>
                      <div
                        className='h-full bg-violet-600 transition-all duration-300'
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <ul className='space-y-2.5 pt-2'>
                    {path.milestones.map((step, idx) => {
                      const key = `${path.id}-${idx}`;
                      const isDone = !!completed[key];
                      return (
                        <li
                          key={key}
                          className='rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 text-sm'
                        >
                          <button
                            type='button'
                            onClick={() => toggleStep(key)}
                            className='w-full flex items-start gap-2.5 text-left'
                          >
                            {isDone ? (
                              <CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0 mt-0.5' />
                            ) : (
                              <Circle className='w-4 h-4 text-slate-500 shrink-0 mt-0.5' />
                            )}
                            <span
                              className={
                                isDone
                                  ? 'text-slate-400 line-through'
                                  : 'text-slate-200'
                              }
                            >
                              {step.label}
                            </span>
                          </button>

                          {step.toolLink && (
                            <div className='mt-1.5 pl-6'>
                              <Link
                                href={step.toolLink.href}
                                className='inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 underline underline-offset-4'
                              >
                                Practice with {step.toolLink.label}
                                <ArrowUpRight className='w-3 h-3' />
                              </Link>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className='rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300 space-y-1'>
                  <div className='font-semibold text-violet-300'>
                    Recommended Capstone Deliverable:
                  </div>
                  <p className='text-slate-400 leading-relaxed'>
                    {path.capstoneProject}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <article className='pt-10 border-t border-slate-800 space-y-6 text-slate-300 leading-relaxed'>
          <h2 className='text-2xl font-bold text-white'>
            How to Turn a Developer Roadmap into Job-Ready Engineering Proof
          </h2>
          <p>
            Completing tutorials alone rarely convinces technical hiring
            managers. The fastest way to stand out for Frontend, Full-Stack,
            DevOps, or AI Engineering roles is to pair every roadmap milestone
            with a deployed, working artifact and clean architectural
            documentation.
          </p>
          <div className='grid sm:grid-cols-3 gap-4 text-sm'>
            <div className='rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5'>
              <h3 className='font-semibold text-white'>Build in Public</h3>
              <p className='text-slate-400'>
                Deploy every capstone project to a live URL with a clean README
                explaining schema choices, trade-offs, and performance
                benchmarks.
              </p>
            </div>
            <div className='rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5'>
              <h3 className='font-semibold text-white'>
                Master Debugging Tools
              </h3>
              <p className='text-slate-400'>
                Learn to inspect network payloads, JWT claims, regex edge cases,
                and SQL query plans systematically rather than guessing.
              </p>
            </div>
            <div className='rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5'>
              <h3 className='font-semibold text-white'>
                Practice Explaining Trade-Offs
              </h3>
              <p className='text-slate-400'>
                Pair your roadmap milestones with our{' '}
                <Link
                  href='/interview'
                  className='text-violet-400 underline underline-offset-4 hover:text-violet-300'
                >
                  Interview Preparation Q&amp;A
                </Link>{' '}
                to practice articulating architectural decisions under interview
                pressure.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
