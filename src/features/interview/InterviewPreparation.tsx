'use client';

import React, { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Eye,
  EyeOff,
  Globe,
  Loader2,
  Plus,
  RotateCcw,
  Search,
  Shuffle,
  Sparkles,
  X,
} from 'lucide-react';
import {
  DIFFICULTIES,
  QUESTIONS,
  TOPICS,
  type QuestionItem,
} from './questions';

const STORAGE_KEY = 'devtoolkit-interview-mastered-v1';

const DIFFICULTY_STYLES: Record<QuestionItem['difficulty'], string> = {
  Beginner: 'border-emerald-500/30 bg-emerald-950/50 text-emerald-300',
  Intermediate: 'border-amber-500/30 bg-amber-950/50 text-amber-300',
  Senior: 'border-rose-500/30 bg-rose-950/50 text-rose-300',
};

const LOADING_MESSAGES = [
  'Synthesizing senior-level Q&As...',
  'Formatting TypeScript code examples...',
  'Linking live DevToolkit utilities...',
];

export default function InterviewPreparation() {
  const [selectedTopic, setSelectedTopic] =
    useState<(typeof TOPICS)[number]>('All');
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<(typeof DIFFICULTIES)[number]>('All');
  const [search, setSearch] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'react-1': true,
    'js-1': true,
    'ts-1': true,
  });

  // Study & Self-Test controls
  const [selfTestMode, setSelfTestMode] = useState(false);
  const [showUnmasteredOnly, setShowUnmasteredOnly] = useState(false);
  const [shuffleOrder, setShuffleOrder] = useState<string[] | null>(null);
  const [storageVersion, setStorageVersion] = useState(0);

  // Live AI / Community Search state
  const [dynamicQuestions, setDynamicQuestions] = useState<QuestionItem[]>([]);
  const [aiMatchedIds, setAiMatchedIds] = useState<Set<string>>(new Set());
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [aiNotice, setAiNotice] = useState<string | null>(null);

  // Local Q&A Code Generator drawer
  const [showGenerator, setShowGenerator] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [genTopic, setGenTopic] = useState<QuestionItem['topic']>('React');
  const [genDifficulty, setGenDifficulty] =
    useState<QuestionItem['difficulty']>('Intermediate');
  const [genQuestion, setGenQuestion] = useState('');
  const [genAnswer, setGenAnswer] = useState('');
  const [genFollowUp, setGenFollowUp] = useState('');
  const [genCode, setGenCode] = useState('');
  const [genToolLabel, setGenToolLabel] = useState('');
  const [genToolHref, setGenToolHref] = useState('');

  const masteredRaw = useSyncExternalStore(
    (cb) => {
      window.addEventListener('storage', cb);
      return () => window.removeEventListener('storage', cb);
    },
    () => window.localStorage.getItem(STORAGE_KEY) ?? '{}',
    () => '{}'
  );

  const masteredIds: Record<string, boolean> = useMemo(() => {
    try {
      return JSON.parse(masteredRaw);
    } catch {
      return {};
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masteredRaw, storageVersion]);

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = { ...masteredIds, [id]: !masteredIds[id] };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setStorageVersion((v) => v + 1);
  };

  const resetProgress = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setStorageVersion((v) => v + 1);
  };

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allQuestions = useMemo(
    () => [...dynamicQuestions, ...QUESTIONS],
    [dynamicQuestions]
  );

  const handleLiveSearch = async (overrideQuery?: string) => {
    const activeQuery = (overrideQuery ?? search).trim();
    if (activeQuery.length < 2 || isSearchingLive) return;

    setIsSearchingLive(true);
    setLiveError(null);
    setAiNotice(null);
    setLoadingMsgIdx(0);

    const ticker = window.setInterval(() => {
      setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1800);

    try {
      const res = await fetch('/api/interview-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: activeQuery }),
      });

      const data = (await res.json()) as {
        questions?: QuestionItem[];
        source?: string;
        error?: string;
      };

      if (!res.ok || !data.questions) {
        throw new Error(data.error || 'Failed to generate interview questions.');
      }

      const returnedQuestions = data.questions;

      setDynamicQuestions((prev) => {
        const existingQuestions = new Set(
          [...prev, ...QUESTIONS].map((item) => item.question.toLowerCase())
        );
        const fresh = returnedQuestions.filter(
          (item) => !existingQuestions.has(item.question.toLowerCase())
        );
        return [...fresh, ...prev];
      });

      // Track returned IDs so spelling variations (e.g., initialisation vs initialization) still display
      setAiMatchedIds(new Set(returnedQuestions.map((q) => q.id)));
      setSelectedTopic('All');
      setSelectedDifficulty('All');
      setSelfTestMode(false);

      setOpenIds((prev) => {
        const next = { ...prev };
        returnedQuestions.forEach((q) => {
          next[q.id] = true;
        });
        return next;
      });

      setAiNotice(
        data.source === 'cache'
          ? `Loaded ${returnedQuestions.length} cached Q&As for "${activeQuery}"`
          : `Generated ${returnedQuestions.length} fresh Q&As for "${activeQuery}"`
      );
    } catch (err) {
      setLiveError(
        err instanceof Error ? err.message : 'Unable to fetch live Q&As.'
      );
    } finally {
      window.clearInterval(ticker);
      setIsSearchingLive(false);
    }
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const list = allQuestions.filter((q) => {
      const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
      const matchesDifficulty =
        selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchesMastered = !showUnmasteredOnly || !masteredIds[q.id];
      const matchesSearch =
        !query ||
        aiMatchedIds.has(q.id) ||
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query) ||
        q.followUp.toLowerCase().includes(query);

      return (
        matchesTopic && matchesDifficulty && matchesMastered && matchesSearch
      );
    });

    if (!shuffleOrder) return list;
    const rank = new Map(shuffleOrder.map((id, idx) => [id, idx]));
    return [...list].sort(
      (a, b) => (rank.get(a.id) ?? 999) - (rank.get(b.id) ?? 999)
    );
  }, [
    allQuestions,
    selectedTopic,
    selectedDifficulty,
    search,
    showUnmasteredOnly,
    masteredIds,
    aiMatchedIds,
    shuffleOrder,
  ]);

  const masteredCount = useMemo(
    () => allQuestions.filter((q) => masteredIds[q.id]).length,
    [allQuestions, masteredIds]
  );
  const progressPercent =
    allQuestions.length > 0
      ? Math.round((masteredCount / allQuestions.length) * 100)
      : 0;

  const handleShuffle = () => {
    const ids = allQuestions.map((q) => q.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setShuffleOrder(ids);
  };

  const toggleSelfTest = () => {
    const nextMode = !selfTestMode;
    setSelfTestMode(nextMode);
    if (nextMode) {
      setOpenIds({});
    }
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    filtered.forEach((q) => {
      next[q.id] = true;
    });
    setOpenIds(next);
  };

  const collapseAll = () => setOpenIds({});

  // Sequential ID calculator for local Q&A code generator
  const nextTopicId = useMemo(() => {
    const prefixMap: Record<QuestionItem['topic'], string> = {
      React: 'react',
      JavaScript: 'js',
      TypeScript: 'ts',
      'System Design': 'sd',
      DSA: 'dsa',
      'Performance & Security': 'sec',
    };
    const prefix = prefixMap[genTopic];
    const count = allQuestions.filter((q) => q.id.startsWith(`${prefix}-`)).length;
    return `${prefix}-${count + 1}`;
  }, [genTopic, allQuestions]);

  const generatedTsSnippet = useMemo(() => {
    const esc = (val: string) =>
      val.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const lines = [
      '  {',
      `    id: '${nextTopicId}',`,
      `    topic: '${genTopic}',`,
      `    difficulty: '${genDifficulty}',`,
      `    question: '${esc(genQuestion || 'Your interview question here')}',`,
      `    answer: '${esc(genAnswer || 'Your concise senior-level answer here')}',`,
      `    followUp: '${esc(genFollowUp || 'Interviewer follow-up question here')}',`,
    ];
    if (genCode.trim()) {
      const safeCode = genCode.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
      lines.push(`    code: \`${safeCode}\`,`);
    }
    if (genToolLabel.trim() && genToolHref.trim()) {
      lines.push(
        `    relatedTool: { label: '${esc(genToolLabel)}', href: '${esc(genToolHref)}' },`
      );
    }
    lines.push('  },');
    return lines.join('\n');
  }, [
    nextTopicId,
    genTopic,
    genDifficulty,
    genQuestion,
    genAnswer,
    genFollowUp,
    genCode,
    genToolLabel,
    genToolHref,
  ]);

  const copyGeneratedSnippet = async () => {
    await navigator.clipboard.writeText(generatedTsSnippet);
    setCopiedSnippet(true);
    window.setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section className='py-14 sm:py-20'>
      <div className='mx-auto max-w-5xl px-4 sm:px-6'>
        {/* Compact Header + Mastery Progress Card */}
        <div className='flex flex-col lg:flex-row lg:items-end justify-between gap-6'>
          <div className='space-y-2.5 max-w-2xl'>
            <h1 className='text-3xl sm:text-4xl font-bold tracking-tight text-white'>
              Engineering Interview Prep
            </h1>
            <p className='text-sm sm:text-base text-slate-300 leading-relaxed'>
              Practice curated Q&amp;As or search any stack—React 19, Docker,
              GraphQL, Next.js Server Actions—to generate crisp interview prep
              instantly.
            </p>
          </div>

          <div className='w-full lg:w-72 rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 space-y-2'>
            <div className='flex items-center justify-between text-xs'>
              <span className='font-medium text-slate-300'>Study Mastery</span>
              <span className='font-mono font-semibold text-violet-300'>
                {masteredCount}/{allQuestions.length} ({progressPercent}%)
              </span>
            </div>
            <div className='h-1.5 w-full rounded-full bg-slate-800 overflow-hidden'>
              <div
                className='h-full bg-violet-500 transition-all duration-300'
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className='flex items-center justify-between text-[11px] text-slate-500'>
              <span>Saved locally in browser</span>
              {masteredCount > 0 && (
                <button
                  type='button'
                  onClick={resetProgress}
                  className='inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition'
                >
                  <RotateCcw className='w-3 h-3' /> Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Unified 2-Row Command Toolbar */}
        <div className='mt-8 rounded-2xl border border-slate-800 bg-slate-900/75 p-4 space-y-3.5 shadow-lg shadow-slate-950/40'>
          {/* Row 1: Search Input + Generate AI Q&As */}
          <div className='flex flex-col sm:flex-row gap-2.5'>
            <div className='relative flex-1'>
              <Search className='w-4 h-4 text-slate-400 absolute left-3.5 top-3' />
              <input
                type='text'
                placeholder='Search topics or type any stack (e.g. Docker, GraphQL, React 19)...'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (aiMatchedIds.size > 0) setAiMatchedIds(new Set());
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && search.trim().length >= 2) {
                    handleLiveSearch();
                  }
                }}
                className='w-full rounded-xl border border-slate-700/90 bg-slate-950 pl-10 pr-9 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none transition'
              />
              {search && (
                <button
                  type='button'
                  aria-label='Clear search'
                  onClick={() => {
                    setSearch('');
                    setAiMatchedIds(new Set());
                    setAiNotice(null);
                    setLiveError(null);
                  }}
                  className='absolute right-3 top-2.5 text-slate-400 hover:text-white transition'
                >
                  <X className='w-4 h-4' />
                </button>
              )}
            </div>

            <div className='flex items-center gap-2'>
              <button
                type='button'
                disabled={isSearchingLive || search.trim().length < 2}
                onClick={() => handleLiveSearch()}
                className='flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-45 disabled:pointer-events-none px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition cursor-pointer'
              >
                {isSearchingLive ? (
                  <>
                    <Loader2 className='w-4 h-4 animate-spin' />
                    Generating...
                  </>
                ) : (
                  <>
                    <Globe className='w-4 h-4' />
                    Generate AI Q&amp;As
                  </>
                )}
              </button>

              {process.env.NODE_ENV === 'development' && (
                <button
                  type='button'
                  onClick={() => setShowGenerator((prev) => !prev)}
                  className='inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950 hover:border-violet-500 px-3 py-2.5 text-xs font-medium text-slate-300 transition'
                  title='Open local TypeScript Q&A generator'
                >
                  <Plus className='w-3.5 h-3.5' />
                  <span className='hidden md:inline'>Add</span>
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Topic Pills */}
          <div className='flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar'>
            {TOPICS.map((topic) => (
              <button
                key={topic}
                type='button'
                onClick={() => setSelectedTopic(topic)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  selectedTopic === topic
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:border-violet-500/60 hover:text-white'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Row 3: Difficulty + Study Controls + Result Count */}
          <div className='pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs'>
            <div className='flex flex-wrap items-center gap-1.5'>
              <span className='text-slate-500 mr-1'>Level:</span>
              {DIFFICULTIES.map((level) => (
                <button
                  key={level}
                  type='button'
                  onClick={() => setSelectedDifficulty(level)}
                  className={`rounded-md px-2.5 py-1 font-medium transition ${
                    selectedDifficulty === level
                      ? 'bg-slate-800 text-violet-300 border border-violet-500/50'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <div className='flex flex-wrap items-center gap-2'>
              <button
                type='button'
                onClick={toggleSelfTest}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-medium transition ${
                  selfTestMode
                    ? 'border-amber-500/50 bg-amber-950/40 text-amber-300'
                    : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                }`}
              >
                {selfTestMode ? (
                  <EyeOff className='w-3.5 h-3.5' />
                ) : (
                  <Eye className='w-3.5 h-3.5' />
                )}
                Self-Test
              </button>

              <button
                type='button'
                onClick={handleShuffle}
                className='inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 hover:border-slate-700 px-2.5 py-1 font-medium text-slate-300 transition'
              >
                <Shuffle className='w-3.5 h-3.5' />
                Shuffle
              </button>

              <button
                type='button'
                onClick={() => setShowUnmasteredOnly((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-medium transition ${
                  showUnmasteredOnly
                    ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                    : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                }`}
              >
                <CheckCircle2 className='w-3.5 h-3.5' />
                Unmastered
              </button>

              <span className='hidden sm:inline text-slate-700'>|</span>

              <span className='text-slate-400 font-mono'>
                {filtered.length} Q&amp;As
              </span>

              {filtered.length > 0 && (
                <div className='hidden md:flex items-center gap-2 ml-1'>
                  <button
                    type='button'
                    onClick={expandAll}
                    className='text-violet-400 hover:text-violet-300'
                  >
                    Expand
                  </button>
                  <button
                    type='button'
                    onClick={collapseAll}
                    className='text-slate-400 hover:text-slate-200'
                  >
                    Collapse
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Banners */}
        {aiNotice && (
          <div className='mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-4 py-2.5 text-xs text-emerald-300 flex items-center justify-between'>
            <span className='inline-flex items-center gap-2'>
              <Sparkles className='w-3.5 h-3.5 shrink-0' />
              {aiNotice}
            </span>
            <button
              type='button'
              onClick={() => setAiNotice(null)}
              className='text-emerald-400 hover:text-white'
            >
              <X className='w-3.5 h-3.5' />
            </button>
          </div>
        )}

        {liveError && (
          <div className='mt-4 rounded-xl border border-rose-500/40 bg-rose-950/30 px-4 py-2.5 text-xs text-rose-300 flex items-center justify-between gap-3'>
            <span>{liveError}</span>
            <button
              type='button'
              onClick={() => handleLiveSearch()}
              className='shrink-0 underline font-medium hover:text-white'
            >
              Retry
            </button>
          </div>
        )}

        {/* Dev-Only Local TypeScript Q&A Generator Drawer */}
        {showGenerator && (
          <div className='mt-5 rounded-2xl border border-violet-500/40 bg-slate-900/90 p-5 space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-sm font-semibold text-white'>
                  Local Q&amp;A Code Generator ({nextTopicId})
                </h2>
                <p className='text-xs text-slate-400'>
                  Generates an escaped TypeScript object ready to paste into{' '}
                  <code>questions.ts</code>.
                </p>
              </div>
              <button
                type='button'
                onClick={copyGeneratedSnippet}
                className='inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition'
              >
                {copiedSnippet ? (
                  <>
                    <Check className='w-3.5 h-3.5' /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className='w-3.5 h-3.5' /> Copy Snippet
                  </>
                )}
              </button>
            </div>

            <div className='grid sm:grid-cols-2 gap-3 text-xs'>
              <select
                value={genTopic}
                onChange={(e) =>
                  setGenTopic(e.target.value as QuestionItem['topic'])
                }
                className='rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white'
              >
                {TOPICS.filter((t) => t !== 'All').map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                value={genDifficulty}
                onChange={(e) =>
                  setGenDifficulty(e.target.value as QuestionItem['difficulty'])
                }
                className='rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white'
              >
                {DIFFICULTIES.filter((d) => d !== 'All').map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <input
                type='text'
                placeholder='Interview question...'
                value={genQuestion}
                onChange={(e) => setGenQuestion(e.target.value)}
                className='sm:col-span-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white'
              />

              <textarea
                rows={2}
                placeholder='Concise senior-level answer...'
                value={genAnswer}
                onChange={(e) => setGenAnswer(e.target.value)}
                className='sm:col-span-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white'
              />

              <input
                type='text'
                placeholder='Interviewer follow-up question...'
                value={genFollowUp}
                onChange={(e) => setGenFollowUp(e.target.value)}
                className='sm:col-span-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white'
              />

              <textarea
                rows={2}
                placeholder='Optional TypeScript/JS code example...'
                value={genCode}
                onChange={(e) => setGenCode(e.target.value)}
                className='sm:col-span-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-emerald-300'
              />

              <input
                type='text'
                placeholder='Related tool label (e.g. Inspect JWT)'
                value={genToolLabel}
                onChange={(e) => setGenToolLabel(e.target.value)}
                className='rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white'
              />

              <input
                type='text'
                placeholder='Related tool route (e.g. /tools/jwt-decoder)'
                value={genToolHref}
                onChange={(e) => setGenToolHref(e.target.value)}
                className='rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white'
              />
            </div>

            <pre className='rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-emerald-300 overflow-x-auto'>
              <code>{generatedTsSnippet}</code>
            </pre>
          </div>
        )}

        {/* Loading Skeleton State */}
        {isSearchingLive ? (
          <div className='mt-6 space-y-4'>
            <div className='flex items-center gap-2 text-xs text-violet-300 font-medium px-1'>
              <Loader2 className='w-3.5 h-3.5 animate-spin' />
              <span>{LOADING_MESSAGES[loadingMsgIdx]}</span>
            </div>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className='rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 animate-pulse'
              >
                <div className='flex items-center gap-2'>
                  <div className='h-5 w-20 rounded bg-slate-800' />
                  <div className='h-5 w-24 rounded bg-slate-800' />
                </div>
                <div className='h-5 w-3/4 rounded bg-slate-800' />
                <div className='h-14 w-full rounded bg-slate-800/70' />
              </div>
            ))}
          </div>
        ) : (
          /* Questions List */
          <div className='mt-6 space-y-3.5'>
            {filtered.length === 0 ? (
              <div className='rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center space-y-4'>
                <p className='text-sm text-slate-300'>
                  No curated questions matched{' '}
                  {search.trim() ? (
                    <strong className='text-white'>
                      &ldquo;{search.trim()}&rdquo;
                    </strong>
                  ) : (
                    'your active filters'
                  )}
                  .
                </p>
                {search.trim().length >= 2 && (
                  <button
                    type='button'
                    onClick={() => handleLiveSearch()}
                    className='inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition cursor-pointer'
                  >
                    <Sparkles className='w-4 h-4' />
                    Generate 3 Interview Q&amp;As for &ldquo;{search.trim()}
                    &rdquo;
                  </button>
                )}
              </div>
            ) : (
              filtered.map((item) => {
                const isOpen = !!openIds[item.id];
                const isMastered = !!masteredIds[item.id];
                const isDynamic =
                  item.id.startsWith('ai-') ||
                  item.id.startsWith('so-') ||
                  item.id.startsWith('guide-');

                return (
                  <Card
                    key={item.id}
                    className={`rounded-xl border p-5 transition ${
                      isMastered
                        ? 'border-emerald-500/30 bg-slate-900/55'
                        : 'border-slate-800 bg-slate-900/75 hover:border-violet-500/50'
                    }`}
                  >
                    <div
                      role='button'
                      tabIndex={0}
                      onClick={() => toggleItem(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleItem(item.id);
                        }
                      }}
                      aria-expanded={isOpen}
                      className='w-full flex items-start justify-between gap-4 text-left cursor-pointer'
                    >
                      <div className='space-y-2'>
                        <div className='flex flex-wrap items-center gap-2 text-[11px]'>
                          <span className='rounded-md bg-violet-950/80 border border-violet-700/50 px-2 py-0.5 text-violet-300 font-medium'>
                            {item.topic}
                          </span>
                          <span
                            className={`rounded-md border px-2 py-0.5 font-medium ${
                              DIFFICULTY_STYLES[item.difficulty]
                            }`}
                          >
                            {item.difficulty}
                          </span>
                          {isDynamic && (
                            <span className='rounded-md border border-sky-500/30 bg-sky-950/50 px-2 py-0.5 text-sky-300 font-medium'>
                              AI Generated
                            </span>
                          )}
                        </div>
                        <h2 className='text-base sm:text-lg font-semibold text-white leading-snug'>
                          {item.question}
                        </h2>
                      </div>

                      <div className='flex items-center gap-2 shrink-0'>
                        <button
                          type='button'
                          onClick={(e) => toggleMastered(item.id, e)}
                          title={
                            isMastered
                              ? 'Unmark mastered'
                              : 'Mark question as mastered'
                          }
                          className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                            isMastered
                              ? 'border-emerald-500/50 bg-emerald-950/60 text-emerald-300'
                              : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700'
                          }`}
                        >
                          <CheckCircle2 className='w-3.5 h-3.5' />
                          <span className='hidden sm:inline'>
                            {isMastered ? 'Mastered' : 'Master'}
                          </span>
                        </button>

                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 transition-transform ${
                            isOpen ? 'rotate-180 text-violet-400' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {isOpen && (
                      <div className='mt-4 pt-4 border-t border-slate-800/90 space-y-3 text-sm text-slate-300 leading-relaxed'>
                        <p>{item.answer}</p>

                        {item.code && (
                          <pre className='rounded-lg border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-emerald-300 overflow-x-auto'>
                            <code>{item.code}</code>
                          </pre>
                        )}

                        <div className='rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 text-xs text-slate-300'>
                          <span className='inline-flex items-center gap-1.5 font-semibold text-violet-300 mr-1.5'>
                            <Sparkles className='w-3.5 h-3.5' /> Interviewer
                            Follow-Up:
                          </span>
                          {item.followUp}
                        </div>

                        {item.relatedTool && (
                          <div className='pt-0.5'>
                            <Link
                              href={item.relatedTool.href}
                              className='inline-flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300 underline underline-offset-4'
                            >
                              Try it live: {item.relatedTool.label}
                              <ArrowUpRight className='w-3.5 h-3.5' />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })
            )}
          </div>
        )}

        {/* Attribution Footer */}
        <footer className='mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500'>
          <span>
            Curated &amp; dynamically generated technical Q&amp;As across modern
            web stacks.
          </span>
          <span>
            Community reference topics adapted under MIT License attribution.
          </span>
        </footer>
      </div>
    </section>
  );
}