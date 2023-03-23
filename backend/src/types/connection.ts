import mongoose,{ConnectOptions} from 'mongoose'

export  interface dbOptions extends ConnectOptions  {    
    useNewUrlParser: boolean,
    useFindAndModify: boolean,
    useUnifiedTopology: boolean}  