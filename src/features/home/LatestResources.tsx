import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const resources = [
  {
    title: "Top React & Full-Stack Interview Questions",
    category: "Interview",
    icon: "💼",
    href: "/interview",
    description:
      "Master React Fiber, hooks, TypeScript discriminated unions, and system design trade-offs with senior follow-ups.",
  },
  {
    title: "Complete Frontend, Backend & AI Roadmaps",
    category: "Roadmap",
    icon: "🛣️",
    href: "/roadmaps",
    description:
      "Follow structured engineering milestones, check off your progress locally, and build portfolio capstone projects.",
  },
  {
    title: "AI Prompt Library & LLM Token Estimator",
    category: "AI",
    icon: "🤖",
    href: "/ai",
    description:
      "Copy production prompts for code reviews, SQL tuning, and JSON schemas—and estimate LLM tokens locally.",
  },
];

export default function LatestResources() {
  return (
    <section className="py-24 border-t border-slate-800/70">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-bold text-white">Latest Resources</h2>

        <p className="mt-4 text-slate-400">
          Fresh guides, interactive tracks, and AI workflows to help developers ship faster.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {resources.map((item) => (
            <Link key={item.title} href={item.href} className="group block">
              <Card className="h-full rounded-2xl border-slate-800 bg-[#111827]/85 p-6 flex flex-col justify-between hover:border-violet-500/70 transition">
                <div>
                  <div className="text-4xl">{item.icon}</div>

                  <p className="mt-5 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                    {item.category}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-white group-hover:text-violet-300 transition">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 group-hover:text-violet-300">
                  Explore Guide
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}