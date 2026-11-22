"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  Circle,
  Share2,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";

interface MilestoneItem {
  label: string;
  hours: string;
  docLabel: string;
  docUrl: string;
  practiceLabel?: string;
  practiceHref?: string;
}

interface RoadmapTrack {
  id: string;
  title: string;
  icon: string;
  duration: string;
  description: string;
  capstone: string;
  milestones: MilestoneItem[];
}

const STORAGE_KEY = "devtoolkit-roadmap-progress-v1";

const PATHS: RoadmapTrack[] = [
  {
    id: "frontend",
    title: "Frontend Engineer",
    icon: "💻",
    duration: "12–16 Weeks",
    description:
      "Master modern responsive UI architecture, strict TypeScript, React 19 patterns, and Next.js App Router performance.",
    capstone:
      "Build a full-featured, accessible dashboard with URL-synced filters, optimistic updates, and Core Web Vitals above 95.",
    milestones: [
      {
        label: "Semantic HTML5, CSS Grid, Flexbox & Responsive Design",
        hours: "15 hrs",
        docLabel: "MDN CSS Layout",
        docUrl: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout",
        practiceLabel: "Color Picker Tool",
        practiceHref: "/tools/color-picker",
      },
      {
        label: "Modern ES2024+ JavaScript, Closures & Async Event Loop",
        hours: "20 hrs",
        docLabel: "JavaScript.info",
        docUrl: "https://javascript.info/",
        practiceLabel: "JS Event Loop Q&A",
        practiceHref: "/interview",
      },
      {
        label: "TypeScript Strict Mode, Generics & Discriminated Unions",
        hours: "18 hrs",
        docLabel: "TypeScript Handbook",
        docUrl: "https://www.typescriptlang.org/docs/handbook/intro.html",
        practiceLabel: "TypeScript Interview Q&A",
        practiceHref: "/interview",
      },
      {
        label: "React Hooks, State Architecture & Reconciliation Optimization",
        hours: "25 hrs",
        docLabel: "React Official Docs",
        docUrl: "https://react.dev/learn",
        practiceLabel: "React Fiber Q&A",
        practiceHref: "/interview",
      },
      {
        label: "Next.js App Router, Server Components, SEO & Vercel CI/CD",
        hours: "22 hrs",
        docLabel: "Next.js Docs",
        docUrl: "https://nextjs.org/docs",
        practiceLabel: "Regex Tester",
        practiceHref: "/tools/regex-tester",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: "🗄️",
    duration: "12–16 Weeks",
    description:
      "Design resilient REST/GraphQL APIs, relational PostgreSQL schemas, stateless authentication, and Redis caching layers.",
    capstone:
      "Build a rate-limited multi-tenant REST API with JWT refresh rotation, PostgreSQL migrations, and automated integration tests.",
    milestones: [
      {
        label: "Node.js Runtime, REST API Design, Validation & Error Handling",
        hours: "20 hrs",
        docLabel: "Node.js Guides",
        docUrl: "https://nodejs.org/en/learn",
        practiceLabel: "JSON Formatter",
        practiceHref: "/tools/json-formatter",
      },
      {
        label: "PostgreSQL Schema Design, Composite Indexes & Query Tuning",
        hours: "22 hrs",
        docLabel: "PostgreSQL Docs",
        docUrl: "https://www.postgresql.org/docs/",
        practiceLabel: "UUID v4 Generator",
        practiceHref: "/tools/uuid-generator",
      },
      {
        label: "JWT Authentication, OAuth 2.0 & Role-Based Access Control",
        hours: "18 hrs",
        docLabel: "JWT RFC Guide",
        docUrl: "https://jwt.io/introduction",
        practiceLabel: "JWT Decoder Tool",
        practiceHref: "/tools/jwt-decoder",
      },
      {
        label: "Redis Caching, Token-Bucket Rate Limiting & Job Queues",
        hours: "16 hrs",
        docLabel: "Redis Docs",
        docUrl: "https://redis.io/docs/latest/",
        practiceLabel: "System Design Q&A",
        practiceHref: "/interview",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    icon: "⚙️",
    duration: "10–14 Weeks",
    description:
      "Automate CI/CD testing pipelines, multi-stage Docker builds, reverse proxies, and zero-downtime cloud deployments.",
    capstone:
      "Containerize a full-stack app with multi-stage Dockerfiles, GitHub Actions CI checks, HTTPS reverse proxy, and health monitoring.",
    milestones: [
      {
        label: "Git Branching Strategies & Automated GitHub Actions CI",
        hours: "12 hrs",
        docLabel: "GitHub Actions Docs",
        docUrl: "https://docs.github.com/en/actions",
        practiceLabel: "Password Generator",
        practiceHref: "/tools/password-generator",
      },
      {
        label: "Docker Multi-Stage Builds, Networking & Docker Compose",
        hours: "18 hrs",
        docLabel: "Docker Docs",
        docUrl: "https://docs.docker.com/get-started/",
        practiceLabel: "Base64 Encoder",
        practiceHref: "/tools/base64-encoder",
      },
      {
        label: "Linux Server Hardening, Nginx Reverse Proxy & SSL/TLS",
        hours: "16 hrs",
        docLabel: "Nginx Docs",
        docUrl: "https://nginx.org/en/docs/",
      },
      {
        label: "Edge Caching, Observability & Zero-Downtime Cloud Deploys",
        hours: "15 hrs",
        docLabel: "Vercel Docs",
        docUrl: "https://vercel.com/docs",
      },
    ],
  },
  {
    id: "ai",
    title: "AI Application Engineer",
    icon: "🤖",
    duration: "8–12 Weeks",
    description:
      "Build production LLM features using structured JSON schemas, tool calling, streaming UIs, and Retrieval-Augmented Generation.",
    capstone:
      "Ship a citation-backed technical docs assistant with streaming responses, token cost tracking, and deterministic JSON output validation.",
    milestones: [
      {
        label: "System Instructions, Prompt Patterns & Strict JSON Schemas",
        hours: "14 hrs",
        docLabel: "Gemini API Docs",
        docUrl: "https://ai.google.dev/gemini-api/docs",
        practiceLabel: "AI Prompt Library",
        practiceHref: "/ai",
      },
      {
        label: "Streaming Responses (SSE) & Function / Tool Calling",
        hours: "16 hrs",
        docLabel: "Vercel AI SDK",
        docUrl: "https://sdk.vercel.ai/docs",
        practiceLabel: "JSON Validator",
        practiceHref: "/tools/json-formatter",
      },
      {
        label: "Embeddings, Chunking & Retrieval-Augmented Generation (RAG)",
        hours: "20 hrs",
        docLabel: "RAG Architecture Guide",
        docUrl: "https://ai.google.dev/gemini-api/docs/embeddings",
      },
      {
        label: "Token Budgeting, Latency Optimization & Guardrail Evals",
        hours: "14 hrs",
        docLabel: "Prompt Engineering",
        docUrl: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        practiceLabel: "LLM Token Estimator",
        practiceHref: "/ai",
      },
    ],
  },
];

export default function LearningPaths() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    "frontend-0": true,
    "frontend-1": true,
  });
  const [copiedTrackId, setCopiedTrackId] = useState<string | null>(null);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setCompleted(JSON.parse(saved));
        }
      } catch {
        /* ignore storage read errors */
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const persistProgress = (next: Record<string, boolean>) => {
    setCompleted(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore storage write errors */
    }
  };

  const toggleStep = (key: string) => {
    persistProgress({ ...completed, [key]: !completed[key] });
  };

  const showTempNotice = (msg: string) => {
    setStatusNotice(msg);
    window.setTimeout(() => setStatusNotice(null), 3000);
  };

  const handleShareProgress = (track: RoadmapTrack, doneCount: number, percent: number) => {
    const completedNames = track.milestones
      .filter((_, idx) => completed[`${track.id}-${idx}`])
      .map((m) => `✅ ${m.label}`)
      .join("\n");

    const siteUrl =
      typeof window !== "undefined" ? window.location.href : "https://devtoolkit-hub.vercel.app/roadmaps";

    const shareText = [
      `🚀 ${track.title} Roadmap Progress: ${percent}% (${doneCount}/${track.milestones.length} milestones)`,
      completedNames ? `\nCompleted so far:\n${completedNames}` : "",
      `\nTrack your free engineering roadmap on DevToolkit Hub:\n${siteUrl}`,
    ]
      .filter(Boolean)
      .join("\n");

    navigator.clipboard.writeText(shareText);
    setCopiedTrackId(track.id);
    showTempNotice(`Copied ${track.title} progress summary—ready to paste on LinkedIn or X!`);
    window.setTimeout(() => setCopiedTrackId(null), 2000);
  };

  const handleExportJson = () => {
    const payload = {
      app: "DevToolkit Hub",
      exportedAt: new Date().toISOString(),
      progress: completed,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `devtoolkit-roadmap-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showTempNotice("Exported roadmap progress backup (.json).");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const nextProgress = parsed?.progress && typeof parsed.progress === "object"
          ? parsed.progress
          : parsed;

        if (nextProgress && typeof nextProgress === "object") {
          persistProgress(nextProgress);
          showTempNotice("Imported roadmap progress successfully!");
        } else {
          showTempNotice("Invalid backup file format.");
        }
      } catch {
        showTempNotice("Could not parse JSON backup file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleResetProgress = () => {
    persistProgress({});
    showTempNotice("All roadmap milestones reset.");
  };

  const totalMilestones = PATHS.reduce((acc, p) => acc + p.milestones.length, 0);
  const totalCompleted = PATHS.reduce(
    (acc, p) =>
      acc + p.milestones.filter((_, idx) => Boolean(completed[`${p.id}-${idx}`])).length,
    0
  );

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header + Login-Free Sync Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-700/50 bg-cyan-950/40 px-3 py-1 text-xs text-cyan-300">
              <Sparkles className="w-3.5 h-3.5" />
              Zero-Login Local Progress + Portable JSON Sync
            </div>
            <h1 className="text-4xl font-bold text-white">
              Developer Career Roadmaps
            </h1>
            <p className="text-slate-300 leading-relaxed">
              Follow structured engineering milestones with curated official documentation,
              built-in practice tools, and portfolio capstone projects. Your progress saves
              automatically in your browser—and you can export or share a progress card anytime.
            </p>
          </div>

          {/* Portable Backup & Share Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-slate-300">
              Overall: <strong className="text-emerald-400">{totalCompleted}/{totalMilestones}</strong>
            </span>

            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:border-violet-500 px-3 py-2 text-xs font-medium text-slate-200 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-violet-400" />
              Export Backup
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:border-violet-500 px-3 py-2 text-xs font-medium text-slate-200 transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              Import Backup
            </button>

            <button
              type="button"
              onClick={handleResetProgress}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 hover:border-rose-500/60 px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-300 transition cursor-pointer"
              title="Reset all checkboxes"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleImportJson}
              className="hidden"
            />
          </div>
        </div>

        {/* Live Feedback Banner */}
        {statusNotice && (
          <div className="mt-6 rounded-xl border border-emerald-700/60 bg-emerald-950/40 px-4 py-3 text-xs font-medium text-emerald-300">
            {statusNotice}
          </div>
        )}

        {/* Roadmap Track Cards */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {PATHS.map((path) => {
            const doneCount = path.milestones.filter(
              (_, idx) => Boolean(completed[`${path.id}-${idx}`])
            ).length;
            const percent = Math.round((doneCount / path.milestones.length) * 100);
            const isCopied = copiedTrackId === path.id;

            return (
              <Card
                key={path.id}
                className="rounded-2xl border-slate-800 bg-[#111827]/85 p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Track Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{path.icon}</span>
                      <div>
                        <h2 className="text-xl font-bold text-white">{path.title}</h2>
                        <span className="text-xs font-mono text-cyan-400">
                          Est. {path.duration}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleShareProgress(path, doneCount, percent)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-violet-700/60 bg-violet-950/40 hover:bg-violet-600 px-3 py-1.5 text-xs font-semibold text-violet-200 hover:text-white transition cursor-pointer"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                      {isCopied ? "Copied Summary" : "Share Progress"}
                    </button>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {path.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>
                        Progress: {doneCount}/{path.milestones.length} milestones
                      </span>
                      <span className="font-mono text-emerald-400">{percent}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Interactive Milestones + Curated Docs & Practice Links */}
                  <ul className="space-y-3 pt-1">
                    {path.milestones.map((step, idx) => {
                      const key = `${path.id}-${idx}`;
                      const checked = Boolean(completed[key]);

                      return (
                        <li
                          key={key}
                          className={`rounded-xl border p-3.5 transition ${
                            checked
                              ? "border-emerald-800/60 bg-emerald-950/15"
                              : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleStep(key)}
                            className="w-full flex items-start gap-2.5 text-left cursor-pointer"
                          >
                            {checked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                            )}
                            <span
                              className={`text-sm font-medium leading-snug ${
                                checked ? "line-through text-slate-500" : "text-slate-200"
                              }`}
                            >
                              {step.label}
                            </span>
                          </button>

                          {/* Resource & Internal Practice Links */}
                          <div className="mt-2.5 pl-6 flex flex-wrap items-center gap-3 text-[11px]">
                            <span className="font-mono text-slate-500">
                              ~{step.hours}
                            </span>

                            <a
                              href={step.docUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
                            >
                              Docs: {step.docLabel}
                              <ExternalLink className="w-3 h-3" />
                            </a>

                            {step.practiceHref && step.practiceLabel && (
                              <Link
                                href={step.practiceHref}
                                className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 underline underline-offset-4"
                              >
                                Practice: {step.practiceLabel}
                                <ArrowUpRight className="w-3 h-3" />
                              </Link>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Capstone Project Box */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/85 p-4 text-xs space-y-1">
                  <div className="font-semibold text-violet-300">
                    Portfolio Capstone Deliverable
                  </div>
                  <p className="text-slate-400 leading-relaxed">{path.capstone}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* High-Value Editorial Guide for AdSense & Organic Search */}
        <article className="mt-16 pt-10 border-t border-slate-800 space-y-6 text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white">
            How to Use These Roadmaps Without Tutorial Burnout
          </h2>
          <p>
            Reading documentation without building projects creates an illusion of progress.
            For every milestone you check off above, spend 30% of your time reading the linked
            official documentation and 70% writing real code, debugging payloads, and testing
            your understanding with interview questions.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5">
              <h3 className="font-semibold text-white">1. Build After Every 2 Milestones</h3>
              <p className="text-slate-400">
                Create a small working feature—like a JWT auth middleware or schema validator—before
                moving to the next module.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5">
              <h3 className="font-semibold text-white">2. Back Up &amp; Share Your Progress</h3>
              <p className="text-slate-400">
                Use the Export Backup button to move your progress between devices, and share
                milestone updates publicly to stay accountable.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5">
              <h3 className="font-semibold text-white">3. Validate With Interview Prep</h3>
              <p className="text-slate-400">
                Once you finish a track, test your trade-off explanations in our{" "}
                <Link href="/interview" className="text-violet-400 underline underline-offset-4">
                  Interview Q&amp;A Bank
                </Link>{" "}
                before applying to roles.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}