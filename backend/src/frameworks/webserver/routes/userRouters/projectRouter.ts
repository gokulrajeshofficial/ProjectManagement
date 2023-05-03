import express from 'express'
import projectController from '../../../../adapters/controller/projectController';
import userRepositoryMongoDb from '../../../database/mongoDb/repositories/userRepositoryMongoDb';
import userRepository from '../../../../application/repositories/userDbRepository';
import workspaceRepository from '../../../../application/repositories/workspaceRepository';
import workspaceDbRepository from '../../../database/mongoDb/repositories/workspaceDbRepository';
import projectRepository from '../../../../application/repositories/projectRepository';
import projectDbRepository from '../../../database/mongoDb/repositories/projectDbRepository';

const router = express.Router();

const controller = projectController(

    workspaceRepository , 
    workspaceDbRepository , 
    userRepository ,
    userRepositoryMongoDb , 
    projectRepository , 
    projectDbRepository


)
//-------------------------Create New Project--------------------------//
router.post('/createNewProject',controller.createNewProject);

//-------------------------Get all Projects--------------------------//
router.get('/getAllProjects', controller.getAllProjects)

//------------------------Get all Projects ----------------------------//
router.post('/workspace/:workspaceId',controller.workspaceProjects)


export default router

