
import { File } from "buffer";
import { typeofS3Service } from "../../frameworks/service/s3bucket";

const awsBucketInterface = (repository : ReturnType<typeofS3Service>)=>{
    const uploadFile = async(file : any )=>{return repository.uploadFile(file)}
    const getFileStream = async(fileName : string )=>{return repository.getFileStream(fileName)}
    return {uploadFile , getFileStream} 
}
export default awsBucketInterface
export type typeofAwsBucketInterface = typeof awsBucketInterface