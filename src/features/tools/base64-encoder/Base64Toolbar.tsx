'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { encodeBase64, decodeBase64, downloadText } from './base64.utils';

interface Base64ToolbarProps {
  input: string;
  output: string;
  mode: 'encode' | 'decode';
  setMode: (mode: 'encode' | 'decode') => void;
  setInput: (value: string) => void;
  setOutput: (value: string) => void;
  setError: (value: string) => void;
}

export default function Base64Toolbar({
  input,
  output,
  mode,
  setMode,
  setInput,
  setOutput,
  setError,
}: Base64ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      setInput(e.target?.result as string);
      setOutput('');
      setError('');
    };

    reader.readAsText(file);
  };

  return (
    <div className='mt-8 flex flex-wrap gap-3'>
      <Button
        variant='outline'
        disabled={!input}
        onClick={() => {
          try {
            setOutput(encodeBase64(input));
            setMode('encode');
            setError('');
          } catch {
            setOutput('');
            setError('Unable to encode text.');
          }
        }}
      >
        Encode
      </Button>

      <Button
        variant='outline'
        disabled={!input}
        onClick={() => {
          try {
            setOutput(decodeBase64(input));
            setMode('decode');
            setError('');
          } catch {
            setOutput('');
            setError('Invalid Base64 text.');
          }
        }}
      >
        Decode
      </Button>

      <Button
        variant='outline'
        disabled={!output}
        onClick={() => downloadText(output)}
      >
        Download
      </Button>

      <Button
        variant='outline'
        disabled={!input && !output}
        onClick={() => {
          setInput('');
          setOutput('');
          setError('');
        }}
      >
        Clear
      </Button>

      <input
        hidden
        ref={fileInputRef}
        type='file'
        accept='.txt'
        onChange={handleUpload}
      />

      <Button variant='outline' onClick={() => fileInputRef.current?.click()}>
        Upload Text
      </Button>
    </div>
  );
}
