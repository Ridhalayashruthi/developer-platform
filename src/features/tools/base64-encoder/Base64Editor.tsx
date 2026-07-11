interface Base64EditorProps {
    input: string;
    setInput: (value: string) => void;
  }
  
  export default function Base64Editor({
    input,
    setInput,
  }: Base64EditorProps) {
    return (
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text or Base64..."
        className="h-[500px] w-full rounded-xl border border-slate-700 bg-slate-900 p-5 outline-none"
      />
    );
  }