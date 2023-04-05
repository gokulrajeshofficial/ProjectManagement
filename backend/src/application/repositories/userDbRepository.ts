import {typeOfUserRepositoryMongoDb} from '../../frameworks/database/mongoDb/repositories/userRepositoryMongoDb'
import { UserInterface } from '../../types/userInterface'

const userRepository = (repository : ReturnType<typeOfUserRepositoryMongoDb>)=>{

    const findByEmail = (email : string)=>{return repository.findByEmail(email)}

    const addUser = (userData : UserInterface)=>{return repository.addUser(userData)}




    return {findByEmail, addUser}
}
export default userRepository

export type typeOfUserRepository = typeof userRepository