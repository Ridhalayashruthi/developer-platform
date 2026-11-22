import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | DevToolkit Hub",
  description: "Learn about DevToolkit Hub and our free client-side developer utilities.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">About DevToolkit Hub</h1>
      <p>
        <strong>DevToolkit Hub</strong> is a free, browser-based suite of fast, privacy-focused
        utilities built specifically for software engineers, web developers, and computer science
        students.
      </p>

      <h2 className="text-2xl font-semibold">Why We Built DevToolkit Hub</h2>
      <p>
        During everyday frontend and full-stack development, engineers constantly need quick
        utilities to format JSON payloads, encode or decode Base64 and URL strings, test regular
        expressions, and inspect tokens. DevToolkit Hub was created by{" "}
        <strong>Ridhalayasruthi Lakshmanan</strong>, a Frontend &amp; Full-Stack Software Engineer
        with over four years of enterprise experience building React and TypeScript applications.
      </p>

      <h2 className="text-2xl font-semibold">What Makes Our Tools Different</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Client-Side Speed &amp; Privacy:</strong> Tools run directly in your browser
          without storing your input on backend databases.
        </li>
        <li>
          <strong>Built for Modern Workflows:</strong> Clean, responsive interface designed for
          both desktop and mobile checks.
        </li>
        <li>
          <strong>Completely Free:</strong> Accessible worldwide without paywalls or sign-ups.
        </li>
      </ul>
    </main>
  );
}