import express ,{Application,Request,Response,NextFunction} from 'express'
import cors from 'cors' 
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
import userRouter from './api/routes/userRouters/usersAuth'
import adminRouter from './api/routes/adminRouter/adminRouter'
dotenv.config()
const app : Application = express()
const port  = process.env.PORT ;

app.use('/',userRouter)
app.use('/admin' , adminRouter)
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.listen(3000 , ()=>{
    console.log(`Connected on the port ${port}`)
})
