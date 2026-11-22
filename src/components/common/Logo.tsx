import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-violet-300 transition"
    >
      DevToolkit <span className="text-violet-400">Hub</span>
    </Link>
  );
}