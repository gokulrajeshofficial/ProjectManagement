import {typeOfUserRepositoryMongoDb} from '../../frameworks/database/mongoDb/repositories/userRepositoryMongoDb'
import { UserInterface } from '../../types/userInterface'

const userRepository = (repository : ReturnType<typeOfUserRepositoryMongoDb>)=>{

    const findByEmail = (email : string)=>{return repository.findByEmail(email)}

    const addUser = (userData : UserInterface )=>{return repository.addUser(userData)}

    const findById = (id : string )=>{return repository.findById(id)}

    const updateUserDetails = (userDetails : UserInterface )=>{return repository.updateUserDetails(userDetails)}



    return {findByEmail, addUser , findById , updateUserDetails }
}
export default userRepository

export type typeOfUserRepository = typeof userRepository