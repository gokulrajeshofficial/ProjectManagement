import express , { Application} from 'express'
import userAuth from  './userRouters/usersAuth'
import workspace from './userRouters/workSpace'
import userDetails from './userRouters/userDetails'
import userAuthMiddleware from '../middlewares/userAuthMiddleware'
import projectRouter from './userRouters/projectRouter'
const routes = (app:Application)=>{
    app.use('/auth',userAuth)
    app.use('/api/workspace',userAuthMiddleware ,workspace)
    app.use('/api/user',userAuthMiddleware , userDetails  )
    app.use('/api/project', userAuthMiddleware , projectRouter)

}

export default routes