"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const crypto_1 = require("crypto");
const convert_key_1 = require("./convert-key");
const privateKey = (0, crypto_1.createPrivateKey)({
    key: {
        crv: 'Ed25519',
        d: 'IJqpZAS_S0NuuPh7Sqm9Hzs5IeafrRmsjXqaDroch6w',
        x: 'cXbDRvACe2NSsaTpOOWUZv_mH1wiPoE6Y5Jff4IyWiM',
        kty: 'OKP'
    },
    format: 'jwk'
});
const publicKey = (0, crypto_1.createPublicKey)(privateKey);
// The above key converted to X25519
const x25519PrivateKey = (0, crypto_1.createPrivateKey)({
    key: {
        crv: 'X25519',
        x: 'OhHmvNaYntMdpoH9LlPyUg9svcMzp3Jqj6zCjKK_rGs',
        d: 'GAaLBg4d_E-c1cd6hz6sBG6X7FM7xRTOMTBceCfax1A',
        kty: 'OKP'
    },
    format: 'jwk'
});
const x25519PublicKey = (0, crypto_1.createPublicKey)(x25519PrivateKey);
describe('convert-key', () => {
    it('converts an Ed25519 private key to an X25519 private key', () => {
        const actual = (0, convert_key_1.convertEd25519PrivateKeyToX25519)(privateKey).export({
            format: 'jwk'
        });
        const expected = x25519PrivateKey.export({ format: 'jwk' });
        chai_1.assert.deepEqual(actual, expected);
    });
    it('converts an Ed25519 public key to an X25519 public key', () => {
        const actual = (0, convert_key_1.convertEd25519PublicKeyToX25519)(publicKey).export({
            format: 'jwk'
        });
        const expected = x25519PublicKey.export({ format: 'jwk' });
        chai_1.assert.deepEqual(actual, expected);
    });
});
//# sourceMappingURL=convert-key.test.js.map