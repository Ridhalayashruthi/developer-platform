import Link from "next/link";
import Container from "@/components/common/Container";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 py-10 text-sm text-slate-400">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-bold text-white text-base">
              Developer Platform
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Free client-side developer utilities, interview Q&amp;A, and career roadmaps.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <Link href="/tools" className="hover:text-violet-400 transition">
              Tools
            </Link>
            <Link href="/interview" className="hover:text-violet-400 transition">
              Interview Prep
            </Link>
            <Link href="/roadmaps" className="hover:text-violet-400 transition">
              Roadmaps
            </Link>
            <Link href="/about" className="hover:text-violet-400 transition">
              About
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-violet-400 transition"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-violet-400 transition">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-500">
          © 2026 Developer Platform. Built by Ridhalayashruthi.
        </div>
      </Container>
    </footer>
  );
}