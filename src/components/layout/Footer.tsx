import Link from "next/link";
import Container from "@/components/common/Container";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070A12] mt-20 py-12 text-sm text-slate-400">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-10 border-b border-slate-800/80">
          <div className="space-y-3">
            <p className="text-base font-bold text-white">DevToolkit Hub</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Free, privacy-first browser utilities, senior engineering interview prep,
              and interactive career roadmaps for modern developers.
            </p>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Popular Tools
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tools/json-formatter" className="hover:text-violet-400 transition">
                  JSON Formatter &amp; Validator
                </Link>
              </li>
              <li>
                <Link href="/tools/jwt-decoder" className="hover:text-violet-400 transition">
                  JWT Token Decoder
                </Link>
              </li>
              <li>
                <Link href="/tools/uuid-generator" className="hover:text-violet-400 transition">
                  UUID v4 Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/regex-tester" className="hover:text-violet-400 transition">
                  Regex Tester
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Learn &amp; Prepare
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/interview" className="hover:text-violet-400 transition">
                  Interview Q&amp;A Bank
                </Link>
              </li>
              <li>
                <Link href="/roadmaps" className="hover:text-violet-400 transition">
                  Developer Career Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/ai" className="hover:text-violet-400 transition">
                  AI Prompt &amp; Token Estimator
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-violet-400 transition">
                  All Developer Tools
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Company &amp; Legal
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-violet-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-violet-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-violet-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-violet-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DevToolkit Hub. All rights reserved.</p>
          <p>100% Client-Side Processing • Built for Software Engineers</p>
        </div>
      </Container>
    </footer>
  );
}