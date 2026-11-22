"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check, RefreshCw, Sparkles, Terminal, ArrowUpRight } from "lucide-react";

const DAILY_MINDSETS = [
  {
    quote: "Make it work, make it right, make it fast—in that exact order.",
    focus: "Engineering Discipline",
    actionLabel: "Practice System Design Q&A",
    actionHref: "/interview",
  },
  {
    quote: "Never trust external data at runtime—validate unknown inputs first.",
    focus: "Defensive TypeScript",
    actionLabel: "Validate JSON Payloads",
    actionHref: "/tools/json-formatter",
  },
  {
    quote: "Small, consistent daily milestones beat weekend cramming every time.",
    focus: "Career Growth",
    actionLabel: "Track Your Roadmap",
    actionHref: "/roadmaps",
  },
  {
    quote: "Privacy by architecture: zero server uploads means zero data leaks.",
    focus: "Security First",
    actionLabel: "Decode JWT Locally",
    actionHref: "/tools/jwt-decoder",
  },
];

function createUuidV4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function CodePreview() {
  const [activeTab, setActiveTab] = useState<"mission" | "playground" | "mindset">("mission");
  const [sampleUuid, setSampleUuid] = useState("550e8400-e29b-41d4-a716-446655440000");
  const [copied, setCopied] = useState(false);
  const [mindsetIdx, setMindsetIdx] = useState(0);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const currentMindset = DAILY_MINDSETS[mindsetIdx];

  return (
    <div className="relative rounded-2xl border border-slate-700/80 bg-[#0D1322] shadow-2xl overflow-hidden">
      {/* Window Header + Interactive Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-950/70 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/90" />
          <div className="h-3 w-3 rounded-full bg-amber-400/90" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/90" />
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-slate-900 p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("mission")}
            className={`rounded-md px-2.5 py-1 font-mono transition ${
              activeTab === "mission"
                ? "bg-violet-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            toolkit.ts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("playground")}
            className={`rounded-md px-2.5 py-1 font-mono transition ${
              activeTab === "playground"
                ? "bg-violet-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            live-uuid.ts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("mindset")}
            className={`rounded-md px-2.5 py-1 font-mono transition ${
              activeTab === "mindset"
                ? "bg-violet-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            mindset.md
          </button>
        </div>
      </div>

      {/* Tab 1: Product-Aligned Config */}
      {activeTab === "mission" && (
        <div className="p-6 space-y-4">
          <pre className="overflow-x-auto font-mono text-sm leading-7 text-slate-200">
            <code>{`export const devToolkitHub = {
  mission: "Ship cleaner code & ace technical interviews",
  privacy: "100% Client-Side (Zero Server Uploads)",
  capabilities: [
    "Instant JSON, JWT, UUID & Regex Utilities",
    "Senior-Level Interview Q&A + Trade-Offs",
    "Interactive Frontend, Backend & AI Roadmaps",
  ],
  cost: "$0 Forever • Ready When You Are 🚀",
};`}</code>
          </pre>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <Terminal className="w-3.5 h-3.5" />
              All tools run locally in your browser
            </span>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 font-medium"
            >
              Open Workspace
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Tab 2: Live Interactive UUID Generator Right in the Hero */}
      {activeTab === "playground" && (
        <div className="p-6 space-y-5">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Instant Browser Utility
            </span>
            <h3 className="text-lg font-semibold text-white">
              Generate a Cryptographic UUID v4
            </h3>
            <p className="text-xs text-slate-400">
              Test our zero-latency client engine directly—generate or copy a fresh v4 UUID
              in one click.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-sm text-emerald-300 flex items-center justify-between gap-2">
            <span className="truncate">{sampleUuid}</span>
            <button
              type="button"
              onClick={() => handleCopy(sampleUuid)}
              className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 hover:border-violet-500 transition"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => setSampleUuid(createUuidV4())}
              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 px-3.5 py-2 text-xs font-semibold text-white transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Generate New UUID
            </button>

            <Link
              href="/tools/uuid-generator"
              className="inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 underline underline-offset-4"
            >
              Bulk Generate (Up to 100)
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Tab 3: Motivating Daily Engineering Mindset */}
      {activeTab === "mindset" && (
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-700/60 bg-violet-950/50 px-3 py-1 text-xs text-violet-300">
              <Sparkles className="w-3.5 h-3.5" />
              {currentMindset.focus}
            </span>
            <span className="text-xs font-mono text-slate-500">
              {mindsetIdx + 1} / {DAILY_MINDSETS.length}
            </span>
          </div>

          <blockquote className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-base font-medium text-white leading-relaxed">
            &ldquo;{currentMindset.quote}&rdquo;
          </blockquote>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() =>
                setMindsetIdx((prev) => (prev + 1) % DAILY_MINDSETS.length)
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:border-violet-500 px-3.5 py-2 text-xs font-medium text-slate-200 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Next Developer Principle
            </button>

            <Link
              href={currentMindset.actionHref}
              className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300"
            >
              {currentMindset.actionLabel}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}