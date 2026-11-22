"use client";

import { useState, useMemo } from "react";
import Container from "@/components/common/Container";
import { Card } from "@/components/ui/card";

export default function SalaryHikeCalculatorPage() {
  const [currency, setCurrency] = useState<"INR" | "EUR" | "USD">("INR");
  const [currentCtc, setCurrentCtc] = useState<number>(1000000);
  const [newCtc, setNewCtc] = useState<number>(1450000);
  const [hikeInput, setHikeInput] = useState<string>("45");

  const fmt = (val: number) =>
    new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(val);

  const handleCurrentChange = (val: number) => {
    setCurrentCtc(val);
    const pct = Number(hikeInput);
    if (!Number.isNaN(pct)) {
      setNewCtc(Math.round(val * (1 + pct / 100)));
    }
  };

  const handleNewChange = (val: number) => {
    setNewCtc(val);
    if (currentCtc > 0) {
      const pct = ((val - currentCtc) / currentCtc) * 100;
      setHikeInput(pct.toFixed(2));
    }
  };

  const handleHikePctChange = (raw: string) => {
    setHikeInput(raw);
    const pct = Number(raw);
    if (!Number.isNaN(pct) && currentCtc > 0) {
      setNewCtc(Math.round(currentCtc * (1 + pct / 100)));
    }
  };

  const stats = useMemo(() => {
    const diffAnnual = newCtc - currentCtc;
    const diffMonthly = diffAnnual / 12;
    const pct = currentCtc > 0 ? (diffAnnual / currentCtc) * 100 : 0;
    return {
      diffAnnual,
      diffMonthly,
      pct,
      currentMonthly: currentCtc / 12,
      newMonthly: newCtc / 12,
    };
  }, [currentCtc, newCtc]);

  return (
    <section className="py-14">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">📈</span>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Salary Hike &amp; Offer Comparison Calculator
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Enter your current and offered compensation—or type a target
                  hike percentage—to compare annual and monthly jumps instantly.
                </p>
              </div>
            </div>

            <div className="flex rounded-xl border border-slate-700 bg-slate-900 p-1 text-xs">
              {(["INR", "EUR", "USD"] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => {
                    setCurrency(curr);
                    if (curr === "INR" && currentCtc < 200000) {
                      setCurrentCtc(1000000);
                      setNewCtc(1450000);
                      setHikeInput("45");
                    } else if (curr !== "INR" && currentCtc >= 200000) {
                      setCurrentCtc(55000);
                      setNewCtc(68000);
                      setHikeInput("23.64");
                    }
                  }}
                  className={`rounded-lg px-3 py-1.5 font-medium transition ${
                    currency === curr
                      ? "bg-violet-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-5">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5">
                  Current Annual Salary / CTC ({currency})
                </label>
                <input
                  type="number"
                  min={0}
                  step={currency === "INR" ? 25000 : 1000}
                  value={currentCtc}
                  onChange={(e) =>
                    handleCurrentChange(Number(e.target.value) || 0)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 font-mono text-sm text-white focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5">
                  Hike Percentage (%)
                </label>
                <input
                  type="number"
                  step={0.5}
                  value={hikeInput}
                  onChange={(e) => handleHikePctChange(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 font-mono text-sm text-white focus:border-violet-500 focus:outline-none"
                />
                <div className="mt-2.5 flex flex-wrap gap-2 text-xs">
                  {[15, 25, 35, 50, 75, 100].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleHikePctChange(String(preset))}
                      className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-slate-300 hover:border-violet-500 hover:text-white transition"
                    >
                      +{preset}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5">
                  New Offered Annual Salary / CTC ({currency})
                </label>
                <input
                  type="number"
                  min={0}
                  step={currency === "INR" ? 25000 : 1000}
                  value={newCtc}
                  onChange={(e) => handleNewChange(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 font-mono text-sm text-white focus:border-violet-500 focus:outline-none"
                />
              </div>
            </Card>

            <Card className="rounded-2xl border border-slate-700 bg-slate-900 p-6 flex flex-col justify-between">
              <div>
                <div className="rounded-2xl border border-violet-500/40 bg-violet-950/20 p-5">
                  <p className="text-xs uppercase tracking-wider text-violet-300">
                    Total Percentage Hike
                  </p>
                  <p
                    className={`mt-1 text-3xl font-bold font-mono ${
                      stats.pct >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {stats.pct >= 0 ? "+" : ""}
                    {stats.pct.toFixed(2)}%
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Annual Difference: {stats.diffAnnual >= 0 ? "+" : ""}
                    {fmt(stats.diffAnnual)}
                  </p>
                </div>

                <div className="mt-5 space-y-3 text-xs">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 flex justify-between items-center">
                    <span className="text-slate-400">Current Monthly Gross</span>
                    <span className="font-mono text-sm text-slate-200">
                      {fmt(stats.currentMonthly)}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 flex justify-between items-center">
                    <span className="text-slate-400">New Monthly Gross</span>
                    <span className="font-mono text-sm font-semibold text-white">
                      {fmt(stats.newMonthly)}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 flex justify-between items-center">
                    <span className="text-slate-400">Monthly Gross Gain</span>
                    <span
                      className={`font-mono text-sm font-semibold ${
                        stats.diffMonthly >= 0
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {stats.diffMonthly >= 0 ? "+" : ""}
                      {fmt(stats.diffMonthly)} / mo
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[11px] text-slate-500">
                Supports INR, EUR, and USD so you can compare domestic offers
                or international compensation packages.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}