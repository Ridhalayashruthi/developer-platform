import Container from "@/components/common/Container";

export const metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for using Developer Platform utilities, interview preparation resources, and learning roadmaps.",
};

export default function TermsPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
          <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
          <p className="text-xs text-slate-500">Last Updated: November 2026</p>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Developer Platform, you agree to use the
              utilities, interview resources, and learning roadmaps for lawful
              personal, educational, or commercial software development
              purposes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-white">
              2. Disclaimer of Warranties
            </h2>
            <p>
              All developer utilities and educational materials are provided
              &ldquo;as is&rdquo; without warranties of any kind. Always verify
              generated credentials, tokens, and regular expressions in your
              staging environment before deploying to production systems.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}