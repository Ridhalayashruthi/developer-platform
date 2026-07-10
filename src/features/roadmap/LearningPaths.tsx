import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const paths = [
  {
    title: "Frontend",
    topics: "HTML • CSS • JavaScript • React • Next.js",
    icon: "💻",
  },
  {
    title: "Backend",
    topics: "Node.js • Express • Databases • APIs",
    icon: "🗄️",
  },
  {
    title: "DevOps",
    topics: "Git • Docker • CI/CD • Cloud",
    icon: "⚙️",
  },
  {
    title: "AI",
    topics: "LLMs • Prompt Engineering • AI APIs",
    icon: "🤖",
  },
];

export default function LearningPaths() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-bold">
          Learning Paths
        </h2>

        <p className="mt-4 text-slate-400">
          Choose a structured path and learn step by step.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {paths.map((path) => (
            <Card
              key={path.title}
              className="rounded-2xl border-slate-700 bg-slate-900 p-6"
            >
              <div className="text-4xl">{path.icon}</div>

              <h3 className="mt-5 text-2xl font-semibold">
                {path.title}
              </h3>

              <p className="mt-3 text-slate-400">
                {path.topics}
              </p>

              <Button className="mt-6">
                Start Learning →
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}