import express from 'express'
import { emailVerification, userLogin, userRegister } from '../../../../adapters/controller/userAuthController';

const router = express.Router();


//-------------------------Verify User--------------------------//
router.post('/verifyEmailId',emailVerification);
//-------------------------User Register--------------------------//
router.post('/register',userRegister);
//------------------------User Signin ---------------------------//
router.post('/login',userLogin)


export default router
