import express from 'express'
import AppError from '../../../../utils/appError'
import workspaceDbRepository from '../../../database/mongoDb/repositories/workspaceDbRepository'
import workspaceRepository from '../../../../application/repositories/workspaceRepository'
import workspaceController from '../../../../adapters/controller/workspaceController'


const router  = express.Router()

const controller = workspaceController(
    workspaceRepository , 
    workspaceDbRepository

)
//-------------------------------Workspace Creation -----------------------------------------//
router.post('/workspace/create',controller.createWorkspace)

//-------------------------------Get all workspaces  -----------------------------------------//
router.get('/workspaces',controller.getWorkspaces)

export default router