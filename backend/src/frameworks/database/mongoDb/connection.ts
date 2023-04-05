import mongoose from 'mongoose'
import dotenvConfig from '../../../dotenvConfig'

import  dbOptions  from '../../../types/connectionInterface'
const dbOption : dbOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
 const dbConnection = () => {
    mongoose.connect(dotenvConfig.mongoDbUrl ).then(() => {
        console.log("Connection has been established")
    }).catch((err) => {
        console.error(err)
    })
}

export default dbConnection