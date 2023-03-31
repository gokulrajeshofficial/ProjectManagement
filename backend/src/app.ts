import express ,{Application,Request,Response,NextFunction} from 'express'

import dbConnection from './frameworks/database/mongoDb/connection';
import expressConfig from './frameworks/webserver/expressConfig';
import errorHandlingMidlleware from './frameworks/webserver/middlewares/errorHandlingMiddleware';
import routes from './frameworks/webserver/routes';
import serverConfig from './frameworks/webserver/server';
import AppError from './utils/appError';

const app : Application = express()

//connectDB
dbConnection()
//Config setting for exppress 
expressConfig(app)

//Routes for each end point
routes(app)

app.use(errorHandlingMidlleware)

 // catch 404 and forward to error handler
 app.all('*', (req,res,next:NextFunction) => {
    next(new AppError('Not found', 404));
});

// Start the server 
serverConfig(app)


 


