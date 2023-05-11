import cors from 'cors'
import dotenvConfig from '../../dotenvConfig' 
import morgan from 'morgan'
import express ,{ Application } from 'express'
import cookieParser from 'cookie-parser'
const corsOption = {
    origin: ["http://localhost:5173","http://www.pheonixtrek.online" , "https://www.pheonixtrek.online" ],
    methods: ['GET','PUT','PATCH','POST','DELETE'],
    credentials: true
    
  }
const expressConfig = (app: Application) => {

    app.use(morgan('dev'))
    app.use(cors(corsOption ))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())

}

export default expressConfig