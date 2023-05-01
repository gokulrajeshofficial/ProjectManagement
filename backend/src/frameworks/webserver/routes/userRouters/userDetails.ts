import express from 'express'

import userRepositoryMongoDb from '../../../database/mongoDb/repositories/userRepositoryMongoDb';
import userRepository from '../../../../application/repositories/userDbRepository';
import { authServiceInterface } from '../../../../application/services/authServiceInterface';
import { authService } from '../../../service/authService';
import workspaceRepository from '../../../../application/repositories/workspaceRepository';
import workspaceDbRepository from '../../../database/mongoDb/repositories/workspaceDbRepository';
import userDetailsController from '../../../../adapters/controller/userDetailsController';


const router = express.Router();

const controller = userDetailsController(
     userRepositoryMongoDb ,
     userRepository ,

      )
//-------------------------Verify User--------------------------//
router.post('/verifyEmailId',controller.verifyUserByMail);




export default router