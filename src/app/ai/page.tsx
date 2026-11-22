'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/common/Container';
import { Copy, Check, Sparkles, ArrowUpRight, BookOpen } from 'lucide-react';
const PROMPTS = [
  {
    title: 'Code Review & Security Audit',
    category: 'Code Quality',
    prompt:
      'Review the following TypeScript/React code for race conditions, memory leaks, XSS/injection vulnerabilities, and unnecessary re-renders. Provide refactored code with concise explanations.',
  },
  {
    title: 'System Design Architecture Breakdown',
    category: 'System Design',
    prompt:
      'Design a scalable architecture for [System Name] handling 50k requests/sec. Cover API design, database partitioning, caching strategy, failure modes, and trade-offs.',
  },
  {
    title: 'Unit & Integration Test Generator',
    category: 'Testing',
    prompt:
      'Write comprehensive Vitest/Jest unit tests for this function covering happy paths, boundary values, null/undefined inputs, and async error handling.',
  },
  {
    title: 'SQL Query Optimization',
    category: 'Database',
    prompt:
      'Analyze this PostgreSQL query and table schema. Suggest composite indexes, explain the likely query execution plan bottlenecks, and rewrite the query for O(log n) index scans.',
  },
  {
    title: 'Strict JSON Schema Output Enforcement',
    category: 'LLM Engineering',
    prompt:
      'Extract structured entities from the following text and return ONLY valid RFC 8259 JSON matching this exact TypeScript interface: [Paste Interface]. Do not include markdown fences or commentary.',
  },
  {
    title: 'API Error & Incident Root-Cause Analyzer',
    category: 'Debugging',
    prompt:
      'Analyze these production stack traces and HTTP status logs. Identify the root cause, list reproduction steps, and propose both an immediate hotfix and a long-term safeguard.',
  },
  {
    title: 'Legacy JavaScript to Strict TypeScript Migration',
    category: 'Refactoring',
    prompt:
      "Convert this JavaScript module to strict TypeScript without using 'any'. Define discriminated unions for state transitions, add type guards for external inputs, and preserve runtime behavior.",
  },
  {
    title: 'RAG Chunking & Retrieval Evaluator',
    category: 'AI Architecture',
    prompt:
      'Evaluate this document chunking strategy for a Retrieval-Augmented Generation (RAG) pipeline. Recommend optimal chunk size, overlap percentage, metadata filters, and reranking steps.',
  },
];
export default function AiHubPage() {
  const [text, setText] = useState(
    'Paste any prompt or code snippet here to estimate token count before sending to an LLM...'
  );
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const estimatedTokens = Math.ceil(text.length / 4);
  const copyPrompt = (prompt: string, idx: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };
  return (
    <div className='py-16'>
      {' '}
      <Container>
        {' '}
        <div className='max-w-5xl mx-auto space-y-12'>
          {' '}
          <div>
            {' '}
            <div className='inline-flex items-center gap-2 rounded-full border border-violet-700/60 bg-violet-950/50 px-3 py-1 text-xs text-violet-300 mb-3'>
              {' '}
              <Sparkles className='w-3.5 h-3.5' /> AI Developer Toolkit &amp;
              Prompt Engineering Guide{' '}
            </div>{' '}
            <h1 className='text-4xl font-bold text-white'>
              {' '}
              AI Prompt Library &amp; LLM Token Estimator{' '}
            </h1>{' '}
            <p className='mt-3 text-slate-300 leading-relaxed max-w-3xl'>
              {' '}
              Copy battle-tested engineering prompts for code reviews, automated
              testing, SQL tuning, and structured JSON extraction—or calculate
              approximate LLM token usage 100% locally in your browser before
              calling OpenAI, Gemini, or Anthropic APIs.{' '}
            </p>{' '}
          </div>{' '}
          <div className='rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4'>
            {' '}
            <div className='flex flex-wrap items-center justify-between gap-2'>
              {' '}
              <h2 className='text-lg font-semibold text-white'>
                {' '}
                Instant LLM Token &amp; Context Estimator{' '}
              </h2>{' '}
              <div className='flex gap-4 text-xs font-mono'>
                {' '}
                <span className='text-slate-400'>
                  {' '}
                  Words: <strong className='text-white'>
                    {wordCount}
                  </strong>{' '}
                </span>{' '}
                <span className='text-slate-400'>
                  {' '}
                  Characters:{' '}
                  <strong className='text-white'>{text.length}</strong>{' '}
                </span>{' '}
                <span className='text-violet-400'>
                  {' '}
                  Est. Tokens: <strong>~{estimatedTokens}</strong>{' '}
                </span>{' '}
              </div>{' '}
            </div>{' '}
            <textarea
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className='w-full rounded-xl border border-slate-700 bg-slate-950 p-3.5 font-mono text-sm text-slate-200 focus:border-violet-500 focus:outline-none'
            />{' '}
            <p className='text-xs text-slate-400'>
              {' '}
              Privacy note: Your prompt text never leaves your browser. Token
              estimates use the standard ~4 characters per token heuristic for
              English code and prose.{' '}
            </p>{' '}
          </div>{' '}
          <div className='space-y-4'>
            {' '}
            <h2 className='text-2xl font-bold text-white'>
              {' '}
              Curated Software Engineering Prompts{' '}
            </h2>{' '}
            <div className='grid md:grid-cols-2 gap-6'>
              {' '}
              {PROMPTS.map((item, idx) => (
                <div
                  key={item.title}
                  className='rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between space-y-4 hover:border-violet-500/50 transition'
                >
                  {' '}
                  <div className='space-y-2'>
                    {' '}
                    <span className='text-xs font-medium text-cyan-400'>
                      {' '}
                      {item.category}{' '}
                    </span>{' '}
                    <h3 className='text-lg font-semibold text-white'>
                      {' '}
                      {item.title}{' '}
                    </h3>{' '}
                    <p className='text-sm text-slate-300 leading-relaxed'>
                      {' '}
                      {item.prompt}{' '}
                    </p>{' '}
                  </div>{' '}
                  <button
                    type='button'
                    onClick={() => copyPrompt(item.prompt, idx)}
                    className='self-start inline-flex items-center gap-1.5 rounded-lg border border-slate-700 hover:border-violet-500 bg-slate-950 px-3.5 py-2 text-xs font-medium text-slate-200 transition'
                  >
                    {' '}
                    {copiedIdx === idx ? (
                      <Check className='w-3.5 h-3.5 text-emerald-400' />
                    ) : (
                      <Copy className='w-3.5 h-3.5' />
                    )}{' '}
                    {copiedIdx === idx ? 'Copied Prompt' : 'Copy Prompt'}{' '}
                  </button>{' '}
                </div>
              ))}{' '}
            </div>{' '}
          </div>{' '}
          <article className='pt-10 border-t border-slate-800 space-y-8 text-slate-300 leading-relaxed'>
            {' '}
            <div className='space-y-3'>
              {' '}
              <div className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-400'>
                {' '}
                <BookOpen className='w-4 h-4' /> Practical AI Engineering Guide{' '}
              </div>{' '}
              <h2 className='text-2xl font-bold text-white'>
                {' '}
                How LLM Tokenization, Context Windows &amp; Structured Outputs
                Work{' '}
              </h2>{' '}
              <p>
                {' '}
                Large Language Models (LLMs) do not read raw characters or full
                words—they break input text into subword units called{' '}
                <strong>tokens</strong> using algorithms like Byte-Pair Encoding
                (BPE). For English prose, one token averages roughly 4
                characters or 0.75 words, while dense source code, minified
                JSON, and punctuation often consume more tokens per line.
                Estimating token counts before making API calls helps prevent
                context-window truncation and keeps per-request inference costs
                predictable.{' '}
              </p>{' '}
            </div>{' '}
            <div className='grid md:grid-cols-2 gap-6 text-sm'>
              {' '}
              <div className='rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-2'>
                {' '}
                <h3 className='text-base font-semibold text-white'>
                  {' '}
                  1. Enforcing Valid JSON Responses in Production{' '}
                </h3>{' '}
                <p className='text-slate-400'>
                  {' '}
                  When integrating LLMs into backend pipelines, always pair
                  explicit schema instructions with native structured-output
                  modes (such as{' '}
                  <code>responseMimeType: &quot;application/json&quot;</code>)
                  and validate the returned payload before parsing. You can
                  inspect and validate raw LLM JSON outputs immediately using
                  our{' '}
                  <Link
                    href='/tools/json-formatter'
                    className='text-violet-400 underline underline-offset-4 hover:text-violet-300'
                  >
                    {' '}
                    Online JSON Formatter &amp; Validator{' '}
                  </Link>{' '}
                  .{' '}
                </p>{' '}
              </div>{' '}
              <div className='rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-2'>
                {' '}
                <h3 className='text-base font-semibold text-white'>
                  {' '}
                  2. Securing AI API Keys &amp; Authentication Tokens{' '}
                </h3>{' '}
                <p className='text-slate-400'>
                  {' '}
                  Never expose LLM provider keys inside client-side React
                  bundles. Route inference requests through a server-side
                  Next.js Route Handler or edge proxy protected by rate limiting
                  and short-lived bearer tokens—and inspect auth claims safely
                  with our{' '}
                  <Link
                    href='/tools/jwt-decoder'
                    className='text-violet-400 underline underline-offset-4 hover:text-violet-300'
                  >
                    {' '}
                    Client-Side JWT Decoder{' '}
                  </Link>{' '}
                  .{' '}
                </p>{' '}
              </div>{' '}
            </div>{' '}
            <div className='space-y-3'>
              {' '}
              <h3 className='text-xl font-semibold text-white'>
                {' '}
                Best Practices for Retrieval-Augmented Generation (RAG){' '}
              </h3>{' '}
              <ul className='list-disc pl-6 space-y-2 text-sm text-slate-300'>
                {' '}
                <li>
                  {' '}
                  <strong>Chunk by Semantic Boundaries:</strong> Split technical
                  documentation by headings or paragraphs (400–800 tokens with
                  10–15% overlap) rather than arbitrary character counts so code
                  examples stay intact.{' '}
                </li>{' '}
                <li>
                  {' '}
                  <strong>
                    Combine Dense Vectors with Keyword Search:
                  </strong>{' '}
                  Hybrid retrieval (vector embeddings + BM25 keyword matching)
                  dramatically improves recall on exact function names, error
                  codes, and SDK versions.{' '}
                </li>{' '}
                <li>
                  {' '}
                  <strong>Require Grounded Citations:</strong> Instruct the
                  model to answer strictly from retrieved context snippets and
                  return &ldquo;Insufficient context&rdquo; when documentation
                  is missing to eliminate hallucinations.{' '}
                </li>{' '}
              </ul>{' '}
              <div className='pt-2'>
                {' '}
                <Link
                  href='/interview'
                  className='inline-flex items-center gap-1 text-sm font-medium text-violet-400 hover:text-violet-300 underline underline-offset-4'
                >
                  {' '}
                  Explore System Design &amp; Full-Stack Interview Questions{' '}
                  <ArrowUpRight className='w-4 h-4' />{' '}
                </Link>{' '}
              </div>{' '}
            </div>{' '}
          </article>{' '}
        </div>{' '}
      </Container>{' '}
    </div>
  );
}
