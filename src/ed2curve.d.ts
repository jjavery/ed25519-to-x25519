// Type definitions for ed2curve 0.2
// Project: https://github.com/dchest/ed2curve-js
// Definitions by: Florian Keller <https://github.com/ffflorian>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6

export as namespace ed2curve;

/**
 * Converts Ed25519 public key to Curve25519 public key.
 * montgomeryX = (edwardsY + 1)*inverse(1 - edwardsY) mod p
 */
export function convertPublicKey(publicKey: Uint8Array): Uint8Array | null;

/** Converts Ed25519 secret key to Curve25519 secret key. */
export function convertSecretKey(secretKey: Uint8Array): Uint8Array;

/** Converts Ed25519 key pair to Curve25519 key pair. */
export function convertKeyPair(keyPair: any): Uint8Array | null;
