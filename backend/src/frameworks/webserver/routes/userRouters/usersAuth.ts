import express from 'express'
import userAuthController from '../../../../adapters/controller/userAuthController';
import userRepositoryMongoDb from '../../../database/mongoDb/repositories/userRepositoryMongoDb';
import userRepository from '../../../../application/repositories/userDbRepository';
import { authServiceInterface } from '../../../../application/services/authServiceInterface';
import { authService } from '../../../service/authService';
const router = express.Router();

const controller = userAuthController(
     userRepositoryMongoDb ,
     userRepository ,
     authService,
     authServiceInterface ,
      )
//-------------------------Verify User--------------------------//
router.post('/verifyEmailId',controller.emailVerification);
//-------------------------User Register--------------------------//
router.post('/register',controller.userRegister);
//------------------------User Signin ---------------------------//
router.post('/login',controller.userLogin)


export default router
