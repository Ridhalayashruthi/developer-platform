'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ChevronDown, Search, Sparkles, ArrowUpRight } from 'lucide-react';
import { QUESTIONS, TOPICS } from './questions';
export default function InterviewPreparation() {
  const [selectedTopic, setSelectedTopic] =
    useState<(typeof TOPICS)[number]>('All');
  const [search, setSearch] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'react-1': true,
    'js-1': true,
    'ts-1': true,
  });
  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const filtered = QUESTIONS.filter((q) => {
    const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const matchesSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.answer.toLowerCase().includes(search.toLowerCase());
    return matchesTopic && matchesSearch;
  });
  return (
    <section className='py-20'>
      {' '}
      <div className='mx-auto max-w-5xl px-6'>
        {' '}
        <div className='space-y-3'>
          {' '}
          <h1 className='text-4xl font-bold text-white'>
            {' '}
            Software Engineering Interview Preparation{' '}
          </h1>{' '}
          <p className='text-slate-300 leading-relaxed max-w-3xl'>
            {' '}
            Master real-world frontend, full-stack, and backend technical
            interviews with production-grade explanations, TypeScript code
            examples, and senior-level interviewer follow-up questions across
            React, JavaScript, TypeScript, System Design, and Data Structures.{' '}
          </p>{' '}
        </div>{' '}
        <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-between'>
          {' '}
          <div className='flex flex-wrap gap-2'>
            {' '}
            {TOPICS.map((topic) => (
              <button
                key={topic}
                type='button'
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                  selectedTopic === topic
                    ? 'bg-violet-600 text-white'
                    : 'border border-slate-700 bg-slate-900 text-slate-300 hover:border-violet-500'
                }`}
              >
                {' '}
                {topic}{' '}
              </button>
            ))}{' '}
          </div>{' '}
          <div className='relative sm:w-64'>
            {' '}
            <Search className='w-4 h-4 text-slate-400 absolute left-3 top-2.5' />{' '}
            <input
              type='text'
              placeholder='Search questions...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full rounded-lg border border-slate-700 bg-slate-900 pl-9 pr-3 py-1.5 text-sm text-white placeholder:text-slate-500'
            />{' '}
          </div>{' '}
        </div>{' '}
        <div className='mt-8 space-y-4'>
          {' '}
          {filtered.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <Card
                key={item.id}
                className='rounded-xl border-slate-800 bg-slate-900/70 p-5 transition hover:border-violet-500/60'
              >
                {' '}
                <button
                  type='button'
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className='w-full flex items-start justify-between gap-4 text-left'
                >
                  {' '}
                  <div className='space-y-1.5'>
                    {' '}
                    <div className='flex items-center gap-2 text-xs'>
                      {' '}
                      <span className='rounded bg-violet-950 border border-violet-700/60 px-2 py-0.5 text-violet-300 font-medium'>
                        {' '}
                        {item.topic}{' '}
                      </span>{' '}
                      <span className='text-slate-400'>{item.difficulty}</span>{' '}
                    </div>{' '}
                    <h2 className='text-base sm:text-lg font-semibold text-white'>
                      {' '}
                      {item.question}{' '}
                    </h2>{' '}
                  </div>{' '}
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-violet-400' : ''
                    }`}
                  />{' '}
                </button>{' '}
                <div
                  className={`mt-4 pt-4 border-t border-slate-800 space-y-3 text-sm text-slate-300 leading-relaxed ${
                    isOpen ? 'block' : 'hidden'
                  }`}
                >
                  {' '}
                  <p>{item.answer}</p>{' '}
                  {item.code && (
                    <pre className='rounded-lg border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-emerald-300 overflow-x-auto'>
                      {' '}
                      <code>{item.code}</code>{' '}
                    </pre>
                  )}{' '}
                  <div className='rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 text-xs text-slate-300'>
                    {' '}
                    <span className='inline-flex items-center gap-1.5 font-semibold text-violet-300 mr-1.5'>
                      {' '}
                      <Sparkles className='w-3.5 h-3.5' /> Interviewer
                      Follow-Up:{' '}
                    </span>{' '}
                    {item.followUp}{' '}
                  </div>{' '}
                  {item.relatedTool && (
                    <div className='pt-1'>
                      {' '}
                      <Link
                        href={item.relatedTool.href}
                        className='inline-flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300 underline underline-offset-4'
                      >
                        {' '}
                        Try it live: {item.relatedTool.label}{' '}
                        <ArrowUpRight className='w-3.5 h-3.5' />{' '}
                      </Link>{' '}
                    </div>
                  )}{' '}
                </div>{' '}
              </Card>
            );
          })}{' '}
        </div>{' '}
        <article className='mt-16 pt-10 border-t border-slate-800 space-y-6 text-slate-300 leading-relaxed'>
          {' '}
          <h2 className='text-2xl font-bold text-white'>
            {' '}
            How to Structure Your Frontend &amp; Full-Stack Interview
            Preparation{' '}
          </h2>{' '}
          <p>
            {' '}
            Modern software engineering interviews rarely test rote memorization
            alone. Interviewers evaluate how clearly you explain trade-offs—such
            as client-side vs. server-side rendering, time vs. space complexity,
            and token security—under realistic constraints.{' '}
          </p>{' '}
          <div className='grid sm:grid-cols-3 gap-4 text-sm'>
            {' '}
            <div className='rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5'>
              {' '}
              <h3 className='font-semibold text-white'>
                1. Explain the &ldquo;Why&rdquo; First
              </h3>{' '}
              <p className='text-slate-400'>
                {' '}
                Start every answer with the core mechanism in two sentences
                before diving into edge cases or syntax details.{' '}
              </p>{' '}
            </div>{' '}
            <div className='rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5'>
              {' '}
              <h3 className='font-semibold text-white'>
                2. Quantify Trade-Offs
              </h3>{' '}
              <p className='text-slate-400'>
                {' '}
                Compare Big-O complexity, bundle size impact, or network latency
                between your chosen solution and alternatives.{' '}
              </p>{' '}
            </div>{' '}
            <div className='rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5'>
              {' '}
              <h3 className='font-semibold text-white'>
                3. Connect to Production
              </h3>{' '}
              <p className='text-slate-400'>
                {' '}
                Mention real safeguards like hydration checks, error boundaries,
                rate limiting, and automated testing.{' '}
              </p>{' '}
            </div>{' '}
          </div>{' '}
        </article>{' '}
      </div>{' '}
    </section>
  );
}