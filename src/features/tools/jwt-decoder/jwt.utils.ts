import type { DecodedJwt } from './types';

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');

  return decodeURIComponent(
    atob(base64)
      .split('')
      .map((char) =>
        `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`
      )
      .join('')
  );
}
export function decodeJwt(token: string): DecodedJwt {
    const parts = token.split('.');
  
    if (parts.length !== 3) {
      throw new Error('Invalid JWT token');
    }
  
    // 👇 New code starts here
    const header = JSON.parse(decodeBase64Url(parts[0]));
    const payload = JSON.parse(decodeBase64Url(parts[1]));
  
    const now = Math.floor(Date.now() / 1000);
  
    const issuedAt = payload.iat
      ? new Date(payload.iat * 1000).toLocaleString()
      : undefined;
  
    const expiresAt = payload.exp
      ? new Date(payload.exp * 1000).toLocaleString()
      : undefined;
  
    const status =
      payload.exp == null
        ? 'Unknown'
        : payload.exp > now
          ? 'Valid'
          : 'Expired';
  
    return {
      header: JSON.stringify(header, null, 2),
      payload: JSON.stringify(payload, null, 2),
      signature: parts[2],
  
      info: {
        algorithm: header.alg ?? '-',
        type: header.typ ?? '-',
        issuedAt,
        expiresAt,
        status,
      },
    };
  }