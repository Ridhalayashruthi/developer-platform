'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import type { DecodedJwt } from './types';

interface JwtOutputProps {
  decoded: DecodedJwt;
  error: string;
}

export default function JwtOutput({ decoded, error }: JwtOutputProps) {
  const [copied, setCopied] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);

  const copy = async (text: string, type: string) => {
    if (!text) return;

    await navigator.clipboard.writeText(text);

    setCopied(type);

    setTimeout(() => {
      setCopied('');
    }, 2000);
  };

  const copyAll = async () => {
    const text = `Header
  ${decoded.header}
  
  Payload
  ${decoded.payload}
  
  Signature
  ${decoded.signature}`;

    await navigator.clipboard.writeText(text);

    setCopiedAll(true);

    setTimeout(() => {
      setCopiedAll(false);
    }, 2000);
  };

  return (
    <div className='h-[500px] rounded-xl border border-slate-700 bg-slate-900 p-5 flex flex-col'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-medium text-slate-300'>Decoded Token</h3>

        {!error && decoded.header && (
          <div className='flex items-center gap-2'>
            <span className='rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400'>
              ✓ {decoded.info.status}
            </span>

            <button
              onClick={copyAll}
              className='rounded-md p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white'
              title='Copy entire decoded token'
            >
              {copiedAll ? (
                <Check className='h-4 w-4 text-green-500' />
              ) : (
                <Copy className='h-4 w-4' />
              )}
            </button>
          </div>
        )}
      </div>

      <div className='mt-3 border-b border-slate-700 pb-3 text-sm text-slate-400'>
        <span>{decoded.info.algorithm}</span>

        <span className='mx-2'>•</span>

        <span>{decoded.info.type}</span>

        <span className='mx-2'>•</span>

        <span>{decoded.info.expiresAt}</span>
      </div>

      {error ? (
        <div className='mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-400'>
          {error}
        </div>
      ) : (
        <div className='mt-4 flex-1 overflow-auto space-y-6'>
          {/* Header */}
          <Section
            title='Header'
            value={decoded.header}
            copied={copied === 'header'}
            onCopy={() => copy(decoded.header, 'header')}
          />

          {/* Payload */}
          <Section
            title='Payload'
            value={decoded.payload}
            copied={copied === 'payload'}
            onCopy={() => copy(decoded.payload, 'payload')}
          />

          {/* Signature */}
          <Section
            title='Signature'
            value={decoded.signature}
            copied={copied === 'signature'}
            onCopy={() => copy(decoded.signature, 'signature')}
          />
        </div>
      )}
    </div>
  );
}

interface SectionProps {
  title: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}

function Section({ title, value, copied, onCopy }: SectionProps) {
  return (
    <div>
      <div className='mb-2 flex items-center justify-between'>
        <h4 className='text-sm font-medium text-slate-400'>{title}</h4>

        <button
          onClick={onCopy}
          className='rounded-md p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white'
        >
          {copied ? (
            <Check className='h-4 w-4 text-green-500' />
          ) : (
            <Copy className='h-4 w-4' />
          )}
        </button>
      </div>

      <pre className='overflow-x-auto rounded-lg border border-slate-700 bg-slate-950 p-4 whitespace-pre-wrap break-words'>
        {value}
      </pre>
    </div>
  );
}
