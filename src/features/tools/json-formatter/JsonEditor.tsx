"use client";

interface JsonEditorProps {
  input: string;
  setInput: (value: string) => void;
}

export default function JsonEditor({
  input,
  setInput,
}: JsonEditorProps) {
  return (
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Paste your JSON here..."
      className="h-[500px] w-full rounded-xl border border-slate-700 bg-slate-900 p-5 font-mono text-sm outline-none"
    />
  );
}