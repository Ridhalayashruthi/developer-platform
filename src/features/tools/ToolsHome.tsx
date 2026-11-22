import Link from "next/link";
import { Card } from "@/components/ui/card";
import Container from "@/components/common/Container";
import { tools } from "@/constants/tools";
import { ArrowRight } from "lucide-react";

export default function ToolsHome() {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white">Developer Tools</h1>

          <p className="mt-4 text-lg text-slate-400">
            Free, fast, and privacy-first utilities built for developers.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const card = (
              <Card className="group h-full flex flex-col justify-between cursor-pointer rounded-2xl border border-slate-700 bg-slate-900 p-6 transition-all hover:-translate-y-1 hover:border-violet-500 hover:shadow-lg">
                <div>
                  <div className="text-4xl">{tool.icon}</div>

                  <h2 className="mt-5 text-xl font-semibold text-white">
                    {tool.title}
                  </h2>

                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
                  <span className="text-slate-500">100% Client-Side</span>
                  <span className="inline-flex items-center gap-1 font-medium text-violet-400 group-hover:text-violet-300">
                    Open Tool <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            );

            return tool.available ? (
              <Link key={tool.title} href={tool.href} className="block h-full">
                {card}
              </Link>
            ) : (
              <div
                key={tool.title}
                className="h-full cursor-not-allowed opacity-70"
              >
                {card}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}