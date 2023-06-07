import S3 from 'aws-sdk/clients/s3';
import fs from 'fs'
import configKeys from '../../dotenvConfig'
import { File } from 'buffer';

const s3 = new S3({
   region:configKeys.awsBucketRegion,
   accessKeyId:configKeys.awsAccessKey,
   secretAccessKey:configKeys.awsSecretAccessKey
})


 const s3Service= ()=>{
    const uploadFile = async(file: any ) => {
      try{
        const fileName = `${Date.now()}_${file.originalname}`;
        
                const uploadParams = {
                  Bucket: configKeys.awsBucketName,
                  Body: file.buffer ,
                  Key: fileName,
                };
                return s3.upload(uploadParams).promise();

      }catch(err){
        console.log(err)
      }
    }

    const getFileStream = (fileKey:string) => {
        const downloadParams = {
          Key: fileKey,
          Bucket: configKeys.awsBucketName,
        };
        return s3.getObject(downloadParams).promise();
    };
    
    return {
        uploadFile,
        getFileStream
    }
}

export default s3Service
export type typeofS3Service = typeof s3Service