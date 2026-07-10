import { Card } from "@/components/ui/card";

const resources = [
  {
    title: "Top React Interview Questions",
    category: "Interview",
    icon: "💼",
  },
  {
    title: "Complete JavaScript Roadmap",
    category: "Roadmap",
    icon: "🛣️",
  },
  {
    title: "10 Free AI Tools Every Developer Should Know",
    category: "AI",
    icon: "🤖",
  },
];

export default function LatestResources() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-bold">
          Latest Resources
        </h2>

        <p className="mt-4 text-slate-400">
          Fresh content to help developers learn faster.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {resources.map((item) => (
            <Card
              key={item.title}
              className="rounded-2xl border-slate-700 bg-slate-900 p-6 hover:border-blue-500 transition"
            >
              <div className="text-4xl">{item.icon}</div>

              <p className="mt-5 text-blue-400 text-sm">
                {item.category}
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                {item.title}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}