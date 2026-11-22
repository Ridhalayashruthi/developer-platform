import Link from "next/link";
import Container from "@/components/common/Container";
import { Card } from "@/components/ui/card";
import { tools } from "@/constants/tools";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function HomePage() {
  const devTools = tools.filter((t) => t.category === "dev");
  const financeTools = tools.filter((t) => t.category === "finance");

  return (
    <main className="pb-20">
      {/* Hero Section */}
      <section className="pt-16 pb-14 border-b border-slate-800/80">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-xs font-medium text-violet-300">
              <Sparkles className="w-3.5 h-3.5" />
              100% Client-Side • Zero Uploads • Instant Execution
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Fast, Private{" "}
              <span className="text-violet-400">Developer Tools</span> &amp;{" "}
              <span className="text-emerald-400">Salary Calculators</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
              Sign PDFs locally with DevDocuSign, inspect JWTs, format JSON,
              convert Unix timestamps, and calculate take-home salary or
              freelance rates—all running privately in your browser.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition"
              >
                Explore All 12 Tools
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/tools/pdf-signer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-violet-500 hover:text-white transition"
              >
                ✍️ Open DevDocuSign
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Files never leave your device
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-violet-400" />
                No signup or paywall required
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured DevDocuSign Banner */}
      <section className="pt-12">
        <Container>
          <Card className="rounded-2xl border border-violet-500/40 bg-gradient-to-r from-slate-900 via-slate-900 to-violet-950/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="inline-block rounded-md bg-violet-500/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-300">
                Featured Flagship Tool • DevDocuSign
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white">
                ✍️ Sign &amp; Export Multi-Page PDFs Locally
              </h2>
              <p className="mt-1.5 text-sm text-slate-300 max-w-2xl">
                Draw, type, or upload your signature, drag and resize across any
                page, and download a flattened signed PDF with zero server
                uploads.
              </p>
            </div>

            <Link
              href="/tools/pdf-signer"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition"
            >
              Launch DevDocuSign
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>
        </Container>
      </section>

      {/* Developer Utilities (9 Cards - 3x3 Grid) */}
      <section className="pt-14">
        <Container>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Developer Utilities
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Essential everyday browser tools for encoding, formatting, and
                security.
              </p>
            </div>
            <Link
              href="/tools"
              className="text-xs font-medium text-violet-400 hover:text-violet-300"
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {devTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group block">
                <Card className="h-full rounded-2xl border border-slate-800 bg-slate-900/90 p-6 flex flex-col justify-between transition group-hover:border-violet-500/70 group-hover:bg-slate-900">
                  <div>
                    <span className="text-3xl">{tool.icon}</span>
                    <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-violet-300 transition">
                      {tool.title}
                    </h3>
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

      {/* Developer Salary & Finance Calculators (3 Cards - 1x3 Row) */}
      <section className="pt-14">
        <Container>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Salary &amp; Freelance Calculators
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Plan job offers, estimate Indian New Regime in-hand pay, and set
                sustainable freelance rates.
              </p>
            </div>
            <Link
              href="/tools"
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300"
            >
              Open calculators →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {financeTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group block">
                <Card className="h-full rounded-2xl border border-slate-800 bg-slate-900/90 p-6 flex flex-col justify-between transition group-hover:border-emerald-500/70 group-hover:bg-slate-900">
                  <div>
                    <span className="text-3xl">{tool.icon}</span>
                    <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-emerald-300 transition">
                      {tool.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500">100% Client-Side</span>
                    <span className="font-medium text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                      Open Tool →
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}