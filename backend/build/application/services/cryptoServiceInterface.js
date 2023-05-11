"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cryptoServiceInterface = (service) => {
    const encryption = (protectedData) => { return service.encryption(protectedData); };
    const decryption = (encryptedData) => { return service.decryption(encryptedData); };
    return {
        encryption, decryption
    };
};
exports.default = cryptoServiceInterface;
