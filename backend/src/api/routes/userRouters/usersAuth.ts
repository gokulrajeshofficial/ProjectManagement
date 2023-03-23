import express from 'express'
import { userLogin, userRegister } from '../../controllers/userControllers/userAuthController';

const router = express.Router();

//-------------------------User Register--------------------------//
router.post('/register',userRegister);
//------------------------User Signin ---------------------------//
router.post('/login',userLogin)


export default router
