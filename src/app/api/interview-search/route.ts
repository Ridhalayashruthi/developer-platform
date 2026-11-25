import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';
import type { QuestionItem } from '@/features/interview/questions';

export const maxDuration = 30;

const CACHE_FILE = path.join(process.cwd(), 'data', 'generated-qna-cache.json');
const memoryCache = new Map<string, QuestionItem[]>();

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      topic: {
        type: Type.STRING,
        description:
          'One of: React, JavaScript, TypeScript, System Design, DSA, Performance & Security',
      },
      difficulty: {
        type: Type.STRING,
        description: 'One of: Beginner, Intermediate, Senior',
      },
      question: { type: Type.STRING },
      answer: { type: Type.STRING },
      followUp: { type: Type.STRING },
      code: { type: Type.STRING },
    },
    required: ['topic', 'difficulty', 'question', 'answer', 'followUp'],
  },
};

function attachRelatedTool(item: QuestionItem): QuestionItem {
  const haystack = `${item.question} ${item.answer}`.toLowerCase();
  if (haystack.includes('jwt') || haystack.includes('token')) {
    return { ...item, relatedTool: { label: 'Inspect JWT tokens', href: '/tools/jwt-decoder' } };
  }
  if (haystack.includes('json') || haystack.includes('payload')) {
    return { ...item, relatedTool: { label: 'Format & validate JSON', href: '/tools/json-formatter' } };
  }
  if (haystack.includes('regex') || haystack.includes('regular expression')) {
    return { ...item, relatedTool: { label: 'Test Regex live', href: '/tools/regex-tester' } };
  }
  if (haystack.includes('uuid') || haystack.includes('idempotency')) {
    return { ...item, relatedTool: { label: 'Generate UUID v4', href: '/tools/uuid-generator' } };
  }
  if (haystack.includes('base64') || haystack.includes('cursor')) {
    return { ...item, relatedTool: { label: 'Encode/Decode Base64', href: '/tools/base64' } };
  }
  return item;
}

async function readCache(): Promise<Record<string, QuestionItem[]>> {
  try {
    const raw = await fs.readFile(CACHE_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeCache(cache: Record<string, QuestionItem[]>) {
  try {
    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
    await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
  } catch {
    // Vercel serverless filesystem is read-only; memoryCache handles runtime caching
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
    ),
  ]);
}

function buildGuaranteedFallback(rawQuery: string): QuestionItem[] {
  const topicLabel = rawQuery.trim();
  const stamp = Date.now();
  return [
    attachRelatedTool({
      id: `guide-${stamp}-1`,
      topic: 'System Design',
      difficulty: 'Intermediate',
      question: `What are the core trade-offs and limitations (cons) of using ${topicLabel} in production?`,
      answer: `Adopting ${topicLabel} introduces operational complexity, steeper team onboarding, and additional infrastructure or configuration overhead. For smaller workloads or early-stage products, managed alternatives or simpler architectures often deliver faster iteration with lower maintenance cost.`,
      followUp: `When would you deliberately choose a simpler alternative over ${topicLabel}?`,
    }),
    attachRelatedTool({
      id: `guide-${stamp}-2`,
      topic: 'System Design',
      difficulty: 'Senior',
      question: `How do you debug performance bottlenecks, failures, and observability gaps in ${topicLabel}?`,
      answer: `Production debugging in ${topicLabel} relies on structured logging, distributed tracing, health checks, and resource/latency metrics. Isolating configuration drift, network timeouts, and resource limits early prevents cascading failures under peak traffic.`,
      followUp: `Which three metrics or alerts would you configure first for ${topicLabel} in production?`,
    }),
    attachRelatedTool({
      id: `guide-${stamp}-3`,
      topic: 'Performance & Security',
      difficulty: 'Senior',
      question: `What security hardening and cost-optimization practices are essential for ${topicLabel}?`,
      answer: `Apply least-privilege access controls, rotate secrets regularly, validate all external inputs, and enforce resource quotas or autoscaling boundaries. Without strict limits and security policies, ${topicLabel} deployments risk privilege escalation and unexpected cloud spend.`,
      followUp: `How do you safely manage secrets and environment configuration for ${topicLabel}?`,
    }),
  ];
}

export async function POST(req: NextRequest) {
  let query = '';
  try {
    const body = await req.json();
    query = String(body?.query ?? '').trim();

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'Please enter at least 2 characters to search.' },
        { status: 400 }
      );
    }

    const normalizedKey = query.toLowerCase();

    // 1. Check in-memory & disk cache (<10ms)
    if (memoryCache.has(normalizedKey)) {
      return NextResponse.json({
        source: 'cache',
        questions: memoryCache.get(normalizedKey),
      });
    }

    const diskCache = await readCache();
    if (diskCache[normalizedKey]?.length) {
      memoryCache.set(normalizedKey, diskCache[normalizedKey]);
      return NextResponse.json({
        source: 'cache',
        questions: diskCache[normalizedKey],
      });
    }

    // 2. Try Gemini API with fast 6s per-model failover
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Generate 3 concise, high-impact technical interview Q&As about "${query}" (correct any spelling typos in the topic naturally).
Rules:
- Map "topic" strictly to one of: "React", "JavaScript", "TypeScript", "System Design", "DSA", "Performance & Security".
- Map "difficulty" strictly to: "Beginner", "Intermediate", or "Senior".
- Keep "answer" to 3-4 crisp sentences, "followUp" to 1-2 sentences, and include a short "code" snippet (max 8 lines) only when helpful.`;

      const candidateModels = ['gemini-3.5-flash-lite', 'gemini-3.5-flash'];
      for (const modelName of candidateModels) {
        try {
          const response = await withTimeout(
            ai.models.generateContent({
              model: modelName,
              contents: prompt,
              config: {
                responseMimeType: 'application/json',
                responseSchema,
                thinkingConfig: { thinkingBudget: 0 },
              },
            }),
            6000
          );

          if (response.text) {
            const parsed = JSON.parse(response.text) as Array<Omit<QuestionItem, 'id'>>;
            const timestamp = Date.now();
            const formatted = parsed.map((item, idx) =>
              attachRelatedTool({
                ...item,
                id: `ai-${normalizedKey.replace(/[^a-z0-9]/g, '-')}-${timestamp}-${idx + 1}`,
              })
            );

            memoryCache.set(normalizedKey, formatted);
            diskCache[normalizedKey] = formatted;
            await writeCache(diskCache);

            return NextResponse.json({ source: 'ai-live', questions: formatted });
          }
        } catch (modelErr) {
          console.warn(`[interview-search] ${modelName} skipped:`, modelErr);
        }
      }
    }

    // 3. Fallback to Stack Overflow keyword search (relaxed filters for speed & recall)
    const searchQ = encodeURIComponent(query);
    const soRes = await withTimeout(
      fetch(
        `https://stackexchange.com{searchQ}&site=stackoverflow&filter=withbody&pagesize=3`
      ),
      4000
    );
    const soData = await soRes.json();

    if (Array.isArray(soData.items) && soData.items.length > 0) {
      const communityItems: QuestionItem[] = soData.items.map(
        (
          item: { question_id: number; title: string; body: string; link: string },
          i: number
        ) => {
          const cleanBody = item.body
            .replace(/<[^>]+>/g, ' ')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/\s+/g, ' ')
            .trim();

          return attachRelatedTool({
            id: `so-${item.question_id}-${i}`,
            topic: 'System Design',
            difficulty: 'Intermediate',
            question: item.title
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/&amp;/g, '&'),
            answer:
              cleanBody.length > 480
                ? `${cleanBody.slice(0, 480)}...`
                : cleanBody || 'Review community solution and trade-offs.',
            followUp: `Explore real-world edge cases on Stack Overflow (${item.link}).`,
          });
        }
      );

      memoryCache.set(normalizedKey, communityItems);
      return NextResponse.json({ source: 'community-fallback', questions: communityItems });
    }

    // 4. Guaranteed Structured Fallback (zero 503s even on typos or API spikes)
    const fallbackItems = buildGuaranteedFallback(query);
    memoryCache.set(normalizedKey, fallbackItems);
    return NextResponse.json({ source: 'structured-guide', questions: fallbackItems });
  } catch (error) {
    console.warn('[interview-search] Recovering with structured fallback:', error);
    const fallbackItems = buildGuaranteedFallback(query || 'Software Architecture');
    return NextResponse.json({ source: 'structured-guide', questions: fallbackItems });
}
}