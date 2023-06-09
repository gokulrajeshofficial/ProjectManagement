import dotenv from 'dotenv'
dotenv.config()

const dotenvConfig = {
    mongoDbUrlPass : process.env.DATABASE as string, 
    port : process.env.PORT || 5000 as number,

    access_token_key : process.env.JWT_ACCESS_TOKEN_KEY as string,
    refresh_token_key : process.env.JWT_REFRESH_TOKEN_KEY as string,

    nodemailer_host : process.env.NODE_MAILER_HOST as string,
    nodemailer_port : process.env.NODE_MAILER_PORT || 465 as number,
    nodemailer_user : process.env.NODE_MAILER_USERNAME as string, 
    nodemailer_pass : process.env.NODE_MAILER_PASSWORD as string ,


    crypto_secret : process.env.CRYPTO_SECRET_KEY as string,

    client_base_url : process.env.CLIENT_BASE_URL as string,

    awsBucketRegion : process.env.AWS_BUCKET_REGION as string,
    awsAccessKey : process.env.AWS_ACCESS_KEY as string ,
    awsSecretAccessKey : process.env.AWS_SECRET_KEY as  string,
    awsBucketName   : process.env.AWS_BUCKET_NAME as string



}

export default dotenvConfig