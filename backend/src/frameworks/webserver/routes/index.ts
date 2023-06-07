import express , { Application} from 'express'
import userAuth from  './userRouters/usersAuth'
import workspace from './userRouters/workSpace'
import userDetails from './userRouters/userDetails'
import userAuthMiddleware from '../middlewares/userAuthMiddleware'
import projectRouter from './userRouters/projectRouter'
import taskRouter from './userRouters/taskRouter'
import chatRouter from './userRouters/chatRouter'
const routes = (app:Application)=>{
    app.use('/api/auth',userAuth)
    app.use('/api/workspace',userAuthMiddleware ,workspace)
    app.use('/api/user',userAuthMiddleware , userDetails  )
    app.use('/api/project', userAuthMiddleware , projectRouter)
    app.use('/api/task', userAuthMiddleware , taskRouter )
    app.use('/api/chat' , userAuthMiddleware , chatRouter)

}

export default routes