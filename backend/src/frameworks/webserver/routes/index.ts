import express , { Application} from 'express'
import userAuth from  './userRouters/usersAuth'
import workspace from './userRouters/workSpace'
import userAuthMiddleware from '../middlewares/userAuthMiddleware'
const routes = (app:Application)=>{
    app.use('/auth',userAuth)
    app.use('/api',userAuthMiddleware ,workspace)

}

export default routes