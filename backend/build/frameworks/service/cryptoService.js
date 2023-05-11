"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const dotenvConfig_1 = __importDefault(require("../../dotenvConfig"));
const algorithm = "aes-256-cbc";
const Securitykey = crypto_1.default.createHash('sha256').update(dotenvConfig_1.default.crypto_secret).digest('base64').substr(0, 32);
const cryptoService = () => {
    const encryption = (protectedData) => {
        const initVector = crypto_1.default.randomBytes(16);
        const cipher = crypto_1.default.createCipheriv(algorithm, Securitykey, initVector);
        let encryptedData = cipher.update(protectedData, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        console.log("Encrypted message: " + encryptedData);
        return (initVector.toString('hex') + ":" + encryptedData);
    };
    const decryption = (recievedData) => {
        const textParts = recievedData.split(':');
        console.log(textParts);
        const initVector = Buffer.from(textParts[0], 'hex');
        const encryptedData = textParts[1];
        const decipher = crypto_1.default.createDecipheriv(algorithm, Securitykey, initVector);
        let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
        decryptedData += decipher.final("utf8");
        console.log("Decrypted message: " + decryptedData);
        return decryptedData;
    };
    return { encryption, decryption };
};
exports.default = cryptoService;
