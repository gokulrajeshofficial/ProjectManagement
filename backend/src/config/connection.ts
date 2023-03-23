import mongoose from 'mongoose'

import { dbOptions } from '../types/connection'
const dbOption : dbOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
 const dbConnection = () => {
    mongoose.connect('mongodb://localhost:27017/TeamPro', dbOption).then(() => {
        console.log("Connection has been established")
    }).catch((err) => {
        console.error(err)
    })
}

export default dbConnection