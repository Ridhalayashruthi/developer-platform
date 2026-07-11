'use client';

import { useState } from 'react';
import Container from '@/components/common/Container';

import Base64Editor from './Base64Editor';
import Base64Output from './Base64Output';
import Base64Toolbar from './Base64Toolbar';

export default function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  return (
    <section className='py-16'>
      <Container>
        <h1 className='text-4xl font-bold'>Base64 Encoder / Decoder</h1>

        <p className='mt-3 text-slate-400'>
          Encode and decode Base64 instantly in your browser.
        </p>

        <Base64Toolbar
          input={input}
          output={output}
          mode={mode}
          setMode={setMode}
          setInput={setInput}
          setOutput={setOutput}
          setError={setError}
        />

        <div className='mt-8 grid gap-6 lg:grid-cols-2'>
          <Base64Editor input={input} setInput={setInput} />
          <Base64Output output={output} error={error} mode={mode} />
        </div>
      </Container>
    </section>
  );
}
