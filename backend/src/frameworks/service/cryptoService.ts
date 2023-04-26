import crypto from 'crypto'
const algorithm = "aes-256-cbc";


const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);


const cryptoService = () => {

    const encryption = (protectedData: string) => {
        const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

        let encryptedData = cipher.update(protectedData, "utf-8", "hex");

        encryptedData += cipher.final("hex");

        console.log("Encrypted message: " + encryptedData);

        return encryptedData

    }

    const decryption = (encryptedData : string) => {
        const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

        let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

        decryptedData += decipher.final("utf8");

        console.log("Decrypted message: " + decryptedData);

        return decryptedData
    }


    return { encryption, decryption }

}


export default cryptoService

export type typeofCryptoService = typeof cryptoService