"use client";

import React, { useState, useMemo } from "react";
import Container from "@/components/common/Container";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState(
    "Contact support@devplatform.io or hr@company.co.uk for interview details."
  );

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [] as string[], error: null };
    try {
      const safeFlags = flags.includes("g") ? flags : `${flags}g`;
      const regex = new RegExp(pattern, safeFlags);
      const found = Array.from(testText.matchAll(regex), (m) => m);
      return { matches: found, error: null };
    } catch (err) {
      return {
        matches: [] as string[],
        error: err instanceof Error ? err.message : "Invalid regular expression",
      };
    }
  }, [pattern, flags, testText]);

  return (
    <div className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              JavaScript Regex Tester
            </h1>
            <p className="text-slate-400 mt-2">
              Test and debug ECMAScript regular expressions in real time with
              instant match extraction.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
            <div className="grid sm:grid-cols-4 gap-3">
              <div className="sm:col-span-3">
                <label className="block text-xs text-slate-400 mb-1">
                  Regular Expression Pattern
                </label>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-violet-300"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Flags (g, i, m)
                </label>
                <input
                  type="text"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-white"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-800 bg-red-950/50 px-4 py-2 text-xs text-red-300">
                Syntax Error: {error}
              </div>
            )}

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Test String
              </label>
              <textarea
                rows={4}
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-sm text-slate-200"
              />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-300">
                Matches Found:{" "}
                <span className="text-emerald-400 font-bold">
                  {matches.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {matches.length > 0 ? (
                  matches.map((m, idx) => (
                    <span
                      key={`${m}-${idx}`}
                      className="rounded-md border border-violet-700/60 bg-violet-950/60 px-2.5 py-1 font-mono text-xs text-violet-200"
                    >
                      {m}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">
                    No matches for current pattern.
                  </span>
                )}
              </div>
            </div>
          </div>

          <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-3 text-sm text-slate-400 leading-relaxed">
            <h2 className="text-lg font-semibold text-white">
              Common JavaScript Regex Flags Explained
            </h2>
            <p>
              Use <code className="text-violet-300">g</code> (global) to find
              all occurrences rather than stopping after the first match,{" "}
              <code className="text-violet-300">i</code> for case-insensitive
              matching, and <code className="text-violet-300">m</code> so{" "}
              <code className="text-violet-300">^</code> and{" "}
              <code className="text-violet-300">$</code> match the start and
              end of each line.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}