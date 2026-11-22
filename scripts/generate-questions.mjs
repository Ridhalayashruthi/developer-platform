// Run on Mac/Linux: GEMINI_API_KEY=your_key node scripts/generate-questions.mjs React
// Run on Windows PowerShell: $env:GEMINI_API_KEY="your_key"; node scripts/generate-questions.mjs React

import fs from "node:fs";
import path from "node:path";

const TOPIC = process.argv[2] || "React";
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Missing GEMINI_API_KEY environment variable.");
  process.exit(1);
}

const prompt = `Generate 10 senior and intermediate software engineering interview questions for ${TOPIC}.
Return ONLY a valid JSON array matching:
[{ "id": "slug", "topic": "${TOPIC}", "difficulty": "Beginner|Intermediate|Senior", "question": "...", "answer": "...", "followUp": "...", "code": "..." }]`;

const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    }),
  }
);

const data = await res.json();
const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
const outPath = path.join(
  process.cwd(),
  "src/data/interview",
  `${TOPIC.toLowerCase()}.json`
);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(JSON.parse(rawJson), null, 2));

console.log(`Saved automated question bank to ${outPath}`);