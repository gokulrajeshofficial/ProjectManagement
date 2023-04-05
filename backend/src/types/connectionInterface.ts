
import mongoose,{ConnectOptions} from 'mongoose'

export default  interface dbOptions extends ConnectOptions  {    
    useNewUrlParser: boolean,
    useFindAndModify: boolean,
    useUnifiedTopology: boolean
}  