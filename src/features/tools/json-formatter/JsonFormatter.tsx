'use client';

import { useState } from 'react';
import Container from '@/components/common/Container';
import JsonEditor from './JsonEditor';
import JsonOutput from './JsonOutput';
import JsonToolbar from './JsonToolbar';
import JsonStats from './JsonStats';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  return (
    <section className='py-16'>
      <Container>
        <h1 className='text-4xl font-bold'>JSON Formatter</h1>

        <p className='mt-3 text-slate-400'>
          Validate, beautify and format JSON instantly.
        </p>
        <JsonToolbar
          input={input}
          output={output}
          setOutput={setOutput}
          setError={setError}
          setInput={setInput}
        />

        <div className='mt-8 grid gap-6 lg:grid-cols-2'>
          <JsonEditor input={input} setInput={setInput} />

          <JsonOutput input={input} output={output} error={error} />
        </div>

      </Container>
    </section>
  );
}
