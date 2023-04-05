import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserInterface } from '../../types/userInterface'

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
    const generateToken = async(payload : string)=>{

        const token = jwt.sign({payload}, )

    }


    return {
        encryptPassword ,
        comparePassword , 
        generateToken
    }
}

export type AuthService = typeof authService
