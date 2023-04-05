import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { typeOfUserRepository } from '../../application/repositories/userDbRepository'
//UseCases
import { isEmailValid, loginUser, registerUser } from '../../application/useCases/auth/userAuth'
import { typeOfUserRepositoryMongoDb } from '../../frameworks/database/mongoDb/repositories/userRepositoryMongoDb'
import { UserInterface } from '../../types/userInterface'
import { WorkspaceInterface } from '../../types/workspaceInterface'
import { AuthService } from '../../frameworks/service/authService'
import { typeofAuthServiceInterface } from '../../application/services/authServiceInterface'

const userAuthController = (
    userRepositoryMongoDb: typeOfUserRepositoryMongoDb,
    userRepository: typeOfUserRepository,
    authService: AuthService,
    authServiceInterface:  typeofAuthServiceInterface
) => {

    const userDbRepository = userRepository(userRepositoryMongoDb())
    const authServices = authServiceInterface(authService())


    const emailVerification = asyncHandler(async (req: Request, res: Response) => {
        const { email }: { email: string } = req.body
        console.log(email)
        const status = await isEmailValid(email, userDbRepository)
        console.log(status)
        res.json(status)
    })


    const userRegister = asyncHandler(async (req: Request, res: Response) => {
        let userData: UserInterface = req.body.userData
        let workspaceCreation: WorkspaceInterface = req.body.workspaceCreation
        let inviteList: [] = req.body.inviteList;
        const response = await registerUser(userData, workspaceCreation, inviteList, userDbRepository , authServices)
        res.json(response)


    })


    const userLogin = asyncHandler(async(req: Request, res: Response) => {
        let {email , password} : UserInterface = req.body
        const response = await loginUser(email , password ,  userDbRepository , authServices)
        res.json(response)
    })


    return {
        emailVerification,
        userRegister,
        userLogin

    }

}

export default userAuthController;