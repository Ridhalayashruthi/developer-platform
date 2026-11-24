import fs from "node:fs";
import path from "node:path";

const [, , slug, title] = process.argv;
if (!slug || !title) {
  console.error('Usage: node scripts/new-tool.mjs <slug> "<Title>"');
  process.exit(1);
}

const dir = path.join("src", "app", "tools", slug);
fs.mkdirSync(dir, { recursive: true });

const componentName = slug
  .split("-")
  .map((s) => s[0].toUpperCase() + s.slice(1))
  .join("");

const content = `import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";

export const metadata: Metadata = {
  title: "${title} — Free Browser Tool | DevToolkit Hub",
  description: "Use ${title} 100% locally in your browser with zero server uploads.",
};

export default function ${componentName}Page() {
  return (
    <section className="py-14">
      <Container>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-xs text-slate-400">
            <Link href="/tools" className="hover:text-violet-400">Tools</Link> /{" "}
            <span className="text-slate-200">${title}</span>
          </div>
          <h1 className="text-3xl font-bold text-white">${title}</h1>
        </div>
      </Container>
    </section>
  );
}
`;

fs.writeFileSync(path.join(dir, "page.tsx"), content);
console.log(`Created src/app/tools/${slug}/page.tsx`);