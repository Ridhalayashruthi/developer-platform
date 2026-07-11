interface JwtEditorProps {
    token: string;
    setToken: (value: string) => void;
  }
  
  export default function JwtEditor({
    token,
    setToken,
  }: JwtEditorProps) {
    return (
      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste your JWT token here..."
        className="h-[500px] w-full rounded-xl border border-slate-700 bg-slate-900 p-5 font-mono text-sm outline-none focus:border-violet-500"
      />
    );
  }