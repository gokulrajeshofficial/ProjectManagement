import { Request, Response } from "express"
import { typeOfTaskRepository } from "../../application/repositories/taskRepository"
import { typeOftaskDbRepository } from "../../frameworks/database/mongoDb/repositories/taskDbRepository"
import asyncHandler from "express-async-handler"
import { taskInterface } from "../../types/taskInterface"
import { downloadTaskFiles, getAllTaskUsecase, getAllTaskUser, getTaskDetails, taskCreation, taskDeletion, taskUpdation, uploadTaskFiles } from "../../application/useCases/task/taskUsecase"
import { typeofAwsBucketInterface } from "../../application/services/awsBucketInterface"
import { typeofS3Service } from "../../frameworks/service/s3bucket"
import { File } from "buffer"
import AppError from "../../utils/appError"
import { HttpStatus } from "../../types/httpStatus"


const taskController = (

    taskRepository :   typeOfTaskRepository, 
    taskDbRepository : typeOftaskDbRepository ,
    awsBucketInterface : typeofAwsBucketInterface,
    s3Service : typeofS3Service

)=>{

    const taskRepo =  taskRepository(taskDbRepository())
    const s3Repo = awsBucketInterface(s3Service())

    const createTask = asyncHandler(async(req : Request , res : Response)=>{

        const task : taskInterface  =  req.body.task
        console.log("task is " , task)
        task.createdBy = req.body.userId
        const response = await taskCreation(taskRepo , task , ) 

        res.status(200).json(response)

    }) 
    
    const getAllTasks = asyncHandler(async(req : Request , res : Response)=>{
        const projectId = req.params.projectId
        const tasks = await getAllTaskUsecase( taskRepo , projectId)

        res.json(tasks)

    })
    const getTask = asyncHandler(async(req : Request ,res : Response )=>{

        const taskId = req.params.taskId;
        const response = await getTaskDetails(taskRepo , taskId )
        res.json(response)
    })

    const getUserTasks = asyncHandler(async(req : Request ,res : Response)=>{
        const email = req.params.email
        const response = await getAllTaskUser(taskRepo , email)
        res.json(response)

    })

    const updateTask = asyncHandler(async(req : Request ,res : Response)=>{
        const taskupt = req.body.task
        const updatedTask = await taskUpdation(taskRepo , taskupt)
        res.json(updatedTask)

    })
    
    const deleteTask = asyncHandler(async(req : Request , res : Response)=>{
        const taskId = req.params.taskId
        const response = await taskDeletion(taskRepo , taskId)
        res.json(response)

    })
    const uploadFiles =asyncHandler(async(req : Request , res : Response)=>{
        const {files}  = req
        console.log(files)
        if(files?.length)
        {

            const response = await uploadTaskFiles( s3Repo , files)
            res.json(response)
        }else{

            throw new AppError( "No Files recieved",HttpStatus.NO_CONTENT)
        }
    })

    const getfiles = asyncHandler(async(req : Request , res : Response)=>{
        const {attachments}  = req.body
        console.log(req.body)
        const fileStreams = await downloadTaskFiles(s3Repo , attachments)
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment');
        fileStreams.forEach((fileStream, index) => {
            if( fileStream.Body){

                res.setHeader(`Content-Disposition-${index}`, `attachment; filename="${attachments[index]}"`);
                res.send(fileStream)
            }
        });
        res.end();
       
    })


    return { createTask , uploadFiles , getfiles , getAllTasks , getTask , getUserTasks , updateTask , deleteTask}


}

export default taskController