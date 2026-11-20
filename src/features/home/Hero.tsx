import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import CodePreview from "@/components/common/CodePreview";

export default function Hero() {
  return (
    <section className="py-24">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Side */}
          <div>
            <span className="inline-flex rounded-full border border-slate-700 px-4 py-2 text-sm font-medium">
              🚀 Modern Developer Platform
            </span>

            <h1 className="mt-8 text-5xl sm:text-6xl font-bold leading-tight">
              Build Faster.
              <br />
              Learn Smarter.
              <br />
              Get Hired.
            </h1>

            <p className="mt-8 text-xl leading-8 text-muted-foreground">
              One platform for browser-based developer utilities, coding
              interview preparation, interactive career roadmaps, and AI
              engineering workflows—100% free and privacy-first.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/tools">
                <Button
                  size="lg"
                  className="bg-violet-600 hover:bg-violet-500 px-8 shadow-lg cursor-pointer"
                >
                  🚀 Explore Tools
                </Button>
              </Link>

              <Link href="/roadmaps">
                <Button variant="outline" size="lg" className="cursor-pointer">
                  Start Learning
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8">
              <div>
                <h3 className="text-3xl font-bold text-violet-400">7+</h3>
                <p className="text-sm text-slate-400">Client-Side Tools</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-cyan-400">Curated</h3>
                <p className="text-sm text-slate-400">Interview Q&amp;A Bank</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-green-400">4 Paths</h3>
                <p className="text-sm text-slate-400">Interactive Roadmaps</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <CodePreview />
        </div>
      </Container>
    </section>
  );
}