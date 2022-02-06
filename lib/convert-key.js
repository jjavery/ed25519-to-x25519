"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertEd25519PrivateKeyToX25519 = exports.convertEd25519PublicKeyToX25519 = void 0;
const crypto_1 = require("crypto");
const ed2curve = __importStar(require("./ed2curve"));
function convertEd25519PublicKeyToX25519(publicKey) {
    const jwk = publicKey.export({ format: 'jwk' });
    const buffer = Buffer.from(jwk.x, 'base64url');
    const x25519 = ed2curve.convertPublicKey(buffer);
    const x = Buffer.from(x25519).toString('base64url');
    const x25519PublicKey = (0, crypto_1.createPublicKey)({
        key: {
            crv: 'X25519',
            x,
            kty: 'OKP'
        },
        format: 'jwk'
    });
    return x25519PublicKey;
}
exports.convertEd25519PublicKeyToX25519 = convertEd25519PublicKeyToX25519;
function convertEd25519PrivateKeyToX25519(privateKey) {
    const jwk = privateKey.export({ format: 'jwk' });
    const buffer_x = Buffer.from(jwk.x, 'base64url');
    const x25519_x = ed2curve.convertPublicKey(buffer_x);
    const x = Buffer.from(x25519_x).toString('base64url');
    const buffer_d = Buffer.from(jwk.d, 'base64url');
    const x25519_d = ed2curve.convertSecretKey(buffer_d);
    const buffer_d_2 = Buffer.from(x25519_d);
    const d = buffer_d_2.toString('base64url');
    delete jwk.d;
    buffer_d.fill(0);
    x25519_d.fill(0);
    buffer_d_2.fill(0);
    const x25519PrivateKey = (0, crypto_1.createPrivateKey)({
        key: {
            crv: 'X25519',
            x,
            d,
            kty: 'OKP'
        },
        format: 'jwk'
    });
    return x25519PrivateKey;
}
exports.convertEd25519PrivateKeyToX25519 = convertEd25519PrivateKeyToX25519;
//# sourceMappingURL=convert-key.js.map