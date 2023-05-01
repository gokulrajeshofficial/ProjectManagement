import crypto from 'crypto'
import dotenvConfig from '../../dotenvConfig';
const algorithm = "aes-256-cbc";


const Securitykey = crypto.createHash('sha256').update(dotenvConfig.crypto_secret).digest('base64').substr(0, 32);


const cryptoService = () => {
    
    const encryption = (protectedData: string) => {

        const initVector = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

        let encryptedData = cipher.update(protectedData, "utf-8", "hex");

        encryptedData += cipher.final("hex");

        console.log("Encrypted message: " + encryptedData);

        return (initVector.toString('hex') + ":" + encryptedData) as string
      

    }

    const decryption = (recievedData : string) => {
        const textParts = recievedData.split(':');
        console.log(textParts)

        const initVector = Buffer.from( textParts[0], 'hex');
        const encryptedData = textParts[1]

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