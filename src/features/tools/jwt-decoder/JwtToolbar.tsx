import { Button } from '@/components/ui/button';
import { decodeJwt } from './jwt.utils';
import type { DecodedJwt } from './types';

interface JwtToolbarProps {
  token: string;
  setToken: (value: string) => void;
  setDecoded: (value: DecodedJwt) => void;
  setError: (value: string) => void;
}

export default function JwtToolbar({
  token,
  setToken,
  setDecoded,
  setError,
}: JwtToolbarProps) {
  const emptyDecoded: DecodedJwt = {
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
  };

  const handleDecode = () => {
    try {
      const result = decodeJwt(token);

      setDecoded(result);
      setError('');
    } catch (error) {
      setDecoded(emptyDecoded);
      setError(error instanceof Error ? error.message : 'Invalid JWT token');
    }
  };

  const handleClear = () => {
    setToken('');
    setDecoded(emptyDecoded);
    setError('');
  };

  return (
    <div className='mt-8 flex gap-3'>
      <Button disabled={!token.trim()} onClick={handleDecode}>
        Decode
      </Button>

      <Button variant='outline' disabled={!token.trim()} onClick={handleClear}>
        Clear
      </Button>
    </div>
  );
}
