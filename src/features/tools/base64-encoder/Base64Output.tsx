import Base64Stats from './Base64Stats';
interface Base64OutputProps {
  output: string;
  error: string;
  mode: 'encode' | 'decode';
}

export default function Base64Output({
  output,
  error,
  mode,
}: Base64OutputProps) {
  return (
    <div className='h-[500px] rounded-xl border border-slate-700 bg-slate-900 p-5 flex flex-col'>
      <div className='flex-1 overflow-auto'>
        {error ? (
          <p className='text-red-400'>{error}</p>
        ) : (
          <pre className='whitespace-pre-wrap break-words font-mono'>
            {output || 'Encoded / Decoded output will appear here...'}
          </pre>
        )}
      </div>

      {output && (
        <div className='mt-4 border-t border-slate-700 pt-3'>
          <Base64Stats text={output} mode={mode} />
        </div>
      )}
    </div>
  );
}
