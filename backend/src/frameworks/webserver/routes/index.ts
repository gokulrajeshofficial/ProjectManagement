import express , { Application} from 'express'
import userAuth from  './userRouters/usersAuth'

const routes = (app:Application)=>{
    app.use('/auth',userAuth)

}

export default routes