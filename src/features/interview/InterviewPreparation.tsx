"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, Search } from "lucide-react";

interface QuestionItem {
  id: string;
  topic: "React" | "JavaScript" | "TypeScript" | "System Design" | "DSA";
  difficulty: "Beginner" | "Intermediate" | "Senior";
  question: string;
  answer: string;
  code?: string;
}

const QUESTIONS: QuestionItem[] = [
  {
    id: "react-1",
    topic: "React",
    difficulty: "Intermediate",
    question: "How does React's reconciliation algorithm (Fiber) optimize DOM updates?",
    answer:
      "React Fiber splits rendering work into incremental units and compares the previous Virtual DOM tree with the newly rendered tree using two heuristics: elements of different types produce different trees, and stable 'key' props identify moved children across renders.",
    code: `// Always use stable unique IDs rather than array indices for dynamic lists
{items.map((item) => (
  <ListItem key={item.id} data={item} />
))}`,
  },
  {
    id: "react-2",
    topic: "React",
    difficulty: "Senior",
    question: "When should you use useSyncExternalStore instead of useEffect?",
    answer:
      "useSyncExternalStore is recommended when subscribing to external browser APIs (like window dimensions, localStorage, or online status) or avoiding server/client hydration mismatches without triggering cascading synchronous re-renders inside useEffect.",
  },
  {
    id: "js-1",
    topic: "JavaScript",
    difficulty: "Intermediate",
    question: "Explain the difference between Microtasks and Macrotasks in the Event Loop.",
    answer:
      "After each synchronous call stack finishes, the JavaScript engine drains the entire Microtask queue (Promise.then, queueMicrotask, MutationObserver) before executing the next Macrotask (setTimeout, setInterval, I/O callbacks) or repainting the browser.",
    code: `console.log("1: Sync");
setTimeout(() => console.log("2: Macrotask"), 0);
Promise.resolve().then(() => console.log("3: Microtask"));
// Output order: 1: Sync -> 3: Microtask -> 2: Macrotask`,
  },
  {
    id: "ts-1",
    topic: "TypeScript",
    difficulty: "Intermediate",
    question: "What is the difference between 'unknown' and 'any' in TypeScript?",
    answer:
      "'any' disables type checking completely, whereas 'unknown' is the type-safe counterpart: you must narrow the type using typeof, instanceof, or custom type guards before accessing properties or calling methods on an unknown value.",
    code: `function parseInput(val: unknown) {
  if (typeof val === "string") {
    return val.toUpperCase(); // Safe after narrowing
  }
}`,
  },
  {
    id: "sd-1",
    topic: "System Design",
    difficulty: "Senior",
    question: "How do you prevent rate-limit abuse on a public REST API?",
    answer:
      "Combine an API Gateway rate limiter using a Token Bucket or Sliding Window counter backed by Redis (keyed by API key or IP), return HTTP 429 Too Many Requests with a Retry-After header, and cache idempotent GET responses at the CDN edge.",
  },
  {
    id: "dsa-1",
    topic: "DSA",
    difficulty: "Beginner",
    question: "Why is a Hash Map preferred over nested loops for Two-Sum problems?",
    answer:
      "A Hash Map reduces time complexity from O(n²) brute-force nested scans to O(n) single-pass lookup by storing each seen number's complement in O(1) average lookup time, trading O(n) auxiliary space for linear speed.",
  },
];

const TOPICS = ["All", "React", "JavaScript", "TypeScript", "System Design", "DSA"] as const;

export default function InterviewPreparation() {
  const [selectedTopic, setSelectedTopic] = useState<(typeof TOPICS)[number]>("All");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>("react-1");

  const filtered = QUESTIONS.filter((q) => {
    const matchesTopic = selectedTopic === "All" || q.topic === selectedTopic;
    const matchesSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.answer.toLowerCase().includes(search.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl font-bold">Interview Preparation</h2>
        <p className="mt-3 text-slate-400">
          Practice real frontend, TypeScript, system design, and DSA interview
          questions with clear explanations and code examples.
        </p>

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                  selectedTopic === topic
                    ? "bg-violet-600 text-white"
                    : "border border-slate-700 bg-slate-900 text-slate-300 hover:border-violet-500"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="relative sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 pl-9 pr-3 py-1.5 text-sm text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Question Accordion List */}
        <div className="mt-8 space-y-4">
          {filtered.map((item) => {
            const isOpen = openId === item.id;
            return (
              <Card
                key={item.id}
                className="rounded-xl border-slate-800 bg-slate-900/70 p-5 transition hover:border-violet-500/60"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-start justify-between gap-4 text-left"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded bg-violet-950 border border-violet-700/60 px-2 py-0.5 text-violet-300 font-medium">
                        {item.topic}
                      </span>
                      <span className="text-slate-400">{item.difficulty}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-violet-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 text-sm text-slate-300 leading-relaxed">
                    <p>{item.answer}</p>
                    {item.code && (
                      <pre className="rounded-lg border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-emerald-300 overflow-x-auto">
                        <code>{item.code}</code>
                      </pre>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}