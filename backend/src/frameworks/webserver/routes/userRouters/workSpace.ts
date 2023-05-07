import express from 'express'
import AppError from '../../../../utils/appError'
import workspaceDbRepository from '../../../database/mongoDb/repositories/workspaceDbRepository'
import workspaceRepository from '../../../../application/repositories/workspaceRepository'
import workspaceController from '../../../../adapters/controller/workspaceController'
import userRepository from '../../../../application/repositories/userDbRepository'
import userRepositoryMongoDb from '../../../database/mongoDb/repositories/userRepositoryMongoDb'
import projectRepository from '../../../../application/repositories/projectRepository'
import projectDbRepository from '../../../database/mongoDb/repositories/projectDbRepository'


const router  = express.Router()

const controller = workspaceController(
    workspaceRepository , 
    workspaceDbRepository , 
    userRepository ,
    userRepositoryMongoDb ,
    projectRepository , 
    projectDbRepository


)
//-------------------------------Workspace Creation -----------------------------------------//
router.post('/createWorkspace',controller.createWorkspace)

//-------------------------------Workspace Creation -----------------------------------------//
router.patch('/acceptInvitation',controller.acceptInvitation)

//-------------------------------Workspace Creation -----------------------------------------//
router.patch('/rejectInvitation',controller.rejectInvitation)

//-------------------------------Get all workspaces  -----------------------------------------//
router.get('/getallworkspaces',controller.getWorkspaces)

//-------------------------------Workspace Members------------------------------------------//
router.get('/members/:workspaceId' , controller.getMembers)

//------------------------Get Details of a specific workspace--------------------------------//
router.get('/workspace/:id', controller.getWorkspaceDetails) 

//-------------------------------Invite Users ----------------------------------------------//
router.post('/inviteUsers', controller.inviteUsers)

//------------------------------Delete Workspace -------------------------------------------//
router.delete('/delete/:workspaceId',controller.deleteWorkspace)


export default router