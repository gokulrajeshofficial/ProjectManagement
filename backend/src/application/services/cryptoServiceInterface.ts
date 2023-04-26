import { typeofCryptoService } from "../../frameworks/service/cryptoService";

const cryptoServiceInterface = (service  : ReturnType<typeofCryptoService> ) => {

    const encryption = (protectedData : string)=>{ return service.encryption(protectedData)}
    
    const decryption = ( encryptedData : string)=>{ return service.decryption(encryptedData)}

    return {
        encryption , decryption
    }
}

export default cryptoServiceInterface