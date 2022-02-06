import { createPrivateKey, createPublicKey, KeyObject } from 'crypto'
import * as ed2curve from './ed2curve'

export function convertEd25519PublicKeyToX25519(
  publicKey: KeyObject
): KeyObject {
  const jwk = publicKey.export({ format: 'jwk' })

  const buffer = Buffer.from(jwk.x as string, 'base64url')
  const x25519 = ed2curve.convertPublicKey(buffer)
  const x = Buffer.from(x25519 as Uint8Array).toString('base64url')

  const x25519PublicKey = createPublicKey({
    key: {
      crv: 'X25519',
      x,
      kty: 'OKP'
    },
    format: 'jwk'
  })

  return x25519PublicKey
}

export function convertEd25519PrivateKeyToX25519(
  privateKey: KeyObject
): KeyObject {
  const jwk = privateKey.export({ format: 'jwk' })

  const buffer_x = Buffer.from(jwk.x as string, 'base64url')
  const x25519_x = ed2curve.convertPublicKey(buffer_x)
  const x = Buffer.from(x25519_x as Uint8Array).toString('base64url')

  const buffer_d = Buffer.from(jwk.d as string, 'base64url')
  const x25519_d = ed2curve.convertSecretKey(buffer_d)
  const buffer_d_2 = Buffer.from(x25519_d)
  const d = buffer_d_2.toString('base64url')

  delete jwk.d
  buffer_d.fill(0)
  x25519_d.fill(0)
  buffer_d_2.fill(0)

  const x25519PrivateKey = createPrivateKey({
    key: {
      crv: 'X25519',
      x,
      d,
      kty: 'OKP'
    },
    format: 'jwk'
  })

  return x25519PrivateKey
}
