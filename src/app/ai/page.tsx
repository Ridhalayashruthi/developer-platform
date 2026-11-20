"use client";

import React, { useState } from "react";
import Container from "@/components/common/Container";
import { Copy, Check, Sparkles } from "lucide-react";

const PROMPTS = [
  {
    title: "Code Review & Security Audit",
    category: "Code Quality",
    prompt:
      "Review the following TypeScript/React code for race conditions, memory leaks, XSS/injection vulnerabilities, and unnecessary re-renders. Provide refactored code with concise explanations.",
  },
  {
    title: "System Design Architecture Breakdown",
    category: "System Design",
    prompt:
      "Design a scalable architecture for [System Name] handling 50k requests/sec. Cover API design, database partitioning, caching strategy, failure modes, and trade-offs.",
  },
  {
    title: "Unit & Integration Test Generator",
    category: "Testing",
    prompt:
      "Write comprehensive Vitest/Jest unit tests for this function covering happy paths, boundary values, null/undefined inputs, and async error handling.",
  },
  {
    title: "SQL Query Optimization",
    category: "Database",
    prompt:
      "Analyze this PostgreSQL query and table schema. Suggest composite indexes, explain the likely query execution plan bottlenecks, and rewrite the query for O(log n) index scans.",
  },
];

export default function AiHubPage() {
  const [text, setText] = useState(
    "Paste any prompt or code snippet here to estimate token count before sending to an LLM..."
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
    <div className="py-16">
      <Container>
        <div className="max-w-5xl mx-auto space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-700/60 bg-violet-950/50 px-3 py-1 text-xs text-violet-300 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              AI Developer Toolkit
            </div>
            <h1 className="text-4xl font-bold">
              AI Prompt Library &amp; LLM Token Estimator
            </h1>
            <p className="mt-3 text-slate-400">
              Copy battle-tested engineering prompts for code reviews, testing,
              and system design—or estimate LLM context tokens locally.
            </p>
          </div>

          {/* Client-Side Token Estimator */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-white">
                Instant LLM Token &amp; Context Estimator
              </h2>
              <div className="flex gap-4 text-xs font-mono">
                <span className="text-slate-400">
                  Words: <strong className="text-white">{wordCount}</strong>
                </span>
                <span className="text-slate-400">
                  Characters: <strong className="text-white">{text.length}</strong>
                </span>
                <span className="text-violet-400">
                  Est. Tokens: <strong>~{estimatedTokens}</strong>
                </span>
              </div>
            </div>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3.5 font-mono text-sm text-slate-200"
            />
          </div>

          {/* Curated Engineering Prompts */}
          <div className="grid md:grid-cols-2 gap-6">
            {PROMPTS.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-xs font-medium text-cyan-400">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.prompt}
                  </p>
                </div>

                <button
                  onClick={() => copyPrompt(item.prompt, idx)}
                  className="self-start inline-flex items-center gap-1.5 rounded-lg border border-slate-700 hover:border-violet-500 bg-slate-950 px-3.5 py-2 text-xs font-medium text-slate-200 transition"
                >
                  {copiedIdx === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copiedIdx === idx ? "Copied Prompt" : "Copy Prompt"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}