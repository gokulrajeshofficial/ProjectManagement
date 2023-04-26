import {typeOfUserRepositoryMongoDb} from '../../frameworks/database/mongoDb/repositories/userRepositoryMongoDb'
import { UserInterface } from '../../types/userInterface'

const userRepository = (repository : ReturnType<typeOfUserRepositoryMongoDb>)=>{

    const findByEmail = (email : string)=>{return repository.findByEmail(email)}

    const addUser = (userData : UserInterface )=>{return repository.addUser(userData)}

    const findById = (id : string )=>{return repository.findById(id)}




    return {findByEmail, addUser , findById}
}
export default userRepository

export type typeOfUserRepository = typeof userRepository