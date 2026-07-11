export interface JwtInfo {
    algorithm: string;
    type: string;
    issuedAt?: string;
    expiresAt?: string;
    status: 'Valid' | 'Expired' | 'Unknown';
  }
  
  export interface DecodedJwt {
    header: string;
    payload: string;
    signature: string;
    info: JwtInfo;
  }