import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserInterface } from '../../types/userInterface'
import dotenvConfig from '../../dotenvConfig'

export const authService = ()=>{

    const encryptPassword = async(password : string)=>{
        const genSalt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password , genSalt)
        return password
    }
    const comparePassword = async(password:string , encryptPassword : string) => {

        const status = await bcrypt.compare(password , encryptPassword)
        return status 
        
    }

    const generateAccessToken = async(payload : string)=>{
        const token = await jwt.sign({payload}, dotenvConfig.access_token_key , {expiresIn:'20s'})
        return token
    }

    const generateRefreshToken = async(payload : string )=>{
        const token = await jwt.sign({payload}, dotenvConfig.refresh_token_key , {expiresIn:"1w"})
        return token

    }

    const verifyRefreshToken =async (token : string) => {

        return jwt.verify(token , dotenvConfig.refresh_token_key)
        
    }


    return {
        encryptPassword ,
        comparePassword , 
        generateAccessToken , 
        generateRefreshToken , 
        verifyRefreshToken
    }
}

export type AuthService = typeof authService
