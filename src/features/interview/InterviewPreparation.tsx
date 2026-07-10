import { Card } from "@/components/ui/card";

const topics = [
  {
    title: "React",
    questions: "250+ Questions",
    icon: "⚛️",
  },
  {
    title: "JavaScript",
    questions: "400+ Questions",
    icon: "🟨",
  },
  {
    title: "TypeScript",
    questions: "180+ Questions",
    icon: "🔷",
  },
  {
    title: "HTML & CSS",
    questions: "150+ Questions",
    icon: "🎨",
  },
  {
    title: "System Design",
    questions: "120+ Scenarios",
    icon: "🏗️",
  },
  {
    title: "DSA",
    questions: "300+ Problems",
    icon: "🧩",
  },
];

export default function InterviewPreparation() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-bold">
          Interview Preparation
        </h2>

        <p className="mt-4 text-slate-400">
          Prepare smarter with structured interview content across multiple topics.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Card
              key={topic.title}
              className="rounded-2xl border-slate-700 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-violet-500"
            >
              <div className="text-4xl">{topic.icon}</div>

              <h3 className="mt-5 text-xl font-semibold">
                {topic.title}
              </h3>

              <p className="mt-2 text-violet-400 font-medium">
                {topic.questions}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}