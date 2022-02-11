export function convertPublicKey(pk: any): Uint8Array | null;
export function convertSecretKey(sk: any): Uint8Array;
export function convertKeyPair(edKeyPair: any): {
    publicKey: Uint8Array;
    secretKey: Uint8Array;
} | null;
