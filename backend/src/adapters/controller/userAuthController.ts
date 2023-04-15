import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { typeOfUserRepository } from '../../application/repositories/userDbRepository'
//UseCases
import { getAccessToken, googleLoginUser, isEmailValid, loginUser, registerUser } from '../../application/useCases/auth/userAuth'
import { typeOfUserRepositoryMongoDb } from '../../frameworks/database/mongoDb/repositories/userRepositoryMongoDb'
import { UserInterface } from '../../types/userInterface'
import { WorkspaceInterface } from '../../types/workspaceInterface'
import { AuthService } from '../../frameworks/service/authService'
import { typeofAuthServiceInterface } from '../../application/services/authServiceInterface'
import { typeofWorkspaceRepository } from '../../application/repositories/workspaceRepository'
import { typeOfWorkspaceDbRepository } from '../../frameworks/database/mongoDb/repositories/workspaceDbRepository'



const userAuthController = (
    userRepositoryMongoDb: typeOfUserRepositoryMongoDb,
    userRepository: typeOfUserRepository,
    authService: AuthService,
    authServiceInterface:  typeofAuthServiceInterface,
    workspaceRepository: typeofWorkspaceRepository , 
    workspaceDbRepository : typeOfWorkspaceDbRepository
) => {

    const userDbRepository = userRepository(userRepositoryMongoDb())
    const workspaceRepo  = workspaceRepository(workspaceDbRepository())
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
        let workspaceDetails: WorkspaceInterface  = req.body.workspaceCreation
        let inviteList: [string]  = req.body.inviteList;
        workspaceDetails.invitedUsers = inviteList
        console.log(userData , workspaceDetails)
        const response = await registerUser(userData, workspaceDetails, userDbRepository , authServices , workspaceRepo)
        res.json(response)
    })


    const userLogin = asyncHandler(async(req: Request, res: Response) => {
        let {email , password} : UserInterface = req.body
        const response = await loginUser(email , password ,  userDbRepository , authServices)
        res.cookie("refreshToken", response.refreshToken, { httpOnly: true });
        res.json(response)
    })

    const googleLogin = asyncHandler(async(req , res)=>{
        const {email} : { email : string } = req.body
        const response = await googleLoginUser(email , userDbRepository , authServices)
        res.cookie("refreshToken",    response.refreshToken, { httpOnly: true });
        res.json(response)
    })

    const acessToken = asyncHandler(async(req,res)=>{
        const refreshToken = req.cookies?.refreshToken
        const response = await getAccessToken(refreshToken , userDbRepository , authServices )
        res.json(response)

    })


    return {
        emailVerification,
        userRegister,
        userLogin,
        googleLogin,
        acessToken
    }

}

export default userAuthController;