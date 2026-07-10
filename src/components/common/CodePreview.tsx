export default function CodePreview() {
  return (
    <div className='relative rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden'>
      <div className='flex items-center gap-2 border-b border-slate-700 px-4 py-3'>
        <div className='h-3 w-3 rounded-full bg-red-500' />
        <div className='h-3 w-3 rounded-full bg-yellow-500' />
        <div className='h-3 w-3 rounded-full bg-green-500' />

        <span className='ml-4 text-sm text-slate-400'>developer.tsx</span>
      </div>

      <pre className='overflow-x-auto p-6 text-sm leading-7 text-slate-300'>
        {`const developer = {
    name: "Shruthi",
    role: "Frontend Engineer",
  
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "AI"
    ],
  
    status: "Ready 🚀"
  }`}
      </pre>
    </div>
  );
}
