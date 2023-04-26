import express from 'express'
import AppError from '../../../../utils/appError'
import workspaceDbRepository from '../../../database/mongoDb/repositories/workspaceDbRepository'
import workspaceRepository from '../../../../application/repositories/workspaceRepository'
import workspaceController from '../../../../adapters/controller/workspaceController'
import userRepository from '../../../../application/repositories/userDbRepository'
import userRepositoryMongoDb from '../../../database/mongoDb/repositories/userRepositoryMongoDb'


const router  = express.Router()

const controller = workspaceController(
    workspaceRepository , 
    workspaceDbRepository , 
    userRepository ,
    userRepositoryMongoDb


)
//-------------------------------Workspace Creation -----------------------------------------//
router.post('/createWorkspace',controller.createWorkspace)

//-------------------------------Get all workspaces  -----------------------------------------//
router.get('/workspaces',controller.getWorkspaces)

//------------------------Get Details of a specific workspace--------------------------------//
router.get('/workspace/:id', controller.getWorkspaceDetails) 

export default router