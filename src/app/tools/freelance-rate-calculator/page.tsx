"use client";

import { useState, useMemo } from "react";
import Container from "@/components/common/Container";
import { Card } from "@/components/ui/card";

export default function FreelanceRateCalculatorPage() {
  const [currency, setCurrency] = useState<"USD" | "EUR" | "INR">("USD");
  const [targetIncome, setTargetIncome] = useState<number>(80000);
  const [annualExpenses, setAnnualExpenses] = useState<number>(6000);
  const [taxRate, setTaxRate] = useState<number>(20);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(30);
  const [vacationWeeks, setVacationWeeks] = useState<number>(4);

  const fmt = (val: number) =>
    new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "INR" ? 0 : 2,
    }).format(val);

  const metrics = useMemo(() => {
    const workingWeeks = Math.max(1, 52 - vacationWeeks);
    const totalBillableHours = workingWeeks * Math.max(1, billableHoursPerWeek);
    const taxMultiplier = Math.max(0.1, 1 - taxRate / 100);
    const grossNeeded = (targetIncome + annualExpenses) / taxMultiplier;

    const hourlyRate = grossNeeded / totalBillableHours;
    const dailyRate = hourlyRate * 8;
    const weeklyRate = hourlyRate * billableHoursPerWeek;
    const monthlyRetainer = grossNeeded / 12;

    return {
      workingWeeks,
      totalBillableHours,
      grossNeeded,
      hourlyRate,
      dailyRate,
      weeklyRate,
      monthlyRetainer,
    };
  }, [
    targetIncome,
    annualExpenses,
    taxRate,
    billableHoursPerWeek,
    vacationWeeks,
  ]);

  return (
    <section className="py-14">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">💼</span>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Freelance Developer Rate Calculator
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Calculate your minimum sustainable hourly, daily, and monthly
                  retainer rates after taxes, software expenses, and time off.
                </p>
              </div>
            </div>

            <div className="flex rounded-xl border border-slate-700 bg-slate-900 p-1 text-xs">
              {(["USD", "EUR", "INR"] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => {
                    setCurrency(curr);
                    if (curr === "INR" && targetIncome < 300000) {
                      setTargetIncome(2400000);
                      setAnnualExpenses(150000);
                    } else if (curr !== "INR" && targetIncome >= 300000) {
                      setTargetIncome(80000);
                      setAnnualExpenses(6000);
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
            <Card className="rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  Desired Net Annual Take-Home ({currency})
                </label>
                <input
                  type="number"
                  min={0}
                  step={currency === "INR" ? 50000 : 1000}
                  value={targetIncome}
                  onChange={(e) =>
                    setTargetIncome(Number(e.target.value) || 0)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 font-mono text-sm text-white focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  Annual Business &amp; Hardware Expenses ({currency})
                </label>
                <input
                  type="number"
                  min={0}
                  step={currency === "INR" ? 10000 : 500}
                  value={annualExpenses}
                  onChange={(e) =>
                    setAnnualExpenses(Number(e.target.value) || 0)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 font-mono text-sm text-white focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">
                    Estimated Tax Buffer (%)
                  </span>
                  <span className="font-mono text-violet-400">{taxRate}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={45}
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="w-full accent-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    Billable Hours / Week
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={60}
                    value={billableHoursPerWeek}
                    onChange={(e) =>
                      setBillableHoursPerWeek(Number(e.target.value) || 1)
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    Time Off (Weeks / Year)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={25}
                    value={vacationWeeks}
                    onChange={(e) =>
                      setVacationWeeks(Number(e.target.value) || 0)
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border border-slate-700 bg-slate-900 p-6 flex flex-col justify-between">
              <div>
                <div className="rounded-2xl border border-violet-500/40 bg-violet-950/20 p-5">
                  <p className="text-xs uppercase tracking-wider text-violet-300">
                    Recommended Minimum Hourly Rate
                  </p>
                  <p className="mt-1 text-3xl font-bold font-mono text-white">
                    {fmt(metrics.hourlyRate)}{" "}
                    <span className="text-sm font-normal text-slate-400">
                      / hr
                    </span>
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                    <span className="text-slate-400 block">
                      Day Rate (8 hrs)
                    </span>
                    <span className="mt-1 block font-mono text-base font-semibold text-white">
                      {fmt(metrics.dailyRate)}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                    <span className="text-slate-400 block">Weekly Target</span>
                    <span className="mt-1 block font-mono text-base font-semibold text-white">
                      {fmt(metrics.weeklyRate)}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                    <span className="text-slate-400 block">
                      Monthly Retainer
                    </span>
                    <span className="mt-1 block font-mono text-base font-semibold text-emerald-400">
                      {fmt(metrics.monthlyRetainer)}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                    <span className="text-slate-400 block">
                      Gross Annual Target
                    </span>
                    <span className="mt-1 block font-mono text-base font-semibold text-white">
                      {fmt(metrics.grossNeeded)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[11px] text-slate-500">
                Calculated across {metrics.workingWeeks} working weeks (
                {metrics.totalBillableHours.toLocaleString()} billable hours/year).
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}