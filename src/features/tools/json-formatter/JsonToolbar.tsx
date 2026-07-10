'use client';
import { Button } from '@/components/ui/button';
import { beautifyJSON, minifyJSON, downloadJSON } from './json.utils';
import { useRef } from 'react';

interface JsonToolbarProps {
  input: string;
  output: string;
  setOutput: (value: string) => void;
  setError: (value: string) => void;
  setInput: (value: string) => void;
}

export default function JsonToolbar({
  input,
  output,
  setOutput,
  setError,
  setInput,
}: JsonToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;

      setInput(text);
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
            const formatted = beautifyJSON(input);

            setOutput(formatted);
            setError('');
          } catch {
            setOutput('');
            setError('❌ Invalid JSON');
          }
        }}
      >
        Beautify
      </Button>
      <Button
        variant='outline'
        disabled={!input}
        onClick={() => {
          try {
            const minified = minifyJSON(input);

            setOutput(minified);
            setError('');
          } catch {
            setOutput('');
            setError('❌ Invalid JSON');
          }
        }}
      >
        Minify
      </Button>
      <Button
        variant='outline'
        disabled={!output}
        onClick={() => {
          if (output) {
            downloadJSON(output);
          }
        }}
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
  ref={fileInputRef}
  type="file"
  accept=".json,application/json"
  hidden
  onChange={handleUpload}
/>
<Button
  variant="outline"
  onClick={() => fileInputRef.current?.click()}
>
  Upload JSON
</Button>
    </div>
  );
}
