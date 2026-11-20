"use client";

import React, { useState, useSyncExternalStore } from "react";
import Container from "@/components/common/Container";
import { Copy, Check, RefreshCw, ShieldCheck } from "lucide-react";

const emptySubscribe = () => () => {};

function buildPassword(
  len: number,
  upper: boolean,
  lower: boolean,
  nums: boolean,
  syms: boolean
) {
  let charset = "";
  if (upper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lower) charset += "abcdefghijklmnopqrstuvwxyz";
  if (nums) charset += "0123456789";
  if (syms) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  if (!charset) charset = "abcdefghijklmnopqrstuvwxyz0123456789";

  const array = new Uint32Array(len);
  crypto.getRandomValues(array);
  return Array.from(array, (num) => charset[num % charset.length]).join("");
}

export default function PasswordGeneratorPage() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [customPassword, setCustomPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const password =
    customPassword ??
    (isClient
      ? buildPassword(length, includeUpper, includeLower, includeNumbers, includeSymbols)
      : "Generating...");

  const generatePassword = (
    len = length,
    upper = includeUpper,
    lower = includeLower,
    nums = includeNumbers,
    syms = includeSymbols
  ) => {
    setCustomPassword(buildPassword(len, upper, lower, nums, syms));
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const strengthLabel =
    length >= 16 && includeSymbols && includeNumbers
      ? 'Very Strong'
      : length >= 12
      ? 'Strong'
      : 'Moderate';

  return (
    <div className='py-12'>
      <Container>
        <div className='max-w-3xl mx-auto space-y-8'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Strong Password Generator
            </h1>
            <p className='text-slate-400 mt-2'>
              Generate high-entropy passwords using{' '}
              <code className='text-violet-300'>crypto.getRandomValues()</code>{' '}
              directly inside your browser.
            </p>
          </div>

          <div className='rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6'>
            {/* Output Box */}
            <div className='flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-950 p-4'>
              <span className='font-mono text-lg text-emerald-400 break-all'>
                {password}
              </span>
              <div className='flex items-center gap-2 shrink-0'>
                <button
                  onClick={() => generatePassword}
                  className='p-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300'
                  title='Regenerate'
                >
                  <RefreshCw className='w-4 h-4' />
                </button>
                <button
                  onClick={copyPassword}
                  className='inline-flex items-center gap-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 px-3.5 py-2 text-sm font-medium text-white'
                >
                  {copied ? (
                    <Check className='w-4 h-4' />
                  ) : (
                    <Copy className='w-4 h-4' />
                  )}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className='flex items-center gap-2 text-xs text-emerald-400'>
              <ShieldCheck className='w-4 h-4' />
              <span>Security Strength: {strengthLabel}</span>
            </div>

            {/* Length Slider */}
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-slate-300'>Password Length</span>
                <span className='font-mono text-violet-400 font-semibold'>
                  {length} characters
                </span>
              </div>
              <input
                type='range'
                min={8}
                max={64}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className='w-full accent-violet-500'
              />
            </div>

            {/* Character Options */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm'>
              {[
                {
                  label: 'Uppercase (A-Z)',
                  state: includeUpper,
                  setter: setIncludeUpper,
                },
                {
                  label: 'Lowercase (a-z)',
                  state: includeLower,
                  setter: setIncludeLower,
                },
                {
                  label: 'Numbers (0-9)',
                  state: includeNumbers,
                  setter: setIncludeNumbers,
                },
                {
                  label: 'Symbols (!@#$)',
                  state: includeSymbols,
                  setter: setIncludeSymbols,
                },
              ].map((opt) => (
                <label
                  key={opt.label}
                  className='flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-3 cursor-pointer'
                >
                  <input
                    type='checkbox'
                    checked={opt.state}
                    onChange={(e) => opt.setter(e.target.checked)}
                    className='accent-violet-500'
                  />
                  <span className='text-slate-300 text-xs'>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <section className='rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-3 text-sm text-slate-400 leading-relaxed'>
            <h2 className='text-lg font-semibold text-white'>
              Why Cryptographic Randomness Matters for Passwords
            </h2>
            <p>
              Standard <code className='text-violet-300'>Math.random()</code> is
              pseudo-random and predictable. This tool uses the browser&apos;s
              CSPRNG (
              <code className='text-violet-300'>
                window.crypto.getRandomValues
              </code>
              ) to generate unpredictable API secrets, database credentials, and
              account passwords offline with zero network transmission.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
