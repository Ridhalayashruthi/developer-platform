"use client";

import { useState, useEffect } from "react";
import Container from "@/components/common/Container";
import { Card } from "@/components/ui/card";
import { Copy, Check, Clock, RefreshCw } from "lucide-react";

export default function TimestampConverterPage() {
  const [nowSeconds, setNowSeconds] = useState<number>(() =>
    Math.floor(Date.now() / 1000)
  );
  const [epochInput, setEpochInput] = useState<string>(() =>
    String(Math.floor(Date.now() / 1000))
  );
  const [dateInput, setDateInput] = useState<string>(() => {
    const d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setNowSeconds(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const parsedEpochNum = Number(epochInput.trim());
  const isValidEpoch = epochInput.trim() !== "" && !Number.isNaN(parsedEpochNum);
  const isMillis = Math.abs(parsedEpochNum) >= 1e11;
  const epochDate = isValidEpoch
    ? new Date(isMillis ? parsedEpochNum : parsedEpochNum * 1000)
    : null;

  const parsedHumanDate = dateInput ? new Date(dateInput) : null;
  const isValidHuman =
    parsedHumanDate !== null && !Number.isNaN(parsedHumanDate.getTime());

  return (
    <section className="py-14">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-4xl">⏱️</span>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Unix Timestamp Converter
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Convert Unix epoch timestamps (seconds or milliseconds) to
                readable UTC, ISO-8601, and local dates instantly.
              </p>
            </div>
          </div>

          <Card className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-violet-400" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">
                  Current Unix Epoch (Seconds)
                </p>
                <p className="text-2xl font-mono font-bold text-white mt-0.5">
                  {nowSeconds}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEpochInput(String(nowSeconds))}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:border-violet-500 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Use Now
              </button>
              <button
                onClick={() => handleCopy(String(nowSeconds), "live")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-violet-500 transition"
              >
                {copiedKey === "live" ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Epoch
                  </>
                )}
              </button>
            </div>
          </Card>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold text-white">
                Timestamp → Human Date
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Supports both 10-digit seconds and 13-digit milliseconds.
              </p>

              <input
                type="text"
                value={epochInput}
                onChange={(e) => setEpochInput(e.target.value)}
                placeholder="e.g. 1795377600"
                className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 font-mono text-sm text-white focus:border-violet-500 focus:outline-none"
              />

              {isValidEpoch && epochDate && !Number.isNaN(epochDate.getTime()) ? (
                <div className="mt-5 space-y-3 text-xs">
                  <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                    <span className="text-slate-400 block">
                      Detected Format
                    </span>
                    <span className="font-mono text-violet-400 font-medium">
                      {isMillis ? "Milliseconds (13-digit)" : "Seconds (10-digit)"}
                    </span>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-slate-400 block">GMT / UTC</span>
                      <span className="font-mono text-slate-100">
                        {epochDate.toUTCString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(epochDate.toUTCString(), "utc")}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      {copiedKey === "utc" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-slate-400 block">Local Time</span>
                      <span className="font-mono text-slate-100">
                        {epochDate.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy(epochDate.toLocaleString(), "local")
                      }
                      className="text-slate-400 hover:text-white p-1"
                    >
                      {copiedKey === "local" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-slate-400 block">ISO-8601</span>
                      <span className="font-mono text-slate-100">
                        {epochDate.toISOString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(epochDate.toISOString(), "iso")}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      {copiedKey === "iso" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-xs text-rose-400">
                  Enter a valid numeric Unix timestamp.
                </p>
              )}
            </Card>

            <Card className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold text-white">
                Human Date → Timestamp
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Pick any date and local time to generate Unix epoch values.
              </p>

              <input
                type="datetime-local"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-violet-500 focus:outline-none"
              />

              {isValidHuman && parsedHumanDate && (
                <div className="mt-5 space-y-3 text-xs">
                  <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block">
                        Unix Timestamp (Seconds)
                      </span>
                      <span className="font-mono text-base font-semibold text-white">
                        {Math.floor(parsedHumanDate.getTime() / 1000)}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy(
                          String(Math.floor(parsedHumanDate.getTime() / 1000)),
                          "sec"
                        )
                      }
                      className="text-slate-400 hover:text-white p-1"
                    >
                      {copiedKey === "sec" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block">
                        Unix Timestamp (Milliseconds)
                      </span>
                      <span className="font-mono text-base font-semibold text-white">
                        {parsedHumanDate.getTime()}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy(String(parsedHumanDate.getTime()), "ms")
                      }
                      className="text-slate-400 hover:text-white p-1"
                    >
                      {copiedKey === "ms" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}