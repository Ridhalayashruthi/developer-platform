import React from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface ToolGuideProps {
  title: string;
  overview: string;
  steps: string[];
  useCases: string[];
  faqs: FaqItem[];
}

export default function ToolGuide({
  title,
  overview,
  steps,
  useCases,
  faqs,
}: ToolGuideProps) {
  return (
    <section className="mt-16 border-t border-slate-800 pt-12 space-y-10 text-slate-300 leading-relaxed">
      {/* Overview */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-slate-400">{overview}</p>
      </div>

      {/* How to Use & Common Use Cases */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-3">
          <h3 className="text-lg font-semibold text-white">How to Use This Tool</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-3">
          <h3 className="text-lg font-semibold text-white">Common Developer Use Cases</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
            {useCases.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-1.5"
            >
              <h4 className="font-semibold text-white text-base">{faq.question}</h4>
              <p className="text-sm text-slate-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}