import dotenv from 'dotenv'
dotenv.config()

const dotenvConfig = {
    mongoDbUrl : process.env.DATABASE as string,
    port : process.env.PORT || 5000 as number,

}

export default dotenvConfig