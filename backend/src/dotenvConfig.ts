import dotenv from 'dotenv'
dotenv.config()

const dotenvConfig = {
    mongoDbUrl : process.env.DATABASE as string,
    port : process.env.PORT || 5000 as number,
    access_token_key : process.env.JWT_ACCESS_TOKEN_KEY as string,
    refresh_token_key : process.env.JWT_REFRESH_TOKEN_KEY as string

}

export default dotenvConfig