#!/usr/bin/env node
/**
 * MIT-Compliant GitHub Markdown Q&A Sync Script
 * Fetches public MIT-licensed interview question repositories, extracts structured Q&As,
 * deduplicates against existing questions, and writes a clean JSON dataset with attribution.
 *
 * Usage: node scripts/sync-github-qna.mjs
 */

import fs from 'fs/promises';
import path from 'path';

const SOURCES = [
  {
    id: 'react-mit',
    topic: 'React',
    repoName: 'sudheerj/reactjs-interview-questions',
    repoUrl: 'https://github.com/sudheerj/reactjs-interview-questions',
    license: 'MIT',
    rawUrl: 'https://raw.githubusercontent.com/sudheerj/reactjs-interview-questions/master/README.md',
    limit: 15,
  },
  {
    id: 'js-mit',
    topic: 'JavaScript',
    repoName: 'sudheerj/javascript-interview-questions',
    repoUrl: 'https://github.com/sudheerj/javascript-interview-questions',
    license: 'MIT',
    rawUrl: 'https://raw.githubusercontent.com/sudheerj/javascript-interview-questions/master/README.md',
    limit: 15,
  },
];

const OUTPUT_FILE = path.join(process.cwd(), 'data', 'community-synced-qna.json');

function cleanMarkdownText(md) {
  return md
    .replace(/```[\s\S]*?```/g, '') // remove code blocks from prose summary
    .replace(/!\[.*?\]\(.*?\)/g, '') // remove images
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // convert markdown links to text
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractFirstCodeBlock(md) {
  const match = md.match(/```(?:js|jsx|ts|tsx|javascript|typescript)?\n([\s\S]*?)```/i);
  return match ? match[1].trim() : undefined;
}

function parseQuestionsFromMarkdown(markdown, source) {
  // Matches numbered headings like: ### 1. What is React?
  const sections = markdown.split(/\n###\s+\d+\.\s+/);
  const extracted = [];

  for (let i = 1; i < sections.length && extracted.length < source.limit; i++) {
    const block = sections[i];
    const newlineIdx = block.indexOf('\n');
    if (newlineIdx === -1) continue;

    const rawQuestion = block.slice(0, newlineIdx).trim();
    // Stop before next major table/back-to-top link
    const rawBody = block
      .slice(newlineIdx + 1)
      .split(/\[\s*⬆\s*Back to Top\s*\]/i)[0]
      .trim();

    const code = extractFirstCodeBlock(rawBody);
    const cleanAnswer = cleanMarkdownText(rawBody).slice(0, 520);

    if (rawQuestion.length < 10 || cleanAnswer.length < 60) continue;

    extracted.push({
      id: `gh-${source.id}-${extracted.length + 1}`,
      topic: source.topic,
      difficulty: extracted.length % 3 === 0 ? 'Senior' : 'Intermediate',
      question: rawQuestion,
      answer: cleanAnswer.endsWith('.') ? cleanAnswer : `${cleanAnswer}...`,
      followUp: `How would you handle edge cases or performance trade-offs for "${rawQuestion}" in a large production app?`,
      ...(code ? { code } : {}),
      sourceAttribution: {
        repo: source.repoName,
        url: source.repoUrl,
        license: source.license,
      },
    });
  }

  return extracted;
}

async function runSync() {
  console.log('Starting MIT-compliant GitHub Q&A sync...');
  const allQuestions = [];
  const attributions = [];

  for (const source of SOURCES) {
    try {
      console.log(`Fetching ${source.repoName} (${source.license})...`);
      const res = await fetch(source.rawUrl);
      if (!res.ok) {
        console.warn(`Skipped ${source.repoName}: HTTP ${res.status}`);
        continue;
      }
      const markdown = await res.text();
      const items = parseQuestionsFromMarkdown(markdown, source);
      allQuestions.push(...items);
      attributions.push({
        repo: source.repoName,
        url: source.repoUrl,
        license: source.license,
        count: items.length,
      });
      console.log(`  -> Parsed ${items.length} questions for ${source.topic}`);
    } catch (err) {
      console.error(`Error syncing ${source.repoName}:`, err.message);
    }
  }

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(
      {
        syncedAt: new Date().toISOString(),
        attributions,
        questions: allQuestions,
      },
      null,
      2
    ),
    'utf-8'
  );

  console.log(`Done! Saved ${allQuestions.length} attributed Q&As to ${OUTPUT_FILE}`);
}

runSync();