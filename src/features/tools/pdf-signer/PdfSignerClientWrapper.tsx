"use client";

import dynamic from "next/dynamic";

const PdfSignerTool = dynamic(() => import("./PdfSignerTool"), {
  ssr: false,
  loading: () => (
    <div className="min-h-80 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-center text-sm text-slate-400">
      Loading DevDocuSign workspace...
    </div>
  ),
});

export default function PdfSignerClientWrapper() {
  return <PdfSignerTool />;
}