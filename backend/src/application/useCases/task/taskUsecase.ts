import { taskInterface } from "../../../types/taskInterface"
import { typeOfTaskRepository } from "../../repositories/taskRepository"
import { typeofAwsBucketInterface } from "../../services/awsBucketInterface"


export const taskCreation = async(taskRepo : ReturnType<typeOfTaskRepository> , task : taskInterface , )=>{
    const response = await taskRepo.createTask(task)
    return response
}

export const uploadTaskFiles = async( s3Repo : ReturnType<typeofAwsBucketInterface> , files : any)=>{

    const filePromises  = files.map(async(file : any)=>{
        
       const location = await s3Repo.uploadFile(file)
       console.log(location)
       return {  location : location?.Location , name : file.originalname}
    })

   const response =   await Promise.all(filePromises);
   return response
}

export const downloadTaskFiles = async(s3Repo : ReturnType<typeofAwsBucketInterface> , attachments : [string])=>{

        const filePromises = attachments.map(async(fileName )=>{
            const response =  await s3Repo.getFileStream(fileName)
            console.log(response)
            return response
        })
        const response =   await Promise.all(filePromises);
      return response

    
}


export const getAllTaskUsecase = async(taskRepo : ReturnType<typeOfTaskRepository> , projectId : string)=>{
    const response = await taskRepo.getAllTask(projectId)
    return response
}

export const getTaskDetails = async(taskRepo : ReturnType<typeOfTaskRepository> , taskId : string )=>{
    const task = await taskRepo.getTaskById(taskId)
    return task
}



export const getAllTaskUser = async(taskRepo : ReturnType<typeOfTaskRepository> , email : string   )=>{

    const response = await taskRepo.getTaskUser(email)
    return response

}

export const  taskUpdation = async(taskRepo: ReturnType<typeOfTaskRepository>  , taskupt : taskInterface )=>{

    console.log("Reached taskUpdation" )
    console.log(taskupt)

    const response = await taskRepo.updateTask(taskupt)
    return response

}

export const taskDeletion = async(taskRepo :  ReturnType<typeOfTaskRepository> , taskId : string)=>{
    const response  = await taskRepo.deleteTask(taskId)
    console.log(response)
    return response
}