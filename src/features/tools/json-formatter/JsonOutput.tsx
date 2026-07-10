'use client';
import { useState } from 'react';
import JsonStats from './JsonStats';
import LineNumbers from './LineNumbers';
import { Copy, Check } from 'lucide-react';

interface JsonOutputProps {
  input: string;
  output: string;
  error: string;
}

export default function JsonOutput({ input, output, error }: JsonOutputProps) {
  const [copied, setCopied] = useState(false);
  return (
    <div className='h-[500px] rounded-xl border border-slate-700 bg-slate-900 p-5 flex flex-col'>
      <div className='mb-3 flex items-center justify-between'>
        <h3 className='text-sm font-medium text-slate-300'>Formatted JSON</h3>

        {error && error ? (
          <span className='rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400'>
            ✕ Invalid JSON
          </span>
        ) : (
          input &&
          output && (
            <div className='flex items-center gap-2'>
              <span className='rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400'>
                ✓ Valid JSON
              </span>

              <button
                type='button'
                disabled={!output}
                onClick={async () => {
                  await navigator.clipboard.writeText(output);

                  setCopied(true);

                  setTimeout(() => setCopied(false), 2000);
                }}
                className='rounded-md p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50'
                aria-label='Copy formatted JSON'
                title='Copy formatted JSON'
              >
                {copied ? (
                  <Check className='h-4 w-4 text-green-500' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </button>
            </div>
          )
        )}
      </div>

      <div className='mb-3 border-b border-slate-700' />
      <div className='flex-1 overflow-auto'>
        <div className='flex'>
          {output && <LineNumbers text={output} />}

          <pre
            className={`flex-1 overflow-x-auto whitespace-pre-wrap break-words font-mono ${
              output ? 'px-4' : ''
            }`}
          >
            {output || 'Formatted JSON will appear here...'}
          </pre>
        </div>
      </div>

      {/* FIXED */}
      <div className='mt-4 border-t border-slate-700 pt-3'>
        <JsonStats json={output} />
      </div>
    </div>
  );
}
