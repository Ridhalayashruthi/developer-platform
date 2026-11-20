"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

const PATHS = [
  {
    id: "frontend",
    title: "Frontend Engineer",
    icon: "💻",
    description: "Master modern responsive UI, React 19, TypeScript, and Next.js App Router.",
    milestones: [
      "Semantic HTML5, CSS Grid & Flexbox layouts",
      "Modern ES2024+ JavaScript & Async Event Loop",
      "TypeScript strict mode, generics & type narrowing",
      "React Hooks, state architecture & performance optimization",
      "Next.js App Router, SEO metadata & Vercel CI/CD",
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: "🗄️",
    description: "Design scalable REST/GraphQL APIs, relational schemas, and auth flows.",
    milestones: [
      "Node.js runtime, Express / Fastify routing & middleware",
      "PostgreSQL schema design, indexing & query optimization",
      "JWT authentication, OAuth 2.0 & role-based access control",
      "Redis caching, rate limiting & background job queues",
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    icon: "⚙️",
    description: "Automate testing, containerization, and zero-downtime cloud deployments.",
    milestones: [
      "Git branching workflows & GitHub Actions CI pipelines",
      "Docker multi-stage builds & Docker Compose",
      "Linux fundamentals, Nginx reverse proxy & SSL/TLS",
      "Cloud deployment on Vercel, Cloudflare & AWS",
    ],
  },
  {
    id: "ai",
    title: "AI Application Engineer",
    icon: "🤖",
    description: "Build production LLM apps with structured outputs, RAG, and streaming.",
    milestones: [
      "Prompt engineering, system instructions & JSON schemas",
      "Streaming responses & tool/function calling patterns",
      "Embeddings, vector databases & Retrieval-Augmented Generation (RAG)",
      "Latency, token cost optimization & evaluation guardrails",
    ],
  },
];

export default function LearningPaths() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    "frontend-0": true,
    "frontend-1": true,
  });

  const toggleStep = (key: string) => {
    setCompleted((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-4xl font-bold">Developer Career Roadmaps</h2>
        <p className="mt-3 text-slate-400">
          Follow structured engineering milestones and check off skills as you
          build real projects.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PATHS.map((path) => {
            const doneCount = path.milestones.filter(
              (_, i) => completed[`${path.id}-${i}`]
            ).length;
            const percent = Math.round((doneCount / path.milestones.length) * 100);

            return (
              <Card
                key={path.id}
                className="rounded-2xl border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{path.icon}</span>
                    <span className="text-xs font-mono text-violet-400 bg-violet-950/70 border border-violet-800/60 px-2.5 py-1 rounded-full">
                      {percent}% Complete
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold text-white">
                    {path.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {path.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {path.milestones.map((step, idx) => {
                      const key = `${path.id}-${idx}`;
                      const isDone = Boolean(completed[key]);
                      return (
                        <li key={key}>
                          <button
                            onClick={() => toggleStep(key)}
                            className="w-full flex items-start gap-2.5 text-left text-sm rounded-lg p-2 hover:bg-slate-800/70 transition"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                            )}
                            <span
                              className={
                                isDone
                                  ? "line-through text-slate-500"
                                  : "text-slate-200"
                              }
                            >
                              {step}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}