import mongoose from 'mongoose'
import dotenvConfig from '../../../dotenvConfig'

import  dbOptions  from '../../../types/connectionInterface'
const dbOption : dbOptions = { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
 const dbConnection = () => {
    mongoose.connect(`mongodb+srv://pheonixtrek:${dotenvConfig.mongoDbUrlPass }@pheonixtrek.6gw6dfe.mongodb.net/`).then(() => {
        console.log("Connection has been established")
    }).catch((err) => {
        console.error(err)
    })
}

export default dbConnection