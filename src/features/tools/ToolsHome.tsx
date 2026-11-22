"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/common/Container";
import { Card } from "@/components/ui/card";
import { tools } from "@/constants/tools";

export default function ToolsIndexPage() {
  const [filter, setFilter] = useState<"all" | "dev" | "finance">("all");

  const filteredTools =
    filter === "all" ? tools : tools.filter((t) => t.category === filter);

  return (
    <section className="py-14">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">All Browser Tools</h1>
            <p className="mt-2 text-sm text-slate-400">
              100% client-side developer utilities, DevDocuSign PDF signing, and
              salary calculators. Every card links directly to its live tool.
            </p>
          </div>

          <div className="inline-flex rounded-xl border border-slate-700 bg-slate-900 p-1 text-xs self-start">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3.5 py-2 font-medium transition ${
                filter === "all"
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All ({tools.length})
            </button>
            <button
              onClick={() => setFilter("dev")}
              className={`rounded-lg px-3.5 py-2 font-medium transition ${
                filter === "dev"
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Developer Tools (9)
            </button>
            <button
              onClick={() => setFilter("finance")}
              className={`rounded-lg px-3.5 py-2 font-medium transition ${
                filter === "finance"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Salary &amp; Finance (3)
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group block">
              <Card className="h-full rounded-2xl border border-slate-800 bg-slate-900/90 p-6 flex flex-col justify-between transition group-hover:border-violet-500/80 group-hover:bg-slate-900">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{tool.icon}</span>
                    {tool.badge && (
                      <span className="rounded-full bg-violet-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-violet-300">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-4 text-lg font-semibold text-white group-hover:text-violet-300 transition">
                    {tool.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500">100% Client-Side</span>
                  <span className="font-medium text-violet-400 group-hover:translate-x-0.5 transition-transform">
                    Open Tool →
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}