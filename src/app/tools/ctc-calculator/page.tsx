"use client";

import { useState, useMemo } from "react";
import Container from "@/components/common/Container";
import { Card } from "@/components/ui/card";

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

function calculateNewRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 1200000) return 0;

  let tax = 0;
  const slabs: [number, number, number][] = [
    [400000, 800000, 0.05],
    [800000, 1200000, 0.1],
    [1200000, 1600000, 0.15],
    [1600000, 2000000, 0.2],
    [2000000, 2400000, 0.25],
    [2400000, Infinity, 0.3],
  ];

  for (const [lower, upper, rate] of slabs) {
    if (taxableIncome > lower) {
      tax += (Math.min(taxableIncome, upper) - lower) * rate;
    }
  }

  const excessOver12L = taxableIncome - 1200000;
  if (tax > excessOver12L) {
    tax = excessOver12L;
  }

  return tax * 1.04;
}

export default function CtcCalculatorPage() {
  const [annualCtc, setAnnualCtc] = useState<number>(1200000);
  const [basicPercent, setBasicPercent] = useState<number>(50);
  const [pfMode, setPfMode] = useState<"capped" | "full">("capped");
  const [profTaxMonthly, setProfTaxMonthly] = useState<number>(200);
  const [bonusAnnual, setBonusAnnual] = useState<number>(0);

  const breakdown = useMemo(() => {
    const ctc = Math.max(0, annualCtc);
    const fixedCtc = Math.max(0, ctc - bonusAnnual);
    const basicAnnual = (fixedCtc * basicPercent) / 100;

    const employerPfAnnual =
      pfMode === "capped"
        ? Math.min(21600, basicAnnual * 0.12)
        : basicAnnual * 0.12;
    const employeePfAnnual = employerPfAnnual;

    const grossSalaryAnnual = Math.max(0, ctc - employerPfAnnual);
    const standardDeduction = 75000;
    const taxableIncome = Math.max(
      0,
      grossSalaryAnnual - standardDeduction
    );

    const annualTax = calculateNewRegimeTax(taxableIncome);
    const annualProfTax = profTaxMonthly * 12;

    const annualInHand = Math.max(
      0,
      grossSalaryAnnual - employeePfAnnual - annualTax - annualProfTax
    );
    const monthlyInHand = annualInHand / 12;

    return {
      basicAnnual,
      employerPfAnnual,
      employeePfAnnual,
      grossSalaryAnnual,
      taxableIncome,
      annualTax,
      annualProfTax,
      annualInHand,
      monthlyInHand,
    };
  }, [annualCtc, basicPercent, pfMode, profTaxMonthly, bonusAnnual]);

  return (
    <section className="py-14">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-4xl">💰</span>
            <div>
              <h1 className="text-3xl font-bold text-white">
                CTC to In-Hand Salary Calculator
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Estimate monthly take-home pay under India&apos;s New Tax
                Regime (with ₹75,000 standard deduction, EPF, and Professional
                Tax).
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">
                    Annual CTC (₹)
                  </span>
                  <span className="font-mono text-violet-400 font-semibold">
                    {formatINR(annualCtc)}
                  </span>
                </div>
                <input
                  type="number"
                  step={50000}
                  min={0}
                  value={annualCtc}
                  onChange={(e) => setAnnualCtc(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 font-mono text-sm text-white focus:border-violet-500 focus:outline-none"
                />
                <input
                  type="range"
                  min={300000}
                  max={6000000}
                  step={50000}
                  value={Math.min(6000000, annualCtc)}
                  onChange={(e) => setAnnualCtc(Number(e.target.value))}
                  className="mt-2 w-full accent-violet-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">
                    Basic Salary (% of Fixed CTC)
                  </span>
                  <span className="font-mono text-violet-400">
                    {basicPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={60}
                  value={basicPercent}
                  onChange={(e) => setBasicPercent(Number(e.target.value))}
                  className="w-full accent-violet-500"
                />
              </div>

              <div>
                <span className="text-xs text-slate-300 font-medium block mb-2">
                  EPF Deduction Rule
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPfMode("capped")}
                    className={`rounded-xl border px-3 py-2 font-medium transition ${
                      pfMode === "capped"
                        ? "border-violet-500 bg-violet-600/20 text-white"
                        : "border-slate-700 bg-slate-950 text-slate-400"
                    }`}
                  >
                    Capped (₹1,800/mo)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPfMode("full")}
                    className={`rounded-xl border px-3 py-2 font-medium transition ${
                      pfMode === "full"
                        ? "border-violet-500 bg-violet-600/20 text-white"
                        : "border-slate-700 bg-slate-950 text-slate-400"
                    }`}
                  >
                    12% of Basic
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    Annual Variable / Bonus (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={10000}
                    value={bonusAnnual}
                    onChange={(e) =>
                      setBonusAnnual(Number(e.target.value) || 0)
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-xs text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    Monthly Prof. Tax (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={500}
                    value={profTaxMonthly}
                    onChange={(e) =>
                      setProfTaxMonthly(Number(e.target.value) || 0)
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-xs text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border border-slate-700 bg-slate-900 p-6 flex flex-col justify-between">
              <div>
                <div className="rounded-2xl border border-violet-500/40 bg-violet-950/20 p-5">
                  <p className="text-xs uppercase tracking-wider text-violet-300">
                    Estimated Monthly In-Hand
                  </p>
                  <p className="mt-1 text-3xl font-bold font-mono text-white">
                    {formatINR(breakdown.monthlyInHand)}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Annual Net Take-Home: {formatINR(breakdown.annualInHand)}
                  </p>
                </div>

                <div className="mt-5 space-y-2.5 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Gross Annual Salary</span>
                    <span className="font-mono text-slate-200">
                      {formatINR(breakdown.grossSalaryAnnual)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">
                      Employer + Employee EPF
                    </span>
                    <span className="font-mono text-amber-400">
                      -{" "}
                      {formatINR(
                        breakdown.employerPfAnnual + breakdown.employeePfAnnual
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">
                      Income Tax (New Regime + 4% Cess)
                    </span>
                    <span className="font-mono text-rose-400">
                      - {formatINR(breakdown.annualTax)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Professional Tax</span>
                    <span className="font-mono text-rose-400">
                      - {formatINR(breakdown.annualProfTax)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[11px] text-slate-500">
                * Assumes New Tax Regime with ₹75,000 standard deduction and
                Section 87A rebate up to ₹12L taxable income. Actual payslip
                components may vary by employer.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}