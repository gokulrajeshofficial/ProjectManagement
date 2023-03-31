import mongoose from 'mongoose'

import  dbOptions  from '../../../types/connectionInterface'
const dbOption : dbOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
 const dbConnection = () => {
    mongoose.connect('mongodb://0.0.0.0:27017/PheonixTrek' ).then(() => {
        console.log("Connection has been established")
    }).catch((err) => {
        console.error(err)
    })
}

export default dbConnection