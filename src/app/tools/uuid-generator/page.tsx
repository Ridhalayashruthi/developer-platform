"use client";

import React, { useState, useSyncExternalStore } from "react";
import Container from "@/components/common/Container";
import { Copy, Check, RefreshCw } from "lucide-react";

const emptySubscribe = () => () => {};

function createUuidList(qty: number, isUpper: boolean, stripHyphens: boolean) {
  return Array.from({ length: qty }, () => {
    let id: string = crypto.randomUUID();
    if (stripHyphens) id = id.replace(/-/g, "");
    if (isUpper) id = id.toUpperCase();
    return id;
  });
}

export default function UuidGeneratorPage() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);
  const [customUuids, setCustomUuids] = useState<string[] | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | "all" | null>(null);

  const uuids =
    customUuids ??
    (isClient ? createUuidList(count, uppercase, noHyphens) : []);

  const generateUuids = (
    qty = count,
    isUpper = uppercase,
    stripHyphens = noHyphens
  ) => {
    setCustomUuids(createUuidList(qty, isUpper, stripHyphens));
  };

  const copyText = (text: string, idx: number | "all") => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              UUID v4 Generator
            </h1>
            <p className="text-slate-400 mt-2">
              Generate cryptographically secure version 4 Universally Unique
              Identifiers (UUIDs) locally in your browser.
            </p>
          </div>

          {/* Controls */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-300">Quantity:</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={count}
                  onChange={(e) => {
                    const val = Math.max(1, Math.min(50, Number(e.target.value) || 1));
                    setCount(val);
                    generateUuids(val, uppercase, noHyphens);
                  }}
                  className="w-20 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm text-white"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => {
                    setUppercase(e.target.checked);
                    generateUuids(count, e.target.checked, noHyphens);
                  }}
                  className="accent-violet-500"
                />
                Uppercase
              </label>

              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={noHyphens}
                  onChange={(e) => {
                    setNoHyphens(e.target.checked);
                    generateUuids(count, uppercase, e.target.checked);
                  }}
                  className="accent-violet-500"
                />
                Remove Hyphens
              </label>

              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => generateUuids()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 px-4 py-2 text-sm font-medium text-white transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </button>
                <button
                  onClick={() => copyText(uuids.join("\n"), "all")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition"
                >
                  {copiedIndex === "all" ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  Copy All
                </button>
              </div>
            </div>

            {/* Generated List */}
            <div className="space-y-2">
              {uuids.map((id, idx) => (
                <div
                  key={`${id}-${idx}`}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 font-mono text-sm text-violet-300"
                >
                  <span>{id}</span>
                  <button
                    onClick={() => copyText(id, idx)}
                    className="text-slate-400 hover:text-white p-1"
                    title="Copy UUID"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Educational Guide */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-3 text-sm text-slate-400 leading-relaxed">
            <h2 className="text-lg font-semibold text-white">
              What is a UUID v4 and When Should You Use It?
            </h2>
            <p>
              A Version 4 UUID (Universally Unique Identifier) is a 128-bit
              random identifier formatted as 32 hexadecimal characters separated
              by four hyphens. Unlike auto-incrementing database IDs, UUID v4
              values can be generated independently across distributed
              microservices and frontend clients with virtually zero collision
              probability.
            </p>
            <p>
              This generator uses the Web Crypto API (
              <code className="text-violet-300">crypto.randomUUID()</code>) so
              every identifier is generated locally in your browser without
              network latency or logging.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}