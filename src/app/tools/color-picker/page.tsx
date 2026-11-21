'use client';

import React, { useState } from 'react';
import Container from '@/components/common/Container';
import { Copy, Check } from 'lucide-react';
import ToolGuide from '@/components/tools/ToolGuide';
import { TOOL_GUIDES } from '@/constants/toolGuides';

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorPickerPage() {
  const [hex, setHex] = useState('#8b5cf6');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const validHex = /^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : '#8b5cf6';
  const { r, g, b } = hexToRgb(validHex);
  const { h, s, l } = rgbToHsl(r, g, b);

  const formats = [
    { label: 'HEX', value: validHex.toUpperCase() },
    { label: 'RGB', value: `rgb(${r}, ${g}, ${b})` },
    { label: 'HSL', value: `hsl(${h}, ${s}%, ${l}%)` },
    { label: 'CSS Variable', value: `--color-primary: ${validHex};` },
  ];

  const copyValue = (label: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedFormat(label);
    setTimeout(() => setCopiedFormat(null), 1500);
  };

  return (
    <div className='py-12'>
      <Container>
        <div className='max-w-3xl mx-auto space-y-8'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Color Picker &amp; Format Converter
            </h1>
            <p className='text-slate-400 mt-2'>
              Pick any color and convert between HEX, RGB, HSL, and CSS custom
              properties instantly.
            </p>
          </div>

          <div className='rounded-xl border border-slate-800 bg-slate-900/60 p-6 grid sm:grid-cols-2 gap-6 items-center'>
            <div className='space-y-4'>
              <div
                style={{ backgroundColor: validHex }}
                className='h-44 w-full rounded-xl border border-slate-700 shadow-inner'
              />
              <div className='flex items-center gap-3'>
                <input
                  type='color'
                  value={validHex}
                  onChange={(e) => setHex(e.target.value)}
                  className='h-10 w-14 cursor-pointer rounded bg-transparent'
                />
                <input
                  type='text'
                  value={hex}
                  onChange={(e) => setHex(e.target.value)}
                  placeholder='#8B5CF6'
                  className='flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-white'
                />
              </div>
            </div>

            <div className='space-y-3'>
              {formats.map((item) => (
                <div
                  key={item.label}
                  className='flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-4 py-3'
                >
                  <div>
                    <div className='text-[11px] uppercase tracking-wider text-slate-500'>
                      {item.label}
                    </div>
                    <div className='font-mono text-sm text-slate-200'>
                      {item.value}
                    </div>
                  </div>
                  <button
                    onClick={() => copyValue(item.label, item.value)}
                    className='p-2 text-slate-400 hover:text-white'
                  >
                    {copiedFormat === item.label ? (
                      <Check className='w-4 h-4 text-emerald-400' />
                    ) : (
                      <Copy className='w-4 h-4' />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <section className='rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-3 text-sm text-slate-400 leading-relaxed'>
            <h2 className='text-lg font-semibold text-white'>
              Understanding HEX, RGB, and HSL in Modern CSS
            </h2>
            <p>
              HEX codes represent red, green, and blue channels in base-16
              notation, while RGB defines exact 0–255 channel intensities. HSL
              (Hue, Saturation, Lightness) is especially useful in design
              systems and Tailwind CSS themes because adjusting lightness
              creates consistent hover and dark-mode shades without shifting
              hue.
            </p>
          </section>
        </div>
        <ToolGuide {...TOOL_GUIDES["json-formatter"]} />
      </Container>
    </div>
  );
}
