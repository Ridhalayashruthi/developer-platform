'use client';

import { useState } from 'react';
import Container from '@/components/common/Container';

import JwtEditor from './JwtEditor';
import JwtOutput from './JwtOutput';
import JwtToolbar from './JwtToolbar';

import type { DecodedJwt } from './types';

export default function JwtDecoder() {
  const [token, setToken] = useState('');

  const [decoded, setDecoded] = useState<DecodedJwt>({
    header: '',
    payload: '',
    signature: '',
    info: {
      algorithm: '',
      type: '',
      issuedAt: '',
      expiresAt: '',
      status: 'Unknown',
    },
  });

  const [error, setError] = useState('');

  return (
    <section className="py-16">
      <Container>
        <h1 className="text-4xl font-bold">
          JWT Decoder
        </h1>

        <p className="mt-3 text-slate-400">
          Decode and inspect JWT tokens instantly. No data leaves your browser.
        </p>

        <JwtToolbar
          token={token}
          setToken={setToken}
          setDecoded={setDecoded}
          setError={setError}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <JwtEditor
            token={token}
            setToken={setToken}
          />

          <JwtOutput
            decoded={decoded}
            error={error}
          />
        </div>
      </Container>
    </section>
  );
}